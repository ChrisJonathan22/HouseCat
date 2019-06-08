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

  let role = message.guild.roles.find(r => r.name === "Admin");

  role.setColor(random);
};

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", message => {
  if (message.author.bot) return;

  if (message.content === "!chucknorris") {
    const URL = "https://api.chucknorris.io/jokes/random";

    axios
      .get(URL)
      .then(response => {
        // If request is good...
        console.log(response.data.value);
        message.channel.send(response.data.value);
      })
      .catch(() => {
        message.channel.send(`Meow?`);
      });
  }

  if (message.content.substring(0, 7) === "!number") {
    const number = message.content.substring(8);

    const URL = `http://numbersapi.com/${number}`;

    axios
      .get(URL)
      .then(response => {
        // If request is good...
        console.log(response.data);
        message.channel.send(response.data);
      })
      .catch(err => {
        console.log(err);
        message.channel.send(`Meow?`);
      });
  }

  if (message.content === "!advice") {
    const URL = `https://api.adviceslip.com/advice`;

    axios
      .get(URL)
      .then(response => {
        // If request is good...
        console.log(response.data.slip.advice);
        message.channel.send(response.data.slip.advice);
      })
      .catch(err => {
        console.log(err);
        message.channel.send(`Meow?`);
      });
  }

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
        message.channel.send("```" + response.data.list[0].definition + "```");
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
        "ok_hand",
        "pepethinking",
        "pepehype",
        "relaxed",
        "rofl"
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

  if (message.content === "haha") {
    const ayy = client.emojis.find("name", "rofl");
    message.reply(`${ayy} LMAO`);
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

  if (message.content === "!help") {
    message.channel.send({
      embed: {
        color: 3447003,
        author: {
          name: client.user.username,
          icon_url: client.user.avatarURL
        },
        title: "Information",
        url: "https://github.com/devisle/HouseCat",
        description:
          "This Bot was created by Dev Isle, feel free to contribute to the development.",
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
              "```!js> <Your Code Here>\nurbandict <keyword>\n!number <number>\n!advice\n!chucknorris```"
          }
        ],
        timestamp: new Date(),
        footer: {
          icon_url: client.user.avatarURL,
          text: "#Dev Isle Community"
        }
      }
    });
  }
});

client.login(config.get("token"));

app.get("/", (req, res) => res.send("Meow"));

app.listen(port, () => console.log(`Listening on port ${port}!`));
