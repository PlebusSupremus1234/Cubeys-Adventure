import { offset } from "./sketch.js"
type options = "soil" | "ground" | "lava" | "lava2" | "spikes" | "ice";
type O1 = 0 | 1;

export class Block {
    readonly x: number;
    readonly y: number;
    readonly w: number;
    readonly h: number;
    readonly type: options;

    constructor(x: number, y: number, type: options) {
        this.x = x;
        this.y = type === "spikes" ? y + 15 : y;
        this.w = 50;
        this.h = type === "spikes" ? 35 : 50;
        this.type = type;
    }

    draw(ctx) {
        let { x, y } = offset;
        if (this.type === "spikes") {
            let px = this.x + x;
            let py = this.y + y;
            let s = 50 / 2;
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
            if (this.type === "soil" || this.type === "ground") ctx.fillStyle = "#a1593b";
            else if (this.type === "lava" || this.type === "lava2") ctx.fillStyle = "#ff6200";
            else if (this.type === "ice") ctx.fillStyle = "#99d4ff";
            ctx.fillRect(this.x + x, this.y + y, this.w, this.h);
            if (this.type === "ground") {
                ctx.fillStyle = "#00d620";
                ctx.fillRect(this.x + x, this.y + y, this.w, 15);
                let s = 50 / 3;
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
            } else if (this.type === "lava2") {
                let grad = ctx.createLinearGradient(this.x + x, this.y + y, this.x + x, this.y + y + 35);
                grad.addColorStop(0, "#ffb400");
                grad.addColorStop(1, "#ff6200");
                ctx.fillStyle = grad;
                ctx.fillRect(this.x + x, this.y + y, this.w, 35);
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