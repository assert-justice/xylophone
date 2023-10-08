import { Sprite } from "./cleo-utils/sprite";
import { GameState } from "./game_state";
import { Holdable } from "./holdable";

export class GoldKey extends Holdable{
    constructor(){
        const spr = new Sprite(GameState.texStore.get('goldKey'));
        super(spr);
        this.offset.y = -8;
    }
}
export class SilverKey extends Holdable{
    constructor(){
        const spr = new Sprite(GameState.texStore.get('silverKey'));
        super(spr);
        this.offset.y = -8;
    }
}
