const { Client } = require("discord.js")
const ms = require("ms")
const mongoose = require("mongoose")
const mongodbURL = process.env.MONGODBURL

module.exports = {
    name: "ready",

    /**
    * @param {Client} client
    */
    async execute(client) {

        const { user, ws } = client

        console.log(`${user.tag} is now online!`)
        let x = 1

        setInterval(() => {

            const ping = ws.ping

            const text = ["Synix an die Macht!", "Was denn hier los", "Wer das liest ist doof hihi", "Mama guck mal ich bin im Fernsehen!"]

            // console.log("Text Länge : "+ text.length)

            if (x === text.length) {
                x = 0;
            }

            user.setActivity({
                name: text[x],
                type: 3,
            })

            x ++;

        }, ms("5s"))

        if (!mongodbURL) return

        mongoose.connect(mongodbURL, {

            useNewUrlParser: true,
            useUnifiedTopology: true

        }).then(() => {

            console.log("Connected to Database!")

        }).catch(err => console.log(err))

    }
}