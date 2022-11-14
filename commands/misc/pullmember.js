/**
 * @file Dynamic help command
 * @author Naman Vrati
 * @since 1.0.0
 * @version 3.3.0
 */

// Deconstructing prefix from config file to use in help command
//const { prefix } = require("../../config.json");
require("dotenv").config();

/**
 * @type {import('../../typings').LegacyCommand}
 */
module.exports = {
	name: "pullmember",
	description: "Pulls a member into your voice channel",
	aliases: ["pull"],
	usage: "[command name] @MEMBER",
	cooldown: 0,

	// eslint-disable-next-line no-unused-vars
	execute(message, args) {
		// eslint-disable-next-line no-unused-vars
		const { commands } = message.client;

		if (!message.member.permissions.has("MANAGE_CHANNELS")) return message.reply("No Permissions!");

        const member = message.mentions.members.first()
        if (!member) return message.reply('Please mention a member');
        if (!member.voice.channel) return message.reply('The mentioned member is not in a voice channel!');
        if (!message.member.voice.channel) return message.reply('Please join a voice channel!');

        member.voice.setChannel(message.member.voice.channel);
        message.channel.send('Member has been moved!');
	},
};
