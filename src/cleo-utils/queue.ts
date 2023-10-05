
export class Queue<T>{
    data: Map<number, T>;
    head:number = 0;
    tail:number = 0;
    constructor(){
        this.data = new Map();
    }
    enqueue(val: T): void{
        this.data.set(this.tail, val);
        this.tail++;
    }
    dequeue(): T{
        if(this.head >= this.tail) throw 'Cannot dequeue from an empty queue!';
        const val = this.data.get(this.head);
        this.data.delete(this.head);
        if(val === undefined) throw 'Internal queue error, invalid head address!';
        this.head++;
        return val;
    }
    count(){
        return this.data.size;
    }
}