/**
 * @file Dynamic help command
 * @author Naman Vrati
 * @since 1.0.0
 * @version 3.3.0
 */

// Deconstructing prefix from config file to use in help command
//const { prefix } = require("./../../config.json");
require("dotenv").config();


/**
 * @type {import('../../typings').LegacyCommand}
 */
module.exports = {
	name: "moveallmembers",
	description: "Moves all members from a channel to your channel",
	aliases: ["commands"],
	usage: "[command name]",
	cooldown: 5,

	// eslint-disable-next-line no-unused-vars
	execute(message, args) {
		// eslint-disable-next-line no-unused-vars
		const { commands } = message.client;

		// If there are no args, it means it needs whole help command.

		if (!message.member.voice.channel) {
            message.reply('Error: Executor of command is not in a Voice Channel.');
            return;
        }

        // const lobby = args[0]
        // const lobbyChannel = message.guild.channels.fetch('1015181219627016202');

        const lobbychannel = message.guild.channels.fetch('1015181219627016202')
        .then(lobbychannel => console.log(`The lobbychannel name is: ${lobbychannel.name}`))
        .catch(console.error);

        const targetchannel = message.guild.channels.fetch('1015181165176569896')
        .then(targetchannel => console.log(`The targetchannel name is: ${targetchannel.name}`))
        .catch(console.error);

        // const targetChannel = message.guild.channels.fetch('1015181165176569896');

        // const targetChannel2 = message.guild.channels.cache.get(1015181189549662208);

        // iterate over all the members in that voice channel and move them to the sender's channel

        const channel2pullFrom = message.guild.channels.cache.get('1015181165176569896');

        channel2pullFrom.members.map((member) => {
            member.voice.setChannel(lobbychannel)
        });

        //for (const [, member] of targetchannel.members) {
        //    member.voice.setChannel('1015181219627016202');
        //}
        message.reply(`Moved all members from ${targetchannel.name} to ${lobbychannel.name}`);
	},
};
