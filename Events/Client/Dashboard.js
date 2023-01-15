const { Client, ChannelType, EmbedBuilder, ActionRowBuilder, ButtonStyle, ButtonBuilder, Guild} = require("discord.js")
const config = require('./config.json');
const SoftUI = require('dbd-soft-ui');
let DBD = require('discord-dashboard');
const supportDB = require('../../Structures/Schemas/SupportRoom');
const featureDB = require('../../Structures/Schemas/Features');
const trainingsembedDB = require('../../Structures/Schemas/TrainingsEmbed');

module.exports = {
    name: "ready",

    /**
     * @param {Client} client 
     */
    async execute(client) {

        const { user } = client

        await DBD.useLicense(config.dbd.license)
        DBD.Dashboard = DBD.UpdatedClass()

        const Dashboard = new DBD.Dashboard({

            port: config.dbd.port,
            client: config.discord.client,
            redirectUri: `${config.dbd.domain}${config.dbd.redirectUri}`,
            domain: config.dbd.domain,
            ownerIDs: config.dbd.ownerIDs,
            useThemeMaintenance: false,
            useTheme404: true,
            acceptPrivacyPolicy: true,
            bot: client,
            guildAfterAuthorization: {
                use: true,
                guildId: "784401964293292052"
            },
            theme: SoftUI({
                locales: {
                    enUS: {
                        name: 'English',
                        index: {
                            feeds: ["Current Users", "CPU", "System Platform", "Server Count"],
                            card: {
                                category: "team synix bot",
                                title: "team synix new Panel - The center of everything",
                                description: "Ich hab kein plan was hier stehen soll aber du findest bestimmt was du suchst",
                                footer: "Join our Server!",
                                link: {
                                    enabled: true,
                                    url: "https://discord.com/api/oauth2/authorize?client_id=1047099666182967317&permissions=8&scope=bot%20applications.commands"
                                }
                            },
                            feedsTitle: "Feeds",
                            graphTitle: "Graphs",
                        },
                        blacklisted: {
                            title: "Blacklisted",
                            subtitle: "Access denied",
                            description: "Unfortunately it seems that you have been blacklisted from the dashboard.",
                            button: {
                                enabled: false,
                                text: "Return",
                                link: "https://google.com"
                            }
                        },
                        manage: {
                            settings: {
                                memberCount: "Members",
                                info: {
                                    info: "Info",
                                    server: "Server Information"
                                }
                            }
                        },
                        privacyPolicy: {
                            title: "Privacy Policy",
                            description: "Privacy Policy and Terms of Service",
                            pp: "Complete Privacy Policy",
                        },
                        partials: {
                            sidebar: {
                                dash: "Dashboard",
                                manage: "Manage Guilds",
                                commands: "Commands",
                                pp: "Privacy Policy",
                                admin: "Admin",
                                account: "Account Pages",
                                login: "Sign In",
                                logout: "Sign Out"
                            },
                            navbar: {
                                home: "Home",
                                pages: {
                                    manage: "Manage Guilds",
                                    settings: "Manage Guilds",
                                    commands: "Commands",
                                    pp: "Privacy Policy",
                                    admin: "Admin Panel",
                                    error: "Error",
                                    credits: "Credits",
                                    debug: "Debug",
                                    leaderboard: "Leaderboard",
                                    profile: "Profile",
                                    maintenance: "Under Maintenance",
                                }
                            },
                            title: {
                                pages: {
                                    manage: "Manage Guilds",
                                    settings: "Manage Guilds",
                                    commands: "Commands",
                                    pp: "Privacy Policy",
                                    admin: "Admin Panel",
                                    error: "Error",
                                    credits: "Credits",
                                    debug: "Debug",
                                    leaderboard: "Leaderboard",
                                    profile: "Profile",
                                    maintenance: "Under Maintenance",
                                }
                            },
                            preloader: {
                                text: "Page is loading...",
                                image: "https://cdn.discordapp.com/attachments/1041329286969294858/1060965096215560192/output-onlinegiftools.gif",
                                spinner: false
                            },
                            premium: {
                                title: "Want more from sister bot? ⭐",
                                description: "Check out premium features below!",
                                buttonText: "Get Premium",
                                button: {
                                    url: "https://google.com"
                                }
                            },
                            settings: {
                                title: "Site Configuration",
                                description: "Configurable Viewing Options",
                                theme: {
                                    title: "Site Theme",
                                    description: "Make the site more appealing for your eyes!",
                                },
                                language: {
                                    title: "Site Language",
                                    description: "Select your preferred language!",
                                }
                            }
                        }
                    },
                },
                customThemeOptions: {
                    index: async ({ req, res, config }) => {
                        return {
                            values: [],
                            graph: {},
                            cards: [],
                        }
                    },
                },
                websiteName: "team synix bot",
                colorScheme: "red",
                supporteMail: "dev@teamsynix.org",
                icons: {
                    favicon: 'https://teamsynix.com/wp-content/uploads/2022/08/logo_smooth.png',
                    noGuildIcon: "https://teamsynix.com/wp-content/uploads/2023/01/yama_final3.png",
                    sidebar: {
                        darkUrl: 'https://teamsynix.com/wp-content/uploads/2022/11/1_red.png',
                        lightUrl: 'https://teamsynix.com/wp-content/uploads/2022/11/1_red.png',
                        hideName: true,
                        borderRadius: false,
                        alignCenter: true
                    },
                },
                index: {
                    card: {
                        category: "team synix bot",
                        title: "team synix new Panel - The center of everything",
                        description: "Ich hab kein plan was hier stehen soll aber du findest bestimmt was du suchst",
                        image: "https://teamsynix.com/wp-content/uploads/2022/11/1_red.png",
                        footer: "Join the server!",
                        link: {
                            enabled: true,
                            url: "https://discord.com/api/oauth2/authorize?client_id=1047099666182967317&permissions=8&scope=bot%20applications.commands"
                        }
                    },
                    graph: {
                        enabled: false,
                        lineGraph: false,
                        title: 'Memory Usage',
                        tag: 'Memory (MB)',
                        max: 100
                    },
                },
                blacklisted: {
                    title: "Blacklisted",
                    subtitle: "Access denied",
                    description: "Unfortunately it seems that you have been blacklisted from the dashboard.",
                    button: {
                        enabled: false,
                        text: "Return",
                        link: "https://google.com"
                    }
                },
                sweetalert: {
                    errors: {},
                    success: {
                        login: "Du bist drin!",
                    }
                },
                preloader: {
                    image: "https://cdn.discordapp.com/attachments/1041329286969294858/1060965096215560192/output-onlinegiftools.gif",
                    text: "Ich lade... daueert kurz... hetz mich nicht!",
                    spinner: false
                },
                premium: {
                    enabled: false,
                    card: {
                        title: "Want more from sister bot?",
                        description: "Check out premium features below!",
                        bgImage: "https://cdn.discordapp.com/attachments/1041329286969294858/1044984586528096286/zlogo.png",
                        button: {
                            text: "Become Premium",
                            url: "https://google.comgoogle.de"
                        }
                    }
                },
                admin: {
                    pterodactyl: {
                        enabled: false,
                        apiKey: "apiKey",
                        panelLink: "https://panel.website.com",
                        serverUUIDs: []
                    }
                },

                commands: [

                ],

            }),
            settings: [

                {
                    categoryId: "support",
                    categoryName: "Support",
                    categoryDescription: "Support Settings",
                    categoryImageURL: "https://teamsynix.com/wp-content/uploads/2022/08/logo_smooth.png",
                    refreshOnSave: true,
                    toggleable: true,

                    getActualSet: async ({ guild, client }) => {
                        let feature = await featureDB.findOne({ GuildID: guild.id });
                        let support = await supportDB.findOne({ GuildID: guild.id });

                        if (!feature) {
                            let feature = new featureDB({
                                GuildID: guild.id,
                                SupportRooms: true,
                                TrainingAnnouncements: true,
                            });

                            await feature.save();
                        }

                        if (!support) {
                            let support = new supportDB({
                                GuildID: guild.id,
                                ChannelID: [],
                                PingChannel: null,
                                PingRoles: [],
                                PingRoleStatus: false,
                            });

                            await support.save();
                        }

                        if(feature) return feature.SupportRoom;
                        else return false;
                    },
                    setNew: async ({ guild, client, newData }) => {
                        let feature = await featureDB.findOne({ GuildID: guild.id });

                        if (!newData) newData = false;

                        if(feature) {
                            feature.SupportRoom = newData;
                            await feature.save();
                        } else {
                            feature = new featureDB({
                                GuildID: guild.id,
                                SupportRoom: newData,
                            });

                            await feature.save();

                        }
                    },

                    categoryOptionsList: [
                        {
                            optionId: "supportrooms",
                            optionTitle: "Warteräume",
                            optionDescription: "Stelle die Warteräume ein.",
                            optionType: DBD.formTypes.channelsMultiSelect(false, false, channelTypes = [ChannelType.GuildVoice]),
                            getActualSet: async ({guild,user}) => {
                                let data = await supportDB.findOne({  GuildID: guild.id });
                                if(data) return data.ChannelID;
                                else return null;
                            },
                            setNew: async ({guild,user,newData}) => {
                                let data = await supportDB.findOne({  GuildID: guild.id });

                                if(!data) {
                                    data = new supportDB({
                                        GuildID: guild.id,
                                        ChannelID: newData
                                    });

                                    data.save();
                                } else {
                                    data.ChannelID = newData;
                                    data.save();
                                }

                                return
                            }
                        },
                        {
                            optionId: "supporttextchanne",
                            optionTitle: "Warteraum Text Kanal",
                            optionDescription: "Stelle den Kanal ein in welchen Kanal der Bot posten soll.",
                            optionType: DBD.formTypes.channelsSelect(false, channelTypes = [ChannelType.GuildText]),
                            getActualSet: async ({guild,user}) => {
                                let data = await supportDB.findOne({  GuildID: guild.id });
                                if(data) return data.PingChannel;
                                else return null;
                            },
                            setNew: async ({guild,user,newData}) => {
                                let data = await supportDB.findOne({  GuildID: guild.id });

                                if(!data) {
                                    data = new supportDB({
                                        GuildID: guild.id,
                                        PingChannel: newData
                                    });

                                    data.save();
                                } else {
                                    data.PingChannel = newData;
                                    data.save();
                                }

                                return
                            }
                        },
                        {
                            optionId: "supportpingstatus",
                            optionTitle: "Warteraum Ping Status",
                            optionDescription: "Stelle ein ob jemand angepingt werden soll wenn ein Nutzer den Warteraun betritt.",
                            optionType: DBD.formTypes.switch(false),
                            getActualSet: async ({guild,user}) => {
                                let data = await supportDB.findOne({  GuildID: guild.id });
                                if(data) return data.PingRoleStatus;
                                else return null;
                            },
                            setNew: async ({guild,user,newData}) => {
                                let data = await supportDB.findOne({  GuildID: guild.id });

                                if(!data) {
                                    data = new supportDB({
                                        GuildID: guild.id,
                                        PingRoleStatus: newData
                                    });

                                    data.save();
                                } else {
                                    data.PingRoleStatus = newData;
                                    data.save();
                                }

                                return
                            }
                        },
                        {
                            optionId: "supportping",
                            optionTitle: "Warteraum Ping",
                            optionDescription: "Stelle ein welche Rolle angepingt werden soll.",
                            optionType: DBD.formTypes.rolesMultiSelect(false, false),
                            getActualSet: async ({guild,user}) => {
                                let data = await supportDB.findOne({  GuildID: guild.id });
                                if(data) return data.PingRoles;
                                else return [];
                            },
                            setNew: async ({guild,user,newData}) => {
                                let data = await supportDB.findOne({  GuildID: guild.id });

                                if(!data) {
                                    data = new supportDB({
                                        GuildID: guild.id,
                                        PingRoles: newData
                                    });

                                    data.save();
                                } else {
                                    data.PingRoles = newData;
                                    data.save();
                                }

                                return
                            }
                        },
                    ]
                },
                {
                    categoryId: "trainingsembed",
                    categoryName: "Trainingsembed",
                    categoryDescription: "Hier kannst das Trainingsembed einstellen.",
                    categoryImageURL: "https://teamsynix.com/wp-content/uploads/2022/08/logo_smooth.png",
                    toggleable: true,
                    refreshOnSave: true,
                    getActualSet: async ({ guild, client }) => {
                        let feature = await featureDB.findOne({ GuildID: guild.id });

                        if(feature) return feature.TrainingAnnouncements;
                        else return false;
                    },
                    setNew: async ({ guild, client, newSettings }) => {
                        let feature = await featureDB.findOne({ GuildID: guild.id });

                        if(feature) {
                            feature.TrainingAnnouncements = newSettings;
                            await feature.save();
                        } else {
                            await featureDB.create({
                                GuildID: guild.id,
                                TrainingAnnouncements: newSettings
                            });
                        }
                    },
                    categoryOptionsList: [
                        {
                            optionId: "trainingembedmessage",
                            optionName: "Embed Nachricht",
                            optionDescription: "Stelle ein welche Nachricht für das Trainingsembed verwendet werden soll.",
                            optionType: DBD.formTypes.embedBuilder({
                                username: user.username,
                                avatarURL: user.avatarURL(),
                                defaultJson: {
                                    content: "Welcome",
                                    embed: {
                                        description: "Wir bitten um zahlreiches Erscheinen. \n Das Training geht von 19 - 20:30 Uhr.",
                                        author: {
                                            name: "Training - Aktuell",
                                            url: "https://teamsynix.com",
                                            icon_url: "https://teamsynix.com/wp-content/uploads/2022/11/1_red_2.png"
                                        },
                                        thumbnail: {
                                            url: "https://cdn.discordapp.com/attachments/1013366974455222272/1042907817398505532/1_red.png"
                                        },
                                        footer: {
                                            text: "teamsynix | powered by zeenbot.xyz",
                                            icon_url: "https://cdn.discordapp.com/attachments/1041329286969294858/1058348553392627723/z-white.png"
                                        },
                                    }
                                }
                            }),
                            getActualSet: async ({ guild }) => {
                                let data = await trainingsembedDB.findOne({ GuildID: guild.id }).catch(err => { })
                                if (data) return data.Embed
                                else return null
                            },
                            setNew: async ({ guild, newData }) => {

                                let data = await trainingsembedDB.findOne({ GuildID: guild.id }).catch(err => { })

                                if (!newData) newData = false

                                if (!data) {

                                    data = new trainingsembedDB({
                                        GuildID: guild.id,
                                        Embed: newData,
                                    })

                                    await data.save()

                                } else {

                                    data.Embed = newData
                                    await data.save()

                                }

                                return

                            }
                        },
                    ]
                },
            ]

        })

        Dashboard.init()

    }
}

function CommandPush(filteredArray, CategoryArray) {

    filteredArray.forEach(obj => {

        let cmdObject = {
            commandName: obj.name,
            commandUsage: obj.usage,
            commandDescription: obj.description,
            commandAlias: "None"
        }

        CategoryArray.push(cmdObject)

    })

}

async function resendTicketPanel(guild, Buttons, ChannelID, MessageID, data, client) {

    let numberButtons = 1;
    console.log("Number of buttons set : " + numberButtons)

    console.log("Set Button 1 to " + data.Button1)
    if (data.Button2) {
        numberButtons = 2;
        console.log("Set Button 2 to " + data.Button2)
    }
    if (data.Button3) {
        numberButtons = 3;
    }
    if (data.Button4) {
        numberButtons = 4;
    }

    const color = data.TicketEmbedColor

    try {
        let firstbutton = null
        let secondbutton = null
        let thirdbutton = null
        let fourthbutton = null

        console.log("Setup emoji and button vars")

        switch (numberButtons) {
            case 1:
                console.log("Only 1 Button")

                await TicketSetupDB.findOneAndUpdate(
                    { GuildID: guild.id },
                    {
                        Channel: data.Channel,
                        Category: data.Category,
                        Transcripts: data.Transcripts,
                        Handlers: data.Handlers,
                        Everyone: data.Everyone,
                        Description: data.Description,
                        Button1: data.Button1,
                        Buttons: [data.Button1],
                        PingStaff: data.PingStaff,
                        Response: data.Response,
                    },
                    {
                        new: true,
                        upsert: true,
                    }
                );
                break;
            case 2:
                console.log("Only 2 Button")

                await TicketSetupDB.findOneAndUpdate(
                    { GuildID: guild.id },
                    {
                        Channel: data.Channel,
                        Category: data.Category,
                        Transcripts: data.Transcripts,
                        Handlers: data.Handlers,
                        Everyone: data.Everyone,
                        Description: data.Description,
                        Button1: data.Button1,
                        Button2: data.Button2,
                        Buttons: [data.Button1, data.Button2],
                        PingStaff: data.PingStaff,
                        Response: data.Response,
                    },
                    {
                        new: true,
                        upsert: true,
                    }
                );

                break;
            case 3:
                await TicketSetupDB.findOneAndUpdate(
                    { GuildID: guild.id },
                    {
                        Channel: data.Channel,
                        Category: data.Category,
                        Transcripts: data.Transcripts,
                        Handlers: data.Handlers,
                        Everyone: data.Everyone,
                        Description: data.Description,
                        Button1: data.Button1,
                        Button2: data.Button2,
                        Button3: data.Button3,
                        Buttons: [firstbutton, secondbutton, thirdbutton],
                        PingStaff: data.PingStaff,
                        Response: data.Response,
                    },
                    {
                        new: true,
                        upsert: true,
                    }
                );

                break;
            case 4:
                await TicketSetupDB.findOneAndUpdate(
                    { GuildID: guild.id },
                    {
                        Channel: data.Channel,
                        Category: data.Category,
                        Transcripts: data.Transcripts,
                        Handlers: data.Handlers,
                        Everyone: data.Everyone,
                        Description: data.Description,
                        Button1: data.Button1,
                        Button2: data.Button2,
                        Button3: data.Button3,
                        Button4: data.Button4,
                        Buttons: [firstbutton, secondbutton, thirdbutton, fourthbutton],
                        PingStaff: data.PingStaff,
                        Response: data.Response,
                    },
                    {
                        new: true,
                        upsert: true,
                    }
                );

                break;

        }

        const button = new ActionRowBuilder()

        switch (numberButtons) {
            case 1:
                console.log("Only 1 Button ActionRow")
                console.log("Button 1: " + data.Button1)
                button.setComponents(
                    new ButtonBuilder().setCustomId(data.Button1).setLabel(data.Button1).setStyle(ButtonStyle.Danger).setEmoji('✉️'),
                )
                break;
            case 2:
                console.log("Only 2 Button ActionRow")
                console.log("Button 1: " + firstbutton)
                console.log("Button 2: " + secondbutton)
                button.setComponents(
                    new ButtonBuilder().setCustomId(data.Button1).setLabel(data.Button1).setStyle(ButtonStyle.Danger).setEmoji('✉️'),
                    new ButtonBuilder().setCustomId(data.Button2).setLabel(data.Button2).setStyle(ButtonStyle.Secondary).setEmoji('✉️'),
                )
                break;
            case 3:
                button.setComponents(
                    new ButtonBuilder().setCustomId(data.Button1).setLabel(data.Button1).setStyle(ButtonStyle.Danger).setEmoji('✉️'),
                    new ButtonBuilder().setCustomId(data.Button2).setLabel(data.Button2).setStyle(ButtonStyle.Secondary).setEmoji('✉️'),
                    new ButtonBuilder().setCustomId(data.Button3).setLabel(data.Button3).setStyle(ButtonStyle.Primary).setEmoji('✉️'),
                )
                break;
            case 4:
                button.setComponents(
                    new ButtonBuilder().setCustomId(data.Button1).setLabel(data.Button1).setStyle(ButtonStyle.Danger).setEmoji('✉️'),
                    new ButtonBuilder().setCustomId(data.Button2).setLabel(data.Button2).setStyle(ButtonStyle.Secondary).setEmoji('✉️'),
                    new ButtonBuilder().setCustomId(data.Button3).setLabel(data.Button3).setStyle(ButtonStyle.Primary).setEmoji('✉️'),
                    new ButtonBuilder().setCustomId(data.Button4).setLabel(data.Button4).setStyle(ButtonStyle.Success).setEmoji('✉️'),
                )
                break;
        }

        console.log("Creating Embed")
        const embed = new EmbedBuilder()
            .setDescription(data.Description)
            .setColor(color)
            .setFooter({ text: `Ticket System | ${guild.name}`, iconURL: "https://cdn.discordapp.com/attachments/1041329286969294858/1058348553392627723/z-white.png"})

        console.log("sending Embed")

        const channel = client.channels.cache.get(data.Channel)

        let message = await channel.send({
            embeds: ([embed]),
            components: [
                button
            ]
        });

        const messageID = message.id

        if (data.PanelMessageID) {
            console.log("trying to delete the old message")
            const oldMessageID = data.PanelMessageID

            const channelId = data.Channel
            const messageId = oldMessageID

            client.channels.fetch(channelId).then(channel => {
                channel.messages.delete(messageId);
            });

            data.PanelMessageID = messageID;
        }

        data.PanelMessageID = messageID;

    } catch (err) {
        console.log(err)
        return { error: "Something went wrong!" }
    }
    console.log("Embed Send!")


}