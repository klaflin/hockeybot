const fs = require('fs');
const files = 'Acceptable filenames include:\ntestq1,\ntestq2,\nround1,\nround2';

module.exports = {
  name: 'makepicks',
  description: `Displays the given question and its answers. ${files}`,
  usage: '[filename]',
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
      //console.log(questions);
      //console.log(options);
      //console.log(emojis);

      if(!(questions.length === options.length) || !(questions.length === emojis.length)) {
        return message.reply('Invalid set of questions and answers.')
      }

      function getEmojiCache (array){
        let guildCache = array.map(emojiName => message.guild.emojis.cache.find(emoji => emoji.name === emojiName));
        if (guildCache[0] == undefined){
          return array;
        } else {
          return guildCache;
        }}

      //condenses the option set from an array of arrays of strings to an array of strings w each option on a new line
      const optionSet = options.map(array => array.map(option => option + '\n').join(""));

      //finds emoji cache with given emoji name from array
      // unnas i know this sucks pls make it a better thing 
      // kellie this is the best line of code i've ever seen
      //well guess what i fixed it with ~abstraction~ so who is the real master hacker here 
      const emojiSet = emojis.map(getEmojiCache);

      //zippers the questions to their options and emojis into a list:
      const questionSets = questions.map((q,i) => [q, optionSet[i], emojiSet[i]]);

      //creates an embed of a question and its answers
       function printQuestion(q, as, em) {
        console.log("q: " + q)
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
          for(id of emojiArray) {
            try{
                embedMessage.react(id);
            } catch (error) {
                console.error(id + " react failed:" + error.message);
            }                
          }  
        });
      }

      // unzip the question list and print it
      for(q of questionSets) {
        printQuestion(q[0], q[1], q[2])
      }
    }
  }} 