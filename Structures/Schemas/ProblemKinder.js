const { model, Schema } = require("mongoose")

module.exports = model("ProblemKinder", new Schema({

    GuildID: String,
    Status: Boolean,
    ProblemKinder: Array,

}))