import { Input } from 'cleo'
import { Vec2 } from './la.js';

const key = {
    right: 262,
    left: 263,
    down: 264,
    up: 265,
    w:87,
    a:65,
    s:83,
    d:68,
    space:32,
}

export class InputMap{
    _move = new Vec2();
    _aim = new Vec2();
    getMove(){
        this._move.x = 0;
        this._move.y = 0;
        if(Input.keyIsDown(key.w)) this._move.y -=1;
        if(Input.keyIsDown(key.a)) this._move.x -=1;
        if(Input.keyIsDown(key.d)) this._move.x +=1;
        if(Input.keyIsDown(key.s)) this._move.y +=1;
        return this._move.normalize()
    }
}