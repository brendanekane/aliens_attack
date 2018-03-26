const Starfield = require('canvas-starfield');

class WelcomeView {
  constructor(ctx) {
    this.ctx = ctx;
  }

  sf() {

    return new Starfield({
      canvas: '#star-canvas',
      numStars: 800,
      dx: 0.05,
      dy: 0.025,
      maxRadius: 2,
      shootingStarInterval: 5
    });
  }

  start() {
    setInterval(this.step(this.ctx), 20);
    this.sf().start();
  }

  step(ctx) {
    // this.drawWelcome(ctx)
    setTimeout(this.drawWelcome, 500, ctx);
    setTimeout(this.drawFirstLine, 2000, ctx);
    setTimeout(this.drawSecondLine, 4000, ctx);
    setTimeout(this.drawThirdLine, 6000, ctx);
    setTimeout(this.drawFourthLine, 8000, ctx);
  }

  drawWelcome(ctx) {
    ctx.clearRect(0,0, WelcomeView.DIM_X, WelcomeView.DIM_Y );
    ctx.font = "50px uni_05_53regular";
    ctx.fillStyle = 'yellow';
    ctx.fillText("Aliens Attack!",190,200);
    // setTimeout(this.drawInfo, 200, ctx);
  }

  drawFirstLine(ctx) {
    ctx.font = "30px uni_05_53regular";
    ctx.fillStyle = 'yellow';
    ctx.fillText("The aliens have invaded! You are",110,300);
  }

  drawSecondLine(ctx) {
    ctx.font = "30px uni_05_53regular";
    ctx.fillStyle = 'yellow';
    ctx.fillText("no match for their superior technology",50,350);
  }

  drawThirdLine(ctx) {
    ctx.font = "30px uni_05_53regular";
    ctx.fillStyle = 'yellow';
    ctx.fillText("and smooth animation!",185,400);
  }

  drawFourthLine(ctx) {
    ctx.font = "30px uni_05_53regular";
    ctx.fillStyle = 'yellow';
    ctx.fillText("Press the button on the left to start",70,450);
  }

  wait(ms){
   const start = new Date().getTime();
   let end = start;
   while(end < start + ms) {
     end = new Date().getTime();
  }
}


}

WelcomeView.DIM_X = 700;
WelcomeView.DIM_Y = 700;

module.exports = WelcomeView;
