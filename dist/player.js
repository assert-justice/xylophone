import { Sprite } from "./sprite.js";

export class Player {
    x =  0;
    y =  0;
    speed =  100;
    _spr;
    constructor(){
        this._spr = new Sprite();
        this._spr.setProps({
            width: 16,
            height: 16,
            // sx: 24,
            // sy: 0,
            sw: 16,
            sh: 16,
        });
        // this._spr.width =  24*4;
        // this._spr.height =  24*4;
        // this._spr.sx = 24;
        // this._spr.sy = 0;
        // this._spr.sw = -24;
        // this._spr.sh = 24;
    }
    set spr(spr){this._spr.spr=spr};
    draw(){
        this._spr.draw(this.x, this.y);
    }
}