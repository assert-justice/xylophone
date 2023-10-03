export class Sprite {
    constructor(tex) {
        this.tex = tex;
        this.props = {};
    }
    draw(x, y) {
        this.tex.draw(x, y, this.props);
    }
    setProps(props) {
        this.props = props;
    }
}
