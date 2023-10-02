declare module "cleo" {
    export namespace System {
        function println(...args:any[]):void;
        function readFile(path:string):string;
        function writeFile(path:string,text:string):void;
    }
    export class Game{
        static init: ()=>{};
        static update: (dt:number)=>{};
        static draw: ()=>{};
        static quit():void;
    }
    export namespace Graphics{
        function setClearColor(r: number, g: number, b: number, a:number);
        function clear():void;
        class Texture{
            width:number;
            height:number;
            draw(x:number, y:number): void;
            static fromFile(path: string): Texture;
            static new(width: number, height: number): Texture;
            setTarget():void;
            resetTarget():void;
        }
    }
    export class Window{
        static get width():number;
        static get height():number;
        static setStats(name: string, width:number, height:number, mode: string, monitor: number)
        static vsync: boolean;

    }
    export class Input{
        static keyIsDown(keyCode: number): boolean
        static mouseButtonIsDown(mouseButtonCode: number): boolean
        static get mouseX(): number
        static get mouseY(): number
        static joyButtonIsDown(joyIdx: number, buttonCode: number): boolean
        static joyGetAxis(joyIdx: number, axisCode: number): boolean
    }
    export namespace Audio{
        class Sound{
            static fromFile(path: string)
            play()
            pause()
            stop()
            get isPlaying(): boolean
            volume: number
            isLooping: boolean
        }
    }
}