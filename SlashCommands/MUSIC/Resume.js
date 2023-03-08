const { MessageEmbed } = require('discord.js')
const { ApplicationCommandOptionType } = require('discord-api-types/v9');

module.exports = {
  name: "resume",
  description: "🎶 Resumes the player!",
  inVc: true,
  sameVc: true,
  
  run: async (client, interaction, args) => {
   const player = client.poru.players.get(interaction.guild.id);

    if (!player.isPaused) {
      player.pause(false)
      interaction.reply({ embeds: [{
        color: 'PURPLE',
        title: ` Player is  Resumed`
      }]})
    }
    else {
      if (player.isPaused) {
      player.pause(false)
      return interaction.reply({ embeds: [{
        color: 'PURPLE',
        title: `Resumed`
      }]})
    }
    }
    
  }
} // try it 

  