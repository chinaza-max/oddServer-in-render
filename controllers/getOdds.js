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

                console.log(data)
                res.status(200).json({express:{payLoad:"no odds found",status:true}})
            }
            else{
                console.log("data")
                //console.log(data)
                const keys = Object.keys(data[0].odds.correctScore);
                const Val = Object.values(data[0].odds.correctScore);
               // console.log(keys); 
               // console.log(Val); 




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
                       /* this.GoalLessDraw();
                        this.Draw();
                        this.HomeWIN();
                        this.AwayWIN();
                        this.Under(under)
                        this.Over(over)
                        this.GoalGoal()
                        this.GoalGoalAndHomeWin()
                        this.GoalGoalAndAwayWin()*/
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
                        let total = 0,
                            odd = 0
                
                        for (let i = 0; i <= this.GoalLeve; i++) {
                
                            total += this.Home[i] * this.Away[i];
                            if (i == this.GoalLeve) {
                                odd = 1 / total;
                                let objs = new node("Draw", odd.toFixed(2));
                                this.Odds["Draw"] = objs;
                            }
                        }
                    }
                    GoalLessDraw() {
                        let total = this.Home[0] * this.Away[0];
                
                        let objs = new node("GLD", (1 / total).toFixed(2), this.GoalLessDrawR)
                
                        this.Odds["GoalLessDraw"] = objs;
                    }
                    HomeWIN() {
                        let total = 0;
                        for (let i = 1; i <= this.GoalLeve; i++) {
                            for (let j = 0; j <= this.GoalLeve; j++) {
                                if (i > j) {
                                    total += this.Home[i] * this.Away[j];
                                }
                                else {
                                    break;
                                }
                            }
                            if (i == this.GoalLeve) {
                                let odd = 1 / total;
                                let objs = new node("HomeWIN", odd.toFixed(2));
                                this.Odds["HomeWIN"] = objs;
                            }
                        }
                    }
                    AwayWIN() {
                        let total = 0;
                        for (let i = 1; i <= this.GoalLeve; i++) {
                            for (let j = 0; j <= this.GoalLeve; j++) {
                                if (i > j) {
                                    total += this.Away[i] * this.Home[j];
                                }
                                else {
                                    break
                                }
                            }
                            if (i == this.GoalLeve) {
                                let odd = 1 / total;
                                let objs = new node("AwayWIN", odd.toFixed(2));
                                this.Odds["AwayWIN"] = objs;
                            }
                        }
                    }
                    Under(under) {
                        let Under = [];
                
                        for (let i = 0; i <= under.length; i++) {
                
                            let total = 0
                            for (let j = 0; j < this.UnderM[i]; j++) {
                                for (let k = 0; k <= this.UnderM[i]; k++) {
                
                                    if (j + k > under[i]) {
                                        break;
                                    } else {
                                        total += this.Home[j] * this.Away[k];
                                    }
                                }
                                if (j + 1 == this.UnderM[i]) {
                                    let odd = 1 / total;
                                    let objs = new node(`${under[i]}.5`, odd.toFixed(2));
                                    Under.push(objs);
                                }
                            }
                
                            if (i == under.length) {
                                this.Odds["Under"] = Under;
                            }
                        }
                    }
                    Over(over) {
                
                        let Over = [];
                        for (let i = 0; i < over.length; i++) {
                            let total = 0;
                            for (let j = 0; j <= this.GoalLeve; j++) {
                                for (let k = 0; k <= this.GoalLeve; k++) {
                
                                    if (j + k >= over[i]) {
                                        // console.log(`--${j}----${k}-`)
                                        total += this.Home[j] * this.Away[k];
                
                                    }
                                }
                                if (j == this.GoalLeve) {
                                    let odd = 1 / total;
                                    let objs = new node(`${over[i] - 1}.5`, odd.toFixed(2));
                                    Over.push(objs);
                                    //console.log(`--add up-`)
                                }
                            }
                            if (i + 1 == over.length) {
                                this.Odds["Over"] = Over;
                            }
                        }
                    }
                    GoalGoal() {
                        let total = 0
                        for (let i = 1; i <= this.GoalLeve; i++) {
                            for (let j = 1; j <= this.GoalLeve; j++) {
                                // console.log(`${i}---${j}`)
                                total += this.Home[1] * this.Away[j];
                            }
                            if (i == this.GoalLeve) {
                                let odd = 1 / total;
                                let objs = new node("GG", odd.toFixed(2));
                                this.Odds["GoalGoal"] = objs;
                            }
                        }   
                    }
                    GoalGoalAndHomeWin(){
                        let total = 0
                        for (let i = 1; i <= this.GoalLeve; i++) {
                            for (let j = 1; j <= this.GoalLeve; j++) {
                                 
                                 if(i>j){
                                    total += this.Home[i] * this.Away[j];
                                 }
                                 else{
                                     break;
                                 }
                                
                            }
                            if (i == this.GoalLeve) {
                                let odd = 1 / total;
                                let objs = new node("GGH", odd.toFixed(2));
                                this.Odds["GoalGoalAndHomeWin"] = objs;
                            }
                        }
                    }
                    GoalGoalAndAwayWin(){
                        let total = 0
                        for (let i = 1; i <= this.GoalLeve; i++) {
                            for (let j = 2; j <= this.GoalLeve; j++) {
                            
                                 if(j>i){
                                   // console.log(`---------yes-------`)
                                    //console.log(`${i}---${j}`)
                                   // console.log(`---------yes--------`)
                                    total += this.Home[i] * this.Away[j];
                                 }
                            }
                            if (i == this.GoalLeve) {
                                let odd = 1 / total;
                                let objs = new node("GGA", odd.toFixed(2));
                                this.Odds["GoalGoalAndAwayWin"] = objs;
                            }
                        }
                    }
                    viewTable() {
                        return this.Odds
                    }
                }
                
                let init = new myOddClass()
                //init.Setting(66.5, 50.5);
                init.CalculateOdds()
                let table = init.viewTable()
                console.log(table);
         
                
                
                res.status(200).json({express:{payLoad:table,status:true}})
            }
        }
    })
}   

module.exports = getOddsFun;