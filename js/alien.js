const MovingObject = require("./moving_object.js");
const Util  = require("./util.js");

const ALIENDEFAULT = {
  color: 'red',
  radius: 15
};


class Alien extends MovingObject {
  constructor(options = {}) {
    options.color = ALIENDEFAULT.color;
    options.radius = ALIENDEFAULT.radius;
    options.vel = Util.randomVec(2);
    super(options);
  }


}

module.exports = Alien;
