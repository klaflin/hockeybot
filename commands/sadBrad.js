module.exports = {
  name: 'sadbrad',
  description: `Brad was sad. Maybe somebody licked him?`,
  usage: '[command name]',
  cooldown: 5,
  execute(message, args) {
  	const Discord = require('discord.js');

const sadBrad = new Discord.MessageEmbed()
	.attachFiles('./images/sadBrad.png')
	.setImage('attachment://sadBrad.png');

	return message.channel.send(sadBrad);
}}