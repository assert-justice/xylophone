import { Game, Window, Graphics, Input } from 'cleo';
import { Player } from './player';
import { Room } from './room';
import { Sprite } from './sprite';
import { roomHeight, roomWidth, tileWidth } from './constants';
// state
Window.setStats('xylophone', roomWidth * tileWidth * 2, roomHeight * tileWidth * 2);
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
    const room = new Room();
    const player = new Player();
    player.grid = room.grid;
    player.position.x = 100;
    player.position.y = 100;
    players.push(player);
    rooms.push(room);
};
Game.update = (dt) => {
    if (Input.keyIsDown(256))
        Game.quit();
    players[0].update(dt);
    // rooms[0].collide(players[0].position);
};
Game.draw = () => {
    fbs[0].tex.setTarget();
    rooms[0].draw();
    players[0].draw();
    fbs[0].tex.resetTarget();
    fbs[0].draw(0, 0);
};
