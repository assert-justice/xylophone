import {Game, System, Input, Window, Graphics} from 'cleo';
const {Texture} = Graphics;
Window.setStats('xylophone', 1920, 1080);

const player = {
    x: 0,
    y: 0,
    speed: 100,
    spr: null,
    sprOptions:{
        width: 24*4,
        height: 24*4,
        sx:24,
        sy:0,
        sw:-24,
        sh:24,
    }
}
let floorSpr;
const tile = {
    width:16,
    height:16,
    sx:16*19,
    sy:16*16,
    sw:16,
    sh:16,
}
let background0;
const bgOptions = {}

function drawBackground(){
    background0.setTarget();
    for(let x = 0; x < background0.width; x+=tile.width){    
        for(let y = 0; y < background0.width; y+=tile.height){
            floorSpr.draw(x,y,tile);
        }
    }
    background0.resetTarget();
}

Game.init = ()=>{
    player.spr = Texture.fromFile('./sprites/characters_packed.png');
    floorSpr = Texture.fromFile('./sprites/TilesetInteriorFloor.png');
    background0 = Texture.new(1920/4,1080/4);
    drawBackground();
    bgOptions.width = Window.width;
    bgOptions.height = Window.height;
}

Game.update = (dt)=>{
    if(Input.keyIsDown(256)) Game.quit();
    if(Input.keyIsDown(262)) player.x += player.speed * dt;
    if(Input.keyIsDown(263)) player.x -= player.speed * dt;
    if(Input.joyButtonIsDown(0,12)) player.x += player.speed * dt;
    if(Input.joyButtonIsDown(0,14)) player.x -= player.speed * dt;
}

Game.draw = ()=>{
    // floorSpr.draw(0,0,tile);
    background0.draw(0,0,bgOptions);
    player.spr.draw(player.x,player.y, player.sprOptions);
}