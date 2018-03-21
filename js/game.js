class Game {
  constructor() {
    this.aliens = [];

    this.addAliens();
  }

  addAliens() {
    for (let i =0; i < Game.NUM_ALIENS;i++) {
      const alienX = 100;
      const alienY = 150;
      if (i === 0) {
        this.aliens.push(new Alien({pos: [alienX, alienY]}, this));
      } else if (i < 10) {
        this.aliens.push(new Alien({pos: [(alienX + (i * 35)), alienY]}, this));
      }
      else if (i < 20) {
        this.aliens.push(new Alien({pos: [(alienX + ((i % 10) * 35)), (alienY + (35))]}, this));
      }
      else if (i < 30) {
        this.aliens.push(new Alien({pos: [(alienX + ((i % 10) * 35)), (alienY + (70))]}, this));
      }
      else if (i < 40) {
        this.aliens.push(new Alien({pos: [(alienX + ((i % 10) * 35)), (alienY + (105))]}, this));
      }
      else if (i < 50){
        this.aliens.push(new Alien({pos: [(alienX + ((i % 10) * 35)), (alienY + (140))]}, this));
      }
    }
  }

  alienPosition() {
    return [100,150];
  }

  draw(ctx) {
    ctx.clearRect(0,0, Game.DIM_X, Game.DIM_Y);
    this.aliens.forEach(alien => {
      alien.draw(ctx);
    });
  }

  moveAliens(ctx) {
    this.aliens.forEach(alien => {
      alien.move(ctx);
    });
  }

}

Game.DIM_X = 1000;
Game.DIM_Y = 1000;
Game.NUM_ALIENS = 50;

module.exports = Game;
