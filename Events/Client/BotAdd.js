const { Client, Guild, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType } = require("discord.js")
const ms = require("ms")

module.exports = {
    name: "guildCreate",

    /**
     * @param {Guild} guild
     * @param {Client} client
     */
    async execute(guild, client) {

        const { name, members, channels } = guild

        let channelToSend

        channels.cache.forEach(channel => {

            if (channel.type === ChannelType.GuildText && !channelToSend && channel.permissionsFor(members.me).has("SendMessages")) channelToSend = channel

        })

        if (!channelToSend) return

        const Embed = new EmbedBuilder()
            .setColor(client.color)
            .setAuthor({ name: name, iconURL: guild.iconURL() })
            .setDescription("Hey, this is **zeenbot**! Thanks for inviting me to your server!")
            .setFooter({ text: "Developed by DJKnaeckebrot#0001" })
            .setTimestamp()

        const Row = new ActionRowBuilder().addComponents(

            new ButtonBuilder()
                .setStyle(ButtonStyle.Link)
                .setURL("https://discord.com/api/oauth2/authorize?client_id=1057954071035781240&permissions=8&scope=bot%20applications.commands")
                .setLabel("Invite Me"),

            new ButtonBuilder()
                .setStyle(ButtonStyle.Link)
                .setURL("http://localhost:8000")
                .setLabel("Dashboard"),

        )

        channelToSend.send({ embeds: [Embed], components: [Row] })

    }
}