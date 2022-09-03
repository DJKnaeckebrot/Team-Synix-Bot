/**
 * @file Sample help command with slash command.
 * @author Naman Vrati & Thomas Fournier
 * @since 3.0.0
 * @version 3.3.0
 */

// Deconstructed the constants we need in this file.

const { EmbedBuilder, SlashCommandBuilder, PermissionsBitField } = require("discord.js");

/**
 * @type {import('../../../typings').SlashInteractionCommand}
 */
module.exports = {
	// The data needed to register slash commands to Discord.

	data: new SlashCommandBuilder()
		.setName("movemember")
		.setDescription(
			"Pulls a member into your voice channel"
		)
		.addUserOption(option => option.setName('member').setDescription('The name of the member to pull into your voice')),

	async execute(interaction) {
		/**
		 * @type {string}
		 * @description The "command" argument
		 */
		let name = interaction.options.getString("command");

		/**
		 * @type {EmbedBuilder}
		 * @description Help command's embed
		 */
		const helpEmbed = new EmbedBuilder().setColor("Random");

        //if (!interaction.member.roles.cache.has('1014675330730033162') || !interaction.member.roles.cache.has('1004207195866546376')) return interaction.reply({ content: 'You do not have permissions to use this command!', ephemeral: false });

		if (!interaction.member.permissions.has(PermissionsBitField.Flags.MoveMembers)) return interaction.reply({ content: 'You do not have permissions to use this command!', ephemeral: false });

        const member = interaction.options.getMember('member');

        // if (!member.voice.channel) return interaction.reply({ content: 'The mentioned member is not in a voice channel!', ephemeral: true });

        // if (!interaction.member.voice.channel) return interaction.reply({ content: 'Please join a voice channel!', ephemeral: true });

        member.voice.setChannel(interaction.member.voice.channel);
        interaction.reply({ content: 'User has been moved!', ephemeral: true });

	},
};
