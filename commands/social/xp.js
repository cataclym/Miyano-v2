const Discord = module.require("discord.js");
const moment = require("moment");

module.exports.run = async (client, message, args) => {
	const text = args.slice(0).join(" ");
	const query = client.db;
	let xp;
	if (!text) target = message.author;

	target = await client.findUser(message, text);
	if (!target) return message.channel.send("User not found");

	const res = await query(`SELECT * FROM xp WHERE (user_id = '${target.id}' AND guild_id = '${message.guild.id}')`);
	if (!res[0]) {
		xp = 0;
	}
	else {
		xp = res[0].xp;
	}

	const embed = new Discord.RichEmbed()
		.setAuthor(`Current xp for ${target.username}#${target.discriminator}`, target.displayAvatarURL)
		.setDescription(`${target.username} currently has ${xp} XP.`)
		.setColor(await client.findColour(message, client.user));

	message.channel.send(embed);
};

module.exports.help = {
	name: "xp",
	description: "Shows your xp for the guild.",
	usage: "xp",
	type: "utility",
};