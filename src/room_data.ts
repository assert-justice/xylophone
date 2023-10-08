import { Holdable } from "./holdable";

export interface RoomFrame{
    id: number;
    holdables: Holdable[];
}

// type TileType = 'wall' | 'goldChest' | 'silverChest' | 'goldKey' | 'silverKey';

// export interface Tile{
//     type: TileType;
// }

export interface RoomData{
    id: number;
    // childId: number;
    // this is an array of key/value pairs to make serialization easy
    tiles: [string,string][]; // coord, type
    spawnCellX: number;
    spawnCellY: number;
    // parentPads: [number,string][]; // id, coord
    // walls: string[]; // coords
}