const { Client, MessageComponentInteraction, InteractionType, AttachmentBuilder, EmbedBuilder} = require("discord.js")
const DB = require("../../Structures/Schemas/Verification")
const EditReply = require("../../Systems/EditReply")
const { Captcha, CaptchaGenerator } = require("captcha-canvas")
const {messages} = require("../../Structures/config");
const { writeFileSync } = require('fs');

module.exports = {
    name: "interactionCreate",

    /**
     * @param {MessageComponentInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {

        const { guild, customId, member, type } = interaction

        const captcha = new Captcha();
        captcha.async = true;
        captcha.addDecoy();
        captcha.drawTrace();
        captcha.drawCaptcha();

        const captchaAttachment = new AttachmentBuilder(
            await captcha.png,
             { name: 'captcha.png' }
        );

        if (type !== InteractionType.MessageComponent) return

        const CustomID = ["verify"]
        if (!CustomID.includes(customId)) return

        await interaction.deferReply({ ephemeral: true })

        const Data = await DB.findOne({ Guild: guild.id }).catch(err => { })
        if (!Data) return EditReply(interaction, "❌", "Couldn't find any data!")

        const Role = guild.roles.cache.get(Data.Role)
        if (member.roles.cache.has(Role.id)) return EditReply(interaction, "❌", "You're already verified as a member!")

        const captchaEmbed = new EmbedBuilder()
            .setDescription("Please solve the captcha below to verify yourself")
            .setImage("attachment://captcha.png")
            .setColor(client.color)
            .setFooter({ text: "powered by zeenbot", iconURL: 'https://cdn.discordapp.com/attachments/1041329286969294858/1058348553392627723/z-white.png' })
            .setTimestamp()

        const msg = await member.send({
            embeds: [captchaEmbed],
            files: [captchaAttachment]
        })

        EditReply(interaction, "❗", "Check your DMs")

        const filter = (message) => {
            if (message.author.id !== member.id) return;
            if (message.content === captcha.text) return true;
            else member.send("❌ Incorrect captcha, please try again");
        };

        const timeOut = Data.TimeOut;

        try {
            const response = await  msg.channel.awaitMessages({
                filter,
                max: 1,
                time: timeOut,
                errors: ["time"]
            });

            if (response) {
                msg.delete();
                const verifiedEmbed = new EmbedBuilder()
                    .setTitle("Success")
                    .setDescription(`✅ You have been verified as a member in ${guild}!`)
                    .setColor("Green")
                    .setFooter({ text: "powered by zeenbot", iconURL: 'https://cdn.discordapp.com/attachments/1041329286969294858/1058348553392627723/z-white.png' })
                member.send({ embeds: [verifiedEmbed] });
                member.roles.add(Role);
                EditReply(interaction, "✅", "You're now verified as a member")
            }
        } catch (err) {
            msg.delete();
            const captchaEmbed = new EmbedBuilder()
                .setTitle("Failure")
                .setDescription(`❌ You didn't solve the captcha in time!`)
                .setColor("Red")
                .setFooter({ text: "powered by zeenbot", iconURL: 'https://cdn.discordapp.com/attachments/1041329286969294858/1058348553392627723/z-white.png' })

            member.send({ embeds: [captchaEmbed] });

            EditReply(interaction, "❌", "You didn't solve the captcha in time!")
        }

    }
}