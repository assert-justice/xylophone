import { Player } from "./player";
import { Room } from "./room";
import { Sprite } from "./cleo-utils/sprite";
import { Holdable } from "./holdable";
import { RoomGrid } from "./room_grid";
import { Animator } from "./cleo-utils/animator";
import { Editor } from "./editor";
import { InputMap } from "./input_map";
import { TextureStore } from "./cleo-utils/texture_store";

export class GameState{
    static player: Player;
    static fb: Sprite;
    static room: Room;
    static inputMap: InputMap;
    static grid: RoomGrid;
    static holdables: Holdable[];
    static animator: Animator;
    static editor: Editor;
    static texStore: TextureStore;
}