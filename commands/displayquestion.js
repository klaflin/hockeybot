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

			const starsEmoji = message.guild.emojis.cache.find(starsEmoji => starsEmoji.name === 'dstars');
			//console.log(starsEmoji);

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
				return message.channel.send(upcomingEmbed).then(embedMessage => {
		      		embedMessage.react('739642783500861563'); //stars emoji
				    embedMessage.react('739641453936115745'); //blues emoji
				    embedMessage.react('739641454460272720'); //bruins emoji
				    //.catch(() => console.error('Emojem failed to react.')); 
		    	}); 
			}

			qSets.forEach(printQuestion);
		}
	}} 
