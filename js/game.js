const Ship = require("./ship.js");
const Util = require("./util.js");
const Bullet = require("./bullet.js");
let shipLives = 3;

class Game {
  constructor(game) {
    this.aliens = [];
    this.addAliens();
    this.ship = [];
    this.createShip();
    this.bullets = [];
    this.game = game

  }


// create objects, push to respective arrays, draw

  createShip() {
    const ship = new Ship({pos: [250, 600], game: this});
    this.ship.push(ship);
    return ship;
  }

  createNewShip() {
    if (this.ship.length === 0 && shipLives >= 0) {
      const ship = new Ship({pos: [250, 600], game: this});
      this.ship.push(ship);
      return ship;
    }
  }

  addAliens() {
    for (let i =0; i < Game.NUM_ALIENS;i++) {
      const alienX = 100;
      const alienY = 150;
      if (i < 10) {
        this.aliens.push(new Alien({pos: [(alienX + (i * 35)), alienY], game: this, health: 5}, this));
      } else if (i < 20) {
        this.aliens.push(new Alien({pos: [(alienX + ((i % 10) * 35)), (alienY + (35))], game: this, health: 4}, this));
      } else if (i < 30) {
        this.aliens.push(new Alien({pos: [(alienX + ((i % 10) * 35)), (alienY + (70))], game: this, health: 3}, this));
      } else if (i < 40) {
        this.aliens.push(new Alien({pos: [(alienX + ((i % 10) * 35)), (alienY + (105))], game: this, health: 2}, this));
      } else if (i < 50){
        this.aliens.push(new Alien({pos: [(alienX + ((i % 10) * 35)), (alienY + (140))], game: this}, this));
      }
    }
  }

  alienShoot(){
    const aliens = this.aliens;
    const alien = aliens[Math.floor((Math.random() * aliens.length))];
    const alienPos = alien.pos.slice(0);
    alien.shoot(alienPos);
  }

  pushBullet(bullet) {
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
          alien.pos[1] += alien.vel[1];
        });
        this.rightBound = true;
      }
    }

    for (let i=0; i < this.aliens.length; i++) {
      if (this.aliens[i].pos[0] < 10) {
        this.aliens.forEach(alien => {
          alien.pos[1] += alien.vel[1];
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
        // debugger
        alien.move(ctx);
      });
    }
  }

  moveBullets(ctx) {
    this.bullets.forEach(bullet => {
      if (bullet.alienBullet === false) {
        bullet.pos[1] -= 5;
      } else {
        bullet.pos[1] += 5;
      }
    });
  }

  moveObjects(ctx) {
    // this makes everything move too fast?
    // this.allObjects(ctx).forEach(object => {
    //   if (object instanceof Alien) {
    //     this.moveAliens(ctx);
    //   }
    // });
    // debugger
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
        if (obj1 == obj2 || (obj1 instanceof Ship && obj2.alienBullet === false) || (obj1.alienBullet === false && obj2 instanceof Ship)) {continue;}
        if ((obj1.alienBullet === true && obj2 instanceof Alien) || (obj1 instanceof Alien && obj2.alienBullet === true)) {continue;}
        if (obj1.collidedWith(obj2)) {
          obj1.health -= 1;
          obj2.health -= 1;
          if (obj1 instanceof Bullet) {
            this.remove(obj1);
          }
        }
        if (obj1.health <= 0 && obj2.health <= 0) {
          const collision = obj1.collisionsToRemove(obj2);
        }
      }
    }

  }



  remove(object) {
    if (object instanceof Bullet) {
      this.bullets.splice(this.bullets.indexOf(object), 1);
    } else if (object instanceof Alien) {
      debugger
      this.aliens.splice(this.aliens.indexOf(object), 1);
    } else if (object instanceof Ship) {
      this.ship.splice(this.ship.indexOf(object), 1);
      shipLives -= 1;
    }
  }

// invocation of game functions

  step(ctx) {
    // debugger
    this.moveObjects(ctx);
    this.checkCollisions();
    this.createNewShip();
  }



}

Game.DIM_X = 500;
Game.DIM_Y = 700;
Game.NUM_ALIENS = 50;

module.exports = Game;
