const { Client, ActionRowBuilder, Events, StringSelectMenuBuilder, ModalBuilder, EmbedBuilder, TextInputBuilder, TextInputStyle } = require("discord.js");
const scrimsDB = require("../../Structures/Schemas/scrims.js")

module.exports = {
    name: "interactionCreate",

    async execute(interaction, client) {
        if (!interaction.isStringSelectMenu()) return;

        if (interaction.customId === "team-scrim") {

            if (interaction.values[0] === "team-synix-extern" || interaction.values[0] === "team-synix-intern" || interaction.values[0] === "team-synix-allgemein") {

                // Check if user that a role and if not return

                if (!interaction.values[0] === "team-synix-allgemein" && !interaction.member.roles.cache.has("790020166187876402")) {
                    return interaction.reply({ content: "https://media.giphy.com/media/8abAbOrQ9rvLG/giphy.gif", ephemeral: true });
                }

                console.log("Team: " + interaction.values[0])

                const { guild, channel, user } = interaction;

                const ticketID = channel.name.slice(8, 12);

                const scrimID = channel.id + "-" + ticketID;

                const scrims = await scrimsDB.findOne({ ScrimID: scrimID });

                scrims.ScrimTeam = interaction.values[0];

                await scrims.save()

                const synixModal = new ModalBuilder()
                    .setTitle("Scrim Details")
                    .setCustomId("team-synix-scrim-details")

                const synixTeam = new TextInputBuilder()
                    .setCustomId("synix-team")
                    .setPlaceholder("Team Synix #Zeen")
                    .setStyle(TextInputStyle.Short)
                    .setLabel("Team Name")

                const synixTime = new TextInputBuilder()
                    .setCustomId("synix-time")
                    .setPlaceholder("19:00")
                    .setStyle(TextInputStyle.Short)
                    .setLabel("Wann wollt ihr spielen?")

                const synixDate = new TextInputBuilder()
                    .setCustomId("synix-date")
                    .setPlaceholder("01.01.2021")
                    .setStyle(TextInputStyle.Short)
                    .setLabel("Wann wollt ihr spielen?")

                const synixRank = new TextInputBuilder()
                    .setCustomId("synix-rank")
                    .setPlaceholder("Gold 1")
                    .setStyle(TextInputStyle.Short)
                    .setLabel("Welchen Rank wollt ihr spielen?")

                const synixTimeRow = new ActionRowBuilder().addComponents(synixTime);
                const synixDateRow = new ActionRowBuilder().addComponents(synixDate);
                const synixRankRow = new ActionRowBuilder().addComponents(synixRank);
                const synixTeamRow = new ActionRowBuilder().addComponents(synixTeam);

                synixModal.addComponents(synixTeamRow, synixDateRow, synixTimeRow, synixRankRow);

                await interaction.showModal(synixModal);
            } else {
                const { guild, channel, user } = interaction;

                const ticketID = channel.name.slice(8, 12);

                const scrimID = channel.id + "-" + ticketID;

                const scrims = await scrimsDB.findOne({ ScrimID: scrimID });

                scrims.ScrimTeam = interaction.values[0];

                await scrims.save()

                const modal = new ModalBuilder()
                    .setCustomId("team-scrim-details")
                    .setTitle("Scrim Details")

                const ownName = new TextInputBuilder()
                    .setCustomId("scrim-own-name")
                    .setPlaceholder("Team XYZ")
                    .setLabel("Euer Team Name")
                    .setStyle(TextInputStyle.Short)

                const ownRank = new TextInputBuilder()
                    .setCustomId("scrim-own-rank")
                    .setPlaceholder("GC-GC1")
                    .setLabel("Euer Team Rank")
                    .setStyle(TextInputStyle.Short)

                const datumInput = new TextInputBuilder()
                    .setCustomId("scrim-datum")
                    .setPlaceholder("01.01.2023")
                    .setLabel("An welchem Datum möchtest du scrimmen?")
                    .setStyle(TextInputStyle.Short)

                const uhrzeitInput = new TextInputBuilder()
                    .setCustomId("scrim-uhrzeit")
                    .setPlaceholder("20:00")
                    .setLabel("An welcher Uhrzeit möchtest du scrimmen?")
                    .setStyle(TextInputStyle.Short)


                const nameRow = new ActionRowBuilder().addComponents(ownName);
                const rankRow = new ActionRowBuilder().addComponents(ownRank);
                const datumRow = new ActionRowBuilder().addComponents(datumInput);
                const uhrzeitRow = new ActionRowBuilder().addComponents(uhrzeitInput);

                modal.addComponents(nameRow, rankRow, datumRow, uhrzeitRow);

                await interaction.showModal(modal);
            }
        }
    }
}