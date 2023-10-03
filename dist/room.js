import { Graphics } from 'cleo';
import { Sprite } from "./sprite.js";
import { HashGrid2D } from './hash_grid';
export class Room {
    constructor(width, height, tileWidth) {
        this.wallCoords = {
            ulc: [0, 6],
            urc: [4, 6],
            dlc: [0, 10],
            drc: [4, 10],
            l: [0, 7],
            r: [4, 7],
            u: [3, 6],
            d: [3, 10],
            lcu: [0, 8],
            lcd: [0, 9],
            rcu: [4, 8],
            rcd: [4, 9],
            ucl: [1, 6],
            ucr: [2, 6],
            dcl: [1, 10],
            dcr: [2, 10],
        };
        this.bg = Graphics.Texture.new(width * tileWidth, height * tileWidth);
        this.grid = new HashGrid2D(0);
        this.width = width;
        this.height = height;
        this.tileWidth = tileWidth;
        this.floorTile = new Sprite(Graphics.Texture.fromFile('./sprites/TilesetInteriorFloor.png'));
        this.floorTile.setProps({
            width: tileWidth,
            height: tileWidth,
            sx: tileWidth * 14,
            sy: tileWidth * 15,
            sw: tileWidth,
            sh: tileWidth,
        });
        this.wallTile = new Sprite(Graphics.Texture.fromFile('./sprites/TilesetWallSimple.png'));
        this.wallTile.setProps({
            width: tileWidth,
            height: tileWidth,
            sw: tileWidth,
            sh: tileWidth,
        });
        this.drawStatic();
    }
    toCoord(x, y) {
        return [
            Math.floor(x / this.tileWidth),
            Math.floor(y / this.tileWidth),
        ];
    }
    draw() {
        this.bg.draw(0, 0);
    }
    isSolid(cx, cy) {
        return this.grid.get(cx, cy) > 0;
    }
    onGrid(cx, cy) {
        if (cx < 0 || cx >= this.width)
            return false;
        if (cy < 0 || cy >= this.height)
            return false;
        return true;
    }
    drawStatic() {
        this.bg.setTarget();
        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                let coord = [0, 0];
                if ((x > 0 && x < this.width - 1) && (y > 0 && y < this.height - 1)) {
                    this.floorTile.draw(x * this.tileWidth, y * this.tileWidth);
                    continue;
                }
                else if (x === 0) {
                    if (y === 0)
                        coord = this.wallCoords.ulc;
                    else if (y === this.height - 1)
                        coord = this.wallCoords.dlc;
                    else
                        coord = this.wallCoords.l;
                }
                else if (x === this.width - 1) {
                    if (y === 0)
                        coord = this.wallCoords.urc;
                    else if (y === this.height - 1)
                        coord = this.wallCoords.drc;
                    else
                        coord = this.wallCoords.r;
                }
                else if (y === 0)
                    coord = this.wallCoords.u;
                else if (y === this.height - 1)
                    coord = this.wallCoords.d;
                this.wallTile.props.sx = coord[0] * this.tileWidth;
                this.wallTile.props.sy = coord[1] * this.tileWidth;
                this.wallTile.draw(x * this.tileWidth, y * this.tileWidth);
            }
        }
        this.bg.resetTarget();
    }
}
