/**
 * @file Sample ping command
 * @author Naman Vrati
 * @since 1.0.0
 * @version 3.2.2
 */

/**
 * @type {import('../../typings').LegacyCommand}
 */
module.exports = {
	name: "ping",
	// Refer to typings.d.ts for available properties.

	// eslint-disable-next-line no-unused-vars
	execute(message, args) {
		message.channel.send({ content: "Pong." });
	},
};
