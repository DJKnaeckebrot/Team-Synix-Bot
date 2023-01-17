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

        if (!interaction.isButton()) return;

        // const teamStatus = scrims.Status;

        if (interaction.customId === "scrim-decline-team") {

            let scrims = await scrimsDB.findOne({TeamChannelID: interaction.channel.id});

            scrims.SynixTeamStatus = false;

            await scrims.save();

            const embedTeam = new EmbedBuilder()
                .setTitle("Scrim abgesagt!")
                .setDescription("Dein Scrim wurde abgesagt!")
                .setColor("Red")
                .setAuthor({ name: 'Team Synix | Scrim Anfrage' })
                .setFooter({ text: 'Made with ❤️ for Team Synix by .zeen' })
                .setTimestamp();

            const embedGegner = new EmbedBuilder()
                .setTitle("Leider hat unser Team den Scrim abgesagt!")
                .setDescription("Leider hat unser Team den Scrim abgesagt! Du kannst gerne einen neuen Scrim erstellen.")
                .setColor("Red")
                .setAuthor({ name: 'Team Synix | Scrim Anfrage' })
                .setFooter({ text: 'Made with ❤️ for Team Synix by .zeen' })
                .setTimestamp();

            const teamButtons = new ActionRowBuilder().addComponents(
                new ButtonBuilder().setCustomId("team-ack-cancel").setLabel("OK").setStyle(ButtonStyle.Primary).setEmoji("✅"),
            )

            const gegnerButtons = new ActionRowBuilder().addComponents(
                new ButtonBuilder().setCustomId("gegner-ack-cancel").setLabel("OK").setStyle(ButtonStyle.Primary).setEmoji("✅"),
            )

            const teamChannel = guild.channels.cache.get(scrims.TeamChannelID);
            const gegnerChannel = guild.channels.cache.get(scrims.TicketChannelID);

            const teamMessageID = scrims.MessageID;
            const gegnerMessageID = scrims.MessageIDticket;

            await teamChannel.messages.fetch(teamMessageID).then(message => message.edit({ embeds: [embedTeam], components: [teamButtons] }));
            await gegnerChannel.messages.fetch(gegnerMessageID).then(message => message.edit({ embeds: [embedGegner], components: [gegnerButtons] }));

            await interaction.reply({ content: "Du hast den Scrim abgesagt!", ephemeral: true });

        }

        if (interaction.customId === "scrim-decline-gegner") {

            let scrims = await scrimsDB.findOne({TicketChannelID: interaction.channel.id});

            scrims.GegnerTeamStatus = false;

            await scrims.save();

            const embedTeam = new EmbedBuilder()
                .setTitle("Der Gegner hat den Scrim abgesagt!")
                .setDescription("Der Gegner hat den Scrim abgesagt!")
                .setColor("Red")
                .setAuthor({ name: 'Team Synix | Scrim Anfrage' })
                .setFooter({ text: 'Made with ❤️ for Team Synix by .zeen' })
                .setTimestamp();

            const embedGegner = new EmbedBuilder()
                .setTitle("Scrim abgesagt!")
                .setDescription("Dein Scrim wurde abgesagt!")
                .setColor("Red")
                .setAuthor({ name: 'Team Synix | Scrim Anfrage' })
                .setFooter({ text: 'Made with ❤️ for Team Synix by .zeen' })
                .setTimestamp();

            const teamButtons = new ActionRowBuilder().addComponents(
                new ButtonBuilder().setCustomId("team-ack-cancel").setLabel("OK").setStyle(ButtonStyle.Primary).setEmoji("✅"),
            )

            const gegnerButtons = new ActionRowBuilder().addComponents(
                new ButtonBuilder().setCustomId("gegner-ack-cancel").setLabel("OK").setStyle(ButtonStyle.Primary).setEmoji("✅"),
            )

            const teamChannel = guild.channels.cache.get(scrims.TeamChannelID);
            const gegnerChannel = guild.channels.cache.get(scrims.TicketChannelID);

            const teamMessageID = scrims.MessageID;
            const gegnerMessageID = scrims.MessageIDticket;

            await teamChannel.messages.fetch(teamMessageID).then(message => message.edit({ embeds: [embedTeam], components: [teamButtons] }));
            await gegnerChannel.messages.fetch(gegnerMessageID).then(message => message.edit({ embeds: [embedGegner], components: [gegnerButtons] }));

            await interaction.reply({ content: "Du hast den Scrim abgesagt!", ephemeral: true });
        }

        if (interaction.customId === "team-ack-cancel") {

            await interaction.message.delete();

            await interaction.reply({content: "Du hast den Scrim abgesagt!", ephemeral: true});
        }

        if (interaction.customId === "gegner-ack-cancel") {

            await interaction.message.delete();

            interaction.reply({content: "Du hast den Scrim abgesagt!", ephemeral: true});
        }
    }
}