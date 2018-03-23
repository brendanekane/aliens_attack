const MovingObject = require("./moving_object.js");
const Game = require("./game.js")

const BULLETDEFAULT = {
  radius: 2,
  vel: 15,
  color: 'grey'
};

const defaultOptions = {
  alienBullet: false

};

class Bullet extends MovingObject {
  constructor(options) {
      options.radius = BULLETDEFAULT.radius;
      options.vel = BULLETDEFAULT.vel;
      options.color = BULLETDEFAULT.color;
      super(options);
      this.alienBullet = options.alienBullet || false;
  }
}

module.exports = Bullet;
