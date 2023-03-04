import { Category } from "@discordx/utilities"
import {Discord, Slash, SlashOption} from "@decorators";
import {SlashGroup, Client} from "discordx";
import {ApplicationCommandOptionType, Channel, CommandInteraction, TextChannel, User} from "discord.js";

@Discord()
@Category('General')
@SlashGroup({ description: "Clip der Woche", name: "clip" })
@SlashGroup("clip")
export default class ClipCommand {
    @Slash({ description: "open" })
    async open(
        @SlashOption({
            description: "Clip Channel",
            name: "clipchannel",
            required: true,
            type: ApplicationCommandOptionType.Channel,
        }) clipChannel: TextChannel,
        interaction: CommandInteraction,
        client: Client,
    ) {
        //console.log(clipChannel)
        await clipChannel.bulkDelete(100, true);

        //const roleId = '784774303714508820';
        const roleId = '1061285791751475260';
        const role = clipChannel.guild.roles.cache.get(roleId);
        if (role) {
            await clipChannel.permissionOverwrites.edit(role, { SendMessages: true });
        } else {
            await interaction.followUp(`Role with ID ${roleId} not found`);
            throw new Error(`Role with ID ${roleId} not found`);
        }

        await clipChannel.permissionOverwrites.edit(role, { SendMessages: true });

        clipChannel.send("**Liebe** <@&1061285791751475260>,\nwir präsentieren euch nun unseren Channel für den **Clip der Woche**. \nGrundsätzlich bietet euch der Channel die Möglichkeit wöchentlich einen von euch erspielten Clip mit der Community zu teilen. \n \nEgal ob ein grandioses Tor, atemberaubender Pass oder eine Parade, die ihresgleichen sucht, zeigt sie der Community um etwas kleines zu gewinnen. \n \n**Hier einmal die Regeln für die Teilnahme:** \n \n- Es werden nur Clips gestattet, die mit \"**Gif Your Game**\" aufgenommen wurden \n- **Jeder** darf nur maximal zwei Clips pro Woche einsenden \n- Es muss sich dabei um eine Szene aus dem Spiel heraus handeln (**kein Bot-Game, kein Freeplay-Training**) \n- Man darf seinen eigenen Clip nicht voten \n \n**Einsendungen beginnen immer Montags.** \nFreitags wird dann die Einsendung von Clips **blockiert** und das **Voting** beginnt. \nDas Voting wird dann am **Sonntag** um **23:59 Uhr** beendet und der Sieger wird angekündigt. \nDer Gewinner wird mit Clip auf unserem Twitter Kanal veröffentlicht. \nAußerdem erhält er **30.000 Credits** für unseren eigenen Gamble Channel <#928408663029342299>. \n \nWir würden uns sehr über eure Teilnahme \nfreuen und wünschen euch allen viel Glück! \n \n **Liebe Grüße** \n- <@&1004207195866546376>")

        return interaction.followUp({ content: "Channel geöffnet", ephemeral: true })
    }

    @Slash({ description: "close" })
    async close(
        @SlashOption({
            description: "Clip Channel",
            name: "clipchannel",
            required: true,
            type: ApplicationCommandOptionType.Channel,
        }) clipChannel: TextChannel,
        interaction: CommandInteraction,
        client: Client,
    ) {

        //const roleId = '784774303714508820';
        const roleId = '1061285791751475260';
        const role = clipChannel.guild.roles.cache.get(roleId);
        if (role) {
            await clipChannel.permissionOverwrites.edit(role, { SendMessages: true });
        } else {
            await interaction.followUp(`Role with ID ${roleId} not found`);
            throw new Error(`Role with ID ${roleId} not found`);
        }

        await clipChannel.permissionOverwrites.edit(role, { SendMessages: false });

        clipChannel.send("**Hallo** <@&784774303714508820>,\ndie Einsendungen für den Clip der Woche ist nun gesperrt. Nun habt ihr die Möglichkeit mit einem Daumen hoch, eure favorisierten Clips zu voten. \n \n**Das Voting endet am (Sonntag um 23:59).** \n**Daraufhin wird der Gewinner bekanntgegeben.** \n \nDer Gewinner wird auf Twitter repostet und erhält 30.000 Credits in unserem eigenen Gamble Channel. \n \n**Wir wünschen allen Einsendern viel Glück.** \n- <@&1004207195866546376>")

        return interaction.followUp("Channel geschlossen")
    }

    @Slash({ description: "winner" })
    winner(
        @SlashOption({
            description: "Clip Channel",
            name: "clipchannel",
            required: true,
            type: ApplicationCommandOptionType.Channel,
        }) clipChannel: TextChannel,
        @SlashOption({
            description: "CDW Winner",
            name: "cdwwinner",
            required: true,
            type: ApplicationCommandOptionType.User,
        }) cdwWinner: User,
        interaction: CommandInteraction,
        client: Client,
    ) {
        clipChannel.send(`**Liebe** <@&784774303714508820>,\nhiermit geben wir den Gewinner von Clip der Woche für diese Woche bekannt.\n \n**Gewinner:** <@${cdwWinner.id}>\n**Preis:** 30.000 Gamble-Credits \n \n Wir bedanken uns für eure zahlreichen Einreichungen, viel Glück beim nächsten Mal 🙂 \n \n**Liebe Grüße** \n- <@&1004207195866546376>`)

        return interaction.followUp("Channel gewinner")
    }
}