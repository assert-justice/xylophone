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
    isCellSolid(cx: number, cy: number): boolean{
        if(!this.onGrid(cx, cy)) return true;
        return this.hashGrid.get(cx, cy) === 1;
    }
    toCoord(x: number, y: number){
        return [
            Math.trunc(x / tileWidth),
            Math.trunc(y / tileWidth),
        ];
    }
    collide(position: Vec2, vel: Vec2){
        const check = (cx: number, cy: number) =>{
            if(this.isCellSolid(cx, cy)) return true;
            if(this.isCellSolid(cx+1, cy)) return true;
            if(this.isCellSolid(cx, cy+1)) return true;
            if(this.isCellSolid(cx+1, cy+1)) return true;
            return false;
        }
        // try moving in x direction and see if there is a problem
        let [cx, cy] = this.toCoord(position.x + vel.x, position.y);
        // if there is clamp x velocity
        if(check(cx, cy)){
            // do this smarter
            vel.x = 0;
        }
        [cx, cy] = this.toCoord(position.x, position.y + vel.y);
        if(check(cx, cy)){
            // do this smarter
            vel.y = 0;
        }
        return position.add(vel);
    }
    onGrid(cx: number, cy: number): boolean{
        if(cx < 0 || cx >= roomWidth) return false;
        if(cy < 0 || cy >= roomHeight) return false;
        return true;
    }
}