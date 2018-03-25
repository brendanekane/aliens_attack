const Util = require("./util.js");

class ShipCover{
  constructor(options){
    this.pos = options.pos;
    this.game = options.game;
    this.color = 'grey';
    this.radius = 40;
    this.health = 10;
    this.id = options.id || 1;
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

  collidedWith(otherObj) {
    const center = Util.distance(this.pos, otherObj.pos);
    return center < (this.radius + otherObj.radius);
  }

  collisionsToRemove(otherObj) {

    this.game.remove(otherObj);
  }
}


module.exports = ShipCover;
