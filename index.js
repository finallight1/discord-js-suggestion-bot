const config = require("./config.json");
const Discord = require("discord.js");

const bot = new Discord.Client({disableEveryone: true});

bot.on("ready", async () => {
  console.log(`${bot.user.username} is online!`);
  bot.user.setActivity("with depression (+help)", {
    type: "STREAMING",
    url: "https://www.twitch.tv/monstercat"
  });
});

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.author.dm) return;

  let prefix = config.prefix
  let messageArray = message.content.split("  ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  if(message.content.includes(`${prefix}suggest`)) {
      let usersuggestion = message.content.replace(`${prefix}suggest`,"")


    bot.fetchUser(message.author).then(myUser => {
      let suggestEmbed = new Discord.RichEmbed()
      .setAuthor(message.member.user.tag, (myUser.avatarURL))
      .setTitle('Suggestion')
      .setDescription("To suggest and idea user +suggest [your suggestion]")
      .setColor("#4287f5")
      .addField("Suggestion", usersuggestion)
      .addField("Suggestion By", message.author)

      const suggestchannel = bot.channels.find('id', 'channelId')

      suggestchannel.send(suggestEmbed)
      .then(function (suggestchannel) {
        suggestchannel.react('✅');
        suggestchannel.react('❌');
      });
      return;
    });
  }
});

bot.login(config.token)
