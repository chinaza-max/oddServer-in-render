const Result = require("../MongoDB/Model/Result");

const calGoalExpectancy = (competitionName,date,homeId,awayId) => {
    const results  = await Result.find();
    if(!results) return;
    const result1 = await results.getTotalscorePerCompetition(competitionName,date);
    const result2 = await results.getTotalscorePerTeam(competitionName,date,homeId,awayId);
    


    //Goals Scored at Home Overall
    let GSHO=result1.totalHomeGoalScore/result1.totalGamePlayed

    //Goals Scored Away Overall
    let GSAO=result1.totalAwayGoalScore/result1.totalGamePlayed


    //Team Home Goal Average For
    let THGA=result2.homeTeamTotalGoalScore/result2.homeTeamTotalGamePlayed

    //Team Home Goal Average Against
    let THGAA=result2.homeTeamTotalGoalConceded/result2.homeTeamTotalGamePlayed


     //Team Away Goal Average For
     let TAGA=result2.awayTeamTotalGoalScore/result2.awayTeamTotalGamePlayed

     //Team Away Goal Average Against
     let TAGAA=result2.awayTeamTotalGoalConceded/result2.awayTeamTotalGamePlayed



    //Team’s Attack Strength

    let HomeTeamStrength=THGA/GSHO
    let AwayTeamStrength=TAGA/GSAO


     //Team’s Defence Strength

    let HomeTeamDefence=THGAA/GSAO
    let AwayTeamDefence=TAGAA/GSHO


   //Calculate Goal Expectancy

   let HomeTeam=HomeTeamStrength*HomeTeamDefence*GSHO
   let AwayTeam=AwayTeamStrength*AwayTeamDefence*GSAO
}   


