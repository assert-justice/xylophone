import { Holdable } from "./holdable";
import { Sprite } from "./cleo-utils/sprite";
import { GameState } from "./game_state";

export class Chest extends Holdable{
    constructor(){
        const spr = new Sprite(GameState.texStore.get('goldChest'));
        spr.setProps({width: 16, sw: 16});
        super(spr);
        this.offset.y = -8;
    }
}