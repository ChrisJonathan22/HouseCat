const config = require("config");
const Discord = require("discord.js");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

let refreshIntervalId;

const client = new Discord.Client();

const rainbowRole = message => {
  let random = "#" + ((Math.random() * 0xffffff) << 0).toString(16);

  let role = message.guild.roles.find(r => r.name === "IT Support");

  role.setColor(random);
};

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", message => {
  if (message.content === "HouseCatStartTheDisco") {
    message.channel.send("Meow");
    refreshIntervalId = setInterval(() => {
      rainbowRole(message);
    }, 3000);
  }

  if (message.content === "HouseCatStopTheDisco") {
    console.log(refreshIntervalId);
    clearInterval(refreshIntervalId);
  }
});

client.login(config.get("token"));

app.get("/", (req, res) => res.send("Meow"));

app.listen(port, () => console.log(`Listening on port ${port}!`));
