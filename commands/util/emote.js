const Discord = require("discord.js");
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

exports.run = async (client, message, args) => {
	if (!args[0]) return message.channel.send("Please specify an emote!");
	const emotetext = args[0];
	const emoteRegex = /\:(\d.*?[0-9])\>/;
	const notid = emotetext.match(emoteRegex);
	if (!notid) return;
	const id = notid[1];

	const nameRegex = /\:(.*?)\:/;
	const emotenameresult = emotetext.match(nameRegex);
	if (!emotenameresult) return;
	const emotename = emotenameresult[1];

	let extension = "png";
	if (imageExists(id)) extension = "gif";

	message.channel.send(`**Emote:** :${emotename}:`, {
		file: `https://cdn.discordapp.com/emojis/${id}.${extension}`,
	});
};

exports.help = {
	name: "emote",
	description: "Shows a full resolution image of a specified emote.",
	usage: "emote [emote name]",
	aliases: [ "se", "emoji" ],
	dmCommand: true,
};


function imageExists(id) {

	const http = new XMLHttpRequest();

	http.open("HEAD", `https://cdn.discordapp.com/emojis/${id}.gif`, false);
	http.send();
	return http.status == 200;
}