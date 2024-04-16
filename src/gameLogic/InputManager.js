export class HandleInput {
    constructor(keysTab, lastKeysTab, isPlayed) {
        this.keysTab = keysTab;
        this.lastKeysTab = lastKeysTab;
        this.isPlayed = isPlayed;
    }

    initializeWheelListener() {
        this.lastKeysTab[0] = [""];
        this.keysTab[0] = "";
        this.wheelListener = (event) => {
            if (event.deltaY < 0 && this.keysTab.indexOf("q") == -1) {
                this.keysTab.unshift("q");

                setTimeout(() => {
                    this.keysTab[0] = "";
                    this.lastKeysTab.splice(0, 1, "q");
                }, 500);
                console.log("scroooll ", this.keysTab, this.lastKeysTab);
            } else if (event.deltaY > 0 && this.keysTab.indexOf("d") == -1) {
                this.keysTab.unshift("d");

                setTimeout(() => {
                    this.keysTab[0] = "";
                    this.lastKeysTab.splice(0, 1, "d");
                }, 500);

                console.log("scroooll ", this.keysTab, this.lastKeysTab);
            }
        };

        window.addEventListener("wheel", this.wheelListener);
    }

    initializeKeyListener() {
        this.keydownListener = (event) => {
            switch (event.key) {
                case "q":
                    if (this.keysTab.indexOf("q") == -1) {
                        this.keysTab.unshift("q");
                    }

                    break;
                case "d":
                    if (this.keysTab.indexOf("d") == -1) {
                        this.keysTab.unshift("d");
                    }
                    console.log("moove ", this.keysTab, this.lastKeysTab);
                    break;
                case " ":
                    event.preventDefault();
                    if (this.keysTab.indexOf(" ") == -1) {
                        this.keysTab.push(" ");
                    }
                    break;
                case "z":
                    if (this.keysTab.indexOf("z") == -1) {
                        this.keysTab.push("z");
                    }
                    break;
            }
        };

        this.keyupListener = (event) => {
            switch (event.key) {
                case "q":
                    this.keysTab.splice(this.keysTab.indexOf("q"), 1);
                    this.lastKeysTab.splice(0, 1, "q");
                    break;
                case "d":
                    this.keysTab.splice(this.keysTab.indexOf("d"), 1);
                    this.lastKeysTab.splice(0, 1, "d");
                    console.log("keyup ", this.keysTab, this.lastKeysTab);
                    break;
                case " ":
                    this.keysTab.splice(this.keysTab.indexOf(" "), 1);
                    this.lastKeysTab.splice(0, 1, " ");
                    break;
                case "z":
                    this.keysTab.splice(this.keysTab.indexOf("z"), 1);
                    this.lastKeysTab.splice(0, 1, "z");
                    break;
                default:
                    this.lastKeysTab[0] = "";
            }
        };

        window.addEventListener("keydown", this.keydownListener);
        window.addEventListener("keyup", this.keyupListener);
    }

    removeListeners() {
        this.lastKeysTab[0] = this.keysTab[0];
        this.keysTab = [];

        if (!this.isPlayed) {
            window.removeEventListener("wheel", this.wheelListener);
        } else {
            window.removeEventListener("keydown", this.keydownListener);
            window.removeEventListener("keyup", this.keyupListener);
        }
    }
}
