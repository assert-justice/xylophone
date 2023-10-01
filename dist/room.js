import { Graphics } from 'cleo';
const {Texture} = Graphics;
import { Sprite } from "./sprite.js";

export class Room{
    bg;
    floorTile;
    wallTile;
    width;
    height;
    tileWidth;
    wallCoords = {
        ulc:[0,6],
        urc:[4,6],
        dlc:[0,10],
        drc:[4,10],
        l:[0,7],
        r:[4,7],
        u:[3,6],
        d:[3,10],
    }
    constructor(bg, width, height, tileWidth){
        this.bg = bg; this.width = width;
        this.height = height; this.tileWidth = tileWidth;
        this.floorTile = new Sprite();
        this.floorTile.setProps({
            spr: Texture.fromFile('./sprites/TilesetInteriorFloor.png'),
            width:tileWidth,
            height:tileWidth,
            sx:tileWidth*14,
            sy:tileWidth*15,
            sw:tileWidth,
            sh:tileWidth,
        });
        this.wallTile = new Sprite();
        this.wallTile.setProps({
            spr: Texture.fromFile('./sprites/TilesetWallSimple.png'),
            width:tileWidth,
            height:tileWidth,
            sw:tileWidth,
            sh:tileWidth,
        });
    }
    _drawWallTile([sx,sy],x,y){
        sx*=this.tileWidth;
        sy*=this.tileWidth;
        if(x<0)x+=this.width;
        if(y<0)y+=this.height;
        x*=this.tileWidth;
        y*=this.tileWidth;
        this.wallTile.setProps({sx,sy});
        this.wallTile.draw(x,y);
    }
    draw(){
        this.bg.setTarget();
        for(let x = 0; x < this.width; x++){    
            for(let y = 0; y < this.height; y++){
                this.floorTile.draw(x*this.tileWidth,y*this.tileWidth);
            }
        }
        for(let x = 1; x < this.width-1; x++){
            this._drawWallTile(this.wallCoords.u, x,0);
            this._drawWallTile(this.wallCoords.d, x,this.height-1);
        }
        for(let y = 1; y < this.height-1; y++){
            this._drawWallTile(this.wallCoords.l, 0,y);
            this._drawWallTile(this.wallCoords.r, this.width-1,y);
        }
        this._drawWallTile(this.wallCoords.ulc,0,0);
        this._drawWallTile(this.wallCoords.urc,-1,0);
        this._drawWallTile(this.wallCoords.dlc,0,-1);
        this._drawWallTile(this.wallCoords.drc,-1,-1);
        this.bg.resetTarget();
    }
}