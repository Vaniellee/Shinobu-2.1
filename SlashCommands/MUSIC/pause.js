const { MessageEmbed } = require('discord.js')
const { ApplicationCommandOptionType } = require('discord-api-types/v9');

module.exports = {
  name: "pause",
  description: "🎶 pause the player",
  inVc: true,
  sameVc: true,
  
  run: async (client, interaction, args) => {
    const player = client.poru.players.get(interaction.guild.id);
    if(player.isPaused) {
      return interaction.reply({ embeds: [{
        color: "PURPLE",
        title: 'Player is already paused!'
      }]
         })
    }
      player.pause(true);
    return interaction.reply({ embeds: [{
        color: "PURPLE",
        title: 'Player is paused now!'
      }] 
     })

  }} // try it 