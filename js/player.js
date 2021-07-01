import { offset, gravity, width, height } from "./sketch.js";
export class Player {
    constructor(x, y) {
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
        this.falling = true;
        this.health = 100;
        this.dead = false;
        this.accelY = 0;
        this.alerted = 0;
        offset.x = (width - this.w) / 2 - this.x;
        offset.y = (height - this.h) / 2 - this.y + 50;
    }
    draw(ctx) {
        ctx.fillStyle = "#ff0000";
        ctx.fillRect(this.x + offset.x, this.y + offset.y, this.w, this.h);
    }
    move(dir) {
        if (!this.dead) {
            if (dir === "up" && !this.falling) {
                this.yVel -= this.jumpHeight;
                this.falling = true;
            }
            if (dir === "left")
                this.xVel -= this.speed;
            if (dir === "right")
                this.xVel += this.speed;
            if (this.yVel > this.maxSy)
                this.yVel = this.maxSy;
            if (this.yVel < -this.maxSy)
                this.yVel = -this.maxSy;
        }
    }
    update(grid) {
        this.x += this.xVel;
        this.xVel *= 0.9;
        for (let i of grid) {
            let s = this.y + this.h > i.y && this.y + this.h < i.y + i.h + this.h;
            if (s && this.x + this.w > i.x && this.x + this.w < i.x + i.w && this.xVel > 0)
                i.collide(this, 0, i.x - this.w);
            if (s && this.x < i.x + i.w && this.x > i.x && this.xVel < 0)
                i.collide(this, 0, i.x + i.w);
        }
        this.y += this.yVel;
        for (let i of grid) {
            let s = this.x + this.w > i.x && this.x < i.x + i.w;
            if (s && this.y + this.h > i.y && this.y + this.h < i.y + i.h && this.yVel > 0)
                i.collide(this, 1, i.y - this.h, false);
            if (s && this.y < i.y + i.h && this.y + this.h > i.y && this.yVel < 0)
                i.collide(this, 1, i.y + i.h, true);
        }
        this.yVel += gravity;
        if (this.accelY) {
            this.yVel = this.accelY;
            this.accelY = 0;
        }
        if (this.y >= 1000 && this.alerted === 0)
            this.alerted = 1;
        if (this.health <= 0) {
            this.health = 0;
            this.dead = true;
            if (this.alerted === 0)
                this.alerted = 1;
        }
        offset.x -= (this.x + this.w / 2 + offset.x - width / 2) / 20;
    }
}
