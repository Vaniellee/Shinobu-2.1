const discord = require("discord.js")
const ms = require("ms")
const { MessageActionRow, MessageButton } = require('discord.js');
module.exports.run = async (client, player, track) => {

  let button1 = new MessageButton()
    .setLabel(`Pause`)
    .setEmoji("<:resume:1082694364393898034>")
    .setCustomId(`pause`)
    .setStyle("PRIMARY");

  let button2 = new MessageButton()
    .setLabel(`Resume`)
    .setEmoji("<:resume:1082694364393898034>")
    .setCustomId(`resume`)
    .setStyle("SUCCESS");

  let button3 = new MessageButton()
    .setLabel(`Skip`)
    .setEmoji(`<a:skip:1082695017941975181>`)
    .setCustomId(`skip`)
    .setStyle("SUCCESS");

  let button4 = new MessageButton()
    .setLabel(`Pause`)
    .setEmoji("<:resume:1082694364393898034>")
    .setCustomId(`dpause`)
    .setDisabled(true)
    .setStyle("SECONDARY");

  let button5 = new MessageButton()
    .setLabel(`Resume`)
    .setEmoji("<:resume:1082694364393898034>")
    .setCustomId(`dresume`)
    .setDisabled(true)
    .setStyle("SECONDARY");

  let button6 = new MessageButton()
    .setLabel(`Skip`)
    .setEmoji(`<a:skip:1082695017941975181>`)
    .setCustomId(`dskip`)
    .setDisabled(true)
    .setStyle("SECONDARY");

  let button7 = new MessageButton()
    .setLabel(`Stop`)
    .setEmoji(`<a:stop:1082699524096675951>`)
    .setCustomId(`stop`)
    .setStyle("DANGER");

  let button8 = new MessageButton()
    .setLabel(`Stop`)
    .setEmoji(`<a:stop:1082699524096675951>`)
    .setCustomId(`dstop`)
    .setDisabled(true)
    .setStyle("SECONDARY");



  let rowss = new MessageActionRow()
    .addComponents(button4, button5, button6, button8);


  let row = new MessageActionRow()
    .addComponents(button1, button3, button7);

  let rows = new MessageActionRow()
    .addComponents(button2, button3);


  const embed = new discord.MessageEmbed()
    .setColor("PURPLE")
    .setTitle('Started Playing.. <a:disk:1081896564949254194>')
    .setThumbnail(track.info.image)
    .setTimestamp()
    .setDescription(`**Music being played:** [${track.info.title}](${track.info.uri}) \n\n **Song Duration** ${ms(track.info.length)}   \n\n **Status:** **Playing** \n\n *You need to enter the audio channel to use my buttons.*`)
    .setFooter(`Author: ${track.info.author}`);

  const embed3 = new discord.MessageEmbed()
    .setColor("PURPLE")
    .setTitle('Song was Ended')
    .setThumbnail(track.info.image)
    .setTimestamp()
    .setDescription(`**Music being played:** [${track.info.title}](${track.info.uri}) \n\n **Song Duration** ${ms(track.info.length)}   \n\n **Status:** **Finished** `)
    .setFooter(`Author: ${track.info.author}`);

  const MESSAGE = await player.textChannel.send({ embeds: [embed], components: [row] });

  const ttt = `${track.info.length}`

  const filter = i => i.guild.me.voice.channel == i.member.voice.channel


  const collector = MESSAGE.channel.createMessageComponentCollector({ filter, time: ttt });
  collector.on('collect', async i => {

    const embed4 = new discord.MessageEmbed()
      .setColor("PURPLE")
      .setTitle('Started Playing.. <a:disk:1081896564949254194>')
      .setThumbnail(track.info.image)
      .setTimestamp()
      .setDescription(`**Music being played:** [${track.info.title}](${track.info.uri}) \n\n **Song Duration** ${ms(track.info.length)}   \n\n **Status:** Resumed by <@${i.user.id}> \n\n *People in <#${i.guild.me.voice.channel.id}> can use button* `)
      .setFooter(`Author: ${track.info.author}`);

    const embed2 = new discord.MessageEmbed()
      .setColor("PURPLE")
      .setTitle('Music Paused')
      .setThumbnail(track.info.image)
      .setTimestamp()
      .setDescription(`**Music being played:** [${track.info.title}](${track.info.uri}) \n\n **Song Duration:** ${ms(track.info.length)}   \n\n **Status:** Paused by <@${i.user.id}> \n\n *People in <#${i.guild.me.voice.channel.id}> can use button* `)
      .setFooter(`Author: ${track.info.author}`);

    const embed5 = new discord.MessageEmbed()
      .setColor("PURPLE")
      .setTitle('The music is over.')
      .setThumbnail(track.info.image)
      .setTimestamp()
      .setDescription(`**Music being played:** [${track.info.title}](${track.info.uri}) \n\n **Song Duration** ${ms(track.info.length)}   \n\n **Status:** Skiped by <@${i.user.id}> `)
      .setFooter(`Author: ${track.info.author}`);


    if (i.customId === 'pause') {


      // if (i.guild.me.voice.channel !== i.member.voice.channel) {
      //  await i.reply({ content: 'You have to join my VC!', ephemeral: true});
      // }

      await i.deferUpdate();
      if (player.isPaused) {
        await i.reply({ content: 'Music is Already Paused', ephemeral: true });
      }

      if (!player.isPaused) {

        player.pause(true)
        await i.editReply({ embeds: [embed2], components: [rows] });
      }
    }

    if (i.customId === 'resume') {
      await i.deferUpdate();


      player.pause(false)
      await i.editReply({ embeds: [embed4], components: [row] });



    }

    if (i.customId === 'skip') {
      await i.deferUpdate();

      player.stop();
      await i.editReply({ embeds: [embed5], components: [rowss] });



    }




    if (i.customId === 'stop') {
      await i.deferUpdate();
      player.destroy()
      await i.editReply({ embeds: [embed5], components: [rowss] });



    }
  });

  collector.on('end', async (i) => {
    await MESSAGE.edit({ embeds: [embed3], components: [rowss] });
  })


}