const Alien = require('./alien.js');
const Game = require('./game.js')
const GameView = require("./game_view.js");

window.Alien = Alien;
window.Game = Game;

document.addEventListener("DOMContentLoaded", () => {
    const canvasEl = document.getElementsByTagName("canvas")[0];
    // const shipImage = document.getElementById("ship");
    const ctx = canvasEl.getContext("2d");
    window.ctx = ctx;
    window.canvasEl = canvasEl;
    const game = new Game();
    new GameView(game, ctx).start();
});
