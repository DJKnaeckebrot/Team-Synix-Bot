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

            if (interaction.customId === "scrim-gegner-accept") {

                console.log("Interaction Channel: " + channel.id);

                const scrims = await scrimsDB.findOne({TicketChannelID: channel.id});

                scrims.GegnerTeamStatus = true;

                await scrims.save();

                const lobbyName = channel.name.slice(1, channel.name.length);

                const lobbyPassword = scrims.ScrimTeam;

                scrims.LobbyName = lobbyName;
                scrims.LobbyPassword = lobbyPassword;

                await scrims.save();

                const embedGegner = new EmbedBuilder()
                    .setTitle("Scrim bestätigt!")
                    .setDescription("Dein Scrim wurde angenommen! Du findest alle Details unten.")
                    .addFields(
                        {name: "**Euer Scrim gegen**", value: scrims.ScrimTeam, inline: true},
                        {name: "**Datum** : ", value: scrims.Datum, inline: true},
                        {name: "**Uhrzeit** :", value: scrims.Uhrzeit, inline: true},
                        {name: "Lobby Name", value: lobbyName, inline: true},
                        {name: "Lobby Passwort", value: lobbyPassword, inline: true},
                    )
                    .setColor("Green")
                    .setAuthor({name: ' Team Synix | Scrim Anfrage'})
                    .setFooter({text: 'made with ❤️ by Synix'})
                    .setTimestamp();

                const gegnerButtons = new ActionRowBuilder().addComponents(
                    new ButtonBuilder().setCustomId("scrim-decline-gegner").setLabel("Absagen").setStyle(ButtonStyle.Primary).setEmoji("❌"),
                )

                const gegnerContent = `${guild.roles.everyone}`;

                const ticketChannel = guild.channels.cache.get(scrims.TicketChannelID);

                ticketChannel.messages.fetch(scrims.MessageIDticket).then(message => message.edit({embeds: [embedGegner], components: [gegnerButtons], content: gegnerContent}));

                const embedTeam = new EmbedBuilder()
                    .setTitle("Scrim bestätigt!")
                    .setDescription("Der Scrim wurde von dem Gegner nochmal bestätigt! Du findest alle Details unten.")
                    .addFields(
                        {name: "**Euer Scrim gegen**", value: scrims.gegnerTeam, inline: true},
                        {name: "**Rank**", value: scrims.gegnerRank, inline: true},
                        {name: "**Datum** : ", value: scrims.Datum, inline: true},
                        {name: "**Uhrzeit** :", value: scrims.Uhrzeit, inline: true},
                        {name: "Lobby Name", value: lobbyName, inline: true},
                        {name: "Lobby Passwort", value: lobbyPassword, inline: true},
                    )
                    .setColor("Green")
                    .setAuthor({name: 'Team Synix | Scrim Anfrage'})
                    .setFooter({text: 'Made with ❤️ for Team Synix by .zeen'})
                    .setTimestamp();

                const teamButtons = new ActionRowBuilder().addComponents(
                    new ButtonBuilder().setCustomId("scrim-decline-team").setLabel("Absagen").setStyle(ButtonStyle.Primary).setEmoji("❌"),
                )
                const teamContent = `${guild.roles.everyone}`;

                console.log("Team ChannelID: " + scrims.TeamChannelID);

                let teamChannel = guild.channels.cache.get(scrims.TeamChannelID);

                console.log("Team Channel: " + teamChannel);

                teamChannel.messages.fetch(scrims.MessageID).then(message => message.edit({embeds: [embedTeam], components: [teamButtons], content: teamContent}));

                await interaction.reply({content: "Du hast den Scrim angenommen!", ephemeral: true});
            }
    }
}