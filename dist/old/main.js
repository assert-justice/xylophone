import { Game, System, Input, Window, Graphics } from 'cleo';
import { Player } from '../player.js';
import { Sprite } from '../sprite.js';
import { Room, RoomData } from './room.js';
const {Texture} = Graphics;
const tileWidth = 16;
const roomWidth = 18;
const roomHeight = 12;
Window.setStats('xylophone', roomWidth*tileWidth*4, roomHeight*tileWidth*4);

let player;
let floorTile;
let frameBuffer;
let wallTile;
let bg0, bg1;
let room;

Game.init = ()=>{
    player = new Player();
    player.spr = Texture.fromFile('./sprites/SpriteSheet.png');
    // floorTile = new Sprite();
    // floorTile.setProps({
    //     spr: Texture.fromFile('./sprites/TilesetInteriorFloor.png'),
    //     width:16,
    //     height:16,
    //     sx:16*14,
    //     sy:16*15,
    //     sw:16,
    //     sh:16,
    // });
    // wallTile = new Sprite();
    // wallTile.setProps({
    //     spr: Texture.fromFile('./sprites/TilesetWallSimple.png'),
    //     width:16,
    //     height:16,
    //     // sx:16*19,
    //     // sy:16*16,
    //     sw:16,
    //     sh:16,
    // });
    bg0 = Texture.new(roomWidth*tileWidth, roomHeight*tileWidth);
    const rd = new RoomData();
    rd.doors='lrud';
    room = new Room(bg0, roomWidth,roomHeight,tileWidth,rd);
    room.draw();
    // drawBackground(bg0);
    frameBuffer = new Sprite();
    frameBuffer.setProps({
        spr: Texture.new(roomWidth*tileWidth, roomHeight*tileWidth),
        width: Window.width,
        height: Window.height,
    });
}

Game.update = (dt)=>{
    if(Input.keyIsDown(256)) Game.quit();
    player.update(dt);
    // if(Input.keyIsDown(262)) player.x += player.speed * dt;
    // if(Input.keyIsDown(263)) player.x -= player.speed * dt;
    // if(Input.joyButtonIsDown(0,12)) player.x += player.speed * dt;
    // if(Input.joyButtonIsDown(0,14)) player.x -= player.speed * dt;
}

Game.draw = ()=>{
    frameBuffer.spr.setTarget();
    Graphics.clear();
    bg0.draw(0,0);
    player.draw();
    frameBuffer.spr.resetTarget();
    frameBuffer.draw(0,0);
}

// function drawBackground(bg){
//     bg.setTarget();
//     for(let x = 0; x < bg.width; x+=floorTile.width){    
//         for(let y = 0; y < bg.height; y+=floorTile.height){
//             floorTile.draw(x,y);
//         }
//     }
//     bg.resetTarget();
// }