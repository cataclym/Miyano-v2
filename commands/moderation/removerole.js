const Discord = module.require("discord.js");

module.exports.run = async (client, message, args) => {
	const query = client.db;

	function embedFail(text) {
		const embed = new Discord.RichEmbed()
			.setColor("#ff0000")
			.setDescription(text);

		return embed;
	}

	function embedSuccess(text) {
		const embed = new Discord.RichEmbed()
			.setColor("#7CFC00")
			.setDescription(text);

		return embed;
	}

	if (!args[0]) return message.channel.send("Please specify a user!");
	const toAdd = message.guild.members.get(args[0]) || message.guild.members.get(message.mentions.users.first().id);

	const rolejoin = args.slice(1).join(" ");
	const myRole = message.guild.roles.find(val => val.name.toLowerCase() === rolejoin.toLowerCase());
	if (!myRole) return message.channel.send("I cannot find this role!");

	if (!toAdd) return message.channel.send("User not found!");
	if (!rolejoin) return message.channel.send("Please specify a role to remove!");

	const clientRole = message.guild.members.get(client.user.id).highestRole;
	const userRole = message.guild.members.get(message.author.id).highestRole;

	if (clientRole.comparePositionTo(myRole) <= 0) return message.channel.send(embedFail("This role is higher than me, I cannot add this role!"));
	if (userRole.comparePositionTo(myRole) <= 0) return message.channel.send(embedFail("This role is higher than you, I cannot add this role!"));

	toAdd.removeRole(myRole);
	return await message.channel.send(embedSuccess(`Removed role ${myRole.name} from ${toAdd.user.username}#${toAdd.user.discriminator}.`));
};

module.exports.help = {
	name: "removerole",
	description: "removes a role to a user.",
	usage: "removerole @Platinum [role]",
	permissions:
    [
    	"MANAGE_ROLES",
    ],
	aliases:
    [
    	"rr",
    ],
};
