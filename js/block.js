import { offset } from "./sketch.js";
import { global } from "./global.js";
export class Block {
    constructor(x, y, type) {
        this.w = global.blocksize;
        this.x = x;
        this.y = type === "spikes" ? y + 0.3 * global.blocksize : y;
        this.h = type === "spikes" ? 0.7 * global.blocksize : global.blocksize;
        this.type = type;
    }
    draw(ctx) {
        let { x, y } = offset;
        if (this.type === "spikes") {
            let px = this.x + x;
            let py = this.y + y;
            let s = global.blocksize / 2;
            for (let i = 0; i < 2; i++) {
                ctx.fillStyle = "#85a1a3";
                ctx.beginPath();
                ctx.moveTo(px + i * s, py + this.h);
                ctx.lineTo(px + (i + 1) * s, py + this.h);
                ctx.lineTo(px + s / 2 + i * s, py);
                ctx.fill();
                ctx.fillStyle = "#94b1b3";
                ctx.beginPath();
                ctx.moveTo(px + i * s, py + this.h);
                ctx.lineTo(px + s / 2 + i * s, py + this.h);
                ctx.lineTo(px + s / 2 + i * s, py);
                ctx.fill();
            }
        }
        else {
            if (this.type === "soil" || this.type === "ground")
                ctx.fillStyle = "#a1593b";
            else if (this.type === "lava" || this.type === "lava2")
                ctx.fillStyle = "#ff6200";
            else if (this.type === "ice")
                ctx.fillStyle = "#99d4ff";
            ctx.fillRect(this.x + x, this.y + y, this.w, this.h);
            if (this.type === "ground") {
                ctx.fillStyle = "#00d620";
                ctx.fillRect(this.x + x, this.y + y, this.w, 15);
                let s = global.blocksize / 3;
                for (let i = 0; i < 3; i++) {
                    let a = i * s;
                    let px = this.x + x;
                    let py = this.y + y + 15;
                    ctx.beginPath();
                    ctx.moveTo(px + a, py);
                    ctx.lineTo(px + a + s, py);
                    ctx.lineTo(px + a + s / 2, py + s / 2);
                    ctx.fill();
                }
            }
            else if (this.type === "lava2") {
                let grad = ctx.createLinearGradient(this.x + x, this.y + y, this.x + x, this.y + y + 35);
                grad.addColorStop(0, "#ffb400");
                grad.addColorStop(1, "#ff6200");
                ctx.fillStyle = grad;
                ctx.fillRect(this.x + x, this.y + y, this.w, 35);
            }
        }
    }
    collide(player, axis, pos, f) {
        if (this.type === "lava" || this.type === "lava2") {
            player.health -= 50;
            player.yVel /= 1.5;
            player.xVel /= 1.5;
        }
        else if (this.type === "spikes") {
            player.health -= 40;
            if (player.health <= 0) {
                player.health = 0;
                player.dead = true;
            }
            if (!player.dead) {
                player.y = this.y - global.blocksize;
                player.accelY = -player.jumpHeight;
            }
            player.falling = true;
        }
        else {
            if (axis === 0) {
                player.xVel = 0;
                player.x = pos;
            }
            else {
                player.falling = f;
                player.yVel = 0;
                player.y = pos;
                if (this.type === "ice")
                    player.xVel /= 0.9;
            }
        }
    }
}
