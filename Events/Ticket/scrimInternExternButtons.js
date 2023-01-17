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


        if (!interaction.customId === "scrim-synix-intern-accept" || !interaction.customId === "scrim-decline-synix") return;

        if (interaction.customId === "scrim-synix-intern-accept") {

            const scrims = await scrimsDB.findOne({MessageID: interaction.message.id});

            let ticketChannel = guild.channels.cache.get(scrims.TicketChannelID);

            const synixModal = new ModalBuilder()
                .setTitle("Scrim Details")
                .setCustomId("scrim-accept-modal")

            const synixTeam = new TextInputBuilder()
                .setCustomId("scrim-accept-team")
                .setPlaceholder("Team Synix #Zeen")
                .setStyle(TextInputStyle.Short)
                .setLabel("Team Name")

            const synixTeamRow = new ActionRowBuilder().addComponents(synixTeam);

            synixModal.addComponents(synixTeamRow);

            await interaction.showModal(synixModal);
        }
    }
}