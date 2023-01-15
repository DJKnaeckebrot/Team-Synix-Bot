const { Client } = require("discord.js")
const ms = require("ms")
const mongoose = require("mongoose")
const mongodbURL = process.env.MONGODBURL
const pjson = require('../../package.json');
const version = pjson.version;

module.exports = {
    name: "ready",

    /**
    * @param {Client} client
    */
    async execute(client) {

        const { user, ws } = client

        console.log(`${user.tag} is now online!`)

        client.user.setPresence({ activities: [{ name: `/help | teamsynix.com ${ version }` }], status: 'online' });

        if (!mongodbURL) return

        mongoose.connect(mongodbURL, {

            useNewUrlParser: true,
            useUnifiedTopology: true

        }).then(() => {

            console.log("Connected to Database!")

        }).catch(err => console.log(err))

    }
}