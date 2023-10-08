import { Graphics, System, Input } from "cleo";
import { Sprite } from "./cleo-utils/sprite";
import { GameState } from "./game_state";
import { tileWidth } from "./constants";
import { VButton } from "./input_map";

interface Icon{
    name: string;
    spr: Sprite;
    data?: object;
    solid?: boolean;
}

export class Editor{
    selectionTex: Graphics.Texture;
    icons: Icon[];
    iconIdx = 0;
    active: boolean = false;
    editButton: VButton;
    m1: VButton;
    m2: VButton;
    next: VButton;
    last: VButton;
    save: VButton;
    constructor(){
        this.editButton = GameState.inputMap.getButton('edit');
        this.m1 = GameState.inputMap.getButton('m1');
        this.m2 = GameState.inputMap.getButton('m2');
        this.next = GameState.inputMap.getButton('next');
        this.last = GameState.inputMap.getButton('last');
        this.save = GameState.inputMap.getButton('save');
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
                solid: true,
            },
            {
                name: 'goldChestClosed',
                spr: new Sprite(goldChestTex, {
                    width: tileWidth,
                    sw: tileWidth,
                }),
                data: {},
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
        const data = GameState.room.data;
        if(!data) throw 'damn';
        if(this.editButton.isPressed()) {
            this.active = !this.active;
            if(this.active) GameState.holdables.length = 0;
            if(!this.active) GameState.room.enter(data);
        }
        if(!this.active) return;
        if(this.next.isPressed()) this.iconIdx++;
        if(this.last.isPressed()) this.iconIdx--;
        if(this.iconIdx < 0) this.iconIdx = this.icons.length-1;
        if(this.iconIdx == this.icons.length) this.iconIdx = 0;
        // if(Input.keyIsDown(49)) this.iconIdx = 0;
        // if(Input.keyIsDown(50)) this.iconIdx = 1;
        // if(Input.keyIsDown(51)) this.iconIdx = 2;
        // if(Input.keyIsDown(52)) this.iconIdx = 3;
        // if(Input.keyIsDown(53)) this.iconIdx = 4;
        // if(Input.keyIsDown(54)) this.iconIdx = 5;
        // if(Input.keyIsDown(55)) this.iconIdx = 6;

        const [mcx, mcy] = GameState.inputMap.mouseCell();
        const key = GameState.grid.hashGrid.toKey(mcx, mcy);
        if(this.m1.isDown()){
            const entry = data.tiles.find(val=>val[0]===key);
            const icon = this.icons[this.iconIdx];
            if(entry === undefined){
                data.tiles.push([key, icon.name]);
            }
            else{
                if(entry[1] === icon.name) return;
                entry[1] = icon.name;
            }
            if(icon.solid) GameState.grid.hashGrid.set(mcx, mcy, 1);
            GameState.room.redraw();
        }
        if(this.m2.isDown()){
            const idx = data.tiles.findIndex(val=>val[0]===key);
            const entry = data.tiles[idx];
            if(idx === -1) return;
            const icon = this.icons.find(ic => entry[1].startsWith(ic.name));
            if(!icon) throw 'no icon found, should be unreachable';
            if(icon.solid) GameState.grid.hashGrid.set(mcx, mcy, 0);
            data.tiles.splice(idx, 1);
            GameState.room.redraw();
        }
        if(this.save.isPressed()){
            System.writeFile('./rooms.json', JSON.stringify(data));
        }
    }
    draw(){
        if(!this.active) return;
        const [mx, my] = GameState.inputMap.mouseCell()
        const data = GameState.room.data;
        if(!data) throw 'welp';
        for(let [key,name] of data.tiles){
            const [cx, cy] = GameState.grid.hashGrid.toCoord(key);
            const idx = this.icons.findIndex(a=>a.name === name);
            this.icons[idx].spr.draw(cx*tileWidth,cy*tileWidth);
        }
        if(!this.m2.isDown())this.icons[this.iconIdx].spr.draw(mx*tileWidth,my*tileWidth);
        this.selectionTex.draw(mx*tileWidth,my*tileWidth);
    }
}