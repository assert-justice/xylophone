import { Graphics } from "cleo";
import { Player } from "./player";
import { Room } from "./room";
import { Sprite } from "./cleo-utils/sprite";
import { tileWidth } from "./constants";
import { Holdable } from "./holdable";
import { RoomGrid } from "./room_grid";

export class GameState{
    static player: Player;
    static fb: Sprite;
    static room: Room;
    static selectionTex: Graphics.Texture;
    static grid: RoomGrid;
    static holdables: Holdable[];
}