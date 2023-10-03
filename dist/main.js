import { Game, Window, Graphics, Input } from 'cleo';
import { Player } from './player';
import { Room } from './room';
import { Sprite } from './sprite';
// constants
const tileWidth = 16;
const roomWidth = 18;
const roomHeight = 12;
// state
Window.setStats('xylophone', roomWidth * tileWidth * 4, roomHeight * tileWidth * 4);
const players = [];
const rooms = [];
const fbs = [];
Game.init = () => {
    const fbTex = Graphics.Texture.new(roomWidth * tileWidth, roomHeight * tileWidth);
    const fb = new Sprite(fbTex);
    fb.setProps({ width: Window.width,
        height: Window.height,
    });
    fbs.push(fb);
    players.push(new Player());
    rooms.push(new Room(roomWidth, roomHeight, tileWidth));
};
Game.update = (dt) => {
    if (Input.keyIsDown(256))
        Game.quit();
    players[0].update(dt);
};
Game.draw = () => {
    fbs[0].tex.setTarget();
    rooms[0].draw();
    players[0].draw();
    fbs[0].tex.resetTarget();
    fbs[0].draw(0, 0);
};
