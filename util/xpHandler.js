/* eslint-disable no-undef */
module.exports = async message => {
	const client = message.client;
	const query = client.db;
	const xp = client.xp;
	const globalxp = client.globalxp;

	const res = await query(`SELECT * from ignorexp WHERE(guild_id = '${message.guild.id}' AND channel_id = '${message.channel.id}')`);
	if (res[0]) return;

	const into = Math.floor(Math.random() * (30 - 10 + 1) + 10);

	if (!xp[message.guild.id]) xp[message.guild.id] = {};

	if (!xp[message.guild.id][message.author.id]) {
		xp[message.guild.id][message.author.id] = { cooldown: new Date() };
		runXp(message, into);
	}

	if ((((new Date() - xp[message.guild.id][message.author.id].cooldown) / 1000) > 60)) {
		runXp(message, into);
		xp[message.guild.id][message.author.id] = { cooldown: new Date() };
	}

	if (!globalxp[message.author.id]) {
		globalxp[message.author.id] = { cooldown: new Date() };
		runGlobalXp(message, into);
	}

	if ((((new Date() - globalxp[message.author.id].cooldown) / 1000) > 60)) {
		runGlobalXp(message, into);
		globalxp[message.author.id] = { cooldown: new Date() };
	}
};

async function runXp(message, into) {
	const res = await message.client.db(`SELECT * FROM xp WHERE (user_id = '${message.author.id}' AND guild_id = '${message.guild.id}')`);
	if (res.length == 0) {
		w = `INSERT INTO xp(guild_id, user_id, xp) VALUES ('${message.guild.id}','${message.author.id}',${into})`;
	}
	else {
		xp = parseInt(res[0].xp);
		w = `UPDATE xp SET xp = ${xp + into} WHERE (guild_id = '${message.guild.id}' AND user_id = '${message.author.id}')`;
	}

	await message.client.db(w);
}

async function runGlobalXp(message, into) {
	const res = await message.client.db(`SELECT * FROM users WHERE (user_id = '${message.author.id}')`);
	if (res.length == 0) {
		w = `INSERT INTO users(user_id, xp) VALUES ('${message.author.id}',${into})`;
	}
	else {
		xp = parseInt(res[0].xp);
		w = `UPDATE users SET xp = ${xp + into} WHERE (user_id = '${message.author.id}')`;
	}

	await message.client.db(w);
}