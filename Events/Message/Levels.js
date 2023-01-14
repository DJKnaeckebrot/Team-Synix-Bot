const { Client, Message, EmbedBuilder } = require("discord.js")
const levelDB = require("../../Structures/Schemas/Level")

module.exports = {
    name: "messageCreate",

    /**
     * @param {Message} message
     * @param {Client} client
     */
    async execute(message, client) {

        const { author, guild } = message

        if (!guild || author.bot) return

        levelDB.findOne({ Guild: guild.id, User: author.id }, async (err, data) => {

            if (err) throw err

            if (!data) {

                levelDB.create({
                    Guild: guild.id,
                    User: author.id,
                    XP: 0,
                    Level: 0
                })

            }

        })

        const ChannelData = await levelDB.findOne({ Guild: guild.id }).catch(err => { })

        const give = Math.floor(Math.random() * 29) + 1

        const data = await levelDB.findOne({ Guild: guild.id, User: author.id }).catch(err => { })
        if (!data) return

        const requiredXP = data.Level * data.Level * 100 + 100

        if (data.XP + give >= requiredXP) {

            data.XP += give
            data.Level += 1
            await data.save()

            // if (ChannelData) {

                const Channel = guild.channels.cache.get(data.Channel)
                if (!Channel) return

                Channel.send({
                    content: `${author}`,
                    embeds: [
                        new EmbedBuilder()
                            .setColor(client.color)
                            .setDescription(`**GG** ${message.author}, you just leveled up to level **${userData.level}**!`)
                    ]
                })

            // }

        } else {

            data.XP += give
            await data.save()

        }

    }
}