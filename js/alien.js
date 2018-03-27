const MovingObject = require("./moving_object.js");
const Bullet = require("./bullet.js");
const ALIENDEFAULT = {
  color: 'red',
  radius: 18
};

class Alien extends MovingObject {
  constructor(options = {}) {
    options.color = ALIENDEFAULT.color;
    options.radius = ALIENDEFAULT.radius;
    options.vel = [2, 1];
    super(options);
    this.health = options.health || 1;
    this.row = options.row || 1;
  }

  shoot(pos) {
    const alienBulletPos = pos;
    const alienBullet = new Bullet({pos: alienBulletPos, game: this.game, color: 'orange', alienBullet: true});
    this.game.pushBullet(alienBullet);

  }
}

module.exports = Alien;
