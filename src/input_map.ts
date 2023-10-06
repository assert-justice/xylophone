import { Input } from 'cleo'
import { Vec2 } from './cleo-utils/la';
import { clamp } from './cleo-utils/ease';
import { tileWidth } from './constants';
import { GameState } from './game_state';

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
    e: 69,
}

export class InputMap{
    private _move = new Vec2();
    get move(){return this._move;}
    private _grab: [boolean,boolean] = [false,false];
    get grabDown(){
        return this._grab[0] && !this._grab[1];
    }
    private _use: [boolean,boolean] = [false,false];
    get useDown(){
        return this._use[0] && !this._use[1];
    }
    private _m1Down: [boolean,boolean] = [false,false];
    get m1Down(){
        return this._m1Down[0] && !this._m1Down[1];
    }
    get m1Pressed(){
        return this._m1Down[0];
    }
    private _m2Down: [boolean,boolean] = [false,false];
    get m2Down(){
        return this._m2Down[0] && !this._m2Down[1];
    }
    get m2Pressed(){
        return this._m2Down[0];
    }
    private _edit: [boolean,boolean] = [false,false];
    get editDown(){
        return this._edit[0] && !this._edit[1];
    }
    mouseCell(){
        return GameState.grid.toCoord(Input.mouseX/2, Input.mouseY/2);
    }
    deadzone: number = 0;
    poll(){
        this._move.x = 0;
        this._move.y = 0;
        if(Input.keyIsDown(key.w)) this._move.y -=1;
        if(Input.keyIsDown(key.a)) this._move.x -=1;
        if(Input.keyIsDown(key.d)) this._move.x +=1;
        if(Input.keyIsDown(key.s)) this._move.y +=1;
        this._move.x = clamp(-1,this._move.x,1);
        this._move.y = clamp(-1,this._move.y,1);
        // correctly handle deadzones
        let len = this._move.length() - this.deadzone;
        if(len < 0) len = 0;
        else if(len > 1) len = 1;
        this._move.normalize().mul(len);
        this.setButton(this._grab, Input.keyIsDown(key.space));
        this.setButton(this._use, Input.keyIsDown(key.e));
        this.setButton(this._m1Down, Input.mouseButtonIsDown(0));
        this.setButton(this._m2Down, Input.mouseButtonIsDown(1));
        this.setButton(this._edit, Input.keyIsDown(258));
    }
    private setButton(button: [boolean, boolean], val: boolean){
        button[1] = button[0];
        button[0] = val;
    }
}