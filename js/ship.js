const MovingObject = require("./moving_object.js");
const Bullet = require("./bullet.js");
let delayShot = true;

const SHIPDEFAULT = {
  color: 'black',
  radius: 20,
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
  //try conditionally checking if key.isPressed("key") for shooting
  // and moving at the same time
  power(impulse) {
    if ((this.pos[0] > 19 && this.pos[0] < 673) && key.isPressed("w") && (this.game.playing)) {
      if (delayShot) {
        delayShot = false;
        this.shoot();
        setTimeout(function() { delayShot = true; }, 200);
      }
      this.pos[0] += impulse[0];
    } else if ((this.pos[0] > 19) && (this.pos[0] < 673)  && (this.game.playing)) {
      this.pos[0] += impulse[0];
    } else if ((this.pos[0] >= 673) && (this.game.playing)) {
      this.pos[0] -= 2;
    } else if((this.pos[0] <= 19) && (this.game.playing)) {
      this.pos[0] += 2;
    }
  }

  shoot() {
    if (this.game.playing) {
      const bulletPos = this.pos.slice(0);
      const bullet = new Bullet({pos: bulletPos, game: this.game});
      this.game.pushBullet(bullet);
    }
  }

}

module.exports = Ship;
