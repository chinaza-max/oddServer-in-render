const mongoose = require('mongoose');

const competitionRegistrationSchema = new mongoose.Schema({

    competitionType: {
        type: String,
        required: [true, "competitionType is required"],
        enum: ["interSchool", "intraSchool"],
    },
    competitionName: {
        type: String,
        required: [true, "competitionName is required"],
    },
    session: {
        type: String,
        required: true
    },
    startDate: {
        type: Schema.Types.ObjectId,
        required: true
    },
    hostName: {
        type: String,
        required: true,
        trim: true
    },
    location: {
        type: String,
        required: true,
        trim: true
    },
    Teams: {
        type: [Schema.Types.ObjectId],
        required: true
    }

},
    { timestamp: true });

module.exports = mongoose.model("CompetitionRegistration", competitionRegistrationSchema);
