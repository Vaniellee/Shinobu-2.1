module.exports.run = async (client, message) => {

  //simply ignore bot and dm messages
  if (message.author.bot || !message.guild) return;

  //if message dont start with prefix return it
  if (!message.content.startsWith(client.config.prefix)) return;


  //if message member not found find from fetch
  if (!message.member) message.guild.fetchMembers(message);

  //SCLICE FOR REMOVE PREFIX FROM ARGS, trim for remove spaces and split for make content in array
  const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);



  //take command from args first content example !help mod  taking help from it
  const cmd = args.shift().toLowerCase();


  //if command lengh is 0 example !  so it will return
  if (cmd.length === 0) return;


  let command = client.commands.get(cmd)


  //finding command from aliases
  if (!command) command = client.commands.get(client.aliases.get(cmd))
  const player = client.poru.players.get(message.guild.id);
  const memberChannel = message.member.voice.channelId;
  const botChannel = message.guild.me.voice.channelId;

  if (!command) return

  //Voice Only
  if (command.inVc && !memberChannel) {
    return message.channel.send('> <:no:1083030240642728030> In order to use this command, you must be on an **audio channel**!')
  }
  //same vc
  if (command.sameVc && player && botChannel !== memberChannel) {

    return message.channel.send('You have to come to me!')


  }
  //player
  if (command.player && !player) {
    return (`There are no members for this server!`)
  }
  if (command.current && !player.currentTrack) {
    message.channel.send("There is no music playing at the moment!")
  }

  //args
  if (command.args && !args.length) {
    return message.channel.send(":bulb: **My music commands!** \n `/play [Song]`: **You can turn on the music you want.**")
  }
  if (command.owner) {
    if (message.author.id !== "") return;
  }
  if (command) command.run(client, message, args)





}