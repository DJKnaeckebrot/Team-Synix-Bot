const { Client, ActionRowBuilder, Events, StringSelectMenuBuilder, ModalBuilder, EmbedBuilder, TextInputStyle, TextInputBuilder,
    ButtonBuilder, ButtonStyle
} = require("discord.js");
const scrimsDB = require("../../Structures/Schemas/scrims.js")
const { notifyTeam } = require("./functions/scrimFunctions.js")

module.exports = {
    name: "interactionCreate",

    async execute(interaction, client) {

        if (!interaction.isModalSubmit()) return;

        const { channel, guild } = interaction;

        if (interaction.customId === "team-synix-scrim-details") {

            let scrims = await scrimsDB.findOne({ TicketChannelID: interaction.channelId });

            if (!scrims) return interaction.reply({ content: "There was an error finding the scrim in the database.", ephemeral: true });

            let team = interaction.fields.getTextInputValue("synix-team");
            let time = interaction.fields.getTextInputValue("synix-time");
            let date = interaction.fields.getTextInputValue("synix-date");
            let rank = interaction.fields.getTextInputValue("synix-rank");

            if (scrims.ScrimTeam === "team-synix-intern" || scrims.ScrimTeam === "team-synix-allgemein") {

                const captainsChannel = guild.channels.cache.get("964912965834899487");

                const captainRole = guild.roles.cache.get("790020166187876402");

                const embed = new EmbedBuilder()
                    .setTitle("Scrim Anfrage")
                    .setDescription("Eine neue Scrim Anfrage ist eingegangen! Unten stehen die Details!")
                    .addFields(
                        { name: "**Team Name** : ", value: team, inline: true },
                        { name: "**Team Rank** : ", value: rank, inline: true },
                        { name: "**Datum** : ", value: date, inline: true },
                        { name: "**Uhrzeit** : ", value: time, inline: true },
                    )
                    .setColor(0x0085c1)
                    .setAuthor({ name: 'Team Synix | Scrim Anfrage' })
                    .setFooter({ text: 'Made with ❤️ for Team Synix by .zeen' })
                    .setTimestamp();

                const buttons = new ActionRowBuilder().addComponents(
                    new ButtonBuilder().setCustomId("scrim-synix-intern-accept").setLabel("Akzeptieren").setStyle(ButtonStyle.Primary).setEmoji("✅"),
                )

                const m = await captainsChannel.send({ embeds: [embed], components: [buttons], fetchReply: true, content: `<@&${captainRole.id}>` });

                scrims.MessageID = m.id;
                scrims.TeamChannelID = captainsChannel.id;

                await scrims.save().catch(err => console.log(err));

                const ticketEmbed = new EmbedBuilder()
                    .setTitle("Deine Scrimanfrage wurde erfolgreich erstellt!")
                    .setDescription("Hier kannst du den Status einsehen!")
                    .setColor(0x0085c1)
                    .setAuthor({ name: 'Team Synix | Scrim Anfrage' })
                    .setFooter({ text: 'Made with ❤️ for Team Synix by .zeen' })
                    .setTimestamp();

                const ticketButtons = new ActionRowBuilder().addComponents(
                    new ButtonBuilder().setCustomId("scrim-decline-gegner").setLabel("Absagen").setStyle(ButtonStyle.Primary).setEmoji("❌"),
                )

                client.channels.fetch(scrims.TicketChannelID).then(channel => {
                    channel.messages.delete(scrims.SelectMenuMessageID);
                });

                const t = await channel.send({ embeds: [ticketEmbed], components: [ticketButtons], fetchReply: true });

                scrims.MessageIDticket = t.id;

                await scrims.save().catch(err => console.log(err));

                await interaction.reply({ content: "Deine Scrim Anfrage wurde an die Captains geschickt!", ephemeral: true });

            } else if (scrims.ScrimTeam === "team-synix-extern") {

                const suportRole = guild.roles.cache.get("784770518334439426");

                const embed = new EmbedBuilder()
                    .setTitle("Deine Anfrage is eingegangen!")
                    .setDescription("Wir haben deine Scrim anfrage erhalten und ein Supporter wird sich mit dir in Verbindung setzen!")
                    .addFields(
                        { name: "**Team Name** : ", value: team, inline: true },
                        { name: "**Team Rank** : ", value: rank, inline: true },
                        { name: "**Datum** : ", value: date, inline: true },
                        { name: "**Uhrzeit** :" , value: time, inline: true },
                        { name: "**Status** : ", value: "In Bearbeitung", inline: true },
                    )
                    .setColor(0x0085c1)
                    .setAuthor({ name: 'Team Synix | Scrim Anfrage' })
                    .setFooter({ text: 'Made with ❤️ for Team Synix by .zeen' })
                    .setTimestamp();

                const buttons = new ActionRowBuilder().addComponents(
                    new ButtonBuilder().setCustomId("scrim-decline-synix").setLabel("Absagen").setStyle(ButtonStyle.Primary).setEmoji("❌"),
                )

                const m = channel.send({ embeds: [embed], components: [buttons], fetchReply: true, content: `<@&${suportRole.id}>` });

                scrims.MessageIDticket = m.id;

                scrims.save().catch(err => console.log(err));

                await interaction.reply({ content: "Deine Scrim Anfrage wurde an den Support geschickt!", ephemeral: true });
            }
        }
    }
}