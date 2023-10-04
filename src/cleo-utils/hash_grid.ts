

export class HashGrid2D<T>{
    sep = ',';
    defaultValFn: ()=>T;
    data: Map<string, T>;
    constructor(defaultValFn: ()=>T){
        this.data = new Map<string, T>();
        this.defaultValFn = defaultValFn;
    }
    toKey(x: number, y: number){
        return [x, y].join(this.sep);
    }
    toCoord(key: string){
        const temp = key.split(this.sep).map(Number);
        return [temp[0],temp[1]];
    }
    set(x: number, y: number, val: T){
        this.data.set(this.toKey(x,y), val);
    }
    get(x: number, y: number): T{
        return this.data.get(this.toKey(x,y)) ?? this.defaultValFn();
    }
}