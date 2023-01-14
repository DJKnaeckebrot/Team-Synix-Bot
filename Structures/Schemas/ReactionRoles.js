const { model, Schema } = require("mongoose")

module.exports = model("reactionroles", new Schema({

    Guild: String,
    roles: Array

}))