export class Sprite {
    spr =  null;
    draw(x,y){
        this.spr.draw(x, y, this);
    }
    setProps(props){
        for (const [key,val] of Object.entries(props)) {
            this[key] = val;
        }
    }
}