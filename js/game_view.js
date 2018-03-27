const Game = require("./game.js");
const Alien = require("./alien.js");
const Ship = require("./ship.js");
const Starfield = require('canvas-starfield');

class GameView {
  constructor(game, ctx) {
    this.game = game;
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
    debugger
    setInterval(Game.prototype.step.bind(this.game, this.ctx), 20);
    // setInterval(Game.prototype.draw.bind(this.game, this.ctx), 20);
    // this.lastTime = 0;
    // requestAnimationFrame(this.animate.bind(this));
    setInterval(Game.prototype.alienShoot.bind(this.game), 200);
    this.bindKeys();
    this.sf().start();
  }

  bindShip() {
    const ship = this.game.ship[0];
    return ship;
  }

  bindKeys() {
    Object.keys(GameView.MOVES).forEach(k => {
      key(k, () => {
        this.bindShip().power(GameView.MOVES[k]);
      });
    });
    let delayShot = true;
    key('w', () =>{
      if (delayShot) {
        delayShot = false;
        this.bindShip().shoot();
        setTimeout(function() { delayShot = true; }, 200);
      }
    });
  }

  //not implemented yet
  // animate(time) {
  //   const timeDelta = time - this.lastTime;
  //   Game.prototype.step(timeDelta);
  //   Game.prototype.draw(this.ctx);
  //   this.lastTime = time;
  //
  //   requestAnimationFrame(this.animate.bind(this));
  // }

  replay(ctx) {
    const newGame = new Game();
    this.game = newGame;

  }

}


GameView.MOVES ={
  a: [-5, 0],
  d: [5, 0],
  left: [-5, 0],
  right: [5, 0]
};
module.exports = GameView;
