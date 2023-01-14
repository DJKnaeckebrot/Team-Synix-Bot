const { model, Schema } = require("mongoose")

module.exports = model("permissions", new Schema({

    Guild: String,
    ID: String,

}))