import { Sprite } from "./cleo-utils/sprite";
import { Vec2 } from "./cleo-utils/la";
import { GameState } from './game_state';
import { Holdable } from './holdable';

export class Player {
    position = new Vec2();
    speed = 300;
    spr: Sprite;
    held?: Holdable;
    constructor(){
        this.spr = new Sprite(GameState.texStore.get('playerSheet'));
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