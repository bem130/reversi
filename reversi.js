class Reversi {
    constructor() {
        this.board = new Uint8ClampedArray(8*8).fill(0);
        this.nextplayer = 1;
        this.set(4,4,1);
        this.set(4,5,2);
        this.set(5,4,2);
        this.set(5,5,1);
    }
    set(x,y,player) {
        this.board[8*(y-1)+x-1] = player;
    }
    get(x,y) {
        return this.board[8*(y-1)+x-1];
    }
    choose(x,y) {
        console.log(`player${this.nextplayer} chose the ${[x,y]}`);
        this.search(x,y,this.nextplayer);
    }
    search(x,y,player) {
        x--;y--;
        let reversal = [];
        let leftreversal = [];let toleftr = true; // 左方向
        for (let sx=x;sx>=0;sx++) {
            if (this.get(sx,y)==0) {toleftr = false;break;}
            else if (this.get(sx,y)==player) {break;}
            else {leftreversal.push(sx,y);}
        }
        if (toleftr) {reversal.concat(toleftr);}
        let rightreversal = [];let torightr = true; // 右方向
        for (let sx=x;sx<8;sx++) {
            if (this.get(sx,y)==0) {torightr = false;break;}
            else if (this.get(sx,y)==player) {break;}
            else {rightreversal.push(sx,y);}
        }
        if (torightr) {reversal.concat(torightr);}
        let topreversal = [];let totopr = true; // 上方向
        for (let sy=y;sy>=0;sy++) {
            if (this.get(x,sy)==0) {totopr = false;break;}
            else if (this.get(x,sy)==player) {break;}
            else {topreversal.push(x,sy);}
        }
        if (totopr) {reversal.concat(totopr);}
        let bottomreversal = [];let tobottomr = true; // 下方向
        for (let sy=y;sy<8;sy++) {
            if (this.get(x,sy)==0) {tobottomr = false;break;}
            else if (this.get(x,sy)==player) {break;}
            else {bottomreversal.push(x,sy);}
        }
        if (tobottomr) {reversal.concat(tobottomr);}

        console.log(reversal);
    }
    gnextplayer() {
        if (this.nextplayer==1) {
            return 2;
        }
        else {
            return 1;
        }
    }
    changeturn() {
        this.nextplayer = this.gnextplayer();
    }
}