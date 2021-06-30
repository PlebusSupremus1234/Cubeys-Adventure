let map = [
    "........................",
    "........................",
    "........................",
    "........................",
    "........................",
    "........................",
    "........................",
    "........................",
    "....p......gggg.........",
    "...........####.........",
    "................ssssgggg",
    "ggggggggg.......ggggg###",
    "########glllllllg#######",
    "########glllllllg#######",
];
/*
    . = air
    g = ground
    # = soil
    s = spikes
    l = lava
    p = player
*/

let grid = [];
let player;
let gravity = 1;

function setup() {
    createCanvas(1200, 700);
    textAlign(CENTER);
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) {
            let type;
            if (map[i][j] === "#") type = "soil";
            else if (map[i][j] === "g") type = "ground";
            else if (map[i][j] === "l") type = "lava";
            else if (map[i][j] === "s") type = "spikes";
            else if (map[i][j] === "p") player = new Player(j * 50, i * 50, true);
            if (type) grid.push(new Block(j * 50, i * 50, type));
        }
    }
}

function draw() {
    background("#87ceeb");
    noStroke();
    if (keyIsDown(LEFT_ARROW)) player.move("left");
    if (keyIsDown(RIGHT_ARROW)) player.move("right");
    player.update();
    player.draw();
    for (let i = 0; i < grid.length; i++) grid[i].draw();

    fill("#878787");
    rect(40, 30, 200, 30);
    fill("#26e600");
    rect(40, 30, player.health * 2, 30);
    fill(0);
    textSize(20);
    text(`Health ${player.health}%`, 40 + 100, 52);
}

function keyPressed() {
    if (keyCode === UP_ARROW) player.move("up");
}