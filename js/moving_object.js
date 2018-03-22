class MovingObject {
  constructor(options) {
    this.pos = options.pos;
    this.vel = options.vel;
    this.radius = options.radius;
    this.color = options.color;

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
    // this.pos[0] = this.pos[0] + (this.pos[0] * this.vel[0]);
    // this.pos[1] = this.pos[1] + (this.pos[1] * this.vel[1]);
    this.pos[0] = this.pos[0] + 1;
  }

  reverse(ctx) {
    this.pos[0] = this.pos[0] - 1;
  }

}

module.exports = MovingObject;
