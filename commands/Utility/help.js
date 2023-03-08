const { MessageEmbed } = require("discord.js");
const { readdirSync } = require("fs");
module.exports = {
  name: "help",
  run: async (client, message, args) => {
    let prefix = client.prefix


    if (!args[0]) {

      // copyright 2022 @diwasatreya

      const embed = new MessageEmbed()
        .setTitle("You can also use it as a prefix. (!)")
      .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
        .setAuthor({ name: "Shinobu help menü!!!", iconURL: client.user.avatarURL() })
        .setImage('https://media1.giphy.com/media/MyLk3W3lliLe/giphy.gif')
        .setDescription("**Hello, I'm a bot (yes you already know that) I'm here to make you listen to good songs..**\n\n Invite Me: [add](https://discord.com/api/oauth2/authorize?client_id=1031201130803368066&permissions=8&scope=applications.commands%20bot) I'm sure you'll be happy that you added me\n\n **Commands**\n » `!help` - Shows the help menü.\n » `/back` - If you want to get the music back.\n » `/disconnect` -  If you want to turn off the music.\n » `/loop` - If you want to loop and listen to the song.\n » `/pause` - If you want to turn off the music.\n » `/play` - Do you want to open a song?\n » `/resume` -  If you want to continue music.\n » `/seek` - If you want to search for music.\n » `/skip` - If you want to skip the music.\n » `/i` - To get information about the bot.\n\n Helloooo friend, I'm **Shinobu** I came to have fun with you, shall we listen to a song? ")


        .setFooter(
          `Requested by ${message.author.tag}`,
          message.author.displayAvatarURL({ dynamic: true })
        ).setFooter(``)
        .setTimestamp()
        .setColor("PURPLE");
      return message.reply({ embeds: [embed] });
    } else {
      const command =
        client.commands.get(args[0].toLowerCase()) ||
        client.commands.find(
          (c) => c.aliases && c.aliases.includes(args[0].toLowerCase())
        );

      if (!command) {
        const embed = new MessageEmbed()
          .setTitle(`Invalid command! Use \`${prefix}help\` for all of my commands!`)

          .setColor("FF0000");
        return message.channel.send(embed);
      }

      const embed = new MessageEmbed()
        .setTitle("Help Command: " + args[0])
        .addField("PREFIX:", `\`!\``)
        .addField(
          "COMMAND:",
          command.name ? `\`${command.name}\`` : "No name for this command."
        )
        .addField(
          "ALIASES:",
          command.aliases
            ? `\`${command.aliases.join("` `")}\``
            : "No aliases for this command."
        )
        .addField(
          "USAGE:",
          command.usage
            ? `\`?${command.name} ${command.usage}\``
            : `\`?${command.name}\``
        )
        .addField(
          "DESCRIPTION:",
          command.description
            ? command.description
            : "No description for this command."
        )
        .setFooter(
          `Requested by ${message.author.tag}`,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setTimestamp()
        .setColor("Purple");
      return message.reply({ embeds: [embed] });
    }

  }
}
