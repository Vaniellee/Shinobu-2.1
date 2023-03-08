module.exports.run = async (client, interaction) => {


    if (interaction.isCommand()) {
  
        const command = client.slash.get(interaction.commandName);
        if (!command) return interaction.reply({ content: 'An error has occurred!' });
if (!command) return

  const player = client.poru.players.get(interaction.guild.id);
  const memberChannel = interaction.member.voice.channelId;
  const botChannel = interaction.guild.me.voice.channelId;


    //Voice Only
    if (command.inVc && !memberChannel) {
      return interaction.reply('In order to use this command, you must be on an audio channel!')
    }
  //same vc
  if (command.sameVc && player && botChannel !== memberChannel) {

    return interaction.reply('You have to come to me!')


  }
  //player
  if (command.player && !player) {
    return  interaction.followUp(`No Player exists for this Guild!`)
  }
    if (command.current && !player.currentTrack){
interaction.followUp("There are no members for this server!")
    }



//error aayga sayad



      
       
        try {

            command.run(client, interaction)

        } catch (e) {

            interaction.reply({ content: e.message });


        }

    }


}