function Block(x, y, type) {
    this.x = x;
    this.y = y;
    this.w = 50;
    this.h = 50;
    this.type = type;

    this.draw = function() {
        if (this.type === "ground") fill("#709c3f");
        if (this.type === "portal") fill(186, 52, 235, random(190, 250));
        rect(this.x, this.y, this.w, this.h );
    }

    this.collideY = function(player) {
        let p = player;
        if (p.x + p.w > this.x && p.x < this.x + this.w && p.y + p.h > this.y && p.y + p.h < this.y + this.h && p.yVel > 0) {
            if (this.type === "portal") lvlcomplete = true;
            
            player.falling = false;
            p.y = this.y - p.h;
            p.yVel = 0;                
        }

        if (p.x + p.w > this.x && p.x < this.x + this.w && p.y < this.y + this.h && p.y + p.h > this.y && p.yVel < 0) {
            if (this.type === "portal") lvlcomplete = true;

            p.y = this.y + this.h;
            p.yVel = 0;
            player.falling = true;
        }
    }
    
    this.collideX = function(player) {
        let p = player;
        if (p.y + p.h > this.y && p.y + p.h < this.y + this.h + p.h && p.x + p.w > this.x && p.x + p.w < this.x + this.w && p.xVel > 0) {
            if (this.type === "portal") lvlcomplete = true;
            
            p.x = this.x - p.w;
            p.xVel = 0;
        }
        if (p.y + p.h > this.y && p.y + p.h < this.y + this.h + p.h && p.x < this.x + this.w && p.x > this.x && p.xVel < 0) {
            if (this.type === "portal") lvlcomplete = true;

            p.x = this.x + this.w;
            p.xVel = 0;
        }
    };
}