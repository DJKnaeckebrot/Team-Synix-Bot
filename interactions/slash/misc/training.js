/**
 * @file Sample help command with slash command.
 * @author Naman Vrati & Thomas Fournier
 * @since 3.0.0
 * @version 3.3.0
 */

// Deconstructed the constants we need in this file.

const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");

/**
 * @type {import('../../../typings').SlashInteractionCommand}
 */
module.exports = {
	// The data needed to register slash commands to Discord.

	data: new SlashCommandBuilder()
		.setName("training")
		.setDescription(
			"Makes a training anouncement to the channel"
		)
        .addChannelOption(option => option.setName('training').setDescription('TrainingsChannel'))
        .addStringOption(option => option.setName('tag').setDescription('Tag des Trainings')),

	async execute(interaction) {
		
        // Get Interaction options
        const channel = interaction.options.getChannel('training');
        const tag = interaction.options.getString('tag');

        channel.send('Not ready yet!')
		
        interaction.reply({ content: 'Training updated!', ephemeral: true });			
	},
};
