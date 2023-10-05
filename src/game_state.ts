import { Graphics } from "cleo";
import { Player } from "./player";
import { Room } from "./room";
import { Sprite } from "./cleo-utils/sprite";
import { Holdable } from "./holdable";
import { RoomGrid } from "./room_grid";
import { Animator } from "./cleo-utils/animator";

export class GameState{
    static player: Player;
    static fb: Sprite;
    static room: Room;
    static selectionTex: Graphics.Texture;
    static grid: RoomGrid;
    static holdables: Holdable[];
    static animator: Animator;
}