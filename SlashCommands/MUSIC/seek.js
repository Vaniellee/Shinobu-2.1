const { MessageEmbed } = require('discord.js')
const { ApplicationCommandOptionType } = require('discord-api-types/v9');

module.exports = {
  name: "seek",
  description: "🎶 seek the player!",
  inVc: true,
  sameVc: true,
  
  run: async (client, interaction, args) => {
   const player = client.poru.players.get(interaction.guild.id);
  if(!player.currentTrack.isSeekable){
  interaction.reply( { embeds: [{
        color: 'PURPLE',
        description: `Track is not seekable`
      }]})
}
    
player.seekTo(args[0]*1000)
    
    return interaction.reply( { embeds: [{
        color: 'PURPLE',
        description: `Seeked to \`${args[0]}\``
      }]})
  }
  }
 