const Discord = module.require("discord.js");

exports.run = async (client, message, args) => {
	if (!args[1]) {
		if (!args[0]) guildID = message.guild.id;
		else guildID = args[0];

		console.log(client.settings);
		if (!client.settings.owner_id == message.author.id) guildID = message.guild.id;
		const target = client.guilds.get(guildID);
		const emojis = target.emojis.size;
		const owner = target.members.get(target.ownerID);

		const embed = new Discord.RichEmbed()
			.setAuthor(`Guild info for ${target.name}`, target.iconURL)
			.setDescription(`ID: ${target.id}`)
			.setColor(await target.members.get(client.user.id).displayColor)
			.setThumbnail(target.iconURL)
			.addField("Owner", `${owner.user.username}#${owner.user.discriminator}`, true)
			.addField("Region", `${target.region}`, true)
			.addField("Emotes", emojis, true)
			.addField("Members", `${target.memberCount}`, true)
			.addField("Created", target.createdTimestamp, true)
			.setTimestamp();

		message.channel.send(embed);
	}
	else if (args[1] == "users") {
		if (!client.settings.owner_id == message.author.id) return;
		const target = client.guilds.get(args[0]);
		let users = "";
		target.members.forEach(e => {
			users += `\`${e.user.username}#${e.user.discriminator}\`, `;
		});
		return message.channel.send(`**List of users in ${target.name}**\n${users}`);
	}
	else if (args[1] == "channels") {
		if (!client.settings.owner_id == message.author.id) return;
		const target = client.guilds.get(args[0]);
		let channels = "";
		target.channels.forEach(e => {
			channels += `${e.name}, `;
		});
		return message.channel.send(`**List of channels in ${target.name}**\n${channels}`);
	}
};

exports.help = {
	name: "guildinfo",
	description: "Checks a guild.",
	usage: "guildinfo id",
	type: "",
};