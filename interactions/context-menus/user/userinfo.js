/**
 * @file Sample Use Context Menu interaction
 * @author Krish Garg
 * @since 3.0.0
 * @version 3.2.2
 */

/**
 * @type {import('../../../typings').ContextInteractionCommand}
 */

const { EmbedBuilder } = require("discord.js");

module.exports = {
	data: {
		name: "userInfo",
		type: 2, // 2 is for user context menus
	},

	async execute(interaction) {

		const { user } = interaction.targetMember;
		const member = 

		console.log(user);

		const infoEmbed = new EmbedBuilder()
			.setColor("BLUE")
			.setTitle(`${user.username}'s Information`)
			.setDescription(`Info from ${interaction.guild.name}`)
			.setThumbnail(user.avatarURL({dynamic: true}))
			.setFooter({ text: 'Made with 💙 for Team Synix by .zen'})
			.setTimestamp()
			.addFields(
				{
					name: "User Info",
					value: "```Username:"+user.username+"\nDiscriminator: #"+user.discriminator+"\nTag: "+user.tag+"\nServer Nickname: "+member.displayName+"\nIs Bot: "+user.bot+"\nID: "+user.id+" ```",
					inline: true
				},
				{
					name: `Member Info`,
					value: "```Joined Server: "+new Date(user.joinedAt).toLocaleDateString()+"\nJoined Discord: "+new Date(user.createdTimestamp).toLocaleDateString()+"```",
					inline: true
				},
				{
					name: `Roles`,
					value: ""+member.roles.cache.map(r => r).join(' | ')+"",
					inline: true
				},


			)

		await interaction.reply({ embeds: [infoEmbed], ephemeral: true });
		return;
	},
};
