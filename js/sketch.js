const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let width = window.innerWidth;
let height = window.innerHeight - 4;
canvas.width = width;
canvas.height = height;
import { global } from "./global.js";
let blocksize = width / 40;
global.blocksize = blocksize;
import { levels, updateLevel } from "./levels.js";
let lvl = 0;
let map = levels[lvl].map;
let grid = [];
let text = [];
let player;
let gravity = 1;
let offset = { x: 0, y: 0 };
let time;
import { Player } from "./player.js";
import { Block } from "./block.js";
import { Music } from "./music.js";
export { offset, gravity, width, height };
let keysDown = [false, false];
document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);
let music = new Music("assets/music.mp3");
let showlvlselect = false;
let data = localStorage.getItem("levels");
if (!data) {
    let insert = [];
    for (let i = 0; i < levels.length; i++)
        insert.push({ level: i + 1, completed: false, unlocked: i === 0 ? true : false, time: 0 });
    localStorage.setItem("levels", JSON.stringify(insert));
}
manageLevel(0);
updateLevelMenu();
function draw() {
    requestAnimationFrame(draw);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#51b8e1";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    if (keysDown[0])
        player.move("left");
    if (keysDown[1])
        player.move("right");
    if (!showlvlselect)
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
    for (let i = 0; i < text.length; i++)
        ctx.fillText(text[i].content, text[i].x + offset.x, text[i].y + offset.y);
    if (showlvlselect)
        document.getElementById("modal").style.display = "block";
    if (global.levelComplete > 0) {
        if (global.levelComplete === 1) {
            updateLevel(lvl + 1, Date.now() - time);
        }
        ctx.fillStyle = `rgba(255, 255, 255, ${global.levelComplete / 100})`;
        ctx.fillRect(0, 0, width, height);
        global.levelComplete++;
        if (global.levelComplete > 100)
            manageLevel(lvl + 1);
    }
    if (global.alerted === 1 && global.levelComplete === 0) {
        global.alerted = 2;
        setTimeout(() => {
            alert("You died!");
            manageLevel(lvl);
        }, 1000);
    }
}
draw();
document.getElementById("play").onclick = () => music.play();
document.getElementById("pause").onclick = () => music.pause();
document.getElementById("lvlselect").onclick = () => showlvlselect = !showlvlselect;
document.getElementById("restart").onclick = () => manageLevel(lvl);
document.getElementById("cleardata").onclick = () => {
    if (confirm("Are you sure you want to erase all your level data?")) {
        localStorage.clear();
        let insert = [];
        for (let i = 0; i < levels.length; i++)
            insert.push({ level: i + 1, completed: false, unlocked: i === 0 ? true : false, time: 0 });
        localStorage.setItem("levels", JSON.stringify(insert));
        updateLevelMenu();
    }
};
document.getElementById("close").onclick = () => {
    document.getElementById("modal").style.display = "none";
    showlvlselect = false;
};
document.getElementById("btns").onclick = e => {
    let t = e.target;
    let id = parseInt(t.id);
    if (id && id <= levels.length) {
        manageLevel(id - 1);
        document.getElementById("modal").style.display = "none";
        showlvlselect = false;
    }
};
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
function manageLevel(id) {
    global.alerted = 0;
    global.levelComplete = 0;
    lvl = id;
    if (!levels[lvl])
        return alert("Congrats! You have completed the game. Now maybe try to improve your times");
    map = levels[lvl].map;
    grid = [];
    text = [];
    keysDown = [false, false];
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
                type = "portal";
            else if (map[i][j] === "t")
                text.push({ x: j * global.blocksize, y: i * global.blocksize, content: levels[lvl].txt[text.length] });
            else if (map[i][j] === "P")
                player = new Player(j * global.blocksize, i * global.blocksize);
            if (type)
                grid.push(new Block(j * global.blocksize, i * global.blocksize, type));
        }
    }
    time = Date.now();
    updateLevelMenu();
}
export function updateLevelMenu() {
    let element = document.getElementById("btns");
    element.innerHTML = "";
    let data = JSON.parse(localStorage.getItem("levels"));
    for (let i = 0; i < data.length; i++) {
        let d = document.createElement("div");
        let btn = document.createElement("button");
        btn.innerHTML = data[i].level;
        btn.id = (i + 1).toString();
        if (data[i].completed)
            btn.classList.add("greenborder");
        let p = document.createElement("p");
        p.innerHTML = data[i].completed ? `${data[i].time / 1000}s` : "-";
        d.appendChild(btn);
        d.appendChild(p);
        element.appendChild(d);
    }
}
