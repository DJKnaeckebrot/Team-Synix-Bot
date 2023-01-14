const { model, Schema } = require("mongoose")

module.exports = model("features", new Schema({

    GuildID: String,
    Suggestions: { type: Boolean, default: false },
    AntiLink: { type: Boolean, default: false },
    Verification: { type: Boolean, default: false },
    AutoMod: { type: Boolean, default: false },
    VoiceHubs: { type: Boolean, default: false },
    SupportRoom: { type: Boolean, default: false },

}))