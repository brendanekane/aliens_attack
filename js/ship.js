const MovingObject = require("./moving_object.js");
const Bullet = require("./bullet.js");

const SHIPDEFAULT = {
  color: 'black',
  radius: 18,
  vel: 0
};

class Ship extends MovingObject {
  constructor(options = {}) {
    options.color = SHIPDEFAULT.color;
    options.radius = SHIPDEFAULT.radius;
    options.vel = SHIPDEFAULT.vel;
    super(options);
    this.health = 5;
  }

  power(impulse) {
    if (this.pos[0] > 19 && this.pos[0] < 673){
      this.pos[0] += impulse[0];
    } else if (this.pos[0] >= 673) {
      this.pos[0] -= 2;
    } else if(this.pos[0] <= 19) {
      this.pos[0] += 2;
    }
  }

  shoot() {
    const bulletPos = this.pos.slice(0);
    const bullet = new Bullet({pos: bulletPos, game: this.game});
    this.game.pushBullet(bullet);
  }
}

module.exports = Ship;
