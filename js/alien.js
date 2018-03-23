const MovingObject = require("./moving_object.js");
const Util  = require("./util.js");
const Game = require("./game.js");
const Bullet = require("./bullet.js");

const ALIENDEFAULT = {
  color: 'red',
  radius: 10
};


class Alien extends MovingObject {
  constructor(options = {}) {
    options.color = ALIENDEFAULT.color;
    options.radius = ALIENDEFAULT.radius;
    options.vel = [1, .5];
    super(options);
    this.health = options.health || 1;

  }

  shoot(pos) {
    // debugger
    // const aliens = Game.aliens;
    // const alien = aliens[Math.floor((Math.random() * aliens.length))];
    const alienBulletPos = pos
    const alienBullet = new Bullet({pos: alienBulletPos, game: this.game, color: 'orange', alienBullet: true});
    this.game.pushBullet(alienBullet);
  }




}

module.exports = Alien;
