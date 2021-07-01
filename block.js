function Block(x, y, type) {
    this.x = x;
    this.y = type === "spikes" ? y + 15 : y;
    this.w = 50;
    this.h = type === "spikes" ? 35 : 50;
    this.type = type;

    this.draw = function() {
        let { x, y } = offset;
        if (this.type === "spikes") {
            let px = this.x + x;
            let py = this.y + y;
            let s = 50 / 2;
            for (let i = 0; i < 2; i++) {
                fill("#85a1a3");
                triangle(px + i * s, py + this.h, px + (i + 1) * s, py + this.h, px + s / 2 + i * s, py);
                fill("#94b1b3");
                triangle(px + i * s, py + this.h, px + s / 2 + i * s, py + this.h, px + s / 2 + i * s, py);
            }
        } else {
            if (this.type === "soil" || this.type === "ground") fill("#a1593b");
            else if (this.type === "lava" || this.type === "lava2") fill("#ff6200");
            else if (this.type === "ice") fill("#99d4ff");
            rect(this.x + x, this.y + y, this.w, this.h);
            if (this.type === "ground") {
                fill("#00d620");
                rect(this.x + x, this.y + y, this.w, 15);
                let spacing = 50 / 3;
                for (let i = 0; i < 3; i++) {
                    let a = i * spacing;
                    let px = this.x + x;
                    let py = this.y + y + 15;
                    triangle(px + a, py, px + a + spacing, py, px + a + spacing / 2, py + spacing / 2);
                }
            }
            if (this.type === "lava2") {
                let c1 = color("#ffb400");
                let c2 = color("#ff6200");
                for (let i = 0; i <= 35; i++) {
                    stroke(lerpColor(c1, c2, i / 35));
                    line(this.x + x, this.y + y + i, this.x + x + this.w, this.y + y + i);
                }
                noStroke();
            }
        }
    }

    this.collide = function(axis, pos, f) {
        if (this.type === "lava" || this.type === "lava2") {
            player.health -= 50;
            player.yVel /= 1.5;
            player.xVel /= 1.5;
        } else if (this.type === "spikes") {
            player.health -= 40;
            if (player.health <= 0) {
                player.health = 0;
                player.dead = true;
            }
            if (!player.dead) {
                player.y = this.y - 50;
                player.accelY = -20;
            }
            player.falling = true;
        } else {
            if (axis === 0) {
                player.xVel = 0;
                player.x = pos;
            } else {
                player.falling = f;
                player.yVel = 0;
                player.y = pos;
                if (this.type === "ice") player.xVel /= 0.9;
            }
        }
    }
}