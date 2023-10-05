import { Queue } from "./queue";

class Anim{
    duration: number;
    timeElapsed: number = 0;
    group: AnimGroup;
    updateFn:(progress: number)=>void;
    completeFn:()=>void;
    constructor(
        duration: number, 
        updateFn:(progress: number)=>void, 
        completeFn:()=>void, 
        group: AnimGroup)
    {
        this.duration = duration;
        this.updateFn = updateFn;
        this.completeFn = completeFn;
        this.group = group;
    }
    update(dt: number){
        if(this.timeElapsed >= this.duration){
            this.completeFn();
            this.group._remove(this);
            return;
        }
        this.timeElapsed += dt;
        this.updateFn(this.timeElapsed/this.duration);
    }
    cancel(){
        this.updateFn(1);
        this.completeFn();
    }
}

class AnimGroup{
    _data: Set<Anim>;
    constructor(){
        this._data = new Set();
    }
    _remove(anim: Anim){
        this._data.delete(anim);
    }
    update(dt: number){
        for (const g of this._data.values()) {
            g.update(dt);
        }
    }
    addAnim(
        duration: number, 
        updateFn:(progress: number)=>void, 
        completeFn?:()=>void)
    {
        if(completeFn === undefined) completeFn = ()=>{};
        const anim = new Anim(duration, updateFn, completeFn, this);
        this._data.add(anim);
    }
    count(){
        return this._data.size;
    }
    cancel(){
        for (const a of this._data) {
            a.cancel();
        }
        this._data.clear();
    }
}

export class Animator{
    private animQueue: Queue<AnimGroup>;
    private currentGroup?: AnimGroup;
    private playing = false;
    constructor(){
        this.animQueue = new Queue<AnimGroup>();
    }

    addGroup(){
        const group = new AnimGroup();
        this.animQueue.enqueue(group);
        return group;
    }
    update(dt: number){
        if(!this.playing) return;
        if(this.currentGroup === undefined || this.currentGroup.count() === 0){
            if(this.animQueue.count() === 0) {
                this.playing = false;
                return;
            }
            this.currentGroup = this.animQueue.dequeue();
        }
        this.currentGroup.update(dt);
    }
    isPlaying() {return this.playing;}
    play(){this.playing = true;}
    pause(){this.playing = false;}
    cancel(){
        if(this.currentGroup) this.currentGroup.cancel();
        while(this.animQueue.count() > 0){
            const a = this.animQueue.dequeue();
            a.cancel();
        }
    }
}