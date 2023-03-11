import {ChatInputCommandInteraction, ApplicationCommandOptionType, User, GuildMember} from "discord.js"
import { Client } from "discordx"

import { Disabled } from "@guards"
import { Discord, Guard, Slash, SlashOption } from "@decorators"

@Discord()

export default class PixelateCommand {
    @Slash({
        name: 'pixelate',
        description: 'Pixelate an image'
    })
    @Guard(
        Disabled
    )
    async pixelate(
        @SlashOption({
            name: 'user',
            type: ApplicationCommandOptionType.User,
            required: true
        }) user: User,
        interaction: ChatInputCommandInteraction,
        client: Client,
        { localize }: InteractionData
    ) {
        const { options } = interaction;

        console.log(user)

        let avatarUrl = user.avatarURL();

        let canvas = `https://some-random-api.ml/canvas/pixelate?avatar=${avatarUrl}`;
        await interaction.followUp({
            content: canvas,
        });
    }
}