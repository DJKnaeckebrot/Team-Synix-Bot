const { model, Schema } = require("mongoose")

module.exports = model("verification", new Schema({

    Guild: String,
    Role: String,
    Channel: String,
    MessageID: String,
    TimeOut: { type: String, default : "30000" },
    Enabled: { type: Boolean, default: false },
    Message: { type: String, default: "Please verify yourself by clicking the button below" }

}))