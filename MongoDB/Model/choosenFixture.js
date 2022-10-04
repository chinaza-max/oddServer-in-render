const mongoose = require('mongoose');

const choosenFixtureSchema = new mongoose.Schema({

    fixtureId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "fixture",
        required: true,
        unique:true
    },
    staffId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "staff",
        required: true
    },
},
    { timestamps: true });

module.exports = mongoose.model("choosenFixture", choosenFixtureSchema);