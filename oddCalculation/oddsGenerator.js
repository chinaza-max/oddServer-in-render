/*
---------------------------------------------------------------------------------
- formatOdd helps in  re-arranging odd into readable json format and reduce odd -
---------------------------------------------------------------------------------
*/

class formatOdd {
    constructor(Market, Odd, reduceBy = null) {
        this.Market = Market;
        this.Odd = Odd;
        // this.ChangeOdd(reduceBy);
    }
      reduceAlgorithmExpon(x) {
        const numlog = Math.log10(x);
        const newNum = Math.exp(numlog);
        return newNum;
      }
      ChangeOdd(Odds, marketType=null) {
        if (marketType) {
         //   console.log(Odds,'no')
          if (Object.keys(Odds[marketType]).length > 2) {
            for (
              let index = 0;
              index < Object.keys(Odds[marketType]).length;
              index++
            ) {
              var Odd = Odds[marketType][index]["Odd"];
              if (Odd == "Infinity" || Odd > 40290) {
                Odd = 40290;
              }
              Odds[marketType][index]["Odd"] = this.reduceAlgorithmExpon(Odd).toFixed(2);
            }
            return Odds;
          } else {
            var Odd = Odds[marketType]["Odd"];
    
            if (Odd == "Infinity" || Odd > 40290) {
              Odd = 40290;
            }
            Odds[marketType]["Odd"] = this.reduceAlgorithmExpon(Odd).toFixed(2);
            return Odds;
          }
        }
        if (Odds) {
          for (let marketTypes in Odds) {
            //console.log(Object.keys(Odds[marketTypes]));
            if (Object.keys(Odds[marketTypes]).length > 2) {
              for (
                let index = 0;
                index < Object.keys(Odds[marketTypes]).length;
                index++
              ) {
                var Odd = Odds[marketTypes][index]["Odd"];
                if (Odd == "Infinity" || Odd > 40290) {
                  Odd = 40290;
                }
                Odds[marketTypes][index]["Odd"] = this.reduceAlgorithmExpon(Odd).toFixed(2);
              }
            } else if (marketTypes != null) {
              var Odd = Odds[marketTypes]["Odd"];
    
              if (Odd == "Infinity" || Odd > 40290) {
                Odd = 40290;
              }
              Odds[marketTypes]["Odd"] = this.reduceAlgorithmExpon(Odd).toFixed(2);
            }
          }
          return Odds;
        }
      }
 
}

/*
---------------------------------
-  this class calculate all odds  -
----------------------------------
*/
class odds {
  #cal;
  #Odds;
  #UnderM;
  #Home;
  #Away;
  #GoalLeve;

  constructor(HG, AG) {
    /*----------------------------------------------
        Number of goals that is expected from both team
                -                                 -
                    HG=Home goal expentancy
                    HG=Away goal expentancy
                -                                 -
        -------------------------------------------------
        */
    this.HG = HG;
    this.AG = AG;

    /*
        ---------------------------------------------------------------
        - this vaiable means that the odd engine handles Goals below 6 -
        ----------------------------------------------------------------
        */
    this.#GoalLeve = 5;

    /*
       ----------------------------------------------------------
       -        This holds the percentage of goals probability  -
       -                -     1    2   3           5            -
       -                home 20% 90%   90%  ----                -
       -                away 28%  40%  78%  ----                -
       ----------------------------------------------------------
       */
    this.#Home = [];
    this.#Away = [];

    /*
        --------------------------------
        -      Holds all odds          -
        --------------------------------
         */
    this.#Odds = {};

    this.#cal = [1, 1, 2, 6, 12, 120];

    /*
        -----------------------------------------------------------------------------------
        -  Number of times the under market should be run to get all possible combination -
        -----------------------------------------------------------------------------------
        */
    this.#UnderM = [1, 2, 3, 4, 5, 6];

    this.ScorePercent();
  }
  ScorePercent() {
    for (let i = 0; i <= this.#GoalLeve; i++) {
      this.#Home.push(
        parseFloat(
          (
            (Math.pow(2.71828, -this.HG) * Math.pow(this.HG, i)) /
            this.#cal[i]
          ).toFixed(3)
        )
      );
      this.#Away.push(
        parseFloat(
          (
            (Math.pow(2.71828, -this.AG) * Math.pow(this.AG, i)) /
            this.#cal[i]
          ).toFixed(3)
        )
      );
    }
  }
  CalculateOdds() {
    /*
        -----------------------------------------------------------------------------------------------------
        -           This array is for indicating the unders(market) that should calculated                   -
        - Example the value in the zero index 0 indicate under 0.5 while that in 1 index indicate under 1.5; -
        -                                while for over                                                      - 
        - Example the value in the zero index 1 indicate over 0.5 while that in 1 index indicate over 1.5; -
        ------------------------------------------------------------------------------------------------------
        */

    let under = [0, 1, 2, 3, 4, 5];
    let over = [1, 2, 3, 4, 5];

    this.CorrectScore();
    this.GoalLessDraw();
    this.Draw();
    this.HomeWIN();
    this.AwayWIN();
    this.Under(under);
    this.Over(over);
    this.GoalGoal();
    this.GoalGoalAndHomeWin();
    this.GoalGoalAndAwayWin();
  }
  CorrectScore() {
    let correctScore = [];

    for (let i = 0; i <= this.#GoalLeve; i++) {
      let home = i + "";
      for (let l = 0; l <= this.#GoalLeve; l++) {
        let obj = {};
        let away = l + "";
        let key = home + "-" + away;
        let cal = this.#Home[i] * this.#Away[l];
        let val = 1 / cal;
        obj[key] = val.toFixed(2);
        let objs = new formatOdd(key, val.toFixed(2), this.CorrectScoreR);

        correctScore.push(objs);
      }
      if (i == this.#GoalLeve) {
        this.#Odds["correctScore"] = correctScore;
      }
    }
  }

  Draw() {
    let total = 0,
      odd = 0;

    for (let i = 0; i <= this.#GoalLeve; i++) {
      total += this.#Home[i] * this.#Away[i];
      if (i == this.#GoalLeve) {
        odd = 1 / total;
        let objs = new formatOdd("Draw", odd.toFixed(2));
        this.#Odds["Draw"] = objs;
      }
    }
  }
  GoalLessDraw() {
    let total = this.#Home[0] * this.#Away[0];

    let objs = new formatOdd("GLD", (1 / total).toFixed(2), this.GoalLessDrawR);

    this.#Odds["GoalLessDraw"] = objs;
  }
  HomeWIN() {
    let total = 0;
    for (let i = 1; i <= this.#GoalLeve; i++) {
      for (let j = 0; j <= this.#GoalLeve; j++) {
        if (i > j) {
          total += this.#Home[i] * this.#Away[j];
        } else {
          break;
        }
      }
      if (i == this.#GoalLeve) {
        let odd = 1 / total;
        let objs = new formatOdd("HomeWIN", odd.toFixed(2));
        this.#Odds["HomeWIN"] = objs;
      }
    }
  }
  AwayWIN() {
    let total = 0;
    for (let i = 1; i <= this.#GoalLeve; i++) {
      for (let j = 0; j <= this.#GoalLeve; j++) {
        if (i > j) {
          total += this.#Away[i] * this.#Home[j];
        } else {
          break;
        }
      }
      if (i == this.#GoalLeve) {
        let odd = 1 / total;
        let objs = new formatOdd("AwayWIN", odd.toFixed(2));
        this.#Odds["AwayWIN"] = objs;
      }
    }
  }
  Under(under) {
    let Under = [];

    for (let i = 0; i <= under.length; i++) {
      let total = 0;
      for (let j = 0; j < this.#UnderM[i]; j++) {
        for (let k = 0; k <= this.#UnderM[i]; k++) {
          if (j + k > under[i]) {
            break;
          } else {
            total += this.#Home[j] * this.#Away[k];
          }
        }
        if (j + 1 == this.#UnderM[i]) {
          let odd = 1 / total;
          let objs = new formatOdd(`${under[i]}.5`, odd.toFixed(2));
          Under.push(objs);
        }
      }

      if (i == under.length) {
        this.#Odds["Under"] = Under;
      }
    }
  }
  Over(over) {
    let Over = [];
    for (let i = 0; i < over.length; i++) {
      let total = 0;
      for (let j = 0; j <= this.#GoalLeve; j++) {
        for (let k = 0; k <= this.#GoalLeve; k++) {
          if (j + k >= over[i]) {
            // console.log(`--${j}----${k}-`)
            total += this.#Home[j] * this.#Away[k];
          }
        }
        if (j == this.#GoalLeve) {
          let odd = 1 / total;
          let objs = new formatOdd(`${over[i] - 1}.5`, odd.toFixed(2));
          Over.push(objs);
          //console.log(`--add up-`)
        }
      }
      if (i + 1 == over.length) {
        this.#Odds["Over"] = Over;
      }
    }
  }
  GoalGoal() {
    let total = 0;
    for (let i = 1; i <= this.#GoalLeve; i++) {
      for (let j = 1; j <= this.#GoalLeve; j++) {
        // console.log(`${i}---${j}`)
        total += this.#Home[1] * this.#Away[j];
      }
      if (i == this.#GoalLeve) {
        let odd = 1 / total;
        let objs = new formatOdd("GG", odd.toFixed(2));
        this.#Odds["GoalGoal"] = objs;
      }
    }
  }
  GoalGoalAndHomeWin() {
    let total = 0;
    for (let i = 1; i <= this.#GoalLeve; i++) {
      for (let j = 1; j <= this.#GoalLeve; j++) {
        if (i > j) {
          total += this.#Home[i] * this.#Away[j];
        } else {
          break;
        }
      }
      if (i == this.#GoalLeve) {
        let odd = 1 / total;
        let objs = new formatOdd("GGH", odd.toFixed(2));
        this.#Odds["GoalGoalAndHomeWin"] = objs;
      }
    }
  }
  GoalGoalAndAwayWin() {
    let total = 0;
    for (let i = 1; i <= this.#GoalLeve; i++) {
      for (let j = 2; j <= this.#GoalLeve; j++) {
        if (j > i) {
          // console.log(`---------yes-------`)
          //console.log(`${i}---${j}`)
          // console.log(`---------yes--------`)
          total += this.#Home[i] * this.#Away[j];
        }
      }
      if (i == this.#GoalLeve) {
        let odd = 1 / total;
        let objs = new formatOdd("GGA", odd.toFixed(2));
        this.#Odds["GoalGoalAndAwayWin"] = objs;
      }
    }
  }
  viewTable() {
    //return {v:this.#Home,B:this.#Away}
    return this.#Odds;
  }
}


module.exports={odds,formatOdd} ;