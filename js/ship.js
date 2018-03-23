const MovingObject = require("./moving_object.js");
const Bullet = require("./bullet.js");

const SHIPDEFAULT = {
  color: 'black',
  radius: 10,
  vel: 0
};

class Ship extends MovingObject {
  constructor(options = {}) {
    options.color = SHIPDEFAULT.color;
    options.radius = SHIPDEFAULT.radius;
    options.vel = SHIPDEFAULT.vel;
    super(options);
  }

  power(impulse) {
    this.pos[0] += impulse[0];
    this.pos[1] += impulse[1];
  }

  shoot() {
    // debugger
    const bulletPos = this.pos.slice(0);
    const bullet = new Bullet({pos: bulletPos, game: this.game});
    this.game.pushBullet(bullet);
  }

}

module.exports = Ship;