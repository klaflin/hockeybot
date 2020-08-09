const fs = require('fs');
const files = 'Acceptable filenames include:\ntestq1,';

module.exports = {
  name: 'display2',
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
      const { questions, options, emojis } = require(questionFile);

      //for debugging:
      console.log(questions);
      console.log(options);
      console.log(emojis);

      if(!(questions.length === options.length) || !(questions.length === emojis.length)) {
        return message.reply('Invalid set of questions and answers.')
      } 
      //condenses the option set from an array of arrays of strings to an array of strings w each option on a new line
      const optionSet = options.map(array => array.map(option => option + '\n').join(""));
      //finds emoji cache with given emoji name from array
      //** unnas i know this sucks pls make it a better thing 
      const emojiSet = emojis.map(array => array.map(emojiName => message.guild.emojis.cache.find(emoji => emoji.name === emojiName)));
      //zippers the questions to their options and emojis
      const questionSets = questions.map((q,i) => [q, optionSet[i], emojiSet[i]]);

      console.log(questionSets);

      //creates an embed of a question and its answers
       function printQuestion(q, as, em) {
        let emojiArray = em;
        const upcomingEmbed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .addFields(
          [
            {
              name: q,
              value: as,
            }
          ])

        return message.channel.send(upcomingEmbed).then(async embedMessage => {
          try {
               await emojiArray.forEach(id => embedMessage.react(id));
                 //for testing emoji display: 
                /*await embedMessage.react('🍎');
                await embedMessage.react('🍊');
                await embedMessage.react('🍇');*/
              } catch (error) {
                console.error('One of the emojis failed to react.');
              } 
          }); 
      }

      questionSets.forEach(printQuestion);
    }
  }} 