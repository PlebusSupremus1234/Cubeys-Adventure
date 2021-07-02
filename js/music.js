export class Music {
    constructor(musicPath) {
        this.sound = document.createElement("audio");
        console.log(this.sound);
        this.sound.src = musicPath;
        this.sound.setAttribute("preload", "auto");
        this.sound.setAttribute("controls", "none");
        this.sound.style.display = "none";
        document.body.appendChild(this.sound);
    }
    play() {
        this.sound.play();
    }
    pause() {
        this.sound.pause();
    }
}
