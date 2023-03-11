import { Category } from "@discordx/utilities"
import {Discord, Slash, SlashOption} from "@decorators";
import {Client} from "discordx";
import {injectable} from "tsyringe";
import {ApplicationCommandOptionType, ChatInputCommandInteraction, CommandInteraction, GuildMember} from "discord.js";
import {Guard, UserPermissions} from "@guards";

@Discord()
@injectable()
@Category('Team Synix')

export default class BewerberCommand {
    @Slash({ name: "bw" })
    @Guard(
        UserPermissions(['Administrator'])
    )
    async bw(
        @SlashOption({
            description: "Bewerber",
            name: "bewerber",
            required: true,
            type: ApplicationCommandOptionType.User,
        }) bewerber: GuildMember,
        client: Client,
        interaction: ChatInputCommandInteraction,
    ) {
        await bewerber.setNickname(`BW | ${bewerber.user.username}`)

        //await interaction.followUp({ content: "Bewerber", ephemeral: true })

        return interaction.reply("Bewerber")

    }
}