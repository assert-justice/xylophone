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
    tab: 258,
    e: 69,
}

export class VButton{
    keys: number[] = [];
    mouseButtons: number[] = [];
    state: boolean = false;
    lastState: boolean = false;
    poll(){
        this.lastState = this.state;
        this.state = false;
        for (const key of this.keys) {
            if(Input.keyIsDown(key)) this.state = true;
        }
        for (const button of this.mouseButtons) {
            if(Input.mouseButtonIsDown(button)) this.state = true;
        }
    }
    isDown(){return this.state;}
    isPressed(){return this.state && !this.lastState;}
    isReleased(){return !this.state && this.lastState;}
}

export class InputMap{
    constructor(){
        this.buttons = new Map();
        this.addButton('grab').keys = [key.space];
        this.addButton('edit').keys = [key.tab];
        this.addButton('m1').mouseButtons = [0];
        this.addButton('m2').mouseButtons = [1];
    }
    private buttons: Map<string,VButton>;
    addButton(name: string){
        const button = new VButton();
        this.buttons.set(name, button);
        return button;
    }
    getButton(name: string){
        const button = this.buttons.get(name);
        if(button === undefined) throw `Invalid button name '${name}'!`;
        return button;
    }
    private _move = new Vec2();
    get move(){return this._move;}
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
        for (const button of this.buttons.values()) {
            button.poll();
        }
    }
}