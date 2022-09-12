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
        let torevers = this.search(x,y,this.nextplayer);
        if (torevers.length>0) {
            this.set(x,y,this.nextplayer);
            for (let cell of torevers) {
                console.log(cell)
                this.set(cell[0],cell[1],this.nextplayer);
            }
            this.nextplayer = this.gnextplayer();
        }
        else {
            console.error("can't choose the cell");
        }
    }
    search(x,y,player) {
        let reversal = [];
        if (this.board[y*8+x]==1||this.board[y*8+x]==2) {return reversal;}
        let leftreversal = [];let toleftr = true; // 左方向
        for (let sx=x-1;sx>=0;sx--) {
            if (this.get(sx,y)==0) {toleftr = false;break;}
            else if (this.get(sx,y)==player) {break;}
            else {leftreversal.push([sx,y]);}
        }
        if (toleftr) {reversal=reversal.concat(leftreversal);}
        let rightreversal = [];let torightr = true; // 右方向
        for (let sx=x+1;sx<8;sx++) {
            if (this.get(sx,y)==0) {torightr = false;break;}
            else if (this.get(sx,y)==player) {break;}
            else {rightreversal.push([sx,y]);}
        }
        if (torightr) {reversal=reversal.concat(rightreversal);}
        let topreversal = [];let totopr = true; // 上方向
        for (let sy=y-1;sy>=0;sy--) {
            if (this.get(x,sy)==0) {totopr = false;break;}
            else if (this.get(x,sy)==player) {break;}
            else {topreversal.push([x,sy]);}
        }
        if (totopr) {reversal=reversal.concat(topreversal);}
        let bottomreversal = [];let tobottomr = true; // 下方向
        for (let sy=y+1;sy<8;sy++) {
            if (this.get(x,sy)==0) {tobottomr = false;break;}
            else if (this.get(x,sy)==player) {break;}
            else {bottomreversal.push([x,sy]);}
        }
        if (tobottomr) {reversal=reversal.concat(bottomreversal);}
        return reversal;
    }
    gnextplayer() {
        if (this.nextplayer==1) {return 2;} return 1;
    }
    getarr() {
        let arr = [];
        for (let iy = 0; iy < 8; iy++) {
            arr.push([]);
            for (let ix = 0; ix < 8; ix++) {
                arr[iy][ix] = this.board[iy*8+ix];
            }
        }
        return arr;
    }
}