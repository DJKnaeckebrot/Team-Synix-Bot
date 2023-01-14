const {
  SlashCommandBuilder,
  EmbedBuilder,
  Client,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");
const SuggestDB = require("../../Structures/Schemas/SuggestDB");

module.exports = {
  name: "suggest",
  description: "Create a suggestion",
  category: "Utility",
  options: [
    {
      name: "type",
      description: "Whats the type of your suggestion.",
      type: 3,
      required: true,
      choices: [
        {
            name: "Command",
            type: 3,
            value: "command",
        },
        {
            name: "Event",
            type: 3,
            value: "event",
        },
        {
            name: "System",
            type: 3,
            value: "system",
        },
        {
            name: "Other",
            type: 3,
            value: "other",
        }
      ]
    },
    {
      name: "suggestion",
      description: "Name your suggestion.",
      type: 3,
      required: true
    },
    {
      name: "description",
      description: "Describe your suggestion.",
      type: 3,
      required: true
    }
  ],

  async execute(interaction, client) {
    const { guild, options, member } = interaction;

    const name = options.getString("suggestion");
    const description = options.getString("description");
    const type = options.getString("type");

    const embed = new EmbedBuilder()
      .setColor("Navy")
      .setAuthor({
        name: `${interaction.user.tag}`,
        iconURL: `${interaction.user.displayAvatarURL({ dynamic: true })}`,
      })
      .addFields(
        {
          name: "<:info:1029480432821075988> | New Suggestion",
          value: `${name} ` + `:\n \`${description}\``,
          inline: false,
        },
        { name: "Type", value: `${type}`, inline: true },
        { name: "Status", value: "Pending", inline: true }
      )
      .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
      .setTimestamp();

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("suggest-accept")
        .setEmoji(`<:info:1029480432821075988>`)
        .setStyle(ButtonStyle.Success)
        .setLabel("Accept"),
      new ButtonBuilder()
        .setCustomId("suggest-decline")
        .setEmoji(`<:wrong_1:1027194257192255488>`)
        .setStyle(ButtonStyle.Danger)
        .setLabel("Decline")
    );
    interaction.reply({
      content: `:white_check_mark: | Your suggestion has been succesfully submitted in our [server](https://discord.com/channels/1020560054128226346/1025747095216455770).`,
      ephemeral: true,
    });
    try {
      const msg = await client.channels.cache
        .get("1041329286969294858")
        .send({ embeds: [embed], components: [row] });
      await SuggestDB.create({
        Guild: guild.id,
        Message: msg.id,
        Details: [
          {
            MemberID: interaction.user.id,
            Type: type,
            Suggestion: name,
          },
        ],
      });
    } catch (error) {
      console.log(error);
    }
  },
};
