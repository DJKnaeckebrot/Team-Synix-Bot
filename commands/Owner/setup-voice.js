const { Client, ChatInputCommandInteraction, SlashCommandBuilder, PermissionFlagsBits, ChannelType, EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle,
    ApplicationCommandOptionType, } = require('discord.js')

const voiceDB = require('../../Structures/Schemas/VoiceSystem');


module.exports = {
    name: "jointocreate",
    description: "Setup some settings!",
    category: "Information",
    UserPerms: ["Administrator"],
    premium: true,
    options: [
        {
            name: "voice",
            description: "Setup voice configuration",
            type: 1,
            options: [
                {
                    name: "channel",
                    description: "The join to create Channel!",
                    type: ApplicationCommandOptionType.Channel,
                    required: true
                }
            ]
        },
        {
            name: "info",
            description: "Setup voice configuration",
            type: 1
        },
        {
            name: "remove",
            description: "Remove configurations!",
            type: 1,
            options: [
                {
                    name: "configuration",
                    description: "The configuration you want to remove!",
                    type: 3,
                    required: true,
                    choices: [
                        {
                            name: "🔊 Voice",
                            value: "voice"
                        },
                    ]
                }
            ]
        },
    ],

/**
 *
 * @param {ChatInputCommandInteraction} interaction
 * @param {Client} client
 */
async execute(interaction, client) {
    const { options, guild } = interaction;

    const channel = options.getChannel("channel")
    const role = options.getRole("role")
    const type = options.getString("configuration")

    const sub = options.getSubcommand();

    const Response = new EmbedBuilder()
        .setTitle("✨ Setup")
        .setTimestamp(Date.now())
        .setDescription("Here can you see your current settings!")

    switch(sub) {
        case "voice": {
            await voiceDB.findOneAndUpdate(
                {GuildID: guild.id},
                {ChannelID: channel.id},
                {new: true, upsert: true})

            Response.setDescription("✅ Successfully set up the voice system!")
        }
            break;


        case "info": {

            let captchaStatus = '`🔴 Off`'
            let voiceStatus = '`🔴 Off`'
            let modlogStatus = '`🔴 Off`'

            const voiceCheck = await voiceDB.findOne({GuildID: guild.id})
            if(voiceCheck) voiceStatus = '`🟢 On`'

            await Response.addFields([
                {name: '🔊 Voice', value: voiceStatus, inline: true },
            ])
        }
            break;

        case "remove": {
            switch(type) {
                case "voice": {
                    voiceDB.findOneAndDelete({ GuildID: guild.id }, (err) => {
                        if(err) console.error(err)
                    });
                    Response.setDescription("🗑️ Successfully removed the voice system!")
                }
                    break;

            }
        }
    }

    await interaction.reply({embeds: [Response], ephemeral: true})
}
}

function isValidHttpUrl(string) {
    let url;

    try {
        url = new URL(string);
    } catch (_) {
        return false
    }

    return url.protocol === "https:" || url.protocol === "http:";
}