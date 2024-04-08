export class HandleInput {
    constructor(keysTab, lastKeysTab) {
        window.addEventListener("keydown", (e) => {
            switch (e.key) {
                case "q":
                    if (keysTab.indexOf("q") == -1) {
                        keysTab.unshift("q");
                    }

                    break;
                case "d":
                    if (keysTab.indexOf("d") == -1) {
                        keysTab.unshift("d");
                    }

                    break;
                case " ":
                    e.preventDefault();
                    if (keysTab.indexOf(" ") == -1) {
                        keysTab.push(" ");
                    }

                    break;
                case "z":
                    if (keysTab.indexOf("z") == -1) {
                        keysTab.push("z");
                    }

                    break;
            }
        });

        window.addEventListener("keyup", (e) => {
            switch (e.key) {
                case "q":
                    keysTab.splice(keysTab.indexOf("q"), 1);
                    lastKeysTab.splice(0, 1, "q");

                    break;
                case "d":
                    keysTab.splice(keysTab.indexOf("d"), 1);
                    lastKeysTab.splice(0, 1, "d");

                    break;
                case " ":
                    keysTab.splice(keysTab.indexOf(" "), 1);
                    lastKeysTab.splice(0, 1, " ");

                    break;

                case "z":
                    keysTab.splice(keysTab.indexOf("z"), 1);
                    lastKeysTab.splice(0, 1, "z");

                    break;
                default:
                    lastKeysTab[0] = "";
            }
        });
    }
}
