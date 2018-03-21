const Game = require("./game.js");

class GameView {
  constructor(game, ctx) {
    this.game = game;
    this.ctx = ctx;

  }

  start() {
    setInterval(Game.prototype.moveAliens.bind(this.game), 20);
    setInterval(Game.prototype.draw.bind(this.game, this.ctx), 20);
  }

}

module.exports = GameView;
