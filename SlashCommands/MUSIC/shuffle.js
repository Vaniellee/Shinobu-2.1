const { MessageEmbed } = require('discord.js')
const { ApplicationCommandOptionType } = require('discord-api-types/v9');

module.exports = {
  name: "shuffle",
  description: "🎶 Shuffle the playlist!",
  inVc: true,
  sameVc: true,
  
  run: async (client, interaction, args) => {
   const player = client.poru.players.get(interaction.guild.id);

   if(player.queue.length <= 2){
  interaction.reply( { color: 'PURPLE', description: 'Can\'t Shuffle the queue'});
}
player.queue.shuffle()
 
    return interaction.reply( { color: 'PURPLE', description: 'Shuffled the playlist.'});
  }
}
    
