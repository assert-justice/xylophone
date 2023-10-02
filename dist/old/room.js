import { Graphics } from 'cleo';
const {Texture} = Graphics;
import { Sprite } from "./sprite.js";

export class RoomData{
    entities=[];
    doors='';
}

export class Room{
    bg;
    floorTile;
    wallTile;
    width;
    height;
    tileWidth;
    data;
    wallCoords = {
        ulc:[0,6],
        urc:[4,6],
        dlc:[0,10],
        drc:[4,10],
        l:[0,7],
        r:[4,7],
        u:[3,6],
        d:[3,10],
        lcu:[0,8],
        lcd:[0,9],
        rcu:[4,8],
        rcd:[4,9],
        ucl:[1,6],
        ucr:[2,6],
        dcl:[1,10],
        dcr:[2,10],
    }
    constructor(bg, width, height, tileWidth, data){
        this.bg = bg; this.width = width;
        this.height = height; this.tileWidth = tileWidth;
        this.data = data;
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
    collide(ent){
        // assume ent width is tile width
    }
    isSolid(x,y){
        // x = Math.floor(x/this.tileWidth);
        // y = Math.floor(y/this.tileWidth);
        if(x === 0 || x === this.width) return true;
        if(y === 0 || y === this.height) return true;
        return false;
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
        if(this.data.doors.includes('l')){
            let y = Math.floor(this.height/2)-2;
            this._drawWallTile(this.wallCoords.lcu, 0, y); y++;
            this.floorTile.draw(0,y*this.tileWidth); y++;
            this.floorTile.draw(0,y*this.tileWidth); y++;
            this._drawWallTile(this.wallCoords.lcd, 0, y);
        }
        if(this.data.doors.includes('r')){
            let y = Math.floor(this.height/2)-2;
            this._drawWallTile(this.wallCoords.rcu, this.width-1, y); y++;
            this.floorTile.draw((this.width-1)*this.tileWidth,y*this.tileWidth); y++;
            this.floorTile.draw((this.width-1)*this.tileWidth,y*this.tileWidth); y++;
            this._drawWallTile(this.wallCoords.rcd, this.width-1, y);
        }
        if(this.data.doors.includes('u')){
            let x = Math.floor(this.width/2)-2;
            this._drawWallTile(this.wallCoords.ucl, x, 0); x++;
            this.floorTile.draw(x*this.tileWidth,0); x++;
            this.floorTile.draw(x*this.tileWidth,0); x++;
            this._drawWallTile(this.wallCoords.ucr, x, 0);
        }
        if(this.data.doors.includes('d')){
            let x = Math.floor(this.width/2)-2;
            this._drawWallTile(this.wallCoords.dcl, x, this.height-1); x++;
            this.floorTile.draw(x*this.tileWidth,(this.height-1)*this.tileWidth); x++;
            this.floorTile.draw(x*this.tileWidth,(this.height-1)*this.tileWidth); x++;
            this._drawWallTile(this.wallCoords.dcr, x, this.height-1);
        }
        this.bg.resetTarget();
    }
}