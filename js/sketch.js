const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let map = [
    "..........................",
    "..........................",
    "..........................",
    "..........................",
    "..........................",
    "..........................",
    "..........................",
    "..........................",
    ".....p......gggg..........",
    "..........................",
    ".................ssssggggg",
    "gggggggggg.......gggg#####",
    "##########LLLLLLL#########",
    "##########lllllll#########"
];
let grid = [];
let player;
let gravity = 1;
let offset = { x: 0, y: 0 };
let width = 1200;
let height = 700;
const musicHandle = new playMusic("music.mp3");
import { Player } from "./player.js";
import { Block } from "./block.js";
export { offset, gravity, width, height };
let keysDown = [false, false];
document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);
let alerted = false;
for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
        let type;
        if (map[i][j] === "#")
            type = "soil";
        else if (map[i][j] === "g")
            type = "ground";
        else if (map[i][j] === "l")
            type = "lava";
        else if (map[i][j] === "L")
            type = "lava2";
        else if (map[i][j] === "s")
            type = "spikes";
        else if (map[i][j] === "i")
            type = "ice";
        else if (map[i][j] === "p")
            player = new Player(j * 50, i * 50);
        if (type)
            grid.push(new Block(j * 50, i * 50, type));
    }
}
function playMusic(musicPath) {
    this.sound = document.createElement("audio");
    this.sound.src = musicPath;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function () {
        this.sound.play();
    };
    this.pause = function () {
        this.sound.pause();
    };
}
function draw() {
    requestAnimationFrame(draw);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#51b8e1";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    if (keysDown[0])
        player.move("left");
    if (keysDown[1])
        player.move("right");
    player.update(grid);
    player.draw(ctx);
    for (let i = 0; i < grid.length; i++)
        grid[i].draw(ctx);
    ctx.fillStyle = "#878787";
    ctx.fillRect(40, 30, 200, 30);
    ctx.fillStyle = "#26e600";
    ctx.fillRect(40, 30, player.health * 2, 30);
    ctx.fillStyle = "#000000";
    ctx.font = "20px Sans Serif";
    ctx.textAlign = "center";
    ctx.fillText(`Health ${player.health}%`, 40 + 100, 52);
    if (player.alerted === 1) {
        player.alerted = 2;
        setTimeout(() => {
            alert("You died!");
            location.reload();
        }, 1000);
    }
}
draw();
function keyDown(k) {
    if (k.key.toLowerCase() === "arrowleft")
        keysDown[0] = true;
    else if (k.key.toLowerCase() === "arrowup")
        player.move("up");
    else if (k.key.toLowerCase() === "arrowright")
        keysDown[1] = true;
}
function keyUp(k) {
    if (k.key.toLowerCase() === "arrowleft")
        keysDown[0] = false;
    else if (k.key.toLowerCase() === "arrowright")
        keysDown[1] = false;
}