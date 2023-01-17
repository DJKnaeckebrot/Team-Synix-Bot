const { Client, ActionRowBuilder, Events, StringSelectMenuBuilder, ModalBuilder, EmbedBuilder} = require("discord.js");
const scrimsDB = require("../../Structures/Schemas/scrims");

module.exports = {
    name: "channelCreate",

    async execute(channel, client) {

        await delay(2000)

        const { user } = channel;

        if (channel.parentId !== "923296271119310918" ) return


        const ticketID = channel.name.slice(8, 12);

        const scrimID = channel.id + "-" + ticketID;

        const newScrims = new scrimsDB({
            ScrimID: scrimID,
            ScrimTeam: "",
            gegnerTeam: "",
            gegnerRank: "",
            Datum: "",
            Uhrzeit: "",
            MessageID: "",
            MessageIDticket: "",
            TeamChannelID: "",
            GegnerTeamStatus: false,
            ScrimTeamStatus: false,
            TicketChannelID: channel.id,
            Status: "In Bearbeitung",
        });

        await newScrims.save()

        const row = new ActionRowBuilder()
            .addComponents(
                new StringSelectMenuBuilder()
                    .setCustomId("team-scrim")
                    .setPlaceholder("Wähle ein Team aus gegen welches du scrimmen möchtest")
                    .addOptions({
                            label: "Allgemeine Scrim Anfrage",
                            description: "Scrim Anfrage für ein beliebiges Team.",
                            value: "team-synix-allgemein",
                        },
                        {
                            label: "Team Synix #Nox",
                            description: "Scrime gegen Team Synix #Nox",
                            value: "team-synix-nox",
                            emoji: "<:gc2:921757593720995870>",
                        },
                        {
                            label: "Team Synix #Fenrir",
                            description: "Scrime gegen Team Synix #Fenrir",
                            value: "team-synix-fenrir",
                            emoji: "<:gc1:921757583604326430>",
                        },
                        {
                            label: "Team Synix #Seth",
                            description: "Scrime gegen Team Synix #Seth",
                            value: "team-synix-seth",
                            emoji: "<:gc2:921757593720995870>",
                        },
                        {
                            label: "Team Synix #Ares",
                            description: "Scrime gegen Team Synix #Ares",
                            value: "team-synix-ares",
                            emoji: "<:gc1:921757583604326430>",
                        },
                        {
                            label: "Team Synix #Atlas",
                            description: "Scrime gegen Team Synix #Atlas",
                            value: "team-synix-atlas",
                            emoji: "<:gc1:921757583604326430>",
                        },
                        {
                            label: "Team Synix #Amaterasu",
                            description: "Scrime gegen Team Synix #Amaterasu",
                            value: "team-synix-amaterasu",
                            emoji: "<:gc1:921757583604326430>",
                        },
                        {
                            label: "Team Synix #Yama",
                            description: "Scrime gegen Team Synix #Yama",
                            value: "team-synix-yama",
                            emoji: "<:c3:784805957313888256>",
                        },
                        {
                            label: "Team Synix #Neith",
                            description: "Scrime gegen Team Synix #Neith",
                            value: "team-synix-neith",
                            emoji: "<:gc2:921757593720995870>",
                        },
                        {
                            label: "Team Synix #Phoenix",
                            description: "Scrime gegen Team Synix #Phoenix",
                            value: "team-synix-phoenix",
                            emoji: "<:c3:784805957313888256>",
                        },
                        {
                            label: "Team Synix #Vishnu",
                            description: "Scrime gegen Team Synix #Vishnu",
                            value: "team-synix-zeus",
                            emoji: "<:c3:784805957313888256>",
                        },
                        {
                            label: "Team Synix #Fafnir",
                            description: "Scrime gegen Team Synix #Fafnir",
                            value: "team-synix-fafnir",
                            emoji: "<:gc1:921757583604326430>",
                        },
                        {
                            label: "Team Synix #Chronos",
                            description: "Scrime gegen Team Synix #Chronos",
                            value: "team-synix-chronos",
                            emoji: "<:c3:784805957313888256>",
                        },
                        {
                            label: "Team Synix #Nike",
                            description: "Scrime gegen Team Synix #Nike",
                            value: "team-synix-nike",
                            emoji: "<:c3:784805957313888256>",
                        },
                        {
                            label: "Team Synix #Izanagi",
                            description: "Scrime gegen Team Synix #Izanagi",
                            value: "team-synix-izanagi",
                            emoji: "<:c3:784805957313888256>",
                        },
                        {
                            label: "Team Synix Extern",
                            description: "Scrime gegen ein externes Team (Nur für Member)",
                            value: "team-synix-extern",
                        },
                        {
                            label: "Team Synix Intern",
                            description: "Scrime gegen ein internes Team (Nur für Member)",
                            value: "team-synix-intern",
                        }

                    ),
            );

        const embed = new EmbedBuilder()
            .setTitle("Deine Scrim Anfrage wurde erstellt!")
            .setDescription("Bitte wähle ein Team aus, gegen welches du spielen möchtest und wir leiten es automatisch an das entsprechenede Team weiter!")
            .setColor(0x0085c1)
            .setAuthor({ name: 'Team Synix | Scrim Anfrage' })
            .setFooter({ text: 'Made with ❤️ for Team Synix by .zeen'})
            .setTimestamp()

        const content = `Hey! Vielen Dank für ein Interesse! \n Bitte wähle unten aus gegen welches Team du scrimen möchtest!`

        let m = await channel.send({ embeds: [embed], components: [row] })

        newScrims.SelectMenuMessageID = m.id;

        await newScrims.save()

    }

}

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}