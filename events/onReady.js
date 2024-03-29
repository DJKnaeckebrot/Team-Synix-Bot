/**
 * @file Ready Event File.
 * @author Naman Vrati
 * @since 1.0.0
 * @version 3.2.2
 */

const { EmbedBuilder } = require("discord.js");
require('log-timestamp');

module.exports = {
	name: "ready",
	once: true,

	/**
	 * @description Executes when client is ready (bot initialization).
	 * @param {import('../typings').Client} client Main Application Client.
	 */
	
	execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);

		var pjson = require('../package.json');
		const version = pjson.version;
		const cron = require('cron');
		const moment = require('moment');
		

		client.user.setPresence({ activities: [{ name: `/help | teamsynix.com ${ version }` }], status: 'online' });

		let scheduleTrainings = new cron.CronJob('00 00 14 * * *', () => {

			console.log('Starting cron job');

			// This runs every day at 10:30:00, you can do anything you want
			// Specifing your guild (server) and your channel
			const guild = client.guilds.cache.get('784401964293292052');
			const channel = guild.channels.cache.get('784777527440310282');			

			var d = new Date();

			var currentDay = d.getDay();

			var newTimeFormat;

			// console.log('Current day: ' + currentDay);

			if (currentDay === 2 || currentDay === 4 || currentDay === 6){
				switch (currentDay) {
					case 2:
						var timeTu = getNextDayOfTheWeek("Tuesday", false)
						newTimeFormat = moment(timeTu).format('DD.MM.YYYY');
						sendTrainingAnnouncement(newTimeFormat, guild, channel, "Dienstag");
						console.log('Started cron job with day Tuesday');
						break;
					case 4:
						var timeTh = getNextDayOfTheWeek("Thursday", false)
						newTimeFormat = moment(timeTh).format('DD.MM.YYYY');
						sendTrainingAnnouncement(newTimeFormat, guild, channel, "Donnerstag");
						console.log('Started cron job with day Thursday');
						break;
					case 6:
						var timeSa = getNextDayOfTheWeek("Saturday", false)
						newTimeFormat = moment(timeSa).format('DD.MM.YYYY');
						sendTrainingAnnouncement(newTimeFormat, guild, channel, "Samstag");
						console.log('Started cron job with day Saturday');
						break;
				}
			} else return;

		});

		scheduleTrainings.start();
			
	}

};

function getNextDayOfTheWeek(dayName, excludeToday = true, refDate = new Date()) {
	const dayOfWeek = ["sun","mon","tue","wed","thu","fri","sat"] .indexOf(dayName.slice(0,3).toLowerCase());
	if (dayOfWeek < 0) return;
	// (refDate.setHours(0,0,0,0);
	refDate.setDate(refDate.getDate() + +!!excludeToday + 
					(dayOfWeek + 7 - refDate.getDay() - +!!excludeToday) % 7);
	return refDate;
}

function sendTrainingAnnouncement(newTimeFormat, guild, channel, day) {
	console.log(`Starting new sending process for ${day}'s training`);
	const time = newTimeFormat;

	console.log(`Starting delete of old messages`);
	channel.bulkDelete('5', true);

	const trainingEmbed = new EmbedBuilder()
			.setColor(0x0085c1)
			.setFooter({ text: 'Made with ❤️ for Team Synix by .zeen'})
			.setTitle("Am " + day + ", den " + time + " um 19 Uhr")
			.setThumbnail('https://cdn.discordapp.com/attachments/1013366974455222272/1042907817398505532/1_red.png')
			.setAuthor({ name: 'Training - Aktuell' })
			.setDescription("Wir bitten um zahlreiches Erscheinen. \n Das Training geht von 19 - 20:30 Uhr.")

	console.log(`Starting sending of new message after sleep`);
	Sleep(3000).then(() => {
		console.log(`Sending new message`);
		channel.send({ content: `<@&784850717109256193>  <@&785175565601865728>`,embeds: [trainingEmbed] });
		console.log(`Finished sending process for ${day}'s training`);
	});
}

function Sleep(milliseconds) {
	return new Promise(resolve => setTimeout(resolve, milliseconds));
}
