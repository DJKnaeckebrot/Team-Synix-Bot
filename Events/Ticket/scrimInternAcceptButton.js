const { Client, ActionRowBuilder, InteractionType, MessageComponentInteraction, Events, StringSelectMenuBuilder, ModalBuilder, EmbedBuilder, TextInputBuilder, TextInputStyle, ButtonBuilder, ButtonStyle } = require("discord.js");
const scrimsDB = require("../../Structures/Schemas/scrims.js")
const {messages} = require("../../Structures/config");

module.exports = {
    name: "interactionCreate",

    /**
     * @param {MessageComponentInteraction} interaction
     */

    async execute(interaction) {

        const {guild, channel, user, type} = interaction;

        if (!interaction.isModalSubmit()) return;

        if (interaction.customId === "scrim-accept-modal") {

            const scrims = await scrimsDB.findOne({ MessageID: interaction.message.id });

            // console.log("Interaction Message ID : "+ interaction.message.id);

            //console.log(scrims);

            let ticketChannel = guild.channels.cache.get(scrims.TicketChannelID);

            // console.log("Ticket Channel : " + ticketChannel)

            // console.log("Ticket Channel ID : " + scrims.TicketChannelID)

            const team = interaction.fields.getTextInputValue("scrim-accept-team");

            const embed = new EmbedBuilder()
                .setTitle("Dein Scrim wurde angenommen!")
                .setDescription(`Dein Scrim wurde von ** ${team} ** angenommen! \n **ACHTUNG : WENN DU OK KLICKST GEHT DAS HIER WEG! **`)
                .setColor("Green")
                .setTimestamp()
                .setAuthor({ name: 'Team Synix | Scrim Anfrage' })
                .setFooter({ text: 'Made with ❤️ for Team Synix by .zeen' });

            const buttons = new ActionRowBuilder().addComponents(
                new ButtonBuilder().setCustomId("team-ack-cancel").setLabel("OK (ICH LÖSCHE ALLES)").setStyle(ButtonStyle.Primary).setEmoji("✅"),
            )

            ticketChannel.messages.fetch(scrims.MessageIDticket).then(message => message.edit({ embeds: [embed], components: [buttons] }));

            const embed2 = new EmbedBuilder()
                .setTitle("Der Scrim ist schon vergeben!")
                .setDescription(`Der Scrim ist schon vergeben!`)
                .setColor("Red")
                .setTimestamp()
                .setAuthor({ name: 'Team Synix | Scrim Anfrage' })
                .setFooter({ text: 'Made with ❤️ for Team Synix by .zeen' });

            const buttons2 = new ActionRowBuilder().addComponents(
                new ButtonBuilder().setCustomId("team-ack-okkk").setLabel("OK").setStyle(ButtonStyle.Primary).setEmoji("✅"),
            )

            let teamChannel = interaction.channel;

            teamChannel.messages.fetch(scrims.MessageID).then(message => message.edit({ embeds: [embed2], components: [buttons2] }));

            const user = interaction.user;

            await ticketChannel.permissionOverwrites.edit(user.id, { ViewChannel: true, SendMessages: true, ReadMessageHistory: true, AddReactions: true });

            ticketChannel.send(`<@${user.id}>, du wurdest zum Ticket hinzugefügt! Bitte macht gemeinsam die Lobbydaten aus! Viel Spaß!`);

            await interaction.reply({ content: "Der Scrim wurde angenommen!", ephemeral: true });

        }
    }
}