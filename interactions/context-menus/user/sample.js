/**
 * @file Sample Use Context Menu interaction
 * @author Krish Garg
 * @since 3.0.0
 * @version 3.2.2
 */

/**
 * @type {import('../../../typings').ContextInteractionCommand}
 */

const { PermissionsBitField } = require("discord.js");

module.exports = {
	data: {
		name: "moveMember",
		type: 2, // 2 is for user context menus
	},

	async execute(interaction) {

		if (!interaction.member.permissions.has(PermissionsBitField.Flags.MoveMembers)) return interaction.reply({ content: 'You do not have permissions to use this command!', ephemeral: false });

		const member = interaction.targetUser;

		member.voice.setChannel(interaction.member.voice.channel);

		await interaction.reply({ content: 'User has been moved!', ephemeral: true });
		return;
	},
};
