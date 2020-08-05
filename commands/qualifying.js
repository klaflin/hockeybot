module.exports = {
	name: 'qualifying',
	execute(message, args) {
		const Discord = require('discord.js');
		const exampleEmbed = new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle('Qualifying Round Options')
	.addFields(
		[
		{
			name: 'Eastern Conference Matchups:',
			value: '#9 Columbus Blue Jackets or #8 Toronto Maple Leafs \n #10 Florida Panthers or #7 New York Islanders \n #11 New York Rangers or #6 Carolina Hurricanes \n #12 Montreal Canadiens or #5 Pittsburgh Penguins', 
		},
		{
			name: 'Western Conference Matchups:',
			value: '#9 Winnipeg Jets or #8 Calgary Flames \n #10 Minnesota Wild or #7 Vancouver Canucks \n #11 Arizona Coyotes or #6 Nashville Predators \n #12 Chicago Blackhawks or #5 Edmonton Oilers', 
		},
		{
			name: 'Who will be the 1 seed in the Eastern Conference?',
			value: "Boston Bruins \n Tampa Bay Lightning \n Washington Capitols \n Philidelphia Flyers ",
		},
		{
			name: 'Who will be the 1 seed in the Western Conference?',
			value: "St. Louis Blues \n Colorado Avalanche \n Vegas Golden Knights \n Dallas Stars",
		},
		{
			name: 'Will any player record a hat trick during the Qualifying Round?',
			value: '\u200b',
		},
		{
			name: 'Will any Qualifying Round series end in a sweep?',
			value: '\u200b',
		},
		{
			name: 'Who will record a higher save percentage during the Seeding Round Robin?',
			value: 'Tukka Rask \n Jake Allen',
		},
		{
			name: 'Which of these players will score the most goals in the Seeding Round Robin?',
			value: 'Alex Ovechkin \n Nikita Kucherov \n Patrice Bergeron \n David Pastrnak',
		},
		
	],)

	message.channel.send(exampleEmbed);
	},
};