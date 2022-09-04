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
		.setName("clip")
		.setDescription(
			"Close/Open the Clip of the week channel"
		)
        .addSubcommand(subcommand => subcommand.setDescription("Close the Clip of the week channel").setName("close").addChannelOption(option => option.setName('clipchannel').setDescription('Clip channel')))
		.addSubcommand(subcommand => subcommand.setDescription("Open the Clip of the week channel").setName("open").addChannelOption(option => option.setName('clipchannel').setDescription('Clip channel'))),

	async execute(interaction) {
		
		const closeEmbed = new EmbedBuilder()
			.setColor(0x0085c1)
			.setFooter({ text: 'Made with 💙 for Team Synix by .zen'})
			.setTitle("Clip der Woche")
			.setAuthor({ name: 'Team Synix Mangement Team' })
			.setDescription("**Hallo** <@&784774303714508820>,\n die Einsendungen für den Clip der Woche ist nun gesperrt. Nun habt ihr die Möglichkeit mit einem Daumen hoch, eure favorisierten Clips zu voten. \n \n **Das Voting endet am (Sonntag um 23:59).** \n **Daraufhin wird der Gewinner bekanntgegeben.** \n \n Der Gewinner wird auf Twitter repostet und erhält 30.000 Credits in unserem eigenen Gamble Channel. \n \n **Wir wünschen allen Einsendern viel Glück.** \n - <@&1004207195866546376>")

		const openEmbed = new EmbedBuilder()
			.setColor(0x0085c1)
			.setFooter({ text: 'Made with 💙 for Team Synix by .zen'})
			.setTitle("Clip der Woche")
			.setAuthor({ name: 'Team Synix Mangement Team' })
			.setDescription("**Liebe** <@&784774303714508820>,\n wir präsentieren euch nun unseren Channel für den **Clip der Woche**. \n Grundsätzlich bietet euch der Channel die Möglichkeit wöchentlich einen von euch erspielten Clip mit der Community zu teilen. \n \n Egal ob ein grandioses Tor, atemberaubender Pass oder eine Parade, die ihresgleichen sucht, zeigt sie der Community um etwas kleines zu gewinnen. \n \n **Hier einmal die Regeln für die Teilnahme:** \n \n - Es werden nur Clips gestattet, die mit \"**Gif Your Game**\" aufgenommen wurden \n - **Jeder** darf nur maximal zwei Clips pro Woche einsenden \n - Es muss sich dabei um eine Szene aus dem Spiel heraus handeln (**kein Bot-Game, kein Freeplay-Training**) \n - Man darf seinen eigenen Clip nicht voten \n \n **Einsendungen beginnen immer Montags.** \n Freitags wird dann die Einsendung von Clips **blockiert** und das **Voting** beginnt. \n Das Voting wird dann am **Sonntag** um **23:59 Uhr** beendet und der Sieger wird angekündigt. \n Der Gewinner wird mit Clip auf unserem Twitter Kanal veröffentlicht. \n Außerdem erhält er **30.000 Credits** für unseren eigenen Gamble Channel <#928408663029342299>. \n Wir würden uns sehr über eure Teilnahme \n freuen und wünschen euch allen viel Glück! \n - <@&1004207195866546376>")

		// Close channel

		const subCommand = interaction.options.getSubcommand();

		const channel = interaction.options.getChannel('clipchannel');

		if (subCommand == 'close') {
			channel.permissionOverwrites.edit('784774303714508820', { SendMessages: false });
			//channel.permissionOverwrites.edit('875829974320439296', { ADD_REACTIONS: false });
			channel.send({ embeds: [closeEmbed] })		
			
			interaction.reply({ content: 'Clip channel closed!', ephemeral: true });
		}



		if (subCommand == 'open') {

			// delete all messages in the channel

			await channel.bulkDelete('100', true);

			channel.permissionOverwrites.edit('784774303714508820', { SendMessages: true });
			//channel.permissionOverwrites.edit('875829974320439296', { ADD_REACTIONS: false });
			channel.send({ embeds: [openEmbed] })
			interaction.reply({ content: 'Clip channel opened!', ephemeral: true });			
		}


	},
};
