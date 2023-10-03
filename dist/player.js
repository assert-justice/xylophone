import { Graphics } from 'cleo';
import { Sprite } from "./sprite";
import { Vec2 } from "./la";
import { InputMap } from "./input_map";
import { HashGrid2D } from './hash_grid';
import { tileWidth, roomWidth, roomHeight } from './constants';
const { Texture } = Graphics;
export class Player {
    constructor() {
        this.position = new Vec2();
        this.input = new InputMap();
        this.speed = 300;
        this.grid = new HashGrid2D(0);
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
        this.collide(velocity);
    }
    isSolid(cx, cy) {
        if (!this.onGrid(cx, cy))
            return true;
        return this.grid.get(cx, cy) > 0;
    }
    toCoord(x, y) {
        return [
            Math.trunc(x / tileWidth),
            Math.trunc(y / tileWidth),
        ];
    }
    collide(vel) {
        const [cx, cy] = this.toCoord(this.position.x, this.position.y);
        this.position.add(vel);
        let minX = -Infinity;
        let maxX = Infinity;
        let minY = -Infinity;
        let maxY = Infinity;
        if (this.isSolid(cx - 1, cy))
            minX = cx * tileWidth;
        if (this.isSolid(cx + 1, cy))
            maxX = cx * tileWidth;
        if (this.isSolid(cx, cy - 1))
            minY = cy * tileWidth;
        if (this.isSolid(cx, cy + 1))
            maxY = cy * tileWidth;
        this.position.x = Math.min(maxX, Math.max(minX, this.position.x));
        this.position.y = Math.min(maxY, Math.max(minY, this.position.y));
    }
    onGrid(cx, cy) {
        if (cx < 0 || cx >= roomWidth)
            return false;
        if (cy < 0 || cy >= roomHeight)
            return false;
        return true;
    }
}
