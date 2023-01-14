const { model, Schema } = require("mongoose");

let supportRoom = new Schema({
    GuildID: String,
    ChannelID: Array,
    Status: { type: Boolean, default: false },
    PingChannel: String,
    PingRoles: Array,
    PingRoleStatus: { type: Boolean, default: true },
    SongURL: { type: String, default: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" },

});

module.exports = model("SupportRoom", supportRoom);