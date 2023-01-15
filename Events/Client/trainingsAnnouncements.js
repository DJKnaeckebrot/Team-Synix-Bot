const { Client, EmbedBuilder } = require("discord.js")
const ms = require("ms")
const mongoose = require("mongoose")
const mongodbURL = process.env.MONGODBURL
const cron = require('cron');
const moment = require('moment');
const trainingsEmbedDB = require("../../Structures/Schemas/TrainingsEmbed");


module.exports = {
    name: "ready",
    once: true,

    /**
     * @param {Client} client
     */
    async execute(client) {

        const { user, ws } = client

        console.log(`Setting up cron jobs for training announcements`);

        let scheduleTrainings = new cron.CronJob('00 36 12 * * *', () => {

            console.log('Starting cron job');

            // This runs every day at 10:30:00, you can do anything you want
            // Specifing your guild (server) and your channel
            const guild = client.guilds.cache.get('784401964293292052');
            const channel = guild.channels.cache.get('1040987991650357299');

            var d = new Date();

            var currentDay = d.getDay();

            console.log(`Current day is ${currentDay}`);

            var newTimeFormat;

            // console.log('Current day: ' + currentDay);

            if (currentDay === 2 || currentDay === 4 || currentDay === 0){
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
                    case 0:
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

}

function getNextDayOfTheWeek(dayName, excludeToday = true, refDate = new Date()) {
    const dayOfWeek = ["sun","mon","tue","wed","thu","fri","sat"] .indexOf(dayName.slice(0,3).toLowerCase());
    if (dayOfWeek < 0) return;
    // (refDate.setHours(0,0,0,0);
    refDate.setDate(refDate.getDate() + +!!excludeToday +
        (dayOfWeek + 7 - refDate.getDay() - +!!excludeToday) % 7);
    return refDate;
}

async function sendTrainingAnnouncement(newTimeFormat, guild, channel, day) {
    console.log(`Starting new sending process for ${day}'s training`);
    const time = newTimeFormat;

    let trainingsEmbedData = await trainingsEmbedDB.findOne({ GuildID: "784401964293292052" });

    console.log(`Starting delete of old messages`);
    await channel.bulkDelete('5', true);

    // console.log(`Got data from database ${trainingsEmbedData}`);

    const embedTitle = "Am " + day + ", den " + time + " um 19 Uhr";

    trainingsEmbedData.Embed.embed.title = embedTitle;

    trainingsEmbedData.save().catch(err => console.log(err));

    // const trainingEmbed = new EmbedBuilder()
    //     .setColor(0x0085c1)
    //     .setFooter(trainingsEmbedData.Embed.embed.footer)
    //     .setTitle("Am " + day + ", den " + time + " um 19 Uhr")
    //     .setThumbnail(trainingsEmbedData.Embed.embed.thumbnail.url)
    //     .setAuthor(trainingsEmbedData.Embed.embed.author)
    //     .setDescription(trainingsEmbedData.Embed.embed.Description)

    const msEmbed = trainingsEmbedData.Embed.embed;

    console.log(`Starting sending of new message after sleep`);
    Sleep(3000).then(() => {
        console.log(`Sending new message`);
        channel.send({ content: trainingsEmbedData.Embed.content ,embeds: [msEmbed] });
        console.log(`Finished sending process for ${day}'s training`);
    });
}

function Sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}
