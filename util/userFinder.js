module.exports = async (message, text) => {

	let target = message.author;

	if (text) {
		target = await message.client.users.get(text)
                      || await message.client.users.filter(u => u.tag.toLowerCase().includes(text.toLowerCase())).first()
                      || await message.mentions.users.first();
	}

	return target;
};