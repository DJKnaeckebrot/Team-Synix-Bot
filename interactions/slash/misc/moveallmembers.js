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
		.setName("moveallmembers")
		.setDescription(
			"Pulls all members into your voice channel"
		)
        .addChannelOption(option => option.setName('channel1').setDescription('Name of the first lobby you want to move'))
		.addChannelOption(option => option.setName('channel2').setDescription('Name of the second lobby you want to move')),


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

		// if (!interaction.member.permissions.has(PermissionsBitField.Flags.MoveMembers)) return interaction.reply({ content: 'You do not have permissions to use this command!', ephemeral: false });

        // if (!interaction.member.permissions.has("MANAGE_CHANNELS")) return interaction.reply('Not allowed to manage channels');

        const targetChannel1 = interaction.options.getChannel('channel1');
		const targetChannel2 = interaction.options.getChannel('channel2');

        const sendersChannel = interaction.member.voice.channel;

		moveMembers(targetChannel1);

		setTimeout(function(){
			moveMembers(targetChannel2);
		}, 3000);

		// new Promise(resolve => setTimeout(resolve, 3000));	

		interaction.reply({ content: 'All users have been moved!', ephemeral: true });

		function moveMembers(targetChannel){
			for (const [memberID, member] of targetChannel.members) {
				member.voice.setChannel(sendersChannel).then(() => console.log(`Moved ${member.user.tag}.`)).catch(console.error)
			}
		}

	},
};
