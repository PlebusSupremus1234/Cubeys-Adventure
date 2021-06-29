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

    this.draw = function() {
        fill("red");
        rect(this.x, this.y, 50, 50);
    }

    this.move = function(dir) {
        if (dir === "up" && !this.falling) {
            this.yVel -= this.jumpHeight;
            this.falling = true;
        }
        if (dir === "left") this.xVel -= this.speed;
        if (dir === "right") this.xVel += this.speed;
        
        if (this.yVel > this.maxSy) this.yVel = this.maxSy;
        if (this.yVel < -this.maxSy) this.yVel = -this.maxSy;
    }

    this.update = function() {
        this.x += this.xVel;
        this.xVel *= 0.9;
        for (let i of grid) {
            if (this.y + this.h > i.y && this.y + this.h < i.y + i.h + this.h && this.x + this.w > i.x && this.x + this.w < i.x + i.w && this.xVel > 0) {
                this.x = i.x - this.w;
                this.xVel = 0;
            }
            if (this.y + this.h > i.y && this.y + this.h < i.y + i.h + this.h && this.x < i.x + i.w && this.x > i.x && this.xVel < 0) {
                this.x = i.x + i.w;
                this.xVel = 0;
            }
        }
        this.y += this.yVel;
        for (let i of grid) {
            if (this.x + this.w > i.x && this.x < i.x + i.w && this.y + this.h > i.y && this.y + this.h < i.y + i.h && this.yVel > 0) {          
                player.falling = false;
                this.y = i.y - this.h;
                this.yVel = 0;
            }            
            if (this.x + this.w > i.x && this.x < i.x + i.w && this.y < i.y + i.h && this.y + this.h > i.y && this.yVel < 0) {
                player.falling = true;
                this.y = i.y + i.h;
                this.yVel = 0;
            }
        }
        this.yVel += gravity;
    }
}