const { Client, Partials, Collection, EmbedBuilder } = require("discord.js")
const ms = require("ms")
const { promisify } = require("util")
const { glob } = require("glob")
const PG = promisify(glob)
const Ascii = require("ascii-table")
require("dotenv").config()
const { Channel, GuildMember, Message, Reaction, ThreadMember, User, GuildScheduledEvent } = Partials
const nodes = require("../Systems/Nodes")
const { Manager } = require("erela.js")
const GeneralLogsDB = require("../Structures/Schemas/LogsChannel")
const { DisTube } = require('distube');
const { SoundCloudPlugin } = require('@distube/soundcloud');
const { SpotifyPlugin } = require('@distube/spotify');
const supportDB = require('../Structures/Schemas/SupportRoom')
const featureDB = require('../Structures/Schemas/Features')
const problemDB = require('../Structures/Schemas/ProblemKinder')

const client = new Client({
    intents: 131071,
    partials: [Channel, GuildMember, Message, Reaction, ThreadMember, User, GuildScheduledEvent],
    allowedMentions: { parse: ["everyone", "roles", "users"] },
    rest: { timeout: ms("1m") }
})

const distube = new DisTube(client, {
    searchSongs: 5,
    searchCooldown: 30,
    emptyCooldown: 5,
    leaveOnEmpty: true,
    leaveOnFinish: true,
    leaveOnStop: true,
});

client.color = "Blue"
client.commands = new Collection()

const { DiscordTogether } = require("discord-together")
client.discordTogether = new DiscordTogether(client)

client.player = new Manager({
    nodes,
    send: (id, payload) => {

        let guild = client.guilds.cache.get(id)
        if (guild) guild.shard.send(payload)

    }
})

process.on("unhandledRejection", (reason, p) => {
    const ChannelID = "978359175409184768";
    console.error("Unhandled promise rejection:", reason, p);
    const Embed = new EmbedBuilder()
        .setColor(client.color)
        .setTimestamp()
        .setFooter({ text: "⚠️Anti Crash system" })
        .setTitle("Error Encountered");
    const Channel = client.channels.cache.get(ChannelID);
    if (!Channel) return;
    Channel.send({
        embeds: [
            Embed.setDescription(
                "**Unhandled Rejection/Catch:\n\n** ```" + reason + "```"
            ),
        ],
    });
});

client.on("raw", (d) => client.player.updateVoiceState(d))

const Handlers = ["Events", "Commands", "EventStack", "Errors", "Player"]
    client.voiceGenerator = new Collection();

Handlers.forEach(handler => {

    require(`./Handlers/${handler}`)(client, PG, Ascii)

})

// Support Room Notification
client.on("voiceStateUpdate", async (oldUser, newUser) => {
    let features = await featureDB.findOne({ GuildID: newUser.guild.id })
    if (!features) return;
    if (features.SupportRoom === false) return;

    if (newUser.member.user.bot) return
    if (newUser.member.user.bot) return

    const data = await supportDB.findOne({ GuildID: newUser.guild.id }).catch(err => { })

    if (!data) return

    if (newUser.channel && data.ChannelID.includes(newUser.channel.id)) {
        console.log(`${newUser.member} joined the channel!`);
        const embed = new EmbedBuilder()
            .setTitle("User joined the Support Channel")
            .setDescription(`${newUser.member} joined the voice channel ${newUser.channel}!`)
            .setColor("Purple")
            .setTimestamp()
            .setFooter({ text: "powered by zeenbot", iconURL: "https://cdn.discordapp.com/attachments/1041329286969294858/1058348553392627723/z-white.png" })

        const channel = await newUser.guild.channels.cache.get(data.PingChannel);

        let pings = ""

        for (const id of data.PingRoles) {
            pings += `<@&${id}>`
        }

        if (data.PingRoleStatus) {
            channel.send({ content: pings, embeds: [embed] }); }
        else {
            channel.send({ embeds: [embed] })
        }

    } else if (data.ChannelID.includes(oldUser.channel.id) && newUser.channel === null) {
        console.log(`${oldUser.member} left the channel!`);

    }
});


// Kinder

client.on ("voiceStateUpdate", async (oldState, newState) => {
    let probleme = await problemDB.findOne({ GuildID: newState.guild.id })

    let newUserChannel = newState.channelId
    let oldUserChannel = oldState.channelId

    // if (newState.channelId != "958115138609770506" || newState.channelId != "822100814591164447") return

    if (!probleme) {
        console.log("No Problem Kinder")
        return;
    }

    if (probleme.Status === false) {
        console.log("Features disabled")
        return;
    }

    let problemKinder = probleme.ProblemKinder

    let joinedUser = newState.member.user.tag

    if (!problemKinder.includes(newState.member.id)) {
        return;
    }

    if(problemKinder.includes(newState.member.id)) {
        // Get the members in the voice channel
        let channelMembers = newState.guild.channels.cache.get(newState.channelId).members;
        // Check if any members from the array are in the voice channel
        for(let [memberID, member] of channelMembers) {
            if(problemKinder.includes(memberID) && memberID !== newState.member.id) {
                console.log(`${member.user.tag} is also in the voice channel!`);
                newState.member.timeout(60000, `Du bist den selben Channel gejoint wie ${member.user.tag}`)
                    .then(console.log)
                    .catch(console.error);
                console.log("Timeout user: " + newState.member)
                return;
            }
        }
    }

});


module.exports = client

client.login(process.env.TOKEN)