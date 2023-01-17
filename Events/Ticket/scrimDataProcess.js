const { Client, ActionRowBuilder, Events, StringSelectMenuBuilder, ModalBuilder, EmbedBuilder, TextInputStyle, TextInputBuilder,
    ButtonBuilder, ButtonStyle
} = require("discord.js");
const scrimsDB = require("../../Structures/Schemas/scrims.js")
const { notifyTeam } = require("./functions/scrimFunctions.js")

module.exports = {
    name: "interactionCreate",

    async execute(interaction, client) {

        if (!interaction.isModalSubmit()) return;

        if (interaction.customId === "team-scrim-details") {

            const { guild, channel, user } = interaction;

            let ownName = interaction.fields.getTextInputValue("scrim-own-name");
            let ownRank = interaction.fields.getTextInputValue("scrim-own-rank");
            let datum = interaction.fields.getTextInputValue("scrim-datum");
            let uhrzeit = interaction.fields.getTextInputValue("scrim-uhrzeit");

            const ticketID = channel.name.slice(8, 12);

            const scrimID = channel.id + "-" + ticketID;

            let scrims = await scrimsDB.findOne({ ScrimID: scrimID });

            console.log(ownName, ownRank, datum, uhrzeit);

            console.log("Scrim Team : "+ scrims.ScrimTeam)

            const embed = new EmbedBuilder()
                .setTitle("Status")
                .setDescription("Dein Scrim wurde erfolgreich erstellt! Hier kannst du den Status einsehen!")
                .addFields(
                    { name: "**Team Name** : ", value: ownName, inline: true },
                    { name: "**Team Rank** : ", value: ownRank, inline: true },
                    { name: "**Scrim gegen** : ", value: scrims.ScrimTeam, inline: true },
                    { name: "**Datum** : ", value: datum, inline: true },
                    { name: "**Uhrzeit** :" , value: uhrzeit, inline: true },
                    { name: "**Status** : ", value: "In Bearbeitung", inline: true },
                )
                .setColor(0x0085c1)
                .setAuthor({ name: 'Team Synix | Scrim Anfrage' })
                .setFooter({ text: 'Made with ❤️ for Team Synix by .zeen' })
                .setTimestamp();

            const buttons = new ActionRowBuilder().addComponents(
                new ButtonBuilder().setCustomId("scrim-decline-gegner").setLabel("Absagen").setStyle(ButtonStyle.Primary).setEmoji("❌"),
            )

            client.channels.fetch(scrims.TicketChannelID).then(channel => {
                channel.messages.delete(scrims.SelectMenuMessageID);
            });

            const m = await channel.send({ embeds: [embed], components: [buttons], fetchReply: true });

            scrims.MessageIDticket = m.id;

            await interaction.reply({ content: "Deine Scrimanfrage wurde erfolgreich erstellt!", ephemeral: true });

            scrims.gegnerTeam = ownName;
            scrims.gegnerRank = ownRank;
            scrims.Datum = datum;
            scrims.Uhrzeit = uhrzeit;
            scrims.Status = "In Bearbeitung";

            let team = scrims.ScrimTeam;

            await scrims.save();

            await notifyTeam(interaction, scrims.ScrimTeam, scrimID);
        }
    }
}