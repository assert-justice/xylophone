import { Graphics } from "cleo";

export class TextureStore{
    private data: Map<string, Graphics.Texture>;
    constructor(){
        this.data = new Map();
    }
    get(name: string){
        const val = this.data.get(name);
        if(val === undefined) throw `No texture with name '${name}'!`;
        return val;
    }
    set(name: string, tex: Graphics.Texture){
        if(this.data.has(name)) throw `A texture named '${name}' already exists!`
        this.data.set(name,tex);
    }
    setGroup(pairs: [string,string][]){
        for (const [name,path] of pairs) {
            this.set(name, Graphics.Texture.fromFile(path));
        }
    }
}