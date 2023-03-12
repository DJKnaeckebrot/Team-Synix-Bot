import { ArgsOf, Client } from "discordx"

import { Discord, Guard, On } from "@decorators"
import { Maintenance } from "@guards"
import { executeEvalFromMessage, isDev } from "@utils/functions"

import { generalConfig } from "@config"
import {EmbedBuilder, PermissionsBitField} from "discord.js";

@Discord()
export default class MessageCreateEvent {

    @On("messageCreate")
    @Guard(
        Maintenance
    )
    async messageCreateHandler(
        [message]: ArgsOf<"messageCreate">, 
        client: Client
     ) {

        // eval command
        if (
            message.content.startsWith(`\`\`\`${generalConfig.eval.name}`)
            && (
                (!generalConfig.eval.onlyOwner && isDev(message.author.id))
                || (generalConfig.eval.onlyOwner && message.author.id === generalConfig.ownerId)
            )
        ) {
            executeEvalFromMessage(message)
        }

        // check is message is in a allowed channel
        if (message.channelId == "1040983841487212675") {
            const notAllowedEmbed = new EmbedBuilder()
                .setDescription(`🚮 This channel is a command only channel!`)
                .setColor('Red')

            message.channel
                .send({embeds: [notAllowedEmbed], content: `${message.author}`})
                .then((mg) => setTimeout(mg.delete.bind(mg), 10000));
            await message.delete();

            return;
        }

        await client.executeCommand(message, { caseSensitive: false })
    }

}