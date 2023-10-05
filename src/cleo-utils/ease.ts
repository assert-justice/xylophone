
export function lerp(a: number, b: number, t: number){
    return (b-a)*t + a;
}

export function clamp(min: number, val: number, max: number){
    return Math.min(max, Math.max(min, val));
}