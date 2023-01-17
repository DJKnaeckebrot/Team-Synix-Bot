const { Client, ActionRowBuilder, Events, StringSelectMenuBuilder, ModalBuilder, EmbedBuilder, TextInputBuilder, TextInputStyle, ButtonBuilder, ButtonStyle } = require("discord.js");
const scrimsDB = require("../../../Structures/Schemas/scrims");
 async function notifyTeam(interaction, team, scrimID) {
    let channelToPost = "";

    let scrims = await scrimsDB.findOne({ ScrimID: scrimID });

    switch (team) {
        case "team-synix-nox":
            channelToPost = await interaction.client.channels.fetch("1018497607263326298");
            scrims.TeamChannelID = "1018497607263326298"
            await scrims.save();
            break;
        case "team-synix-fenrir":
            channelToPost = await interaction.client.channels.fetch("939628197983690814");
            scrims.TeamChannelID = "939628197983690814"
            await scrims.save();
            break;
        case "team-synix-seth":
            channelToPost = await interaction.client.channels.fetch("1017144310275256402");
            scrims.TeamChannelID = "1017144310275256402"
            await scrims.save();
            break;
        case "team-synix-ares":
            channelToPost = await interaction.client.channels.fetch("987790581877076010");
            scrims.TeamChannelID = "987790581877076010"
            await scrims.save();
            break;
        case "team-synix-atlas":
            channelToPost = await interaction.client.channels.fetch("1001197385462054922");
            scrims.TeamChannelID = "1001197385462054922"
            await scrims.save();
            break;
        case "team-synix-amaterasu":
            channelToPost = await interaction.client.channels.fetch("1025713482802413648");
            scrims.TeamChannelID = "1025713482802413648"
            await scrims.save();
            break;
        case "team-synix-yama":
            channelToPost = await interaction.client.channels.fetch("1039637048375648347");
            scrims.TeamChannelID = "1039637048375648347"
            await scrims.save();
            break;
        case "team-synix-neith":
            channelToPost = await interaction.client.channels.fetch("1041461459001016471");
            scrims.TeamChannelID = "1041461459001016471"
            await scrims.save();
            break;
        case "team-synix-phoenix":
            channelToPost = await interaction.client.channels.fetch("1044918853056090172");
            scrims.TeamChannelID = "1044918853056090172"
            await scrims.save();
            break;
        case "team-synix-vishnu":
            channelToPost = await interaction.client.channels.fetch("1051277374064443402");
            scrims.TeamChannelID = "1051277374064443402"
            await scrims.save();
            break;
        case "team-synix-chronos":
            channelToPost = await interaction.client.channels.fetch("915334471115485184");
            scrims.TeamChannelID = "915334471115485184"
            await scrims.save();
            break;
        case "team-synix-fafnir":
            channelToPost = await interaction.client.channels.fetch("1055998947627372565");
            scrims.TeamChannelID = "1055998947627372565"
            await scrims.save();
            break;
        case "team-synix-nike":
            channelToPost = await interaction.client.channels.fetch("1060064644280098816");
            scrims.TeamChannelID = "1060064644280098816"
            await scrims.save();
            break;
        case "team-synix-izanagi":
            channelToPost = await interaction.client.channels.fetch("1063063482976706560");
            scrims.TeamChannelID = "1063063482976706560"
            await scrims.save();
            break;
        case "team-synix-intern":
            channelToPost = await interaction.client.channels.fetch("1040983841487212675");
            scrims.TeamChannelID = "1040983841487212675"
            await scrims.save();
            break;
        case "team-synix-extern":
            channelToPost = await interaction.client.channels.fetch("1040983841487212675");
            scrims.TeamChannelID = "1040983841487212675"
            await scrims.save();
            break;
        case "team-synix-allgemein":
            channelToPost = await interaction.client.channels.fetch("1040983841487212675");
            scrims.TeamChannelID = "1040983841487212675"
            await scrims.save();
            break;

    }

    let scrimGegner = scrims.gegnerTeam;
    let scrimGegnerRank = scrims.gegnerRank;
    let scrimDatum = scrims.Datum;
    let scrimUhrzeit = scrims.Uhrzeit;
    let scrimStatus = scrims.Status;

    console.log(scrimGegner, scrimGegnerRank, scrimDatum, scrimUhrzeit, scrimStatus);

     const embed = new EmbedBuilder()
         .setTitle("Du hast eine neue Scrimanfrage")
         .setDescription("Hier kannst du die details sehen, bitte bestätige oder lehne ab!")
         .addFields(
             { name: "**Team Name** : ", value: scrimGegner, inline: true },
             { name: "**Team Rank** : ", value: scrimGegnerRank, inline: true },
             { name: "**Datum** : ", value: scrimDatum, inline: true },
             { name: "**Uhrzeit** :" , value: scrimUhrzeit, inline: true },
             { name: "**Status** : ", value: scrimStatus, inline: true },
         )
         .setColor(0x0085c1)
         .setAuthor({ name: 'Team Synix | Scrim Anfrage' })
         .setFooter({ text: 'Made with ❤️ for Team Synix by .zeen' })
         .setTimestamp();


    const buttons = new ActionRowBuilder().addComponents(
        new ButtonBuilder().setCustomId("team-scrim-accept").setLabel("Akzeptieren").setStyle(ButtonStyle.Primary).setEmoji("✅"),
        new ButtonBuilder().setCustomId("team-scrim-decline").setLabel("Absagen").setStyle(ButtonStyle.Primary).setEmoji("❌"),
    )

    const teamContent = `${interaction.guild.roles.everyone}`;

    const m = await channelToPost.send({ embeds: [embed], components: [buttons], content: teamContent });

    scrims.MessageID = m.id;

    await scrims.save();

    return
}

module.exports = { notifyTeam };