const Odds =require("../MongoDB/Model/Odds");



async function getOddsFun(req,res,next){


    console.log(req.query.fixtureId)
    /*
    Odds.find({},(eer,data)=>{
        console.log(data)
       // console.log("Odds",data)
        if(data){}})
        */
 
 
/*
    odds.deleteMany({oddsType:'interSchool'}).then(function(){
        console.log("Data deleted"); // Success
    }).catch(function(error){
        console.log(error); // Failure
    });
   
    odds.find(async (err,data)=>{
        if(err){
            console.log("check Registerodds controller ")
            throw err
        }
        else{
            console.log(data)
        }
        
    })
    */

    
    Odds.find({fixtureId:req.query.fixtureId},async (err,data)=>{
        
        if(err){
            console.log("check getOdds controller ")
            return res.status(500).json({express:{payLoad:"server error",status:false}})

        }
        else{
            
            if(data.length==0){

                res.status(200).json({express:{payLoad:"no odds found",status:true}})
            }
            else{
                
                class formatOdd{
                    constructor(Market, Odd, marketType) {
                        this.Market = Market;
                        this.Odd = Odd;
                        this.marketType = marketType;
                    }
              
                }
                
                class myOddClass {
                    constructor() {          
                        this.Odds = {}
                    }
                    CalculateOdds() {
                        
                        this.CorrectScore();
                        this.GoalLessDraw();
                        this.Draw();
                        this.HomeWIN();
                        this.AwayWIN();
                        this.Under()
                        this.Over()
                        this.GoalGoal()
                        this.GoalGoalAndHomeWin()
                        this.GoalGoalAndAwayWin()
                    }
                   
                    CorrectScore() {
                        let correctScore = []
                
                        for (let i = 0; i < Object.keys(data[0].odds.correctScore).length; i++) {
                            const market=Object.values(data[0].odds.correctScore)[i].market;
                            const myOdd=Object.values(data[0].odds.correctScore)[i].odd;
                            const marketType=Object.keys(data[0].odds.correctScore)[i]

                            let objs = new formatOdd(market,myOdd,marketType)
            
                            correctScore.push(objs)
                            if (i ==  Object.keys(data[0].odds.correctScore).length-1) {
                                this.Odds["correctScore"] = correctScore;
                            }
    
                        }
                       
                    }
                
                    Draw() {
                        const market=Object.values(data[0].odds.Draw)[0]
                        const myOdd=Object.values(data[0].odds.Draw)[1]
                        const marketType="Draw"
                      
                        let objs = new formatOdd(market,myOdd,marketType)
                        this.Odds["Draw"] = objs;
                        
                    }
                    GoalLessDraw() {
                        const market=Object.values(data[0].odds.GoalLessDraw)[0]
                        const myOdd=Object.values(data[0].odds.GoalLessDraw)[1]
                        const marketType="GoalLessDraw"
                    
                
                        let objs = new formatOdd(market,myOdd,marketType)
                
                        this.Odds["GoalLessDraw"] = objs;
                    }
                    HomeWIN() {
                        const market=Object.values(data[0].odds.HomeWIN)[0]
                        const myOdd=Object.values(data[0].odds.HomeWIN)[1]
                        const marketType="HomeWIN"
                        
                
                        let objs = new formatOdd(market,myOdd,marketType)
                        this.Odds["HomeWIN"] = objs;
                         
                    }
                    AwayWIN() {
                        const market=Object.values(data[0].odds.AwayWIN)[0]
                        const myOdd=Object.values(data[0].odds.AwayWIN)[1]
                        const marketType="AwayWIN"
                
                        let objs = new formatOdd(market,myOdd,marketType)
                        this.Odds["AwayWIN"] = objs;
                    }
                    Under() {
                        let Under = [];
                
                        for (let i = 0; i < Object.keys(data[0].odds.Under).length; i++) {
                
                            const market=Object.values(data[0].odds.Under)[i].market;
                            const myOdd=Object.values(data[0].odds.Under)[i].odd;
                            const marketType=Object.keys(data[0].odds.Under)[i]

                            let objs = new formatOdd(market,myOdd,marketType)
                            Under.push(objs);
                            if (i ==  Object.keys(data[0].odds.Under).length-1) {
                                this.Odds["Under"] = Under;
                            }
                        }
                    }
                    Over() {
                
                        let Over = [];
                        for (let i = 0; i < Object.keys(data[0].odds.Over).length; i++) {
                
                            const market=Object.values(data[0].odds.Over)[i].market;
                            const myOdd=Object.values(data[0].odds.Over)[i].odd;
                            const marketType=Object.keys(data[0].odds.Over)[i]

                            let objs = new formatOdd(market,myOdd,marketType)
                            Over.push(objs);
                            if (i ==  Object.keys(data[0].odds.Over).length-1) {
                                this.Odds["Over"] = Over;
                            }
                        }
                    }
                    GoalGoal() {
                        const market=Object.values(data[0].odds.GoalGoal)[0]
                        const myOdd=Object.values(data[0].odds.GoalGoal)[1]
                        const marketType="GoalGoal"
                
                        let objs = new formatOdd(market,myOdd,marketType)
                        this.Odds["GoalGoal"] = objs;
                     
                    }
                    GoalGoalAndHomeWin(){
                        const market=Object.values(data[0].odds.GoalGoalAndHomeWin)[0]
                        const myOdd=Object.values(data[0].odds.GoalGoalAndHomeWin)[1]
                        const marketType="GoalGoalAndHomeWin"
                       
                        let objs = new formatOdd(market,myOdd,marketType)
                        this.Odds["GoalGoalAndHomeWin"] = objs;
                      
                    }
                    GoalGoalAndAwayWin(){
                        const market=Object.values(data[0].odds.GoalGoalAndAwayWin)[0]
                        const myOdd=Object.values(data[0].odds.GoalGoalAndAwayWin)[1]
                        const marketType="GoalGoalAndAwayWin"
                        console.log(market); 
                        console.log(myOdd);
                        console.log(marketType); 
                
                        let objs = new formatOdd(market,myOdd,marketType)
                            this.Odds["GoalGoalAndAwayWin"] = objs;
                        
                    }
                    viewTable() {
                        return this.Odds
                    }
                }
                
                let init = new myOddClass()
                init.CalculateOdds()
                let table = init.viewTable()
                
                res.status(200).json({express:{payLoad:table,status:true}})
            }
        }
    })
}   

module.exports = getOddsFun;