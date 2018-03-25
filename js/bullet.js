const MovingObject = require("./moving_object.js");

const BULLETDEFAULT = {
  radius: 2,
  vel: 15,
  color: 'grey'
};

class Bullet extends MovingObject {
  constructor(options) {
      options.radius = BULLETDEFAULT.radius;
      options.vel = BULLETDEFAULT.vel;
      options.color = BULLETDEFAULT.color;
      super(options);
      this.alienBullet = options.alienBullet || false;
      this.health = 1;
  }
}

module.exports = Bullet;
