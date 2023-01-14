const { model, Schema } = require("mongoose");

let ticketSetup = new Schema({
    GuildID: String,
    Channel: String,
    Category: String,
    Transcripts: String,
    DMTranscripts: { type: Boolean, default: false },
    TicketName: { type: String, default: "ticket" },
    TicketEmbedColor: { type: String, default: "Blue" },
    Handlers: String,
    Everyone: String,
    Description: { type: String, default: "Please hit one of the buttons below to open a ticket!" },
    Button1: String,
    Button2: String,
    Button3: String,
    Button4: String,
    Response: { type: String, default: "Our team will contact you shortly. Please describe your issue." },
    PingStaff: { type: Boolean, default: false },
    Buttons: [String],
    Emojis: [String],
    PanelMessageID: String,
    TicketNumber: Number,
    Status: { type: Boolean, default: false },
});

module.exports = model("TicketSetup", ticketSetup);