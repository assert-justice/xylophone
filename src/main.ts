import { System, Game, Window, Graphics, Input } from 'cleo';
import { Player } from './player';
import { Room } from './room';
import { Sprite } from './cleo-utils/sprite';
import { roomHeight, roomWidth, tileWidth } from './constants';
import { GameState } from './game_state';
import { HashGrid2D } from './cleo-utils/hash_grid';
import { Chest } from './chest';

Window.setStats('xylophone', roomWidth*tileWidth*2, roomHeight*tileWidth*2);

Game.init = ()=>{
    const fbTex = Graphics.Texture.new(roomWidth * tileWidth, roomHeight * tileWidth);
    GameState.fb = new Sprite(fbTex);
    GameState.fb.setProps({width: Window.width,
        height: Window.height,
    });
    const chest = new Chest();
    GameState.holdables = [chest];
    GameState.grid = new HashGrid2D<number>(0);
    GameState.room = new Room();
    GameState.player = new Player();
    GameState.player.held = chest;
    GameState.player.position.x = 100; GameState.player.position.y = 100;
    GameState.selectionTex = Graphics.Texture.fromFile('./sprites/selection.png');
}

Game.update = (dt:number)=>{
    if(Input.keyIsDown(256)) Game.quit();
    GameState.player.update(dt);
    for (const h of GameState.holdables) {
        h.update(dt);
    }
}

Game.draw = ()=>{
    GameState.fb.tex.setTarget();
    GameState.room.draw();
    GameState.player.draw();
    for (const h of GameState.holdables) {
        h.draw();
    }
    const [mx,my] = GameState.toCoord(Input.mouseX/2, Input.mouseY/2);
    GameState.selectionTex.draw(mx*tileWidth,my*tileWidth);
    GameState.fb.tex.resetTarget();
    GameState.fb.draw(0,0);
}