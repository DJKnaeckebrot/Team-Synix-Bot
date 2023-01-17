const { Client, ChatInputCommandInteraction, EmbedBuilder } = require("discord.js")

module.exports = {
    name: "purge",
    description: "Delete a number of messages",
    category: "Moderation",
    UserPerms: ["ManageMessages"],
    options: [{
        name: "amount",
        description: "amount of messages to delete",
        type: 10,
        required: true
    }],

    /**
     *
     * @param {Client} client
     * @param {ChatInputCommandInteraction} interaction
     * @returns
     */

    async execute(interaction, client) {

        const { options } = interaction

        const amount = options.getNumber("amount") ?? 1;

        if (amount > 100) {
            return interaction.reply({
                embeds: [new EmbedBuilder()
                    .setColor(client.color)
                    .setDescription("❌ | The amount must not be higher than 100.")
                ]
            })
        }

        else if (amount <= 0) {
            return interaction.reply({
                embeds: [new EmbedBuilder()
                    .setColor(client.color)
                    .setDescription("❌ | The amount must not be equal or less than zero.")
                ]
            })
        }

        await (interaction.channel.bulkDelete(amount)).then(async () => {
            await interaction.reply({
                embeds: [new EmbedBuilder()
                    .setColor(client.color)
                    .setDescription(`✅ | Successfully deleted ${amount} messages.`)
                ]
            })
        });
    },
};