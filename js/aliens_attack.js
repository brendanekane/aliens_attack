const Game = require('./game.js');
const GameView = require("./game_view.js");


document.addEventListener("DOMContentLoaded", () => {
    const canvasEl = document.getElementsByTagName("canvas")[0];
    const ctx = canvasEl.getContext("2d");
    window.ctx = ctx;
    window.canvasEl = canvasEl;
    const game = new Game();
    new GameView(game, ctx).start();
});
