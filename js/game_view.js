const Game = require("./game.js");
const Alien = require("./alien.js");

class GameView {
  constructor(game, ctx) {
    this.game = game;
    this.ctx = ctx;
    // this.ship = game.ship[0];
  }

  start() {
    setInterval(Game.prototype.step.bind(this.game), 20);
    setInterval(Game.prototype.draw.bind(this.game, this.ctx), 20);
    // this.lastTime = 0;
    // requestAnimationFrame(this.animate.bind(this));
    setInterval(Game.prototype.alienShoot.bind(this.game), 2000);
    this.bindKeys();
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
    key('space', () =>{
      this.bindShip().shoot();
    });
  }

  // animate(time) {
  //   const timeDelta = time - this.lastTime;
  //   Game.prototype.step(timeDelta);
  //   Game.prototype.draw(this.ctx);
  //   this.lastTime = time;
  //
  //   requestAnimationFrame(this.animate.bind(this));
  // }
}



GameView.MOVES ={
  // w: [0, -3],
  // s: [0, 3],
  a: [-5, 0],
  d: [5, 0],
  left: [-5, 0],
  right: [5, 0]
};
module.exports = GameView;
