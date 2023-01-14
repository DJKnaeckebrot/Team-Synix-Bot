const { model, Schema } = require("mongoose")

module.exports = model("loggerChannel", new Schema({
    Guild: String,
    Channel: String,
    IgnoreChannels: Array,
    AntiCrashChannel: String,
}))