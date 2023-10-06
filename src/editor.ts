import { Graphics, System, Input } from "cleo";
import { Sprite } from "./cleo-utils/sprite";
import { GameState } from "./game_state";
import { tileWidth } from "./constants";

export class Editor{
    selectionTex: Graphics.Texture;
    icons: Sprite[];
    iconIdx = 0;
    active: boolean = true;
    constructor(){
        this.selectionTex = GameState.texStore.get('selection');
        const goldChestTex = GameState.texStore.get('goldChest');
        const silverChestTex = GameState.texStore.get('silverChest');
        this.icons = [
            new Sprite(GameState.room.wallTile.tex, {
                width: 16,
                height: 16,
                sw: 16,
                sh: 16,
                sx: 2 * tileWidth,
                sy: 5 * tileWidth,
            }),
            new Sprite(goldChestTex, {
                width: 16,
                sw: 16,
            }),
            new Sprite(goldChestTex, {
                width: 16,
                sw: 16,
                sx: 16,
            }),
            new Sprite(silverChestTex, {
                width: 16,
                sw: 16,
            }),
            new Sprite(silverChestTex, {
                width: 16,
                sw: 16,
                sx: 16,
            }),
            new Sprite(GameState.texStore.get('goldKey'), {
                ox: -2,
                oy: -4,
            }),
            new Sprite(GameState.texStore.get('silverChest'), {
                ox: -2,
                oy: -4,
            }),
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

        const [mcx, mcy] = GameState.inputMap.mouseCell();
        if(GameState.inputMap.m1Pressed){
            if(GameState.grid.hashGrid.get(mcx, mcy) === 0){
                GameState.grid.hashGrid.set(mcx, mcy, 1);
                GameState.room.drawStatic();
            }
        }
        if(GameState.inputMap.m2Pressed){
            if(GameState.grid.hashGrid.get(mcx, mcy) > 0){
                GameState.grid.hashGrid.set(mcx, mcy, 0);
                GameState.room.drawStatic();
            }
        }
    }
    draw(){
        if(!this.active) return;
        const [mx, my] = GameState.inputMap.mouseCell()
        if(!GameState.inputMap.m2Pressed)this.icons[this.iconIdx].draw(mx*tileWidth,my*tileWidth);
        this.selectionTex.draw(mx*tileWidth,my*tileWidth);
    }
}