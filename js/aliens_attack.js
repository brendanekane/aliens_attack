const Alien = require('./alien.js');

window.Alien = Alien;

document.addEventListener("DOMContentLoaded", () => {
    const canvasEl = document.getElementsByTagName("canvas")[0];
    const ctx = canvasEl.getContext("2d");
    window.ctx = ctx;
    window.canvasEl = canvasEl;
});
