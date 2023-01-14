const { Client, ChatInputCommandInteraction, EmbedBuilder} = require("discord.js")
const DB = require("../../Structures/Schemas/PremiumGuild")
const EditReply = require("../../Systems/EditReply")
const welcomeSchema = require("../../Structures/Schemas/Welcome");

module.exports = {
    name: "premium-guild",
    description: "Manages premium system for a guild",
    UserPerms: ["Administrator"],
    category: "Owner",
    options: [
        {
            name: "add",
            description: "Adds premium system to a guild",
            type: 1,
            options: [
                {
                    name: "guild-id",
                    description: "Enter the guild id",
                    type: 3,
                    required: true
                }
            ]
        },
        {
            name: "remove",
            description: "Removes premium system to a guild",
            type: 1,
            options: [
                {
                    name: "guild-id",
                    description: "Enter the guild id",
                    type: 3,
                    required: true
                }
            ]
        }
    ],

    /**
     * @param {Client} client
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction, client) {

        await interaction.deferReply({ ephemeral: true })

        const { options, guild, user } = interaction

        if (user.id !== "424868316398747648") return EditReply(interaction, "❌", `This command is classified!`)

        const Sub = options.getSubcommand()

        switch (Sub) {

            case "add": {

                const Target = options.getString("guild-id")
                if (!client.guilds.cache.has(Target)) return EditReply(interaction, "❌", `This guild doesn't exist in client cache!`)

                let Data = await DB.findOne({ Guild: Target }).catch(err => { })
                if (Data) return EditReply(interaction, "❌", `This guild is already a premium guild!`)

                Data = new DB({
                    Guild: Target
                })

                await Data.save()

                EditReply(interaction, "✅", `${client.guilds.cache.get(Target).name} is now a premium guild`)

                let welcomeData = await welcomeSchema.findOne({ Guild: Target }).catch(err => { })

                if (welcomeData) {
                    const channel = client.channels.cache.get(welcomeData.Channel)

                    const premiumEmbed = new EmbedBuilder()
                    .setTitle("Thank you!")
                    .setColor(client.color)
                    .setDescription(`Thank you for buying premium! \n You now have access to all the premium commands!`)
                    .setTimestamp()
                    .setFooter({ text: `zeenbot`, iconURL: "https://cdn.discordapp.com/attachments/1041329286969294858/1058348553392627723/z-white.png" })
                    .addFields(
                        { name: "Premium Commands", value: "You now can use the following commands:"},
                        { name: "Ticket System", value: "You can use /ticketsetup to setup the ticket system!", inline: true },
                        { name: "Giveaways", value: "You can now use /giveaway to use the giveaway system!", inline: true }
                    )


                    channel.send({ embeds: [premiumEmbed] })
                }

            }
                break;

            case "remove": {

                const Target = options.getString("guild-id")
                if (!client.guilds.cache.has(Target)) return EditReply(interaction, "❌", `This guild doesn't exist in client cache!`)

                let Data = await DB.findOne({ Guild: Target }).catch(err => { })
                if (!Data) return EditReply(interaction, "❌", `This guild is not a premium guild!`)

                await Data.delete()

                EditReply(interaction, "✅", `${client.guilds.cache.get(Target).name} is not a premium guild anymore`)

            }
                break;

        }

    }
}