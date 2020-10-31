const Discord = require("discord.js");

module.exports = async message => {

	if (message.author.bot) return;
	const client = message.client;
	const settings = client.settings;
	let prefix = settings.prefix;
	const query = client.db;

	const messageArray = message.content.split(" ");
	const args = messageArray.slice(1);
	const command = messageArray[0];
	let isOwner = false;
	if (settings.owner_id == message.author.id) isOwner = true;

	if (message.channel.type == "dm") {
		await dmOwner(message);
		const cmd = client.commands.get(command.slice(prefix.length)) ||
        client.commands.get(client.aliases.get(command.slice(prefix.length)));

		if (cmd.help.dmCommand) cmd.run(client, message, args);
	}
	else {
		if (!command.startsWith(prefix)) {
			const res = await query(`SELECT * FROM guilds where guild_id='${message.guild.id}'`);
			if (res[0]) prefix = res[0].prefix;
		}

		require("../util/filter.js")(message, message.content);
		require("../util/xpHandler.js")(message);

		if (!command.startsWith(prefix)) return;

		const cmd = client.commands.get(command.slice(prefix.length)) ||
        client.commands.get(client.aliases.get(command.slice(prefix.length)));

		if (!cmd) return;

		if ((cmd.help.type == "owner" && !isOwner)) return;
		const bool = await require("../util/permsChecker.js")(cmd, message);
		if (bool) {
			cmd.run(client, message, args);
		}
	}
};

function dmOwner(message) {
	const client = message.client;
	const c = client.users.get(client.settings.owner_id);

	if (message.author.id == client.settings.owner_id) return;

	const embed = new Discord.RichEmbed()
		.setAuthor(`Message recieved from ${message.author.username}`, message.author.displayAvatarURL)
		.setColor("#FFFFFF")
		.setDescription(`Content: ${message.content}`)
		.setTimestamp()
		.setFooter(`${message.author.id}`);

	return c.send(embed);
}