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
        this.reversal = [];
        if (this.get(x,y)==1||this.get(x,y)==2) {return this.reversal;}

        this.searchf(x,y,1,0,player);
        this.searchf(x,y,0,1,player);
        this.searchf(x,y,-1,0,player);
        this.searchf(x,y,0,-1,player);
        this.searchf(x,y,1,1,player);
        this.searchf(x,y,1,-1,player);
        this.searchf(x,y,-1,1,player);
        this.searchf(x,y,-1,-1,player);

        return this.reversal;
    }
    searchf(x,y,rx,ry,player) { // 単一方向のひっくり返すマスの取得
        let treversal = [];
        for (let s=1;s<8;s++) {
            if (this.get(rx*s+x,ry*s+y)==0||this.get(rx*s+x,ry*s+y)==false) {break;}
            else if (this.get(rx*s+x,ry*s+y)==player) {this.reversal=this.reversal.concat(treversal);;break;}
            else {treversal.push([rx*s+x,ry*s+y]);}
        }
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