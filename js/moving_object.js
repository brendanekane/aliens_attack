const Util = require("./util.js");

class MovingObject {
  constructor(options) {
    this.pos = options.pos;
    this.vel = options.vel;
    this.radius = options.radius;
    this.color = options.color;
    this.game = options.game;
  }


  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(
      this.pos[0],
      this.pos[1],
      this.radius,
      0,
      2 * Math.PI
    );

    ctx.fill();
  }

  move() {
    this.pos[0] += this.vel[0];
  }

  reverse() {
    this.pos[0] -= this.vel[0];
  }

  collidedWith(otherObj) {
    const center = Util.distance(this.pos, otherObj.pos);
    return center < (this.radius + otherObj.radius);
  }

  collisionsToRemove(otherObj) {

    this.game.remove(otherObj);
  }


}

module.exports = MovingObject;
