import { Graphics, System, Input } from "cleo";
import { Sprite } from "./cleo-utils/sprite";
import { GameState } from "./game_state";
import { tileWidth } from "./constants";

interface Icon{
    name: string;
    spr: Sprite;
    data?: object;
}

export class Editor{
    selectionTex: Graphics.Texture;
    icons: Icon[];
    iconIdx = 0;
    active: boolean = true;
    constructor(){
        this.selectionTex = GameState.texStore.get('selection');
        const goldChestTex = GameState.texStore.get('goldChest');
        const silverChestTex = GameState.texStore.get('silverChest');
        this.icons = [
            {
                name: 'wall',
                spr: new Sprite(GameState.room.wallTile.tex, {
                    width: tileWidth,
                    height: tileWidth,
                    sw: tileWidth,
                    sh: tileWidth,
                    sx: 2 * tileWidth,
                    sy: 5 * tileWidth,
                }),
            },
            {
                name: 'goldChestClosed',
                spr: new Sprite(goldChestTex, {
                    width: tileWidth,
                    sw: tileWidth,
                }),
            },
            {
                name: 'goldChestOpen',
                spr: new Sprite(goldChestTex, {
                    width: tileWidth,
                    sw: tileWidth,
                    sx: tileWidth,
                }),
            },
            {
                name: 'silverChestClosed',
                spr: new Sprite(silverChestTex, {
                    width: tileWidth,
                    sw: tileWidth,
                }),
            },
            {
                name: 'silverChestOpen',
                spr: new Sprite(silverChestTex, {
                    width: tileWidth,
                    sw: tileWidth,
                    sx: tileWidth,
                }),
            },
            {
                name: 'goldKey',
                spr: new Sprite(GameState.texStore.get('goldKey'), {
                    ox: -2,
                    oy: -4,
                }),
            },
            {
                name: 'silverKey',
                spr: new Sprite(GameState.texStore.get('silverKey'), {
                    ox: -2,
                    oy: -4,
                }),
            }
        ];
    }
    update(dt: number){
        if(GameState.inputMap.editDown) {
            this.active = !this.active;
        }
        if(!this.active) return;
        if(Input.keyIsDown(49)) this.iconIdx = 0;
        if(Input.keyIsDown(50)) this.iconIdx = 1;
        if(Input.keyIsDown(51)) this.iconIdx = 2;
        if(Input.keyIsDown(52)) this.iconIdx = 3;
        if(Input.keyIsDown(53)) this.iconIdx = 4;
        if(Input.keyIsDown(54)) this.iconIdx = 5;
        if(Input.keyIsDown(55)) this.iconIdx = 6;
        const data = GameState.room.data;
        if(!data) throw 'damn';

        const [mcx, mcy] = GameState.inputMap.mouseCell();
        const key = GameState.grid.hashGrid.toKey(mcx, mcy);
        if(GameState.inputMap.m1Pressed){
            // GameState.room.tiles.set(key, 'wall');
            const entry = data.tiles.find(val=>val[0]===key);
            const name = this.icons[this.iconIdx].name;
            if(entry === undefined){
                data.tiles.push([key, name]);
            }
            else{
                if(entry[1] === name) return;
                entry[1] = name;
            }
            GameState.room.redraw();
        }
        if(GameState.inputMap.m2Pressed){
            const idx = data.tiles.findIndex(val=>val[0]===key);
            if(idx === -1) return;
            data.tiles.splice(idx, 1);
            GameState.room.redraw();
            // if(GameState.grid.hashGrid.get(mcx, mcy) > 0){
            //     GameState.grid.hashGrid.set(mcx, mcy, 0);
            // }
        }
    }
    draw(){
        if(!this.active) return;
        const [mx, my] = GameState.inputMap.mouseCell()
        if(!GameState.inputMap.m2Pressed)this.icons[this.iconIdx].spr.draw(mx*tileWidth,my*tileWidth);
        const data = GameState.room.data;
        if(!data) throw 'welp';
        for(let [key,name] of data.tiles){
            const [cx, cy] = GameState.grid.hashGrid.toCoord(key);
            const idx = this.icons.findIndex(a=>a.name === name);
            this.icons[idx].spr.draw(cx*tileWidth,cy*tileWidth);
        }
        this.selectionTex.draw(mx*tileWidth,my*tileWidth);
    }
}