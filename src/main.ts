import { System, Engine, Window, Graphics, Input } from 'cleo';
import { Player } from './player';
import { Room } from './room';
import { Sprite } from './cleo-utils/sprite';
import { roomHeight, roomWidth, tileWidth } from './constants';
import { GameState } from './game_state';
import { Chest } from './chest';
import { RoomGrid } from './room_grid';
import { Animator } from './cleo-utils/animator';
import { Editor } from './editor';
import { InputMap } from './input_map';
import { TextureStore } from './cleo-utils/texture_store';
import { RoomData } from './room_data';

Window.setStats('xylophone', roomWidth*tileWidth*2, roomHeight*tileWidth*2);

const rd: RoomData = {
    id: 0,
    tiles: [['1,1','wall']],
}

// rd.tiles.push(['1,1',`{"type": "goldChest", "childId": 1}`]);
// const str = JSON.stringify(rd);
// System.println(str);
// System.println(Object.keys(JSON.parse(`{"type": "goldChest", "childId": 1}`)));

Engine.init = ()=>{
    const fbTex = Graphics.Texture.new(roomWidth * tileWidth, roomHeight * tileWidth);
    GameState.fb = new Sprite(fbTex);
    GameState.fb.setProps({width: Window.width,
        height: Window.height,
    });
    GameState.texStore = new TextureStore();
    GameState.texStore.setGroup([
        ['selection', './sprites/selection.png'],
        ['goldChest', './sprites/BigTreasureChest.png'],
        ['silverChest', './sprites/LittleTreasureChest.png'],
        ['goldKey', './sprites/GoldKey.png'],
        ['silverKey', './sprites/SilverKey.png'],
        ['playerSheet', './sprites/SpriteSheet.png'],
        ['floorTiles','./sprites/TilesetInteriorFloor.png'],
        ['wallTiles','./sprites/TilesetInterior.png'],
    ]);
    GameState.animator = new Animator();
    // const chest = new Chest();
    GameState.holdables = [];
    GameState.grid = new RoomGrid();
    GameState.room = new Room();
    GameState.player = new Player();
    // GameState.player.held = chest;
    GameState.player.position.x = 100; GameState.player.position.y = 100;
    GameState.inputMap = new InputMap();
    GameState.editor = new Editor();
    GameState.room.enter(rd);
}

Engine.update = (dt:number)=>{
    if(Input.keyIsDown(256)) Engine.quit();
    GameState.inputMap.poll();
    GameState.editor.update(dt);
    GameState.player.update(dt);
    for (const h of GameState.holdables) {
        h.update(dt);
    }
    GameState.animator.update(dt);
}

Engine.draw = ()=>{
    GameState.fb.tex.setTarget();
    GameState.room.draw();
    GameState.player.draw();
    for (const h of GameState.holdables) {
        h.draw();
    }
    // const [mx,my] = GameState.grid.toCoord(Input.mouseX/2, Input.mouseY/2);
    GameState.editor.draw();
    // GameState.selectionTex.draw(mx*tileWidth,my*tileWidth);
    GameState.fb.tex.resetTarget();
    GameState.fb.draw(0,0);
}