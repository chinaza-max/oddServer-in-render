const Result = require("../MongoDB/Model/Result");
const FixtureOdds = require("../MongoDB/Model/Odds");
const {odds,formatOdd} =require("../oddCalculation/oddsGenerator")

const calGoalExpectancy =async (req,res,next) => {

    const {oddDate,homeTeamId,awayTeamId}=req.body
    const competitionName=res.competitionName;
    const competitionType=res.competitionType;
    const school=res.school;
    const country=res.country;
    const levelName=res.levelName;
    const fixtureId=res.fixtureId;
    const results  = await Result();
    //console.log(homeTeamId,awayTeamId)
    console.log(oddDate,homeTeamId,awayTeamId,competitionName,competitionType,school,country,levelName)
    Result.find({},(eer,data)=>{
       // console.log(data)
        if(data){
          //  console.log(data)
            //res.json({express:data})
       //     data.getTeamResults("ee")
        }
    })
    
    //console.log(test.getTotalscorePerCompetition())
    //console.log(results)

    if(results.length==0){
        const home=1.765
        const away= 1.353
        const engine = new odds(home,away);
   
        //method calculate odda
        engine.CalculateOdds();
        // console.log(engine.viewTable());

        //class instance reduce the calculated odds
        const reduce = new formatOdd();
        let myOdds=reduce.ChangeOdd(engine.viewTable())
        
        storeOdd(myOdds,home,away,fixtureId)
        
    }
    else{
        
        const result1 = await results.getTotalscorePerCompetition(competitionName,oddDate,competitionType,school,country,levelName);
        const result2 = await results.getTotalscorePerTeam(competitionName,oddDate,homeTeamId,awayTeamId,competitionType,school,country,levelName);
        
        console.log("result2")
        console.log(result1)
        console.log(result2)
        console.log("result2")
       if(result1.length==0||result2.length==0){
        const home=1.765
        const away= 1.353
        const engine = new odds(home,away);
   
        //method calculate odda
        engine.CalculateOdds();
        // console.log(engine.viewTable());

        //class instance reduce the calculated odds
        const reduce = new formatOdd();
        let myOdds=reduce.ChangeOdd(engine.viewTable())
        
        storeOdd(myOdds,home,away,fixtureId)
       }
       else{
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
 
         let engine = new odds(HomeTeam,AwayTeam);
         //init.Setting(66.5, 50.5);
         engine.CalculateOdds();
 
         // console.log(engine.viewTable());
 
         let reduce = new formatOdd();
         //init.Setting(66.5, 50.5);
         // reduce.CalculateOdds();
 
         console.log(reduce.ChangeOdd(engine.viewTable()));
         /*
         let engine = new odds(HomeTeam, AwayTeam);
         engine.CalculateOdds();
         
 
         let reduce = new formatOdd();
 
         console.log(reduce.ChangeOdd(engine.viewTable()));
         */
       }
   }


    
function storeOdd(myOdds,home,away,fixtureId){
    /*
    console.log("-----------------------------------------------")
    console.log("-----------------------------------------------")
    console.log("-----------------------------------------------")
    console.log("-----------------------------------------------")
    console.log(fixtureId)
    */
    const fixtureOdds=new FixtureOdds()

    fixtureOdds.fixtureId=fixtureId
    fixtureOdds.goalExpectancy.home=home
    fixtureOdds.goalExpectancy.away=away
    fixtureOdds.odds.correctScore.score00.market=myOdds.correctScore[0].Market
    fixtureOdds.odds.correctScore.score00.odd=myOdds.correctScore[0].Odd
    fixtureOdds.odds.correctScore.score01.market=myOdds.correctScore[1].Market
    fixtureOdds.odds.correctScore.score01.odd=myOdds.correctScore[1].Odd
    fixtureOdds.odds.correctScore.score02.market=myOdds.correctScore[2].Market
    fixtureOdds.odds.correctScore.score02.odd=myOdds.correctScore[2].Odd
    fixtureOdds.odds.correctScore.score03.market=myOdds.correctScore[3].Market
    fixtureOdds.odds.correctScore.score03.odd=myOdds.correctScore[3].Odd
    fixtureOdds.odds.correctScore.score04.market=myOdds.correctScore[4].Market
    fixtureOdds.odds.correctScore.score04.odd=myOdds.correctScore[4].Odd
    fixtureOdds.odds.correctScore.score05.market=myOdds.correctScore[5].Market
    fixtureOdds.odds.correctScore.score05.odd=myOdds.correctScore[5].Odd
    fixtureOdds.odds.correctScore.score10.market=myOdds.correctScore[6].Market
    fixtureOdds.odds.correctScore.score10.odd=myOdds.correctScore[6].Odd
    fixtureOdds.odds.correctScore.score11.market=myOdds.correctScore[7].Market
    fixtureOdds.odds.correctScore.score11.odd=myOdds.correctScore[7].Odd
    fixtureOdds.odds.correctScore.score12.market=myOdds.correctScore[8].Market
    fixtureOdds.odds.correctScore.score12.odd=myOdds.correctScore[8].Odd
    fixtureOdds.odds.correctScore.score13.market=myOdds.correctScore[9].Market
    fixtureOdds.odds.correctScore.score13.odd=myOdds.correctScore[9].Odd
    fixtureOdds.odds.correctScore.score14.market=myOdds.correctScore[10].Market
    fixtureOdds.odds.correctScore.score14.odd=myOdds.correctScore[10].Odd
    fixtureOdds.odds.correctScore.score15.market=myOdds.correctScore[11].Market
    fixtureOdds.odds.correctScore.score15.odd=myOdds.correctScore[11].Odd
    fixtureOdds.odds.correctScore.score20.market=myOdds.correctScore[12].Market
    fixtureOdds.odds.correctScore.score20.odd=myOdds.correctScore[12].Odd
    fixtureOdds.odds.correctScore.score21.market=myOdds.correctScore[13].Market
    fixtureOdds.odds.correctScore.score21.odd=myOdds.correctScore[13].Odd
    fixtureOdds.odds.correctScore.score22.market=myOdds.correctScore[14].Market
    fixtureOdds.odds.correctScore.score22.odd=myOdds.correctScore[14].Odd
    fixtureOdds.odds.correctScore.score23.market=myOdds.correctScore[15].Market
    fixtureOdds.odds.correctScore.score23.odd=myOdds.correctScore[15].Odd
    fixtureOdds.odds.correctScore.score24.market=myOdds.correctScore[16].Market
    fixtureOdds.odds.correctScore.score24.odd=myOdds.correctScore[16].Odd
    fixtureOdds.odds.correctScore.score25.market=myOdds.correctScore[17].Market
    fixtureOdds.odds.correctScore.score25.odd=myOdds.correctScore[17].Odd
    fixtureOdds.odds.correctScore.score30.market=myOdds.correctScore[18].Market
    fixtureOdds.odds.correctScore.score30.odd=myOdds.correctScore[18].Odd
    fixtureOdds.odds.correctScore.score31.market=myOdds.correctScore[19].Market
    fixtureOdds.odds.correctScore.score31.odd=myOdds.correctScore[19].Odd
    fixtureOdds.odds.correctScore.score32.market=myOdds.correctScore[20].Market
    fixtureOdds.odds.correctScore.score32.odd=myOdds.correctScore[20].Odd
    fixtureOdds.odds.correctScore.score33.market=myOdds.correctScore[21].Market
    fixtureOdds.odds.correctScore.score33.odd=myOdds.correctScore[21].Odd
    fixtureOdds.odds.correctScore.score34.market=myOdds.correctScore[22].Market
    fixtureOdds.odds.correctScore.score34.odd=myOdds.correctScore[22].Odd
    fixtureOdds.odds.correctScore.score35.market=myOdds.correctScore[23].Market
    fixtureOdds.odds.correctScore.score35.odd=myOdds.correctScore[23].Odd
    fixtureOdds.odds.correctScore.score40.market=myOdds.correctScore[24].Market
    fixtureOdds.odds.correctScore.score40.odd=myOdds.correctScore[24].Odd
    fixtureOdds.odds.correctScore.score41.market=myOdds.correctScore[25].Market
    fixtureOdds.odds.correctScore.score41.odd=myOdds.correctScore[25].Odd
    fixtureOdds.odds.correctScore.score42.market=myOdds.correctScore[26].Market
    fixtureOdds.odds.correctScore.score42.odd=myOdds.correctScore[26].Odd
    fixtureOdds.odds.correctScore.score43.market=myOdds.correctScore[27].Market
    fixtureOdds.odds.correctScore.score43.odd=myOdds.correctScore[27].Odd
    fixtureOdds.odds.correctScore.score44.market=myOdds.correctScore[28].Market
    fixtureOdds.odds.correctScore.score44.odd=myOdds.correctScore[28].Odd
    fixtureOdds.odds.correctScore.score45.market=myOdds.correctScore[29].Market
    fixtureOdds.odds.correctScore.score45.odd=myOdds.correctScore[29].Odd
    fixtureOdds.odds.correctScore.score50.market=myOdds.correctScore[30].Market
    fixtureOdds.odds.correctScore.score50.odd=myOdds.correctScore[30].Odd
    fixtureOdds.odds.correctScore.score51.market=myOdds.correctScore[31].Market
    fixtureOdds.odds.correctScore.score51.odd=myOdds.correctScore[31].Odd
    fixtureOdds.odds.correctScore.score52.market=myOdds.correctScore[32].Market
    fixtureOdds.odds.correctScore.score52.odd=myOdds.correctScore[32].Odd
    fixtureOdds.odds.correctScore.score53.market=myOdds.correctScore[33].Market
    fixtureOdds.odds.correctScore.score53.odd=myOdds.correctScore[33].Odd
    fixtureOdds.odds.correctScore.score54.market=myOdds.correctScore[34].Market
    fixtureOdds.odds.correctScore.score54.odd=myOdds.correctScore[34].Odd
    fixtureOdds.odds.correctScore.score55.market=myOdds.correctScore[35].Market
    fixtureOdds.odds.correctScore.score55.odd=myOdds.correctScore[35].Odd


    fixtureOdds.odds.Under.goal05.market=myOdds.Under[0].Market
    fixtureOdds.odds.Under.goal05.odd=myOdds.Under[0].Odd
    fixtureOdds.odds.Under.goal15.market=myOdds.Under[1].Market
    fixtureOdds.odds.Under.goal15.odd=myOdds.Under[1].Odd
    fixtureOdds.odds.Under.goal25.market=myOdds.Under[2].Market
    fixtureOdds.odds.Under.goal25.odd=myOdds.Under[2].Odd
    fixtureOdds.odds.Under.goal35.market=myOdds.Under[3].Market
    fixtureOdds.odds.Under.goal35.odd=myOdds.Under[3].Odd
    fixtureOdds.odds.Under.goal45.market=myOdds.Under[4].Market
    fixtureOdds.odds.Under.goal45.odd=myOdds.Under[4].Odd
    fixtureOdds.odds.Under.goal55.market=myOdds.Under[5].Market
    fixtureOdds.odds.Under.goal55.odd=myOdds.Under[5].Odd
    
    fixtureOdds.odds.Over.goal05.market=myOdds.Over[0].Market
    fixtureOdds.odds.Over.goal05.odd=myOdds.Over[0].Odd
    fixtureOdds.odds.Over.goal15.market=myOdds.Over[1].Market
    fixtureOdds.odds.Over.goal15.odd=myOdds.Over[1].Odd
    fixtureOdds.odds.Over.goal25.market=myOdds.Over[2].Market
    fixtureOdds.odds.Over.goal25.odd=myOdds.Over[2].Odd
    fixtureOdds.odds.Over.goal35.market=myOdds.Over[3].Market
    fixtureOdds.odds.Over.goal35.odd=myOdds.Over[3].Odd
    fixtureOdds.odds.Over.goal45.market=myOdds.Over[4].Market
    fixtureOdds.odds.Over.goal45.odd=myOdds.Over[4].Odd

    fixtureOdds.odds.GoalLessDraw.market=myOdds.GoalLessDraw.Market
    fixtureOdds.odds.GoalLessDraw.odd=myOdds.GoalLessDraw.Odd

    fixtureOdds.odds.Draw.market=myOdds.Draw.Market
    fixtureOdds.odds.Draw.odd=myOdds.Draw.Odd

    fixtureOdds.odds.HomeWIN.market=myOdds.HomeWIN.Market
    fixtureOdds.odds.HomeWIN.odd=myOdds.HomeWIN.Odd

    fixtureOdds.odds.AwayWIN.market=myOdds.AwayWIN.Market
    fixtureOdds.odds.AwayWIN.odd=myOdds.AwayWIN.Odd

    fixtureOdds.odds.GoalGoal.market=myOdds.GoalGoal.Market
    fixtureOdds.odds.GoalGoal.odd=myOdds.GoalGoal.Odd

    fixtureOdds.odds.GoalGoalAndHomeWin.market=myOdds.GoalGoalAndHomeWin.Market
    fixtureOdds.odds.GoalGoalAndHomeWin.odd=myOdds.GoalGoalAndHomeWin.Odd

    fixtureOdds.odds.GoalGoalAndAwayWin.market=myOdds.GoalGoalAndAwayWin.Market
    fixtureOdds.odds.GoalGoalAndAwayWin.odd=myOdds.GoalGoalAndAwayWin.Odd

    fixtureOdds.save(async function(err,data){
        if(err){
            console.log("check  goal expectancy file")
            console.log(err)
            return res.status(500).json({express:{payLoad:"server error",status:false}})
        }
        else{
            res.status(200).json({express:{payLoad:"fixture sucessfully created ",status:true}})
        }
    })
}


}   

module.exports = calGoalExpectancy;

//https://stackoverflow.com/questions/40636434/aggregate-returns-empty-array-mongoose