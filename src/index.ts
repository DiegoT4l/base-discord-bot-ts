// import discord.js
import { Client, Events, ActivityType } from 'discord.js';
const eventHandler = require('./handlers/eventHandler')

// create a new Client instance
const client = new Client({ intents: 32767 });  // GatewayIntentBits.All

eventHandler(client)

// login with the token from .env.local
client.login(process.env.DISCORD_TOKEN);