import { Graphics } from "cleo";
import { Holdable } from "./holdable";
import { Sprite } from "./sprite";
import { Vec2 } from "./la";

export class Chest extends Holdable{
    constructor(){
        const spr = new Sprite(Graphics.Texture.fromFile('./sprites/BigTreasureChest.png'));
        spr.setProps({width: 16, sw: 16});
        super(spr);
        this.offset.y = -8;
    }
}