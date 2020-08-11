
module.exports = {
  name: 'unnas',
  description: `Unnas was chosen for the constitutional convention.`,
  usage: '[command name]',
  cooldown: 5,
  execute(message, args) {
  	const Discord = require('discord.js');

const unnasImage = new Discord.MessageEmbed()
	.attachFiles(['../images/unnasconference.png'])
	.setImage('attachment://unnasconference.png');

return channel.send(unnasImage);
}}