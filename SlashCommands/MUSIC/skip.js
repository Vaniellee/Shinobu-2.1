const { MessageEmbed } = require('discord.js')
const { ApplicationCommandOptionType } = require('discord-api-types/v9');

module.exports = {
  name: "skip",
  description: "🎶 skips the player!",
  inVc: true,
  sameVc: true,

  run: async (client, interaction, args) => {
    const player = client.poru.players.get(interaction.guild.id);
    player.stop()
    interaction.reply({ color: 'PURPLE', description: 'Skipped the current song!' });
  }
} // try it 