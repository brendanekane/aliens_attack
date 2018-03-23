const Game = require("./game.js");
const Alien = require("./alien.js");

class GameView {
  constructor(game, ctx) {
    this.game = game;
    this.ctx = ctx;
    this.ship = game.ship[0];
  }

  start() {
    setInterval(Game.prototype.step.bind(this.game), 20);
    setInterval(Game.prototype.draw.bind(this.game, this.ctx), 20);
    this.bindKeys();
  }

  bindKeys() {
    Object.keys(GameView.MOVES).forEach(k => {
      key(k, () => {
        this.ship.power(GameView.MOVES[k]);
      });
    });
    key('space', () =>{
      const aliens = this.game.aliens;
      const alien = aliens[Math.floor((Math.random() * aliens.length))];
      debugger
      const alienPos = alien.pos
      this.ship.shoot();
      alien.shoot(alienPos);
    });
  }

}


GameView.MOVES ={
  // w: [0, -3],
  // s: [0, 3],
  a: [-3, 0],
  d: [3, 0],
  left: [-3, 0],
  right: [3, 0]
};
module.exports = GameView;
