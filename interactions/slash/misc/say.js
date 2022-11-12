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
		.setName("say")
		.setDescription(
			"Says text as an embed"
		)
        .addStringOption(option => option.setName('title').setDescription('Title of embed').setRequired(true))
        .addStringOption(option => option.setName('text').setDescription('Text you want to say').setRequired(true)),

	async execute(interaction) {	

    const title = interaction.options.getString('title');
    const text = interaction.options.getString('text');

    const closeEmbed = new EmbedBuilder()
			.setColor(0x0085c1)
			.setFooter({ text: 'Made with ❤️ for Team Synix by .zeen'})
			.setTitle(title)
			.setAuthor({ name: 'Team Synix Mangement Team' })
			.setDescription(text)

    interaction.reply({ embeds: [closeEmbed] })
		

	},
};
