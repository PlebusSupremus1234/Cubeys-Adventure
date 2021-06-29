let map = [
    "........................",
    "........................",
    "........................",
    "........................",
    "........................",
    "........................",
    "........................",
    "........................",
    "....p...................",
    "........................",
    "....................####",
    "##########.....#########",
    "##########....##########",
    "########################",
];
/*
    . = air
    # = ground
    p = player
*/

let grid = [];
let player;
let gravity = 1;

function setup() {
    createCanvas(1200, 700);
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) {
            let type;
            if (map[i][j] === "#") type = "ground";
            else if (map[i][j] === "p") player = new Player(j * 50, i * 50, true);
            if (type) grid.push(new Block(j * 50, i * 50, type));
        }
    }
}

function draw() {
    background("#87ceeb");
    noStroke();
    for (let i = 0; i < grid.length; i++) grid[i].draw();
    
    if (keyIsDown(LEFT_ARROW)) player.move("left");
    if (keyIsDown(RIGHT_ARROW)) player.move("right");
    player.update();
    player.draw();
}

function keyPressed() {
    if (keyCode === UP_ARROW) player.move("up");
}