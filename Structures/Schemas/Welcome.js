const { model, Schema } = require("mongoose")

module.exports = model("welome", new Schema({

    Guild: String,
    Channel: String,
    Msg: String,
    DM: Boolean,
    DMMessage: Object,
    Content: Boolean,
    Embed: Boolean

}))