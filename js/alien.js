const MovingObject = require("./moving_object.js");
const Util  = require("./util.js");

const ALIENDEFAULT = {
  color: 'red',
  radius: 10
};


class Alien extends MovingObject {
  constructor(options = {}) {
    options.color = ALIENDEFAULT.color;
    options.radius = ALIENDEFAULT.radius;
    options.vel = Util.randomVec(5);
    super(options);
  }



}

module.exports = Alien;
