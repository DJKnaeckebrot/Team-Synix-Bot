const { model, Schema } = require("mongoose");

module.exports = model(
    "Antilink",
    new Schema({
        Guild: { type: String, require: true },
        logs: { type: Boolean, default: false },
        ignoredChannels: Array
    })
);