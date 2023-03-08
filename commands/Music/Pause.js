module.exports = {
  name: "pause",
  inVc: true,
  sameVc: true,
  player: true,
  current: true,
  run: async (client, message, args) => {

    let player = client.poru.players.get(message.guild.id)

    if (player.isPaused) {
      message.reply("The music has already stopped")
    }

    if (!player.isPaused) {

      player.pause(true)

      return message.reply('> :notes: There is no music playing')
    }
  }
}