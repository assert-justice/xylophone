import { Game, System, Input, Window, Graphics } from 'cleo';
import { Player } from './player.js';
import { Sprite } from './sprite.js';
const {Texture} = Graphics;
Window.setStats('xylophone', 1920/2, 1080/2);

let player;
let floorTile;
let frameBuffer;

Game.init = ()=>{
    player = new Player();
    player.spr = Texture.fromFile('./sprites/SpriteSheet.png');
    floorTile = new Sprite();
    floorTile.setProps({
        spr: Texture.fromFile('./sprites/TilesetInteriorFloor.png'),
        width:16,
        height:16,
        sx:16*19,
        sy:16*16,
        sw:16,
        sh:16,
    });
    frameBuffer = new Sprite();
    frameBuffer.setProps({
        spr: Texture.new(1920/8,1080/8),
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
    drawBackground();
    player.draw();
    frameBuffer.spr.resetTarget();
    frameBuffer.draw(0,0);
}

function drawBackground(){
    // frameBuffer.spr.setTarget();
    for(let x = 0; x < frameBuffer.spr.width; x+=floorTile.width){    
        for(let y = 0; y < frameBuffer.spr.height; y+=floorTile.height){
            floorTile.draw(x,y);
        }
    }
    // frameBuffer.spr.resetTarget();
}