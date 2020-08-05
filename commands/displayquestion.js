const fs = require('fs');
const files = 'Acceptable filenames include:\ntestq1,';

module.exports = {
	name: 'displayq',
	description: `Displays the given question and its answers. ${files}`,
	usage: '[command name filename]',
	cooldown: 5,
	execute(message, args) {
		const Discord = require('discord.js');
		const questionFile = '../questions/' + args[0] + '.json';

		if (!questionFile) {
			return message.reply(`that file does not exist. Try one of the following:\n ${files}`);
		} else {

			// questions is an array of questions; options is an array of arrays containing the options for the questions
			const { questions, options } = require(questionFile);

			//for debugging:
			console.log(questions);
			console.log(options);

			if(!(questions.length === options.length)) {
				return message.reply('Invalid set of questions and answers.')
			} 
			//condenses the option set from an array of arrays of strings to an array of strings w each option on a new line
			const optionSet = options.map(array => array.map(option => option + '\n').join(""));
			//zippers the questions to their options
			const qSets = questions.map((q,i) => [q, optionSet[i]]);

			const starsEmoji = message.guild.emojis.cache.find(emoji => emoji.name === 'd_stars');
      		const bluesEmoji = message.guild.emojis.cache.find(emoji => emoji.name === 'blues');
      		const bruinsEmoji = message.guild.emojis.cache.find(emoji => emoji.name === 'bruins');

			//creates an embed of a question and its answers
			function printQuestion(q, as) {
				const upcomingEmbed = new Discord.MessageEmbed()
				.setColor('#0099ff')
				.addFields(
					[
						{
							name: q,
							value: as,
						}
					])
				return message.channel.send(upcomingEmbed)
				.then(embedMessage => {
					try {
		      		embedMessage.react(starsEmoji); //stars emoji
				    embedMessage.react(bluesEmoji); //blues emoji
				    embedMessage.react(bruinsEmoji); //bruins emoji
					} catch(error) {
						console.error('One of the emojis failed to react.')
					}
				})
		    	; 
			}

			qSets.forEach(printQuestion);
		}
	}} 
