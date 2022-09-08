const Fixture = require("./MongoDB/Model/fixture");
const CompetitionRegistration = require("./MongoDB/Model/competitionRegistration");
const Result = require("./MongoDB/Model/result");
const FixtureOdds = require("./MongoDB/Model/odds");
const Team = require("./MongoDB/Model/team");

const mongoose = require("mongoose");
var ObjectID = mongoose.Types.ObjectId;

//process.env.App_MONGODB_URI||
module.exports = mongoose.connect(
  process.env.App_MONGODB_URI || "mongodb://localhost:27017/campusBet",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (!err) {
      console.log("connection succeeded");
    } else {
      console.log("error in connection " + err);
    }
  }
);
const teams = [
  new ObjectID("63138e092c5a5802e3bb0f46"),
  new ObjectID("63138e092c5a5802e3bb0f47"),
  new ObjectID("63138e092c5a5802e3bb0f48"),
  new ObjectID("63138e092c5a5802e3bb0f49"),
];

// Team.findByIdAndUpdate('',{'teams':teams}, (er, r) => {
//   console.log(er, r);
// });
CompetitionRegistration.updateMany({},{'teams':teams},(er, r) => {
    console.log(er, r);
  })