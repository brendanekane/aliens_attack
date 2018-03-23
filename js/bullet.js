const MovingObject = require("./moving_object.js");
const Game = require("./game.js")

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
  }
}

module.exports = Bullet;
