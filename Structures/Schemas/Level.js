const { model, Schema } = require("mongoose")

module.exports = model("level", new Schema({

    Guild: String,
    User: String,
    Channel: String,
    XP: Number,
    Level: Number,
    BackgroundImage: { type: String, default: "https://wallpaper.dog/large/961978.jpg" },
    counter: { type: Number, default: 0 },
    timestamp: { type: Date, default: Date.now },

}))