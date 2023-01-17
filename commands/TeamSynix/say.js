const {ApplicationCommandOptionType, EmbedBuilder} = require("discord.js");
module.exports = {
    name: "say",
    description: "Says text as an embed",
    category: "TeamSynix",
    options: [
        {
            name: "title",
            description: "Title of embed",
            type: 3,
            required: true,

        },
        {
            name: "text",
            description: "Text you want to say",
            type: 3,
            required: true,
        },
    ],

    /**
        * @param {ChatInputCommandInteraction} interaction
        * @param {Client} client
        */
    async execute(interaction, client) {

        const title = interaction.options.getString("title");
        const text = interaction.options.getString("text");

        const embed = new EmbedBuilder()
            .setTitle(title)
            .setDescription(text)
            .setColor(0x0085c1)
            .setAuthor({ name: 'Team Synix Mangement Team' })
            .setFooter({ text: 'Made with ❤️ for Team Synix by .zeen'})

        interaction.reply({ embeds: [embed] })

    }
}