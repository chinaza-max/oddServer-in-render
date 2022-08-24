const mongoose = require('mongoose');

const competitionRegistrationSchema = new mongoose.Schema({

    competitionType: {
        type: String,
        required: [true, "competitionType is required"],
        enum: ["interSchool", "intraSchool"]
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
        type:Date,
        required: true
    },
    hostName: {
        type: String,
        required: true,
        trim: true
    },
    school: {
        type: String,
        required: true,
        trim: true
    },
    location: {
        type: String,
        required: true,
        trim: true
    },
    teams: {
        type: [mongoose.Schema.Types.ObjectId],
        required: true
    },
    country: {
        type: String,
        required: true,
        trim: true
    },
    level: {
        type: String, 
        enum: ["falculty", "departmental","friendly"],
    },
    levelName: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String, 
        enum: ["upcoming", "ongoing","ended"],
        default: "upcoming"
    }

},
    { timestamp: true });

module.exports = mongoose.model("CompetitionRegistration", competitionRegistrationSchema);



//levelName eg physical science