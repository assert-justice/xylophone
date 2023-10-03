import { tileWidth } from "./constants";
export class GameState {
    static toCoord(x, y) {
        return [
            Math.trunc(x / tileWidth),
            Math.trunc(y / tileWidth),
        ];
    }
}
