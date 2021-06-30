function Player(x, y, falling) {
    this.x = x;
    this.y = y;
    this.w = 50;
    this.h = 50;
    this.xVel = 0;
    this.yVel = 0;
    this.jumpHeight = 20;
    this.speed = 1;
    this.maxSx = 8;
    this.maxSy = 30;
    this.falling = falling;
    this.health = 100;
    this.dead = false;

    prevHealth = this.health;
    takingDmg = false;

    this.draw = function() {
        fill("red");
        rect(this.x + offset.x, this.y + offset.y, 50, 50);
    }

    this.move = function(dir) {
        if (!this.dead) {
            if (dir === "up" && !this.falling) {
                this.yVel -= this.jumpHeight;
                this.falling = true;
            }
            if (dir === "left") this.xVel -= this.speed;
            if (dir === "right") this.xVel += this.speed;
            
            if (this.yVel > this.maxSy) this.yVel = this.maxSy;
            if (this.yVel < -this.maxSy) this.yVel = -this.maxSy;
        }
    }

    this.update = function() {
        this.x += this.xVel;
        this.xVel *= 0.9;
        for (let i of grid) {
            let s = this.y + this.h > i.y && this.y + this.h < i.y + i.h + this.h;
            if (s && this.x + this.w > i.x && this.x + this.w < i.x + i.w && this.xVel > 0) i.collide(0, i.x - this.w);
            if (s && this.x < i.x + i.w && this.x > i.x && this.xVel < 0) i.collide(0, i.x + i.w);
        }
        this.y += this.yVel;
        for (let i of grid) {
            let s = this.x + this.w > i.x && this.x < i.x + i.w;
            if (s && this.y + this.h > i.y && this.y + this.h < i.y + i.h && this.yVel > 0) i.collide(1, i.y - this.h, false);         
            if (s && this.y < i.y + i.h && this.y + this.h > i.y && this.yVel < 0) i.collide(1, i.y + i.h, true);
        }
        this.yVel += gravity;

        if (this.health <= 0) {
            this.health = 0;
            this.dead = true;
        }
    }
}