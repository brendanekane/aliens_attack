const Game = require('./game.js');
const GameView = require("./game_view.js");
let gameTheme;

document.addEventListener("DOMContentLoaded", () => {
    const canvasEl = document.getElementsByTagName("canvas")[0];
    const ctx = canvasEl.getContext("2d");
    window.ctx = ctx;
    window.canvasEl = canvasEl;
    const game = new Game();
    new GameView(game, ctx).start();
    const theme = document.getElementById('theme');
    theme.loop = true;
    theme.play();
});


const sound = (src) =>{
  debugger
  this.sound = document.createElement("audio");
  debugger
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function(){
    this.sound.play();
  };
  this.stop = function(){
    this.sound.pause();
  };
};
