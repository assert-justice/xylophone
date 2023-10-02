import { Game, System, Input, Window, Graphics } from 'cleo';
import { Sprite } from './sprite';
import { Player } from './player';
const {Texture} = Graphics;
const tileWidth = 16;
const roomWidth = 18;
const roomHeight = 12;
Window.setStats('xylophone', roomWidth*tileWidth*4, roomHeight*tileWidth*4);

let fb, roomTex, player;

Game.init = ()=>{
    player = new Player();
    fb = Texture.new(roomWidth*tileWidth, roomHeight*tileWidth);
}
Game.update = (dt)=>{
    if(Input.keyIsDown(256)) Game.quit();
    player.update(dt);
}
Game.draw = ()=>{
    fb.setTarget();
    player.draw();
    fb.resetTarget();
    fb.draw(0,0,{width:Window.width,height:Window.height});
}
