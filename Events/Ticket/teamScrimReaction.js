const { Client, ActionRowBuilder, InteractionType, MessageComponentInteraction, Events, StringSelectMenuBuilder, ModalBuilder, EmbedBuilder, TextInputBuilder, TextInputStyle, ButtonBuilder, ButtonStyle } = require("discord.js");
const scrimsDB = require("../../Structures/Schemas/scrims.js")
const {messages} = require("../../Structures/config");

module.exports = {
    name: "interactionCreate",

    /**
     * @param {MessageComponentInteraction} interaction
     * @param client
     * @returns {Promise<void>}
     */

    async execute(interaction, client) {

        const {guild, channel, user, type} = interaction;

        if (!interaction.isButton()) return;


        if (interaction.customId === "team-scrim-accept") {

            const scrims = await scrimsDB.findOne({MessageID: interaction.message.id});

            const teamStatus = scrims.Status;

            if (teamStatus !== "In Bearbeitung" && teamStatus !== "Abgelehnt") return interaction.reply({
                content: "Dieser Scrim wurde bereits bearbeitet!",
                ephemeral: true
            });

            if (teamStatus === "In Bearbeitung") {

                const embedTeam = new EmbedBuilder()
                    .setTitle("Du hast den Scrim angenommen!")
                    .setDescription("Du hast den Scrim angenommen! Du findest alle Details unten. Sobald der Gegner den Scrim bestätigt hat, werden die Lobby Daten angezeigt.")
                    .addFields(
                        {name: "**Team Name** : ", value: scrims.gegnerTeam, inline: true},
                        {name: "**Team Rank** : ", value: scrims.gegnerTeam, inline: true},
                        {name: "**Datum** : ", value: scrims.Datum, inline: true},
                        {name: "**Uhrzeit** :", value: scrims.Uhrzeit, inline: true},
                        {name: "**Status** : ", value: "Bestätigt", inline: true},
                    )
                    .setColor("Green")
                    .setAuthor({name: 'Team Synix | Scrim Anfrage'})
                    .setFooter({text: 'Made with ❤️ for Team Synix by .zeen'})
                    .setTimestamp();

                const teamButtons = new ActionRowBuilder().addComponents(
                    new ButtonBuilder().setCustomId("scrim-decline-team").setLabel("Absagen").setStyle(ButtonStyle.Primary).setEmoji("❌"),
                )

                scrims.SynixTeamStatus = true;

                await scrims.save();

                channel.messages.fetch(scrims.MessageID).then(message => message.edit({embeds: [embedTeam], components: [teamButtons]}));

                const embedGegner = new EmbedBuilder()
                    .setTitle("Dein Scrim wurde angenommen!")
                    .setDescription("Unser Team hat deine Anfrage angenommen! Bitte bestätige den Scrim mit dem Button unten um die Lobby details zu erhalten.")
                    .addFields(
                        {name: "**Team Name** : ", value: scrims.gegnerTeam, inline: true},
                        {name: "**Team Rank** : ", value: scrims.gegnerTeam, inline: true},
                        {name: "**Scrim Gegner* : ", value: scrims.ScrimTeam, inline: true},
                        {name: "**Datum** : ", value: scrims.Datum, inline: true},
                        {name: "**Uhrzeit** :", value: scrims.Uhrzeit, inline: true},
                        {name: "**Status** : ", value: "Bestätigt", inline: true},
                    )
                    .setColor("Green")
                    .setAuthor({name: 'Team Synix | Scrim Anfrage'})
                    .setFooter({text: 'Made with ❤️ for Team Synix by .zeen'})
                    .setTimestamp();

                const gegnerButtons = new ActionRowBuilder().addComponents(
                    new ButtonBuilder().setCustomId("scrim-gegner-accept").setLabel("Bestätigen").setStyle(ButtonStyle.Primary).setEmoji("✅"),
                    new ButtonBuilder().setCustomId("scrim-gegner-deny").setLabel("Ablehnen").setStyle(ButtonStyle.Primary).setEmoji("❌"),
                )

                const gegnerContent = `${guild.roles.everyone}`;

                let ticketMessageChannel = client.channels.cache.get(scrims.TicketChannelID);

                console.log("Modifi message in" + ticketMessageChannel.name)

                ticketMessageChannel.messages.fetch(scrims.MessageIDticket).then(message => message.edit({embeds: [embedGegner], components: [gegnerButtons], content: gegnerContent}));

                await interaction.reply({content: "Deine Scrimanfrage wurde erfolgreich bestätigt!", ephemeral: true});

            }

        }

        if (interaction.customId === "team-scrim-decline" || interaction.customId === "scrim-decline-team") {

            // if (teamStatus !== "In Bearbeitung" || teamStatus !== "Abgelehnt") return interaction.reply({
            //     content: "Dieser Scrim wurde bereits bearbeitet!",
            //     ephemeral: true
            // });

            const scrims = await scrimsDB.findOne({MessageID: interaction.message.id});

            const embedTeam = new EmbedBuilder()
                .setTitle("Du hast den Scrim abgelehnt!")
                .setDescription("Du hast den Scrim abgelehnt!")
                .addFields(
                    {name: "**Team Name** : ", value: scrims.gegnerTeam, inline: true},
                    {name: "**Team Rank** : ", value: scrims.gegnerTeam, inline: true},
                    {name: "**Datum** : ", value: scrims.Datum, inline: true},
                    {name: "**Uhrzeit** :", value: scrims.Uhrzeit, inline: true},
                    {name: "**Status** : ", value: "Abgelehnt", inline: true},
                )
                .setColor("Red")
                .setAuthor({name: 'Team Synix | Scrim Anfrage'})
                .setFooter({text: 'Made with ❤️ for Team Synix by .zeen'})
                .setTimestamp();

            scrims.SynixTeamStatus = false;

            await scrims.save();

            let teamMessageChannel = client.channels.cache.get(interaction.channel.id);

            teamMessageChannel.messages.fetch(scrims.MessageID).then(message => message.edit({embeds: [embedTeam]}));

            const embedGegner = new EmbedBuilder()
                .setTitle("Dein Scrim wurde von unserem Team abgelehnt!")
                .setDescription("Scheinbar hat es leider nicht gepasst! Gerne kannst du ein anderes Team auswählen oder deinen Termin ändern!")
                .addFields(
                    {name: "**Team Name** : ", value: scrims.gegnerTeam, inline: true},
                    {name: "**Team Rank** : ", value: scrims.gegnerTeam, inline: true},
                    {name: "**Scrim Gegner* : ", value: scrims.ScrimTeam, inline: true},
                    {name: "**Datum** : ", value: scrims.Datum, inline: true},
                    {name: "**Uhrzeit** :", value: scrims.Uhrzeit, inline: true},
                    {name: "**Status** : ", value: "Abgelehnt", inline: true},
                )
                .setColor("Red")
                .setAuthor({name: 'Team Synix | Scrim Anfrage'})
                .setFooter({text: 'Made with ❤️ for Team Synix by .zeen'})
                .setTimestamp();

            const gegnerContent = `${guild.roles.everyone}`;

            let ticketMessageChannel = client.channels.cache.get(scrims.TicketChannelID);

            ticketMessageChannel.messages.fetch(scrims.MessageIDticket).then(message => message.edit({embeds: [embedGegner], content: gegnerContent}));

            await interaction.reply({content: "Deine Scrimanfrage wurde erfolgreich abgelehnt!", ephemeral: true});

        }
    }
}