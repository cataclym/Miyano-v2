const Discord = module.require("discord.js");

exports.run = async (bot, message, args) => {

	function embedHelp(m, text, thumb) {
		const embed = new Discord.RichEmbed()
			.setColor("#9B59B6")
			.addField(m, text)
			.setFooter(thumb);
		return embed;
	}


	const helpme = args[0];
	if (!helpme) {
		const cmds = new Map();
		const embed = new Discord.RichEmbed()
			.setAuthor(`List of commands for ${bot.user.username}`, bot.user.avatarURL)
			.setColor(await bot.findColour(message, bot.user))
			.setFooter("Use help [command] for more info on each command.");

		bot.commands.forEach(k => {
			if (!k.help.type || k.help.type == "") return;
			if (!cmds.has(k.help.type)) cmds.set(k.help.type, []);
			cmds.get(k.help.type).push(k.help.name);
		});

		const keys = Array.from(cmds.keys());
		keys.sort();

		keys.forEach(e => {
			commands = cmds.get(e);
			embed.addField(e.capitalize(), commands.join(", "));
		});

		message.channel.send(embed);
	}

	if (helpme) {

		const cmd = bot.commands.get(helpme);
		if (cmd.help.name == "help") return;

		const embed = new Discord.RichEmbed()
			.setColor((await bot.findColour(message, bot.user)))
			.addField(`Help: ${cmd.help.name}`, `${cmd.help.description}`)
			.setFooter(`Usage: ${cmd.help.usage}`);

		message.channel.send(embed);
	}
};

exports.help = {
	name: "help",
	type: "help",
	dmCommand: true,
};

String.prototype.capitalize = function() {
	return this.charAt(0).toUpperCase() + this.slice(1);
};