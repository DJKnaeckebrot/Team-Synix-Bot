/**
 * @file Sample help command with slash command.
 * @author Naman Vrati & Thomas Fournier
 * @since 3.0.0
 * @version 3.3.0
 */

// Deconstructed the constants we need in this file.

const { SlashCommandBuilder } = require("discord.js");

/**
 * @type {import('../../../typings').SlashInteractionCommand}
 */
module.exports = {
	// The data needed to register slash commands to Discord.

	data: new SlashCommandBuilder()
		.setName("clip")
		.setDescription(
			"Close/Open the Clip of the week channel"
		)
		.addSubcommand(subcommand => subcommand.setDescription("Close the Clip of the week channel").setName("close").addChannelOption(option => option.setName('clipchannel').setDescription('Clip channel')))
		.addSubcommand(subcommand => subcommand.setDescription("Open the Clip of the week channel").setName("open").addChannelOption(option => option.setName('clipchannel').setDescription('Clip channel')))
		.addSubcommand(subcommand => subcommand.setDescription("Announce the Clip of the week winner").setName("winner").addChannelOption(option => option.setName('clipchannel').setDescription('Clip channel')).addUserOption(option => option.setName('winner').setDescription('Winner'))),

	async execute(interaction) {
		
		// Close channel

		const subCommand = interaction.options.getSubcommand();

		const channel = interaction.options.getChannel('clipchannel');

		if (subCommand === 'close') {
			channel.permissionOverwrites.edit('784774303714508820', { SendMessages: false });

			//channel.send({ embeds: [closeEmbed] })

			channel.send("**Hallo** <@&784774303714508820>,\ndie Einsendungen für den Clip der Woche ist nun gesperrt. Nun habt ihr die Möglichkeit mit einem Daumen hoch, eure favorisierten Clips zu voten. \n \n**Das Voting endet am (Sonntag um 23:59).** \n**Daraufhin wird der Gewinner bekanntgegeben.** \n \nDer Gewinner wird auf Twitter repostet und erhält 30.000 Credits in unserem eigenen Gamble Channel. \n \n**Wir wünschen allen Einsendern viel Glück.** \n- <@&1004207195866546376>")
			
			interaction.reply({ content: 'Clip channel closed!', ephemeral: true });
		}



		if (subCommand === 'open') {
			// delete all messages in the channel

			await channel.bulkDelete('100', true);

			channel.permissionOverwrites.edit('784774303714508820', { SendMessages: true });
			channel.send("**Liebe** <@&784774303714508820>,\nwir präsentieren euch nun unseren Channel für den **Clip der Woche**. \nGrundsätzlich bietet euch der Channel die Möglichkeit wöchentlich einen von euch erspielten Clip mit der Community zu teilen. \n \nEgal ob ein grandioses Tor, atemberaubender Pass oder eine Parade, die ihresgleichen sucht, zeigt sie der Community um etwas kleines zu gewinnen. \n \n**Hier einmal die Regeln für die Teilnahme:** \n \n- Es werden nur Clips gestattet, die mit \"**Gif Your Game**\" aufgenommen wurden \n- **Jeder** darf nur maximal zwei Clips pro Woche einsenden \n- Es muss sich dabei um eine Szene aus dem Spiel heraus handeln (**kein Bot-Game, kein Freeplay-Training**) \n- Man darf seinen eigenen Clip nicht voten \n \n**Einsendungen beginnen immer Montags.** \nFreitags wird dann die Einsendung von Clips **blockiert** und das **Voting** beginnt. \nDas Voting wird dann am **Sonntag** um **23:59 Uhr** beendet und der Sieger wird angekündigt. \nDer Gewinner wird mit Clip auf unserem Twitter Kanal veröffentlicht. \nAußerdem erhält er **30.000 Credits** für unseren eigenen Gamble Channel <#928408663029342299>. \n \nWir würden uns sehr über eure Teilnahme \nfreuen und wünschen euch allen viel Glück! \n \n **Liebe Grüße** \n- <@&1004207195866546376>")
			interaction.reply({ content: 'Clip channel opened!', ephemeral: true });			
		}

		if (subCommand === 'winner') {
			const winner = interaction.options.getUser('winner');

			channel.send(`**Liebe** <@&784774303714508820>,\nhiermit geben wir den Gewinner von Clip der Woche für diese Woche bekannt.\n \n**Gewinner:** <@${winner.id}>\n**Preis:** 30.000 Gamble-Credits \n \n Wir bedanken uns für eure zahlreichen Einreichungen, viel Glück beim nächsten Mal 🙂 \n \n**Liebe Grüße** \n- <@&1004207195866546376>`)
			interaction.reply({ content: 'Winner announced', ephemeral: true });
		}


	},
};
