import { System, Game, Window, Graphics, Input } from 'cleo';
import { Player } from './player';
import { Room } from './room';
import { Sprite } from './sprite';
import { roomHeight, roomWidth, tileWidth } from './constants';
import { GameState } from './game_state';

Window.setStats('xylophone', roomWidth*tileWidth*2, roomHeight*tileWidth*2);

Game.init = ()=>{
    const fbTex = Graphics.Texture.new(roomWidth * tileWidth, roomHeight * tileWidth);
    GameState.fb = new Sprite(fbTex);
    GameState.fb.setProps({width: Window.width,
        height: Window.height,
    });
    GameState.room = new Room();
    GameState.player = new Player();
    GameState.player.grid = GameState.room.grid;
    GameState.player.position.x = 100; GameState.player.position.y = 100;
}

Game.update = (dt:number)=>{
    if(Input.keyIsDown(256)) Game.quit();
    GameState.player.update(dt);
}
Game.draw = ()=>{
    GameState.fb.tex.setTarget();
    GameState.room.draw();
    GameState.player.draw();
    GameState.fb.tex.resetTarget();
    GameState.fb.draw(0,0);
}