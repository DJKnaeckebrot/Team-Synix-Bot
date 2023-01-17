const { model, Schema } = require("mongoose")

module.exports = model("scrims", new Schema({

    ScrimID: String,
    ScrimTeam: String,
    gegnerTeam: String,
    gegnerRank: String,
    Datum: String,
    Uhrzeit: String,
    MessageID: String,
    MessageIDticket: String,
    TicketChannelID: String,
    TeamChannelID: String,
    SelectMenuMessageID: String,
    Status: String,
    SynixTeamStatus: Boolean,
    GegnerTeamStatus: Boolean,
    LobbyName: String,
    LobbyPasswort: String,

}))