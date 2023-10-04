import { HashGrid2D } from "./cleo-utils/hash_grid";
import { Vec2 } from "./cleo-utils/la";
import { tileWidth, roomWidth, roomHeight } from "./constants";
import { GameState } from "./game_state";

export class RoomGrid{
    hashGrid: HashGrid2D<number>;
    constructor(){
        this.hashGrid = new HashGrid2D<number>(()=>0);
        for(let x = 0; x < roomWidth; x++){
            for(let y = 0; y < roomHeight; y++){
                if(x === 0 || x === roomWidth-1 || y === 0 || y === roomHeight-1){
                    this.hashGrid.set(x, y, 1);
                }
            }
        }
    }
    isSolid(cx: number, cy: number): boolean{
        if(!this.onGrid(cx, cy)) return true;
        return this.hashGrid.get(cx, cy) > 0;
    }
    toCoord(x: number, y: number){
        return [
            Math.trunc(x / tileWidth),
            Math.trunc(y / tileWidth),
        ];
    }
    collide(position: Vec2, vel: Vec2){
        const [cx, cy] = this.toCoord(position.x, position.y);
        position.add(vel);
        let minX = -Infinity; let maxX = Infinity;
        let minY = -Infinity; let maxY = Infinity;
        if(this.isSolid(cx-1, cy)) minX = cx*tileWidth;
        if(this.isSolid(cx+1, cy)) maxX = cx*tileWidth;
        if(this.isSolid(cx, cy-1)) minY = cy*tileWidth;
        if(this.isSolid(cx, cy+1)) maxY = cy*tileWidth;
        position.x = Math.min(maxX, Math.max(minX, position.x));
        position.y = Math.min(maxY, Math.max(minY, position.y));
        return position;
    }
    onGrid(cx: number, cy: number): boolean{
        if(cx < 0 || cx >= roomWidth) return false;
        if(cy < 0 || cy >= roomHeight) return false;
        return true;
    }
}