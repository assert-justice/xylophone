import { Graphics, System } from 'cleo';
import { Sprite } from "./cleo-utils/sprite";
import { roomHeight, roomWidth, tileWidth } from './constants';
import { GameState } from './game_state';
import { lerp } from './cleo-utils/ease';

export class Room{
    bg: Sprite;
    drawAnimBg = false;
    chestSpr: Sprite;
    floorTile: Sprite;
    wallTile: Sprite;
    wallCoords = {
        ulc:[1,0],
        urc:[6,0],
        dlc:[0,2],
        drc:[7,2],
        l:[1,3],
        r:[6,3],
        u:[5,0],
        d:[5,9],
        block: [2,5],
        lcu:[0,8],
        lcd:[0,9],
        rcu:[4,8],
        rcd:[4,9],
        ucl:[1,6],
        ucr:[2,6],
        dcl:[1,10],
        dcr:[2,10],
    }
    constructor(){
        this.bg = new Sprite(
            Graphics.Texture.new(roomWidth * tileWidth, roomHeight * tileWidth));
        this.bg.setProps({
            ox:roomWidth * tileWidth/2,
            oy:roomHeight * tileWidth/2,
        });
        this.floorTile = new Sprite(GameState.texStore.get('floorTiles'));
        this.floorTile.setProps({
            width:tileWidth,
            height:tileWidth,
            sx:tileWidth*14,
            sy:tileWidth*15,
            sw:tileWidth,
            sh:tileWidth,
        });
        this.chestSpr = new Sprite(GameState.texStore.get('goldChest'));
        this.chestSpr.setProps({
            width: 16,
            height: 16,
            sw: 16,
            sh: 16,
            sx: 16,
            ox: 8,
            oy: 8,
            // angle: 30,
        });
        this.wallTile = new Sprite(GameState.texStore.get('wallTiles'));
        this.wallTile.setProps({
            width:tileWidth,
            height:tileWidth,
            sw:tileWidth,
            sh:tileWidth,
        });
        this.drawStatic();
    }
    draw(){
        if(GameState.animator.isPlaying()){
            this.chestSpr.draw(roomWidth*tileWidth/2,roomHeight*tileWidth/2);
            if(this.drawAnimBg){
                this.bg.draw(roomWidth * tileWidth/2,roomHeight * tileWidth/2);
            }
        }
        else{
            this.bg.draw(roomWidth * tileWidth/2,roomHeight * tileWidth/2);
        }
    }
    drawStatic(){
        this.bg.tex.setTarget();
        for(let x = 0; x < roomWidth; x++){
            for(let y = 0; y < roomHeight; y++){
                let coord:number[] = [0,0];
                if((x > 0 && x < roomWidth - 1) && (y > 0 && y < roomHeight - 1)){
                    if(GameState.grid.isCellSolid(x, y)){
                        coord = this.wallCoords.block;
                    }
                    else{
                        this.floorTile.draw(x * tileWidth, y * tileWidth);
                        continue;
                    }
                }
                else if(x === 0){
                    if(y === 0) coord = this.wallCoords.ulc;
                    else if(y === roomHeight-1) coord = this.wallCoords.dlc;
                    else coord = this.wallCoords.l;
                }
                else if(x === roomWidth-1){
                    if(y === 0) coord = this.wallCoords.urc;
                    else if(y === roomHeight-1) coord = this.wallCoords.drc;
                    else coord = this.wallCoords.r;
                }
                else if(y === 0) coord = this.wallCoords.u;
                else if(y === roomHeight-1) coord = this.wallCoords.d;
                this.wallTile.props.sx = coord[0] * tileWidth;
                this.wallTile.props.sy = coord[1] * tileWidth;
                this.wallTile.draw(x*tileWidth, y*tileWidth);
            }
        }
        this.bg.tex.resetTarget();
    }
    enter(){
        this.chestSpr.props.visible=true;
        let group = GameState.animator.addGroup();
        group.addAnim(1, 
            (p: number)=>{
                this.chestSpr.setProps({
                    width: lerp(16, roomWidth*tileWidth*4, p),
                    height: lerp(16, roomWidth*tileWidth*4, p),
                });
            }, 
            ()=>{
                this.drawAnimBg = true;
                this.bg.setProps({
                    width: 16,
                    height: 16,
                });
            });
        group = GameState.animator.addGroup();
        group.addAnim(1, 
            (p: number)=>{
                this.bg.setProps({
                    width: lerp(16, roomWidth*tileWidth, p),
                    height: lerp(16, roomHeight*tileWidth, p),
                });
                if(p>0.5) this.chestSpr.props.visible=false;
            }, 
            ()=>{
                this.drawAnimBg = false;
                this.chestSpr.setProps({
                    width: 16,
                    height: 16,
                });
            });
        GameState.animator.play();
    }
}