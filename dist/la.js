export class Vec2 {
    constructor(x = 0, y = 0) {
        this.x = 0;
        this.y = 0;
        this.x = x;
        this.y = y;
    }
    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    normalize() {
        const len = this.length();
        if (len === 0)
            return this;
        this.x /= len;
        this.y /= len;
        return this;
    }
    mul(scalar) {
        this.x *= scalar;
        this.y *= scalar;
        return this;
    }
    add(vec2) {
        this.x += vec2.x;
        this.y += vec2.y;
        return this;
    }
    copy() {
        return new Vec2(this.x, this.y);
    }
}
