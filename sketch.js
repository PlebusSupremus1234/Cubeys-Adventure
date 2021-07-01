let map = [
    "gggggggggggggggggggggggggg",
    "g........................g",
    "g........................g",
    "g........................g",
    "g........................g",
    "g........................g",
    "g........................g",
    "g........................g",
    "g....p......gggg.........g",
    "g........................g",
    "g................ssssggggg",
    "gggggggggg.......gggg####g",
    "g#########LLLLLLL########g",
    "g#########lllllll########g"
];
/*
    . = air
    g = ground
    # = soil
    s = spikes
    l = lava
    L = lava with yellow grad
    i = ice
    p = player
*/

let grid = [];
let player;
let gravity = 1;
let musicHandle;

let offset = { x: 0, y: 0 };

function playMusic(musicPath) {
    this.sound = document.createElement("audio");
    this.sound.src = musicPath;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function() {
      this.sound.play();
    }
    this.pause = function() {
      this.sound.pause();
    }
  }

function setup() {
    createCanvas(window.innerWidth - 25, window.innerHeight - 35);
    textAlign(CENTER);
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) {
            let type;
            if (map[i][j] === "#") type = "soil";
            else if (map[i][j] === "g") type = "ground";
            else if (map[i][j] === "l") type = "lava";
            else if (map[i][j] === "L") type = "lava2";
            else if (map[i][j] === "s") type = "spikes";
            else if (map[i][j] === "i") type = "ice";
            else if (map[i][j] === "p") player = new Player(j * 50, i * 50, true);
            if (type) grid.push(new Block(j * 50, i * 50, type));
        }
    }
    musicHandle = new playMusic('music.mp3');
    musicHandle.play();
}

function draw() {
    background("#51b8e1");
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
    if (player.dead == true) {
        setTimeout(function() { 
            window.alert("You died!");
            restart();
        }, 0);
    }
}

function restart() {
    remove();
    location.reload();
}

function keyPressed() {
    if (keyCode === UP_ARROW) player.move("up");
}