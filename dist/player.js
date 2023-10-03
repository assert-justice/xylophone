import { Graphics } from 'cleo';
import { Sprite } from "./sprite";
import { Vec2 } from "./la";
import { InputMap } from "./input_map";
const { Texture } = Graphics;
export class Player {
    constructor() {
        this.position = new Vec2();
        this.input = new InputMap();
        this.speed = 100;
        const tex = Texture.fromFile('./sprites/SpriteSheet.png');
        this.spr = new Sprite(tex);
        this.spr.setProps({
            width: 16,
            height: 16,
            sw: 16,
            sh: 16,
        });
    }
    draw() {
        this.spr.draw(this.position.x, this.position.y);
    }
    update(dt) {
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
