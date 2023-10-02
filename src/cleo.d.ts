declare module "cleo" {
    export class System {
        static println(...args:any[]):void;
        static readFile(path:string):string;
        static writeFile(path:string,text:string):void;
    }
}