const Game = require('./game.js');
const GameView = require("./game_view.js");
const WelcomeView = require("./welcome_view.js");
let gameTheme;

document.addEventListener("DOMContentLoaded", () => {
    const canvasEl = document.getElementsByTagName("canvas")[0];
    const ctx = canvasEl.getContext("2d");
    const game = new Game();
    new WelcomeView(ctx).start();
    const welcome = document.getElementById('welcome');
    welcome.loop = true;
    welcome.play();

});

document.getElementById("start-Btn").addEventListener("click", () =>{
  welcome.pause();
  const canvasEl = document.getElementsByTagName("canvas")[0];
  const ctx = canvasEl.getContext("2d");
  const game = new Game();
  const view = new GameView(game, ctx);
  view.start();
  const theme = document.getElementById('theme');
  theme.muted = false;
  theme.loop = true;
  theme.play();
});

document.getElementById('mute-Btn').addEventListener("click", () => {
  const audioTags = document.getElementsByTagName("audio");
  const audioArr = [].slice.call(audioTags);
  audioArr.forEach(audio => {
    audio.muted = !audio.muted;
  });
});


//not implemented yet
// const sound = (src) =>{
//   this.sound = document.createElement("audio");
//   this.sound.src = src;
//   this.sound.setAttribute("preload", "auto");
//   this.sound.setAttribute("controls", "none");
//   this.sound.style.display = "none";
//   document.body.appendChild(this.sound);
//   this.play = function(){
//     this.sound.play();
//   };
//   this.stop = function(){
//     this.sound.pause();
//   };
// };
