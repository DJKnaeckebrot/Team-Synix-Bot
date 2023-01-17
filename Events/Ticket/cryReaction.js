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

        if (interaction.customId === "team-ack-okkk") {

            interaction.reply({ content: "https://media.giphy.com/media/l378giAZgxPw3eO52/giphy.gif", ephemeral: true });

        }
    }
}