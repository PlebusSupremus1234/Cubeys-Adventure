function Block(x, y, type) {
    this.x = x;
    this.y = y;
    this.w = 50;
    this.h = 50;
    this.type = type;

    this.draw = function() {
        if (this.type === "spikes") {
            fill("#858585");
            triangle(this.x, this.y + this.h, this.x + this.w / 2, this.y + this.h, this.x + this.w / 4, this.y);
            triangle(this.x + this.w / 2, this.y + this.h, this.x + this.w, this.y + this.h, this.x + 3 * this.w / 4, this.y);
        } else {
            if (this.type === "ground") fill("#00d620");
            else if (this.type === "soil") fill("#963c15");
            else if (this.type === "lava") fill("#ff6200");
            rect(this.x, this.y, this.w, this.h);
        }
    }

    this.collide = function(axis, pos, f) {
        if (this.type === "lava") {
            player.health = 0;
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
                player.yVel = -20;
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
            }
        }
    }
}