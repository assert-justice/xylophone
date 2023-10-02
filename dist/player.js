import { System, Graphics } from 'cleo';
import { Sprite } from "./sprite.js";
import { Vec2 } from "./la.js";
import { InputMap } from "./input_map.js";
const { Texture } = Graphics;

export class Player {
    position = new Vec2();
    input = new InputMap();
    speed = 100;
    spr;
    constructor(){
        this.spr = new Sprite();
        this.spr.setProps({
            spr: Texture.fromFile('./sprites/SpriteSheet.png'),
            width: 16,
            height: 16,
            sw: 16,
            sh: 16,
        });
    }
    draw(){
        this.spr.draw(this.position.x, this.position.y);
    }
    update(dt){
        const velocity = this.input.getMove().mul(dt * this.speed);
        // const roomWidth = 240;
        // const roomHeight = 135;
        // const tileWidth = 16;
        this.position.add(velocity);
        // if(this.position.x < 0) this.position.x = 0;
        // if(this.position.x > roomWidth-tileWidth) this.position.x = roomWidth-tileWidth;
        // if(this.position.y < 0) this.position.y = 0;
        // if(this.position.y > roomHeight-tileWidth) this.position.y = roomHeight-tileWidth;
    }
}