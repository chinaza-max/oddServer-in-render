const competitionRegistration = require("../MongoDB/Model/competitionRegistration");
const Result = require("../MongoDB/Model/Result");

const leagueTable = () => {
const results  = await Result.find()
if(!results) return;
const tableRaw = await results.getTeamResults(competitionId);
if(!tableRaw) return;


}