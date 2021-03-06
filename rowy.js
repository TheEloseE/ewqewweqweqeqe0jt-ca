const Discord = require("discord.js");
const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS,Discord.Intents.FLAGS.GUILD_MEMBERS,Discord.Intents.FLAGS.GUILD_BANS,Discord.Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,Discord.Intents.FLAGS.GUILD_INTEGRATIONS,Discord.Intents.FLAGS.GUILD_WEBHOOKS,Discord.Intents.FLAGS.GUILD_INVITES,Discord.Intents.FLAGS.GUILD_VOICE_STATES,Discord.Intents.FLAGS.GUILD_PRESENCES,Discord.Intents.FLAGS.GUILD_MESSAGES,Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,Discord.Intents.FLAGS.GUILD_MESSAGE_TYPING,Discord.Intents.FLAGS.DIRECT_MESSAGES,Discord.Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,Discord.Intents.FLAGS.DIRECT_MESSAGE_TYPING] });
const fs = require("fs");
const moment = require("moment");
const config = require("./config.json");

client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();


/*              COMMAND FILES              */

const commander = fs.readdirSync('./commands').filter(files => files.endsWith('.js'));
for (const files of commander) {
	const command = require(`./commands/${files}`);
    client.commands.set(command.name, command);
    const date = new Date()
    console.log("["+ moment(date).format("DD/MM/YYYY HH:mm") + "]: Command named " + command.name + " is loaded")
}

/*              COMMAND FILES              */

/*               EVENT FILES               */

const requestEvent = (event) => require(`./events/${event}`)
client.on('messageCreate', (messageCreate) => requestEvent('message')(messageCreate,client));

/*               EVENT FILES               */

client.on("ready", async () => {

    client.user.setPresence({ activities: [{ name: config.activities }] });
    console.log('Im Ready.')

})


client.on("messageCreate", async message => {

    client.user.setPresence({ activities: [{ name: config.activities }] });

    let channel = message.channel

    if(message.content.toLocaleLowerCase() === "bilgi") {

        client.users.fetch("800474773645033514").then(async (user) => {

        const embed = new Discord.MessageEmbed()
        embed.setAuthor(user.tag, user.displayAvatarURL({ dynamic: true }))
        embed.setColor("AQUA")
        embed.setDescription("Bu botun ger??ek sahibi **[Aronshire](https://github.com/Aronshire)**'dir!\n\nPeki ger??ek sahibi **Aronshire** ise neden sen payla??t??n?\n\nSebebi: Aronshire kankam??n v12 altyap??s??n?? alarak v13 ??evirdim ve bir ka?? yeri d??zenledim e??er isterse githubdan kald??r??r??m.")
        embed.addFields({ 
            name: "Peki biz bu Aronshire'ye nas??l ulabiliriz?", value: "Yukar??da her bu mesaj?? yazd??????n??zda g??ncel **Kullan??c?? Ad??** ve **Etiketi** mevcut. :)\nA??a????daki emojilere t??klad??????n??zda sizleri y??nlendirecektir.\n\n**Aronshire GITHUB [:globe_with_meridians:](https://github.com/Aronshire)**\n**Aronshire Discord [:link:](https://discord.gg/yNEPQhGXUB)**"}
        )
        embed.setThumbnail(user.displayAvatarURL({ dynamic: true }))
        channel.send({ content: '??lk ??ncelikle v13 Botumu Kulland??????n ????in Te??ekk??r Ederim :heart:', embeds: [embed] })
    
        })
    }

})

client.login(config.token)