/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Alien = __webpack_require__(4);
var Ship = __webpack_require__(5);
var Util = __webpack_require__(2);
var Bullet = __webpack_require__(3);
var ShipCover = __webpack_require__(10);
var shipLives = 4;

var Game = function () {
  function Game(game) {
    _classCallCheck(this, Game);

    this.aliens = [];
    this.addAliens();
    this.ship = [];
    this.createShip();
    this.bullets = [];
    this.game = game;
    this.cover = [];
    this.addCover();
  }

  // create objects, push to respective arrays, draw

  _createClass(Game, [{
    key: "createShip",
    value: function createShip() {
      var ship = new Ship({ pos: [350, 640], game: this });
      this.ship.push(ship);
      return ship;
    }
  }, {
    key: "createNewShip",
    value: function createNewShip() {
      if (this.ship.length === 0 && shipLives > 0) {
        var ship = new Ship({ pos: [350, 640], game: this });
        this.ship.push(ship);
        return ship;
      }
    }
  }, {
    key: "addAliens",
    value: function addAliens() {
      for (var i = 0; i < Game.NUM_ALIENS; i++) {
        var alienX = 100;
        var alienY = 50;
        if (i < 10) {
          this.aliens.push(new Alien({ pos: [alienX + i * 45, alienY], game: this, health: 5 }, this));
        } else if (i < 20) {
          this.aliens.push(new Alien({ pos: [alienX + i % 10 * 45, alienY + 40], game: this, health: 4, row: 2 }, this));
        } else if (i < 30) {
          this.aliens.push(new Alien({ pos: [alienX + i % 10 * 45, alienY + 80], game: this, health: 3, row: 3 }, this));
        } else if (i < 40) {
          this.aliens.push(new Alien({ pos: [alienX + i % 10 * 45, alienY + 120], game: this, health: 2, row: 4 }, this));
        } else if (i < 50) {
          this.aliens.push(new Alien({ pos: [alienX + i % 10 * 45, alienY + 160], game: this, row: 5 }, this));
        }
      }
    }
  }, {
    key: "addCover",
    value: function addCover() {
      var coverX = 100;
      var coverY = 500;
      this.cover.push(new ShipCover({ pos: [coverX, coverY], game: this }));
      this.cover.push(new ShipCover({ pos: [coverX + 160, coverY], game: this, id: 2 }));
      this.cover.push(new ShipCover({ pos: [coverX + 320, coverY], game: this, id: 3 }));
      this.cover.push(new ShipCover({ pos: [coverX + 480, coverY], game: this, id: 4 }));
      // for (let i=0; i <= 3; i++) {
      //
      // }
    }
  }, {
    key: "alienShoot",
    value: function alienShoot() {
      if (shipLives !== 0) {
        var aliens = this.aliens;
        var alien = aliens[Math.floor(Math.random() * aliens.length)];
        var alienPos = alien.pos.slice(0);
        alien.shoot(alienPos);
      }
    }
  }, {
    key: "pushBullet",
    value: function pushBullet(bullet) {
      this.bullets.push(bullet);
    }
  }, {
    key: "allObjects",
    value: function allObjects(ctx) {
      return [].concat(this.aliens, this.ship, this.bullets, this.cover);
    }
  }, {
    key: "draw",
    value: function draw(ctx) {
      ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
      var shipImage = document.getElementsByClassName("ship")[0];
      var alienOne = document.getElementsByClassName("alien")[0];
      var alienTwo = document.getElementsByClassName("alien")[1];
      var alienThree = document.getElementsByClassName("alien")[2];
      var alienFour = document.getElementsByClassName("alien")[3];
      var alienFive = document.getElementsByClassName("alien")[4];
      var shipBullet = document.getElementsByClassName("bullet")[0];
      var alienBullet = document.getElementsByClassName("bullet")[1];
      var coverOne = document.getElementsByClassName("cover")[0];
      var coverTwo = document.getElementsByClassName("cover")[1];
      var coverThree = document.getElementsByClassName("cover")[2];
      var coverFour = document.getElementsByClassName("cover")[3];
      this.allObjects(ctx).forEach(function (object) {
        if (object instanceof Ship) {
          ctx.drawImage(shipImage, object.pos[0] - 15, object.pos[1], 40, 40);
        } else if (object instanceof Alien && object.row === 1) {
          ctx.drawImage(alienOne, object.pos[0] - 15, object.pos[1], 40, 40);
        } else if (object instanceof Alien && object.row === 2) {
          ctx.drawImage(alienTwo, object.pos[0] - 15, object.pos[1], 40, 40);
        } else if (object instanceof Alien && object.row === 3) {
          ctx.drawImage(alienThree, object.pos[0] - 15, object.pos[1], 40, 40);
        } else if (object instanceof Alien && object.row === 4) {
          ctx.drawImage(alienFour, object.pos[0] - 15, object.pos[1], 40, 40);
        } else if (object instanceof Alien && object.row === 5) {
          ctx.drawImage(alienFive, object.pos[0] - 15, object.pos[1], 40, 40);
        } else if (object instanceof Bullet && object.alienBullet === false) {
          ctx.drawImage(shipBullet, object.pos[0], object.pos[1], 5, 15);
        } else if (object instanceof Bullet && object.alienBullet === true) {
          ctx.drawImage(alienBullet, object.pos[0], object.pos[1], 8, 24);
        } else if (object instanceof ShipCover && object.id === 1) {
          ctx.drawImage(coverOne, object.pos[0] - 38, object.pos[1] - 20, 80, 80);
        } else if (object instanceof ShipCover && object.id === 2) {
          ctx.drawImage(coverTwo, object.pos[0] - 38, object.pos[1] - 20, 80, 80);
        } else if (object instanceof ShipCover && object.id === 3) {
          ctx.drawImage(coverThree, object.pos[0] - 38, object.pos[1] - 20, 80, 80);
        } else if (object instanceof ShipCover && object.id === 4) {
          ctx.drawImage(coverFour, object.pos[0] - 38, object.pos[1] - 20, 80, 80);
        }
      });
    }

    // Object movements

  }, {
    key: "moveAliens",
    value: function moveAliens(ctx) {
      var rightBound = false;
      for (var i = 0; i < this.aliens.length; i++) {
        if (this.aliens[i].pos[0] > Game.DIM_X - 28) {
          this.aliens.forEach(function (alien) {
            alien.pos[1] += alien.vel[1];
          });
          this.rightBound = true;
        }
      }

      for (var _i = 0; _i < this.aliens.length; _i++) {
        if (this.aliens[_i].pos[0] < 16) {
          this.aliens.forEach(function (alien) {
            alien.pos[1] += alien.vel[1];
          });
          this.rightBound = false;
        }
      }

      if (this.rightBound) {
        this.aliens.forEach(function (alien) {
          alien.reverse(ctx);
        });
      } else {
        this.aliens.forEach(function (alien) {
          alien.move(ctx);
        });
      }
    }
  }, {
    key: "moveBullets",
    value: function moveBullets(ctx) {
      this.bullets.forEach(function (bullet) {
        if (bullet.alienBullet === false) {
          bullet.pos[1] -= 5;
        } else {
          bullet.pos[1] += 5;
        }
      });
    }
  }, {
    key: "moveObjects",
    value: function moveObjects(ctx) {
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

  }, {
    key: "checkCollisions",
    value: function checkCollisions() {
      var allObjs = this.allObjects();

      for (var i = 0; i < allObjs.length; i++) {
        for (var j = 0; j < allObjs.length; j++) {
          var obj1 = allObjs[i];
          var obj2 = allObjs[j];
          if (obj1 == obj2) {
            continue;
          } else if (obj1 instanceof Ship && obj2.alienBullet === false || obj1.alienBullet === false && obj2 instanceof Ship) {
            continue;
          } else if (obj1.alienBullet === true && obj2 instanceof Alien || obj1 instanceof Alien && obj2.alienBullet === true) {
            continue;
          } else if (obj1.collidedWith(obj2)) {
            obj1.health -= 1;
            if (obj1.health === 0) {
              this.remove(obj1);
            } else if (obj2.health === 0) {
              this.remove(obj2);
            }
          }
        }
      }
    }
  }, {
    key: "remove",
    value: function remove(object) {
      if (object instanceof Bullet) {
        this.bullets.splice(this.bullets.indexOf(object), 1);
      } else if (object instanceof Alien) {
        this.aliens.splice(this.aliens.indexOf(object), 1);
      } else if (object instanceof Ship) {
        this.ship.splice(this.ship.indexOf(object), 1);
        shipLives -= 1;
      } else if (object instanceof ShipCover) {
        this.cover.splice(this.cover.indexOf(object), 1);
      }
    }

    // Game Over

  }, {
    key: "gameOver",
    value: function gameOver(ctx) {
      ctx.font = "50px uni_05_53regular";
      ctx.fillStyle = 'yellow';
      ctx.fillText("Game Over", 210, 350);
    }
  }, {
    key: "win",
    value: function win(ctx) {
      ctx.font = "50px uni_05_53regular";
      ctx.fillStyle = 'yellow';
      ctx.fillText("You Won!", 230, 350);
    }
  }, {
    key: "step",


    // invocation of game functions

    value: function step(ctx) {
      if (shipLives !== 0 && this.aliens.length > 0) {
        this.draw(ctx);
        this.moveObjects(ctx);
        this.checkCollisions();
      } else if (shipLives === 0) {
        this.gameOver(ctx);
      } else if (this.aliens.length === 0) {
        this.win(ctx);
      }
      this.createNewShip();
    }
  }]);

  return Game;
}();

Game.DIM_X = 700;
Game.DIM_Y = 700;
Game.NUM_ALIENS = 50;

module.exports = Game;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Util = __webpack_require__(2);

var MovingObject = function () {
  function MovingObject(options) {
    _classCallCheck(this, MovingObject);

    this.pos = options.pos;
    this.vel = options.vel;
    this.radius = options.radius;
    this.color = options.color;
    this.game = options.game;
  }

  _createClass(MovingObject, [{
    key: "draw",
    value: function draw(ctx) {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI);

      ctx.fill();
    }
  }, {
    key: "move",
    value: function move() {
      this.pos[0] += this.vel[0];
    }
  }, {
    key: "reverse",
    value: function reverse() {
      this.pos[0] -= this.vel[0];
    }
  }, {
    key: "collidedWith",
    value: function collidedWith(otherObj) {
      var center = Util.distance(this.pos, otherObj.pos);
      return center < this.radius + otherObj.radius;
    }
  }, {
    key: "collisionsToRemove",
    value: function collisionsToRemove(otherObj) {

      this.game.remove(otherObj);
    }
  }]);

  return MovingObject;
}();

module.exports = MovingObject;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Util = {
  randomVec: function randomVec(length) {
    var deg = 2 * Math.PI * Math.random();
    return Util.scale([Math.sin(deg), Math.cos(deg)], length);
  },
  scale: function scale(vec, m) {
    return [vec[0] * m, vec[1] * m];
  },
  distance: function distance(pos1, pos2) {
    return Math.sqrt(Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2));
  }
};

module.exports = Util;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MovingObject = __webpack_require__(1);

var BULLETDEFAULT = {
  radius: 2,
  vel: 15,
  color: 'grey'
};

var Bullet = function (_MovingObject) {
  _inherits(Bullet, _MovingObject);

  function Bullet(options) {
    _classCallCheck(this, Bullet);

    options.radius = BULLETDEFAULT.radius;
    options.vel = BULLETDEFAULT.vel;
    options.color = BULLETDEFAULT.color;

    var _this = _possibleConstructorReturn(this, (Bullet.__proto__ || Object.getPrototypeOf(Bullet)).call(this, options));

    _this.alienBullet = options.alienBullet || false;
    _this.health = 1;
    return _this;
  }

  return Bullet;
}(MovingObject);

module.exports = Bullet;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MovingObject = __webpack_require__(1);
var Bullet = __webpack_require__(3);
var ALIENDEFAULT = {
  color: 'red',
  radius: 20
};

var Alien = function (_MovingObject) {
  _inherits(Alien, _MovingObject);

  function Alien() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Alien);

    options.color = ALIENDEFAULT.color;
    options.radius = ALIENDEFAULT.radius;
    options.vel = [1, 1];

    var _this = _possibleConstructorReturn(this, (Alien.__proto__ || Object.getPrototypeOf(Alien)).call(this, options));

    _this.health = options.health || 1;
    _this.row = options.row || 1;

    return _this;
  }

  _createClass(Alien, [{
    key: "shoot",
    value: function shoot(pos) {
      var alienBulletPos = pos;
      var alienBullet = new Bullet({ pos: alienBulletPos, game: this.game, color: 'orange', alienBullet: true });
      this.game.pushBullet(alienBullet);
    }
  }]);

  return Alien;
}(MovingObject);

module.exports = Alien;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MovingObject = __webpack_require__(1);
var Bullet = __webpack_require__(3);

var SHIPDEFAULT = {
  color: 'black',
  radius: 18,
  vel: 0
};

var Ship = function (_MovingObject) {
  _inherits(Ship, _MovingObject);

  function Ship() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Ship);

    options.color = SHIPDEFAULT.color;
    options.radius = SHIPDEFAULT.radius;
    options.vel = SHIPDEFAULT.vel;

    var _this = _possibleConstructorReturn(this, (Ship.__proto__ || Object.getPrototypeOf(Ship)).call(this, options));

    _this.health = 5;
    return _this;
  }

  _createClass(Ship, [{
    key: "power",
    value: function power(impulse) {
      this.pos[0] += impulse[0];
    }
  }, {
    key: "shoot",
    value: function shoot() {
      var bulletPos = this.pos.slice(0);
      bulletPos[0];
      var bullet = new Bullet({ pos: bulletPos, game: this.game });
      this.game.pushBullet(bullet);
    }
  }]);

  return Ship;
}(MovingObject);

module.exports = Ship;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Game = __webpack_require__(0);
var GameView = __webpack_require__(7);

document.addEventListener("DOMContentLoaded", function () {
    var canvasEl = document.getElementsByTagName("canvas")[0];
    var ctx = canvasEl.getContext("2d");
    window.ctx = ctx;
    window.canvasEl = canvasEl;
    var game = new Game();
    new GameView(game, ctx).start();
});

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = __webpack_require__(0);
var Alien = __webpack_require__(4);
var Ship = __webpack_require__(5);
var Starfield = __webpack_require__(9);

var GameView = function () {
  function GameView(game, ctx) {
    _classCallCheck(this, GameView);

    this.game = game;
    this.ctx = ctx;
  }

  _createClass(GameView, [{
    key: "sf",
    value: function sf() {

      return new Starfield({
        canvas: '#star-canvas',
        numStars: 800,
        dx: 0.05,
        dy: 0.025,
        maxRadius: 2,
        shootingStarInterval: 5
      });
    }
  }, {
    key: "start",
    value: function start() {
      setInterval(Game.prototype.step.bind(this.game, this.ctx), 20);
      // setInterval(Game.prototype.draw.bind(this.game, this.ctx), 20);
      // this.lastTime = 0;
      // requestAnimationFrame(this.animate.bind(this));
      setInterval(Game.prototype.alienShoot.bind(this.game), 1500);
      this.bindKeys();
      this.sf().start();
    }
  }, {
    key: "bindShip",
    value: function bindShip() {
      var ship = this.game.ship[0];
      return ship;
    }
  }, {
    key: "bindKeys",
    value: function bindKeys() {
      var _this = this;

      Object.keys(GameView.MOVES).forEach(function (k) {
        key(k, function () {
          _this.bindShip().power(GameView.MOVES[k]);
        });
      });
      key('f', function () {
        _this.bindShip().shoot();
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

  }]);

  return GameView;
}();

GameView.MOVES = {
  // w: [0, -3],
  // s: [0, 3],
  a: [-5, 0],
  d: [5, 0],
  left: [-5, 0],
  right: [5, 0]
};
module.exports = GameView;

/***/ }),
/* 8 */,
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

/*

The MIT License (MIT)

Copyright (c) 2015 Micheal Parks

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

*/

(function(window, sf) {

  if (true) module.exports = sf()
  else window.Starfield = sf()

})(this, function() {

'use strict'

/*
 * Starfield Constructor
 *
 * config:
 * {
 *   canvas: string or HTML element
 *   numStars: number, default 500
 *   vx: number, rate of x movement, default 0.05
 *   vy: number, rate of y movement, default 0.05
 *   maxRadius: number, default 2
 *   shootingStarInterval: 2000
 * }
 */
function Starfield(config) {
  config = config || {}

  this.canvas = typeof config.canvas === 'string' ?
    document.querySelector(config.canvas) :
    config.canvas
  this.ctx = this.canvas.getContext('2d')
  this.style = getComputedStyle(this.canvas)

  this.vx = config.vx || 0.05
  this.vy = config.vy || 0.05

  this.maxStars = config.numStars || 500
  this.maxRadius = config.maxRadius || 1.5

  this.shootingStarInterval = config.shootingStarInterval
  this.lastShootingStar = this.shootingStarInterval ? performance.now() : undefined
  this.shootingStar

  this.onResize()

  window.addEventListener('resize', this.onResize.bind(this))
}

Starfield.prototype.star = function() {
  return {
    x: Math.round(Math.random() * this.canvas.width),
    y: Math.round(Math.random() * this.canvas.height),
    r: 0.5 + (Math.random() * this.maxRadius),
    l: Math.random(),
    bl: 0.1 * (Math.random() * 6 + 2),
    dl: Math.round(Math.random()) === 1? 0.01: -0.01
  }
}

Starfield.prototype.loadStars = function() {
  this.stars = new Array(this.numStars)

  var i = this.numStars
  while (i-- > 0) this.stars[i] = this.star()
}

Starfield.prototype.onResize = function() {
  var ratio = window.devicePixelRatio || 1

  this.canvas.width = this.style.width.replace('px', '') | 0 * ratio
  this.canvas.height = this.style.height.replace('px', '') | 0 * ratio

  if (this.canvas.width / ratio < 500) this.numStars = 100
  else this.numStars = this.maxStars

  this.loadStars()
}

Starfield.prototype.draw = function(star) {
  this.ctx.beginPath()
  this.ctx.fillStyle = 'rgba(255,255,255,' + star.l + ')' 
  this.ctx.arc(star.x, star.y, star.r, 0, 2 * Math.PI, false)
  this.ctx.fill()
}

Starfield.prototype.start = function() {
  var tick = function(timeStamp) {

    this.ctx.fillStyle = 'black' 
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)

    var i = this.stars.length
    while (i-- > 0) {
      var star = this.stars[i]

      this.draw(star)
      
      star.y += this.vy
      star.x += this.vx
      star.l += star.dl

      if (Math.abs(star.l - star.bl) >= 0.25) star.dl = -star.dl
      if (star.x > this.canvas.width) star.x = this.vx > 0? -1: this.canvas.width + 1
      if (star.y > this.canvas.height) star.y = this.vy > 0? -1: this.canvas.height + 1
    }

    if (this.shootingStar) {
      var star = this.shootingStar

      this.draw(star)
      
      star.y += 3
      star.x += 7
      star.l += star.dl
      star.r -= 0.06

      if (star.r <= 0) this.shootingStar = undefined

    } else if (this.shootingStarInterval) {

      if (timeStamp - this.lastShootingStar >= this.shootingStarInterval) {
        this.shootingStar = this.star()
        this.lastShootingStar = timeStamp
        this.shootingStar.r = 3
      }
    }

    this.frameId = window.requestAnimationFrame(tick)

  }.bind(this)
  
  this.frameId = window.requestAnimationFrame(tick)
}

return Starfield

})

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Util = __webpack_require__(2);

var ShipCover = function () {
  function ShipCover(options) {
    _classCallCheck(this, ShipCover);

    this.pos = options.pos;
    this.game = options.game;
    this.color = 'grey';
    this.radius = 40;
    this.health = 10;
    this.id = options.id || 1;
  }

  _createClass(ShipCover, [{
    key: "draw",
    value: function draw(ctx) {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI);

      ctx.fill();
    }
  }, {
    key: "collidedWith",
    value: function collidedWith(otherObj) {
      var center = Util.distance(this.pos, otherObj.pos);
      return center < this.radius + otherObj.radius;
    }
  }, {
    key: "collisionsToRemove",
    value: function collisionsToRemove(otherObj) {

      this.game.remove(otherObj);
    }
  }]);

  return ShipCover;
}();

module.exports = ShipCover;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map