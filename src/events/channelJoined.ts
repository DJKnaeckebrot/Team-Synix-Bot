import { ArgsOf, Client } from "discordx"

import { Discord, Guard, On } from "@decorators"
import { Maintenance } from "@guards"
import { executeEvalFromMessage, isDev } from "@utils/functions"

import { generalConfig } from "@config"
import {EmbedBuilder, TextBasedChannel } from "discord.js";

@Discord()

export default class ChannelJoinedEvent  {

    @On("voiceStateUpdate")
    async voiceStateUpdateHandler(
        [oldState, newState]: ArgsOf<"voiceStateUpdate">,
        client: Client
    ) {
        if (newState.channel && newState.channel.id === "804018451655163914") {
            console.log(`${newState.member} joined the channel!`);
            const embed = new EmbedBuilder()
                .setTitle("User joined the Support Channel")
                .setDescription(`${newState.member} joined the voice channel ${newState.channel}!`)
                .setColor("Purple")
                .setTimestamp()
                .setFooter({ text: "powered by zeenbot", iconURL: "https://cdn.discordapp.com/attachments/1041329286969294858/1058348553392627723/z-white.png" })


            let pings = "<@&784770518334439426>"

            let channel = client.channels.cache.get("973514657279139921") as TextBasedChannel;

            if (channel) {
                channel.send({ content: pings, embeds: [embed] }); }
            } else {

            }


    }

}