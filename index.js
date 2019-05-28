const config = require("config");
const Discord = require("discord.js");
const express = require("express");
const axios = require("axios");
const app = express();
const safeEval = require("notevil");
const port = process.env.PORT || 3000;

let refreshIntervalId;

const client = new Discord.Client();

const rainbowRole = message => {
  let random = "#" + ((Math.random() * 0xffffff) << 0).toString(16);

  let role = message.guild.roles.find(r => r.name === "Tech Leads");

  role.setColor(random);
};

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", message => {
  if (message.content.substring(0, 7) === "!crypto") {
    const symbol = message.content.substring(8).toUpperCase();

    const URL =
      "https://sandbox-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest";
    axios
      .get(URL, {
        params: { symbol },
        headers: { "X-CMC_PRO_API_KEY": config.get("cmp") }
      })
      .then(response => {
        // If request is good...
        message.channel.send(
          `USD $${response.data.data[symbol].quote.USD.price}`
        );
      })
      .catch(() => {
        message.channel.send(`Meow?`);
      });
  }

  if (message.content === "HouseCatStartTheDisco") {
    message.channel.send("Meow");
    refreshIntervalId = setInterval(() => {
      rainbowRole(message);
    }, 3000);
  }

  if (message.content === "HouseCatStopTheDisco") {
    message.channel.send("Hiss");
    clearInterval(refreshIntervalId);
  }

  if (message.content === "pets housecat") {
    message.channel.send("Meow Meow");
  }

  if (message.content.slice(0, 9) === "urbandict") {
    const sentence = message.content.slice(10).toLowerCase();

    axios
      .get(`http://api.urbandictionary.com/v0/define?term=${sentence}`)
      .then(response => {
        if (sentence.includes("shreyas")) {
          message.channel.send(
            "```" +
              "A sexual position involving a laptop, where you code and then compile when you cum, i just did a [shreya]" +
              "```"
          );
        } else if (sentence.includes("kishan")) {
          message.channel.send(
            "```" + "Legendary guy with an above average [asshole] size" + "```"
          );
        } else if (sentence.includes("munsterberg")) {
          message.channel.send(
            "```" +
              "A guy who kicks homeless men in the nutsack when they are not watching, i just [munsterberged] that dude!" +
              "```"
          );
        } else if (sentence.includes("mivo")) {
          message.channel.send(
            "```" +
              "The vehicle arnold schwarzenegger requests on back-up" +
              "```"
          );
        } else if (sentence.includes("chris")) {
          message.channel.send(
            "```" +
              "Youtuber known for making noobs grab their ball sacks and pillage the software industry with their new skills" +
              "```"
          );
        } else if (sentence.includes("takashi")) {
          message.channel.send(
            "```" +
              "A type of nebraskan wild salmon recipe. I just had a [takashi] at a sushi place downtown" +
              "```"
          );
        } else if (sentence.includes("keith")) {
          message.channel.send(
            "```" +
              "The nicest guy around. [Keith] that type of guy to fail university so you could copy his code" +
              "```"
          );
        } else if (sentence.includes("jax")) {
          message.channel.send(
            "```" +
              "All the frustration, anger and plight of a person during their journey bottled up. After years, i've learnt to bottle my [jax]" +
              "```"
          );
        } else if (sentence.includes("alex")) {
          message.channel.send(
            "```" +
              "Young fella with a lot of potential in the industry. Yo dude, i think i saw [alex] auditioning for pornhub" +
              "```"
          );
        } else if (sentence.includes("cory")) {
          message.channel.send(
            "```" +
              "Dude with a massive c*ck, often quite clumsy. Dude [cory] just slapped my butt with his d*ck" +
              "```"
          );
        } else if (sentence.includes("andy")) {
          message.channel.send(
            "```" +
              "A god fearing keyboard dwelling rodent into hacking" +
              "```"
          );
        } else if (sentence.includes("javascript")) {
          message.channel.send(
            "```" +
              "JavaScript is the digital equivalent of the English language in the sense that it's universally recognized. It's also weaved into the fabric of programming. You see it everywhere; you're just not aware of it. JavaScript is present in every platform imaginable — browsers, mobile and desktop applications, IoT devices, and more!. What do Paypal, Netflix, LinkedIn, and Uber all have in common? They all run on JavaScript — Node.js to be specific. The majority of the world's top websites and apps use JavaScript in one way or another.Since more and more businesses are going digital, there is a high demand for people skilled in JavaScript. And as the programming language continues to grow, the interest in JavaScript developers should also continue to skyrocket. The average salary for JavaScript programmers ranges from $74,000 to $130,000. 'Nuff said." +
              "```"
          );
        } else {
          message.channel.send(
            "```" + response.data.list[0].definition + "```"
          );
        }
      })
      .catch(err => message.channel.send("meow??"));
  }

  if (
    message.content.substring(0, 6) == "```js>" &&
    message.content.slice(-3) == "```"
  ) {
    let code = message.content.slice(6).slice(0, -3);
    try {
      const result = safeEval(code);
      message.reply("Result: " + result);
    } catch (ex) {
      message.reply(
        `Error - Type: ${ex.trace[0].type}, Name: "${
          ex.trace[0].name
        }", Error at: ${JSON.stringify(ex.trace[0].loc)}`
      );
    }
  }

  if (message.content) {
    const chance = Math.random();
    if (chance < 0.1) {
      const myArray = [
        "chrissean",
        "pepethinks",
        "techlead",
        "haha",
        "pepefedora"
      ];
      const rand = myArray[Math.floor(Math.random() * myArray.length)];
      const reaction = client.emojis.find("name", rand);
      message.react(reaction);
    }
  }

  if (
    message.content.includes("morning") ||
    message.content.includes("Morning")
  ) {
    message.reply("Morning! Great to have you back");
  }

  if (
    message.content.includes("welcome") ||
    message.content.includes("Welcome")
  ) {
    let reaction = client.emojis.find("name", "doggo");
    message.react(reaction);
    reaction = client.emojis.find("name", "blobrave");
    message.react(reaction);
    reaction = client.emojis.find("name", "neko");
    message.react(reaction);
    reaction = client.emojis.find("name", "birdvote");
    message.react(reaction);
  }

  // Stop

  if (message.content === "haha") {
    const ayy = client.emojis.find("name", "haha");
    message.reply(`${ayy} LMAO`);
  }

  if (message.content.substring(0, 9) === "!addskill") {
    const skill = message.content.substring(10);
    const member = message.member;
    let role = message.guild.roles.find("name", skill);
    member.addRole(role).catch(console.error);
  }

  if (message.content.substring(0, 12) === "!removeskill") {
    const skill = message.content.substring(13);
    const member = message.member;
    let role = message.guild.roles.find("name", skill);
    member.removeRole(role).catch(console.error);
  }

  if (message.content.substring(0, 3) == "js>") {
    const code = message.content.substring(3);
    try {
      const result = safeEval(code);
      message.reply("Result: " + result);
    } catch (ex) {
      message.reply(
        `Error - Type: ${ex.trace[0].type}, Name: "${
          ex.trace[0].name
        }", Error at: ${JSON.stringify(ex.trace[0].loc)}`
      );
    }
  }

  if (message.content === "!skills") {
    message.reply(
      "```\nNodeJS\nJava\nJavaScript\nPython\nGo\nReact\nSpring\nAngular\nVue\nDjango\nExpress\nDocker\nPHP\nCSS\nHTML\nMongoDB\nEurope\nAmericas\nAsia\nAfrica\nAustralia```"
    );
  }

  if (message.content === "!help") {
    message.channel.send({
      embed: {
        color: 3447003,
        author: {
          name: client.user.username,
          icon_url: client.user.avatarURL
        },
        title: "Information",
        url: "https://github.com/RealChrisSean/devsLife/tree/master/codey",
        description:
          "This Bot was created by Nate, feel free to contribute to the development.",
        fields: [
          {
            name: "Execute Javascript using 'js>'",
            value: "Example: ```js> const hello = 'Hello World!'; hello```"
          },
          {
            name:
              "Execute multiline Javascript using three ``` backticks at the start (also add js>) and finish the end with backticks like normal",
            value: "Example: ```const hello = 'hello world'; \nhello```"
          },
          {
            name: "Commands",
            value:
              "```!addskill <Your Skill Here>\n!removeskill <Your Skill Here> \n!js> <Your Code Here>\n!skills\nurbandict <keyword>```"
          }
        ],
        timestamp: new Date(),
        footer: {
          icon_url: client.user.avatarURL,
          text: "#devsLife Community"
        }
      }
    });
  }
});

client.login(config.get("token"));

app.get("/", (req, res) => res.send("Meow"));

app.listen(port, () => console.log(`Listening on port ${port}!`));
