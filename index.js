const config = require("config");
const Discord = require("discord.js");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

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
  if (message.content === "House Cat") {
    message.channel.send("Meow");
    setInterval(() => {
      rainbowRole(message);
    }, 3000);
  }
});

client.login(config.get("token"));

app.get("/", (req, res) => res.send("Meow"));

app.listen(port, () => console.log(`Listening on port ${port}!`));
