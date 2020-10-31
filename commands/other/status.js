const Discord = module.require("discord.js");
const os = require("os");

module.exports.run = async (client, message, args) => {
	const duration = client.uptime;

	const milliseconds = parseInt((duration % 1000) / 100);
	let seconds = parseInt((duration / 1000) % 60);
	let minutes = parseInt((duration / (1000 * 60)) % 60);
	let hours = parseInt((duration / (1000 * 60 * 60)) % 24);
	hours = (hours < 10) ? "0" + hours : hours;
	minutes = (minutes < 10) ? "0" + minutes : minutes;
	seconds = (seconds < 10) ? "0" + seconds : seconds;

	const target = client.user;

	owners = client.settings.owner_id;

	const embed = new Discord.RichEmbed()
		.setAuthor(`${target.username} by Platinum#0001`, target.displayAvatarURL)
		.setColor((await client.findColour(message, target)))
		.setThumbnail(target.displayAvatarURL)
		.setDescription(`Serving ${client.users.size} users in ${client.guilds.size} guilds.`)
		.addField("Ram usage", `${(os.freemem() / 1048576).toFixed(0)}MB`, true)
		.addField("Uptime", `${hours}:${minutes}:${seconds}.${milliseconds}`, true)
		.setTimestamp();

	return message.channel.send(embed);
};

module.exports.help = {
	name: "status",
	description: "Checks bot info",
	usage: "help",
	dmCommand: true,
};
