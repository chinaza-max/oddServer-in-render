const Result = require("../MongoDB/Model/Result");
const {odds,formatOdd} =require("../oddCalculation/oddsGenerator")

const calGoalExpectancy = (competitionName,date,homeId,awayId,fixtureId) => {
    const results  = await Result.find();
    if(!results) return;
    const result1 = await results.getTotalscorePerCompetition(competitionName,date);
    const result2 = await results.getTotalscorePerTeam(competitionName,date,homeId,awayId);
    


    //Goals Scored at Home Overall
    let GSHO= toFixed(result1.totalHomeGoalScore/result1.totalGamePlayed)

    //Goals Scored Away Overall
    let GSAO= toFixed(result1.totalAwayGoalScore/result1.totalGamePlayed)


    //Team Home Goal Average For
    let THGA=toFixed(result2.homeTeamTotalGoalScore/result2.homeTeamTotalGamePlayed)

    //Team Home Goal Average Against
    let THGAA=toFixed(result2.homeTeamTotalGoalConceded/result2.homeTeamTotalGamePlayed)


     //Team Away Goal Average For
     let TAGA=toFixed(result2.awayTeamTotalGoalScore/result2.awayTeamTotalGamePlayed)

     //Team Away Goal Average Against
     let TAGAA=toFixed(result2.awayTeamTotalGoalConceded/result2.awayTeamTotalGamePlayed)



    //Team’s Attack Strength

    let HomeTeamStrength=toFixed(THGA/GSHO)
    let AwayTeamStrength=toFixed(TAGA/GSAO)


     //Team’s Defence Strength

    let HomeTeamDefence=toFixed(THGAA/GSAO)
    let AwayTeamDefence=toFixed(TAGAA/GSHO)


   //Calculate Goal Expectancy

   let HomeTeam=toFixed(HomeTeamStrength*AwayTeamDefence*GSHO)
   let AwayTeam=toFixed(AwayTeamStrength*HomeTeamDefence*GSAO)

   let engine = new odds(HomeTeam, AwayTeam);
   engine.CalculateOdds();

   let reduce = new formatOdd();

    console.log(reduce.ChangeOdd(engine.viewTable()));
}   

export default calGoalExpectancy;

