const { MessageEmbed } = require('discord.js')
const { ApplicationCommandOptionType } = require('discord-api-types/v9');

module.exports = {
  name: "disconnect",
  description: "🎶 disconnect the bot!",
  inVc: true,
  sameVc: true,
  player: true,
  run: async (client, interaction, args) => {
    const player = client.poru.players.get(interaction.guild.id);
    player.destroy();
    return interaction.reply({ embeds: [{ color: 'Purple', description: '<:yesiltiks:1051576461921894482> |  Disconnected the player!' }] })
  }
}
