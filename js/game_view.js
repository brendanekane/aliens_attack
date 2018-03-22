const Game = require("./game.js");

class GameView {
  constructor(game, ctx) {
    this.game = game;
    this.ctx = ctx;
    this.ship = this.game.createShip();
  }

  start() {
    setInterval(Game.prototype.moveObjects.bind(this.game), 20);
    setInterval(Game.prototype.draw.bind(this.game, this.ctx), 20);
    this.bindKeys();
  }

  bindKeys() {
    Object.keys(GameView.MOVES).forEach(k => {
      key(k, () => {
        this.ship.power(GameView.MOVES[k]);
      });
    });
  }

}


GameView.MOVES ={
  // w: [0, -3],
  // s: [0, 3],
  a: [-3, 0],
  d: [3, 0]
};
module.exports = GameView;
