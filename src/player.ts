import { System, Graphics } from 'cleo';
import { Sprite } from "./cleo-utils/sprite";
import { Vec2 } from "./cleo-utils/la";
// import { InputMap } from "./input_map";
// import { tileWidth, roomWidth, roomHeight } from './constants';
import { GameState } from './game_state';
import { Holdable } from './holdable';
const { Texture } = Graphics;

export class Player {
    position = new Vec2();
    // input = new InputMap();
    speed = 300;
    spr: Sprite;
    held?: Holdable;
    constructor(){
        const tex = Texture.fromFile('./sprites/SpriteSheet.png');
        this.spr = new Sprite(tex);
        this.spr.setProps({
            width: 16,
            height: 16,
            sw: 16,
            sh: 16,
        });
    }
    draw(){
        this.spr.draw(this.position.x, this.position.y);
    }
    update(dt: number){
        if(GameState.inputMap.grabDown){
            if(this.held) this.held = undefined;
            else{
                let minDis = 16;
                for (const h of GameState.holdables) {
                    const dis = this.position.dis(h.position);
                    if(dis<minDis){
                        this.held = h;
                        minDis=dis;
                    }
                }
            }
        }
        const velocity = GameState.inputMap.move.mul(dt * this.speed);
        this.position = GameState.grid.collide(this.position, velocity);
    }
}