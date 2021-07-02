import { offset } from "./sketch.js"
import { global } from "./global.js"
type options = "soil" | "ground" | "lava" | "lava2" | "spikes" | "ice";
type O1 = 0 | 1;

export class Block {
    readonly x: number;
    readonly y: number;
    readonly w = global.blocksize;
    readonly h: number;
    readonly type: options;

    constructor(x: number, y: number, type: options) {
        this.x = x;
        this.y = type === "spikes" ? y + 0.3 * global.blocksize : y;
        this.h = type === "spikes" ? 0.7 * global.blocksize : global.blocksize;
        this.type = type;
    }

    draw(ctx) {
        let { x, y } = offset;
        let px = this.x + x;
        let py = this.y + y;
        let { blocksize : b } = global;
        if (this.type === "spikes") {
            let s = b / 2;
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
        } else {
            let color;
            if (this.type === "soil" || this.type === "ground") color = "#a1593b";
            else if (this.type === "lava" || this.type === "lava2") color = "#ff6200";
            else if (this.type === "ice") color = "#99d4ff";

            ctx.fillStyle = color;
            ctx.strokeStyle = color;
            ctx.fillRect(px, py, this.w, this.h);
            if (this.type !== "lava2") ctx.strokeRect(px, py, this.w, this.h - 1);
            
            //extra stuff
            if (this.type === "ground") {
                ctx.fillStyle = "#00d620";
                ctx.strokeStyle = "#00d620";
                ctx.fillRect(px, py, this.w, 0.3 * b);
                ctx.strokeRect(px, py, this.w, 0.3 * b);
                let s = b / 3;
                for (let i = 0; i < 3; i++) {
                    let a = i * s;
                    ctx.beginPath();
                    ctx.moveTo(px + a, py + 0.3 * b);
                    ctx.lineTo(px + a + s, py + 0.3 * b);
                    ctx.lineTo(px + a + s / 2, py + 0.3 * b + s / 2);
                    ctx.fill();
                }
            } else if (this.type === "lava2") {
                let grad = ctx.createLinearGradient(px, py, px, py + 0.7 * this.h);
                grad.addColorStop(0, "#ffb400");
                grad.addColorStop(1, "#ff6200");
                ctx.fillStyle = grad;
                ctx.strokeStyle = grad;
                ctx.fillRect(px, py, this.w, 0.7 * this.h);
            }   
        }
    }

    collide(player, axis: O1, pos: number, f: boolean) {
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
                player.y = this.y - global.blocksize;
                player.accelY = -player.jumpHeight;
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