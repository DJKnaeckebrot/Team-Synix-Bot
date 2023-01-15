const { model, Schema } = require("mongoose");

let trainingsEmbed = new Schema({
    GuildID: String,
    Embed: Object,
});

module.exports = model("TrainigsEmbed", trainingsEmbed);