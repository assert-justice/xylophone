import { Graphics } from "cleo";
import { Player } from "./player";
import { Room } from "./room";
import { Sprite } from "./sprite";
import { tileWidth } from "./constants";
import { HashGrid2D } from "./hash_grid";
import { Holdable } from "./holdable";

export class GameState{
    static player: Player;
    static fb: Sprite;
    static room: Room;
    static selectionTex: Graphics.Texture;
    static grid: HashGrid2D<number>;
    static holdables: Holdable[];
    static toCoord(x: number, y: number){
        return [
            Math.trunc(x / tileWidth),
            Math.trunc(y / tileWidth),
        ];
    }
}