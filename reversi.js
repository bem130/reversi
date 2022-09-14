class Reversi {
    constructor() { // 盤面の初期化
        this.nextplayer = 1;
        this.board = new Uint8ClampedArray(8*8).fill(0);
        this.set(4,4,1);this.set(4,5,2);this.set(5,4,2);this.set(5,5,1);
    }
    set(x,y,player) { // マスの設定
        this.board[8*(y-1)+x-1] = player;
    }
    get(x,y) { // マスの取得
        if (x<1||x>8||y<1||y>8) {return false;}
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
    search(x,y,player) { // ひっくり返すマスの取得
        let reversal = [];
        if (this.get(x,y)==1||this.get(x,y)==2) {return reversal;}
        let leftreversal = [];let toleftr = false; // 左方向
        for (let sx=x-1;sx>=0;sx--) {
            if (this.get(sx,y)==0||this.get(sx,y)==false) {break;}
            else if (this.get(sx,y)==player) {toleftr = true;break;}
            else {leftreversal.push([sx,y]);}
        }
        if (toleftr) {reversal=reversal.concat(leftreversal);}
        let rightreversal = [];let torightr = false; // 右方向
        for (let sx=x+1;sx<8;sx++) {
            if (this.get(sx,y)==0||this.get(sx,y)==false) {break;}
            else if (this.get(sx,y)==player) {torightr = true;break;}
            else {rightreversal.push([sx,y]);}
        }
        if (torightr) {reversal=reversal.concat(rightreversal);}
        let topreversal = [];let totopr = false; // 上方向
        for (let sy=y-1;sy>=0;sy--) {
            if (this.get(x,sy)==0||this.get(x,sy)==false) {break;}
            else if (this.get(x,sy)==player) {totopr = true;break;}
            else {topreversal.push([x,sy]);}
        }
        if (totopr) {reversal=reversal.concat(topreversal);}
        let bottomreversal = [];let tobottomr = false; // 下方向
        for (let sy=y+1;sy<8;sy++) {
            if (this.get(x,sy)==0||this.get(x,sy)==false) {break;}
            else if (this.get(x,sy)==player) {tobottomr = true;break;}
            else {bottomreversal.push([x,sy]);}
        }
        if (tobottomr) {reversal=reversal.concat(bottomreversal);}
        return reversal;
    }
    gnextplayer() {
        if (this.nextplayer==1) {return 2;} return 1;
    }
    getarr() { // 盤面を2次元配列で取得
        let arr = [];
        for (let iy = 0; iy < 8; iy++) {
            arr.push([]);
            for (let ix = 0; ix < 8; ix++) {
                arr[iy][ix] = this.board[iy*8+ix];
            }
        }
        return arr;
    }
    getselectable() { // 次選択可能なマスを探す
        let selectable = [];
        for (let iy = 1; iy < 9; iy++) {
            for (let ix = 1; ix < 9; ix++) {
                if (this.search(ix,iy,this.nextplayer).length) {
                    selectable.push((iy-1)*8+ix-1);
                }
            }
        }
        return selectable;
    }
    getsearch(x,y) {
        let sres = this.search(x+1,y+1,this.nextplayer);
        let res = [];
        for (let i=0;i<sres.length;i++) {
            res.push((sres[i][1]-1)*8+sres[i][0]-1);
        }
        return res;
    }
}