export class HashGrid2D {
    constructor(defaultVal) {
        this.sep = ',';
        this.data = new Map();
        this.defaultVal = defaultVal;
    }
    toKey(x, y) {
        return [x, y].join(this.sep);
    }
    toCoord(key) {
        const temp = key.split(this.sep).map(Number);
        return [temp[0], temp[1]];
    }
    set(x, y, val) {
        this.data.set(this.toKey(x, y), val);
    }
    get(x, y) {
        var _a;
        return (_a = this.data.get(this.toKey(x, y))) !== null && _a !== void 0 ? _a : this.defaultVal;
    }
}
