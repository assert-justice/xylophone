import { Graphics } from "cleo";
import { Player } from "./player";
import { Room } from "./room";
import { Sprite } from "./sprite";
import { tileWidth } from "./constants";


export class GameState{
    static player: Player;
    static fb: Sprite;
    static room: Room;
    static selectionTex: Graphics.Texture;
    static toCoord(x: number, y: number){
        return [
            Math.trunc(x / tileWidth),
            Math.trunc(y / tileWidth),
        ];
    }
}