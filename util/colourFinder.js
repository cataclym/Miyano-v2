module.exports = async (message, user) => {
	const embedColor = "#f3c2ab";
	if (message.channel.type == "dm") return embedColor;

	const guildMember = message.guild.members.get(user.id);

	if (!guildMember) return embedColor;
	if (guildMember.displayColor == "0") return embedColor;
	else return guildMember.displayColor;
};