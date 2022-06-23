/*
 formatOdd helps in  re-arranging odd into readable json format  
 */

class formatOdd {
    constructor(Market, Odd, reduceBy = null) {
        this.Market = Market;
        this.Odd = Odd;

        this.ChangeOdd(reduceBy);
    }
}