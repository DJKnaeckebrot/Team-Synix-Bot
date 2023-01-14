const {
    ComponentType,
    EmbedBuilder,
    SlashCommandBuilder,
    ActionRowBuilder,
    SelectMenuBuilder,
    StringSelectMenuBuilder
} = require("discord.js");

module.exports = {
    name: "help",
    description: "Get a list of all the commands form the discord bot.",
    usage: "/help",
    parameter: "",
    category: "Information",
    premium: false,

    async execute(interaction, client) {
        const directories = [...new Set(client.commands.map((cmd) => cmd.category))];

        //console.log(directories);

        const emojis = {
            community: "🌎",
            content: "📜",
            developer: "👨‍💻",
            economy: "💰",
            giveaway: "🎉",
            information: "ℹ️",
            moderation: "🛠️",
            music: "🎵",
            owner: "👑",
            roles: "🎭",
            tickets: "🎟️",
            utility: "🔧",
        };

        const formatString = (str) =>
            `${str[0].toUpperCase()}${str.slice(1).toLowerCase()}`;

        const categories = directories.map((dir) => {
            const getCommands = client.commands.filter((cmd) => cmd.category === dir).map((cmd) => {
                return {
                    name: cmd.name || "No name",
                    description: cmd.description || "No description",
                };
            });

            return {
                directory: formatString(dir),
                commands: getCommands,
            };
        });

        const embed = new EmbedBuilder().setDescription(
            "Please choose a category in the dropdown menu"
        );

        const components = (state) => [
            new ActionRowBuilder().addComponents(
                new StringSelectMenuBuilder()
                    .setCustomId("help-menu")
                    .setPlaceholder("Please select a category")
                    .setDisabled(state)
                    .addOptions(
                        categories.map((cmd) => {
                            return {
                                label: cmd.directory,
                                value: cmd.directory.toLowerCase(),
                                description: `Commands from ${cmd.directory} category.`,
                                emoji: emojis[cmd.directory.toLowerCase() || null],
                            };
                        })
                    )
            ),
        ];

        const initialMessage = await interaction.reply({
            embeds: [embed],
            components: components(false),
        });

        const filter = (interaction) =>
            interaction.user.id === interaction.member.id;

        const collector = interaction.channel.createMessageComponentCollector({
            filter,
            componentType: ComponentType.SelectMenu,
        });

        collector.on("collect", (interaction) => {
            const [directory] = interaction.values;
            const category = categories.find(
                (x) => x.directory.toLowerCase() === directory
            );

            const categoryEmbed = new EmbedBuilder()
                .setTitle(`${formatString(directory)} commands`)
                .setDescription(
                    `A list of all the commands categorized under ${directory}`
                )
                .addFields(
                    category.commands.map((cmd) => {
                        return {
                            name: `\`${cmd.name}\``,
                            value: cmd.description,
                            inline: true,
                        };
                    })
                );

            interaction.update({ embeds: [categoryEmbed] });
        });

        collector.on("end", () => {
            initialMessage.edit({ components: components(true) });
        });
    },
};