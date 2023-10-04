import { GameState } from "./game_state";
import { Vec2 } from "./la";
import { Sprite } from "./sprite";

export class Holdable{
    spr: Sprite;
    position: Vec2;
    isHeld(): boolean{
        return GameState.player.held === this;
    }
    offset: Vec2;
    constructor(spr: Sprite){
        this.spr = spr;
        this.position = new Vec2();
        this.offset = new Vec2();
    }
    update(dt: number){
        if(this.isHeld()){
            this.position.x = GameState.player.position.x;
            this.position.y = GameState.player.position.y;
        }
    }
    draw(){
        const pos = this.position.copy();
        if(this.isHeld()) pos.add(this.offset);
        this.spr.draw(pos.x, pos.y);
    }
}