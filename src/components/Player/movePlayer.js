export default function movePlayer(e, setX, setY, x, y) {
    switch (e.key) {
        case "q":
            setX((prevX) => prevX - 10); // Déplacement vers la gauche
            break;
        case "d":
            setX((prevX) => prevX + 10); // Déplacement vers la droite
            break;
        case "z":
            setY((prevY) => prevY - 10); // Déplacement vers le haut
            break;
        case "s":
            setY((prevY) => prevY + 10); // Déplacement vers le bas
            break;
        default:
            break;
    }
}
