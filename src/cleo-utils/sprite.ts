import { Graphics } from 'cleo';

export class Sprite {
    tex: Graphics.Texture;
    props: Graphics.TextureParams;
    constructor(tex: Graphics.Texture, props?:Graphics.TextureParams){
        this.tex = tex;
        this.props = props ?? {};
    }
    draw(x: number, y: number){
        this.tex.draw(x, y, this.props);
    }
    setProps(props: Graphics.TextureParams){
        Object.assign(this.props, props);
    }
}