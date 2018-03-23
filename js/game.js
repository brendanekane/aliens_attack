const Ship = require("./ship.js");
const Util = require("./util.js");
const Bullet = require("./bullet");

class Game {
  constructor() {
    this.aliens = [];
    this.addAliens();
    this.ship = [];
    this.createShip();
    this.bullets = [];
  }

// create objects, push to respective arrays, draw

  createShip() {
    const ship = new Ship({pos: [250, 600], game: this});
    this.ship.push(ship);
    return ship;
  }

  addAliens() {
    for (let i =0; i < Game.NUM_ALIENS;i++) {
      const alienX = 100;
      const alienY = 150;
      if (i === 0) {
        this.aliens.push(new Alien({pos: [alienX, alienY], game: this}, this));
      } else if (i < 10) {
        this.aliens.push(new Alien({pos: [(alienX + (i * 35)), alienY], game: this}, this));
      } else if (i < 20) {
        this.aliens.push(new Alien({pos: [(alienX + ((i % 10) * 35)), (alienY + (35))], game: this}, this));
      } else if (i < 30) {
        this.aliens.push(new Alien({pos: [(alienX + ((i % 10) * 35)), (alienY + (70))], game: this}, this));
      } else if (i < 40) {
        this.aliens.push(new Alien({pos: [(alienX + ((i % 10) * 35)), (alienY + (105))], game: this}, this));
      } else if (i < 50){
        this.aliens.push(new Alien({pos: [(alienX + ((i % 10) * 35)), (alienY + (140))], game: this}, this));
      }
    }
  }

  pushBullet(bullet) {
    // debugger
    this.bullets.push(bullet);
  }

  allObjects(ctx) {
    return [].concat(this.aliens, this.ship, this.bullets);
  }

  draw(ctx) {
    ctx.clearRect(0,0, Game.DIM_X, Game.DIM_Y);
    this.allObjects(ctx).forEach(object => {
      object.draw(ctx);
    });
  }

// Object movements

  moveAliens(ctx) {
    let rightBound = false;
    for (let i=0; i < this.aliens.length; i++) {
      if (this.aliens[i].pos[0] > (Game.DIM_X - 15)) {
        this.aliens.forEach(alien => {
          alien.pos[1] += .5;
        });
        this.rightBound = true;
      }
    }

    for (let i=0; i < this.aliens.length; i++) {
      if (this.aliens[i].pos[0] < 10) {
        this.aliens.forEach(alien => {
          alien.pos[1] += .5;
        });
        this.rightBound = false;
      }
    }
    if (this.rightBound) {
      this.aliens.forEach(alien => {
        alien.reverse(ctx);
      });
    } else {
      this.aliens.forEach(alien => {
        alien.move(ctx);
      });
    }
  }

  moveBullets(ctx) {
    this.bullets.forEach(bullet => {
      bullet.pos[1] -= 5;
    });
  }

  moveObjects(ctx) {
    // this makes everything move too fast?
    // this.allObjects(ctx).forEach(object => {
    //   if (object instanceof Alien) {
    //     this.moveAliens(ctx);
    //   }
    // });
    this.moveAliens(ctx);
    this.moveBullets(ctx);
  }

// Collision detection and removal

  checkCollisions() {
    const allObjs = this.allObjects();

    for (let i=0; i < allObjs.length; i++) {
      for (let j=0; j < allObjs.length; j++) {
        const obj1 = allObjs[i];
        const obj2 = allObjs[j];
        if (obj1 == obj2 || (obj1 instanceof Ship && obj2 instanceof Bullet) || (obj1 instanceof Bullet && obj2 instanceof Ship)) {continue;}
        debugger
        // if (obj1)
        if (obj1.collidedWith(obj2)) {
          const collision = obj1.collisionsToRemove(obj2)
          // alert('COLLISION');
        }
      }
    }

  }

  remove(object) {
    if (object instanceof Bullet) {
      // debugger
      this.bullets.splice(this.bullets.indexOf(object), 1);
    } else if (object instanceof Alien) {
      // debugger
      this.aliens.splice(this.aliens.indexOf(object), 1);
    }
  }

// invocation of game functions

  step(ctx) {
    this.moveObjects(ctx);
    this.checkCollisions();
  }



}

Game.DIM_X = 500;
Game.DIM_Y = 700;
Game.NUM_ALIENS = 50;

module.exports = Game;
