/**
 * @file Sample help command with slash command.
 * @author Naman Vrati & Thomas Fournier
 * @since 3.0.0
 * @version 3.3.0
 */

// Deconstructed the constants we need in this file.

const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");

/**
 * @type {import('../../../typings').SlashInteractionCommand}
 */
module.exports = {
	// The data needed to register slash commands to Discord.

	data: new SlashCommandBuilder()
		.setName("closetraining")
		.setDescription(
			"Close/Open training bot channel"
		),

	async execute(interaction) {

        const channel = interaction.guild.channels.cache.get("1015368293982416907");
		
		const botEmbed = new EmbedBuilder()
			.setColor(0x0085c1)
			.setFooter({ text: 'Made with 💙 for Team Synix by .zen'})
			.setTitle("Game Command")
			.setAuthor({ name: 'Team Synix Mangement Team' })
			.setDescription("``/game set: #⚽︱Lobby max:3 ct: #Matches`` \n \n set: Lobby/Channel wo alle Spieler sind \n max: maximale Teamgröße (3) \n ct: Category wo die Games channel erstellt werden")

        await channel.bulkDelete('10', true);        

        const msg = await channel.send({ embeds: [botEmbed] });
        msg.pin();

        interaction.reply({ content: 'Done!', ephemeral: true });

	},
};
