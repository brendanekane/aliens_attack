const Starfield = require('canvas-starfield');

class WelcomeView {
  constructor(ctx) {
    this.ctx = ctx;

    this.drawWelcome = this.drawWelcome.bind(this);
    this.drawFirstLine = this.drawFirstLine.bind(this);
    this.drawSecondLine = this.drawSecondLine.bind(this);
    this.drawThirdLine = this.drawThirdLine.bind(this);
    this.drawFourthLine = this.drawFourthLine.bind(this);
    this.clearStart = this.clearStart.bind(this);
    this.flashStart = this.flashStart.bind(this);
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

  stop() {
    clearInterval(this.start());
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
    ctx.fillText("Aliens Attack!",160,200);
  }

  drawFirstLine(ctx) {
    ctx.font = "30px uni_05_53regular";
    ctx.fillStyle = 'yellow';
    ctx.fillText("The aliens have invaded!",150,300);
  }

  drawSecondLine(ctx) {
    ctx.font = "30px uni_05_53regular";
    ctx.fillStyle = 'yellow';
    ctx.fillText("Your ship is no match for their superior",35,350);
  }

  drawThirdLine(ctx) {
    ctx.font = "30px uni_05_53regular";
    ctx.fillStyle = 'yellow';
    ctx.fillText("technology and smooth animation!",80,400);
  }

  drawFourthLine(ctx) {
    ctx.font = "30px uni_05_53regular";
    ctx.fillStyle = 'yellow';
    ctx.fillText("Press the start button on the left",85,550);
    // setInterval(this.clearStart, 1000, ctx)
    // setInterval(this.flashStart, 2000, ctx)
  }

  clearStart(ctx) {
    ctx.clearRect(80, 530, WelcomeView.DIM_X, 100);
  }

  flashStart(ctx) {
    ctx.font = "30px uni_05_53regular";
    ctx.fillStyle = 'yellow';
    ctx.fillText("Press the start button on the left",85,550);
  }

}

WelcomeView.DIM_X = 700;
WelcomeView.DIM_Y = 700;

module.exports = WelcomeView;
