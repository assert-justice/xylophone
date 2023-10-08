import { Holdable } from "./holdable";
import { Sprite } from "./cleo-utils/sprite";
import { GameState } from "./game_state";

export class GoldChest extends Holdable{
    isOpen: boolean = false;
    constructor(){
        const spr = new Sprite(GameState.texStore.get('goldChest'));
        spr.setProps({width: 16, sw: 16});
        super(spr);
        this.offset.y = -8;
    }
    open(){
        this.spr.setProps({sx: 16});
        this.isOpen = true;
    }
}
export class SilverChest extends Holdable{
    isOpen: boolean = false;
    constructor(){
        const spr = new Sprite(GameState.texStore.get('silverChest'));
        spr.setProps({width: 16, sw: 16});
        super(spr);
        this.offset.y = -8;
    }
    open(){
        this.spr.setProps({sx: 16});
        this.isOpen = true;
    }
}
