const Discord = module.require("discord.js");

module.exports.run = async (client, message, args, db) => {
	const query = client.db;

	const res = await query(`SELECT * FROM roles WHERE guild_id = '${message.guild.id}'`);
	let assignNames = "";

	const numbRoles = res.length;
	if (res.length == 0) assignNames = "There are no self assignable roles.";
	for (i = 0; i < numbRoles; i++) {
		const myRole = message.guild.roles.find("id", res[i].role_id);
		if (!myRole) {
			await query(`DELETE FROM roles where guild_id = '${message.guild.id}' AND role_id = '${res[i].role_id}'`);
			return;
		}

		if (i == numbRoles - 1) {
			assignNames += myRole.name + ".";
		}
		else {
			assignNames += myRole.name + ", ";
		}
	}

	const guildMem = message.guild.members.get(client.user.id);

	const embed = new Discord.RichEmbed()
		.setAuthor(`List of roles for ${message.guild.name}`, message.guild.iconURL)
		.setColor(guildMem.displayColor)
		.addField("Roles", `${assignNames}`);

	message.channel.send(embed);
};

module.exports.help = {
	name: "listroles",
	description: "Lists self assignable roles.",
	usage: "listroles",
	type: "roles",
};