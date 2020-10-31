module.exports = async (message, text) => {
	const client = message.client,
		query = client.db,
		member = message.guild.members.get(message.author.id);

	if (member.hasPermission("MANAGE_MESSAGES")) return;

	const res = await query(`select * from filter where guild_id = '${message.guild.id}'`);
	if (!res[0]) return;

	let filtered = false;
	res.forEach(phrase => {
		if (filtered === true) return;
		const filter = text.split(" ").filter((word) => {
			return word.toLowerCase() === phrase.phrase.toLowerCase() || word.toLowerCase().includes("discord.gg");
		});
		if (filter.length > 0) {
			message.delete();
			filtered = true;
			return message.channel.send(`${message.author}, you are not allowed to use a banned word/phrase.`);
		}
	});
};