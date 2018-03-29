const Alien = require('./alien.js');
const Ship = require("./ship.js");
const Util = require("./util.js");
const Bullet = require("./bullet.js");
const ShipCover = require("./ship_cover.js");

class Game {
  constructor(game) {
    this.aliens = [];
    this.addAliens();
    this.ship = [];
    this.createShip();
    this.bullets = [];
    this.game = game;
    this.cover = [];
    this.addCover();
    this.shipLives = 4;
    this.playing = true;
  }


// create objects, push to respective arrays, draw

  createShip() {
    const ship = new Ship({pos: [350, 640], game: this});
    this.ship.push(ship);
    return ship;
  }

  createNewShip() {
    if (this.ship.length === 0 && this.shipLives > 0) {
      const ship = new Ship({pos: [350, 640], game: this});
      this.ship.push(ship);
      return ship;
    }
  }

  addAliens() {
    for (let i =0; i < Game.NUM_ALIENS;i++) {
      const alienX = 100;
      const alienY = 50;
      if (i < 10) {
        this.aliens.push(new Alien({pos: [(alienX + (i * 45)), alienY], game: this, health: 5}, this));
      } else if (i < 20) {
        this.aliens.push(new Alien({pos: [(alienX + ((i % 10) * 45)), (alienY + (40))], game: this, health: 4, row: 2}, this));
      } else if (i < 30) {
        this.aliens.push(new Alien({pos: [(alienX + ((i % 10) * 45)), (alienY + (80))], game: this, health: 3, row: 3}, this));
      } else if (i < 40) {
        this.aliens.push(new Alien({pos: [(alienX + ((i % 10) * 45)), (alienY + (120))], game: this, health: 2, row: 4}, this));
      } else if (i < 50){
        this.aliens.push(new Alien({pos: [(alienX + ((i % 10) * 45)), (alienY + (160))], game: this, row: 5}, this));
      }
    }
  }

  addCover() {
    const coverX = 100;
    const coverY = 500;
    this.cover.push(new ShipCover({pos:[coverX, coverY], game: this}));
    this.cover.push(new ShipCover({pos:[coverX + 160, coverY], game: this, id: 2}));
    this.cover.push(new ShipCover({pos:[coverX + 320, coverY], game: this, id: 3}));
    this.cover.push(new ShipCover({pos:[coverX + 480, coverY], game: this, id: 4}));
  }

  alienShoot(){
    if (this.shipLives !== 0) {
      const aliens = this.aliens;
      const alien = aliens[Math.floor((Math.random() * aliens.length))];
      const alienPos = alien.pos.slice(0);
      alien.shoot(alienPos);
    }
  }

  pushBullet(bullet) {
    this.bullets.push(bullet);
    if (bullet.alienBullet === false) {
      const alienBulletSound = document.getElementById('alienBullet');
      alienBulletSound.play();
    }
  }

  allObjects(ctx) {
    return [].concat(this.aliens, this.ship, this.bullets, this.cover);
  }

  draw(ctx) {
    ctx.clearRect(0,0, Game.DIM_X, Game.DIM_Y);
    const shipImage = document.getElementsByClassName("ship")[0];
    const alienOne = document.getElementsByClassName("alien")[0];
    const alienTwo = document.getElementsByClassName("alien")[1];
    const alienThree = document.getElementsByClassName("alien")[2];
    const alienFour = document.getElementsByClassName("alien")[3];
    const alienFive = document.getElementsByClassName("alien")[4];
    const shipBullet = document.getElementsByClassName("bullet")[0];
    const alienBullet = document.getElementsByClassName("bullet")[1];
    const coverOne = document.getElementsByClassName("cover")[0];
    const coverTwo = document.getElementsByClassName("cover")[1];
    const coverThree = document.getElementsByClassName("cover")[2];
    const coverFour = document.getElementsByClassName("cover")[3];
    this.allObjects(ctx).forEach(object => {
      if (object instanceof Ship) {
        ctx.drawImage(shipImage, (object.pos[0]-22), (object.pos[1]-10), 50, 60);
      } else if (object instanceof Alien && object.row === 1) {
        ctx.drawImage(alienOne, (object.pos[0]-15), object.pos[1], 40, 40);
      } else if (object instanceof Alien && object.row === 2) {
        ctx.drawImage(alienTwo, (object.pos[0]-15), object.pos[1], 40, 40);
      } else if (object instanceof Alien && object.row === 3) {
        ctx.drawImage(alienThree, (object.pos[0]-15), object.pos[1], 40, 40);
      } else if (object instanceof Alien && object.row === 4) {
        ctx.drawImage(alienFour, (object.pos[0]-15), object.pos[1], 40, 40);
      } else if (object instanceof Alien && object.row === 5) {
        ctx.drawImage(alienFive, (object.pos[0]-15), object.pos[1], 40, 40);
      } else if (object instanceof Bullet && object.alienBullet === false) {
        ctx.drawImage(shipBullet, object.pos[0], object.pos[1], 5, 15);
      } else if (object instanceof Bullet && object.alienBullet === true) {
        ctx.drawImage(alienBullet, object.pos[0], object.pos[1], 8, 24);
      } else if (object instanceof ShipCover && object.id === 1) {
        ctx.drawImage(coverOne, (object.pos[0] - 38), object.pos[1] - 20, 80, 80);
      } else if (object instanceof ShipCover && object.id === 2) {
        ctx.drawImage(coverTwo, (object.pos[0] - 38), object.pos[1] - 20, 80, 80);
      } else if (object instanceof ShipCover && object.id === 3) {
        ctx.drawImage(coverThree, (object.pos[0] - 38), object.pos[1] - 20, 80, 80);
      } else if (object instanceof ShipCover && object.id === 4) {
        ctx.drawImage(coverFour, (object.pos[0] - 38), object.pos[1] - 20, 80, 80);
      }
    });
    ctx.font = "20px uni_05_53regular";
    ctx.fillStyle = 'yellow';
    ctx.fillText(`Lives: ${this.shipLives - 1}`,600,45);
    ctx.font = "20px uni_05_53regular";
    ctx.fillStyle = 'yellow';
    ctx.fillText(`Health: ${this.ship[0].health / 5 * 100}%`,550,25);
  }

// Object movements

  moveAliens(ctx) {
    let rightBound = false;

    // check if right bound of canvas is next move, speed up velocity,
    // change y position
    for (let i=0; i < this.aliens.length; i++) {
      if ((this.aliens.length > 20) && (this.aliens[i].pos[0] > (Game.DIM_X - 28))) {
        this.aliens.forEach(alien => {
          if (alien.vel[0] < 7.5) {
            alien.vel[0] += .02;
          }
          alien.pos[1] += alien.vel[1];
        });
        this.rightBound = true;
      } else if ((this.aliens[i].pos[0] > (Game.DIM_X - 28))) {
        this.aliens.forEach(alien => {
          if (alien.vel[0] < 7.5) {
            alien.vel[0] += .02;
          }
          alien.vel[1] += .07;
          alien.pos[1] += alien.vel[1];
        });
        this.rightBound = true;
      }

    }

    //check if left bound of canvas is next move, speed of velocity,
    // change y position
    for (let i=0; i < this.aliens.length; i++) {
      if ((this.aliens.length > 20) && (this.aliens[i].pos[0] < 16)) {
          this.aliens.forEach(alien => {
            if (alien.vel[0] < 7.5) {
              alien.vel[0] += .02;
            }
            alien.pos[1] += alien.vel[1];
          });
          this.rightBound = false;

      } else {
        if (this.aliens[i].pos[0] < 16) {
          this.aliens.forEach(alien => {
            if (alien.vel[0] < 7.5) {
              alien.vel[0] += .02;
            }
            alien.vel[1] += .07;
            alien.pos[1] += alien.vel[1];
          });
          this.rightBound = false;
        }
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
        if (obj1 == obj2) {continue;}
        else if ((obj1 instanceof Ship && obj2.alienBullet === false) || (obj1.alienBullet === false && obj2 instanceof Ship)) {continue;}
        else if ((obj1.alienBullet === true && obj2 instanceof Alien) || (obj1 instanceof Alien && obj2.alienBullet === true)) {continue;}
        else if ((obj1 instanceof Alien && obj2 instanceof Ship) && (obj1.collidedWith(obj2))) {
          this.shipLives = 0;
        } else if ((obj1 instanceof Alien && obj2 instanceof Alien)) {continue;}
        else if (obj1.collidedWith(obj2)) {
          obj2.health -= 1;
          if (obj2.health <= 0) {
            if (obj2 instanceof Alien) {
              const alienExplosion = document.getElementById('alienExplosion');
              alienExplosion.play();
            } else if (obj2 instanceof ShipCover) {
              const coverExplosion = document.getElementById('coverExplosion');
              coverExplosion.play()
            } else if (obj2 instanceof Ship) {
              const loseLife = document.getElementById('loseLife');
              loseLife.play();
            }
            this.remove(obj2);
          }
        }
      }
    }

  }

  removeBullets() {
    this.bullets.forEach(bullet => {
      if (bullet.pos[1] > 700 || bullet.pos[1] < 0) {
        this.remove(bullet);
      }
    });
  }

  remove(object) {
    if (object instanceof Bullet) {
      this.bullets.splice(this.bullets.indexOf(object), 1);
    } else if (object instanceof Alien) {
      this.aliens.splice(this.aliens.indexOf(object), 1);
    } else if (object instanceof Ship) {
      this.ship.splice(this.ship.indexOf(object), 1);
      this.shipLives -= 1;
    } else if (object instanceof ShipCover) {
      this.cover.splice(this.cover.indexOf(object), 1);
    }
  }

// Game Over Conditions

  gameOver(ctx) {
    ctx.font = "50px uni_05_53regular";
    ctx.fillStyle = 'yellow';
    ctx.fillText("Game Over",210,350);
    this.playing = false;
  }

  win(ctx) {
    ctx.font = "50px uni_05_53regular";
    ctx.fillStyle = 'yellow';
    ctx.fillText("You Won!",230,350);
    this.playing = false;
  }

  alienWinEdge() {
    this.aliens.forEach(alien => {
      if (alien.pos[1] > 700 || alien.pos[1] < 0) {
        this.shipLives = 0;
      }
    });
  }

// invocation of game functions

  step(ctx) {
    if (this.shipLives > 0 && this.aliens.length > 0) {
      this.draw(ctx);
      this.moveObjects(ctx);
      this.checkCollisions();
      this.removeBullets();
      this.alienWinEdge();
    } else if (this.shipLives <= 0 ){
      this.gameOver(ctx);
    } else if (this.aliens.length === 0) {
      this.win(ctx);
    }
    this.createNewShip();
  }
}

Game.DIM_X = 700;
Game.DIM_Y = 700;
Game.NUM_ALIENS = 50;

module.exports = Game;
