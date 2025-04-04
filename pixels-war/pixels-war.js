const PIXEL_URL = "https://pixels-war.oie-lab.net";
const MAP_ID = "0000";

document.addEventListener("DOMContentLoaded", async () => {
    const PREFIX = `${PIXEL_URL}/api/v1/${MAP_ID}`;

    document.getElementById("baseurl").value = PIXEL_URL;
    document.getElementById("mapid").value = MAP_ID;
    document.getElementById("baseurl").readOnly = true;
    document.getElementById("mapid").readOnly = true;

    let userId;
    let nx, ny;

    // Initialisation de la grille
    try {
        const preinitResponse = await fetch(`${PREFIX}/preinit`, { credentials: "include" });
        const preinitJson = await preinitResponse.json();
        const initResponse = await fetch(`${PREFIX}/init?key=${preinitJson.key}`, { credentials: "include" });
        const initJson = await initResponse.json();

        userId = initJson.id;
        nx = initJson.nx;
        ny = initJson.ny;

        initializeGrid(initJson.data, nx, ny);

        // Attacher la fonction refresh au bouton
        document.getElementById("refresh").addEventListener("click", () => refresh(userId));

        // Rafraîchir la grille toutes les 3 secondes
        setInterval(() => refresh(userId), 3000);
    } catch (error) {
        console.error("Erreur lors de l'initialisation :", error);
    }

    // Fonction pour initialiser la grille
    function initializeGrid(data, nx, ny) {
        const grid = document.getElementById("grid");
        const coordinatesDisplay = document.createElement("div");
        coordinatesDisplay.id = "coordinates-display";
        coordinatesDisplay.style.marginTop = "10px";
        coordinatesDisplay.style.fontSize = "14px";
        coordinatesDisplay.textContent = "Coordonnées : (x, y)";
        grid.parentElement.appendChild(coordinatesDisplay);

        grid.style.gridTemplateColumns = `repeat(${nx}, 4px)`;
        grid.style.gridTemplateRows = `repeat(${ny}, 4px)`;
        grid.innerHTML = ""; // Réinitialiser la grille

        data.forEach((row, y) => {
            row.forEach((color, x) => {
                const pixel = document.createElement("div");
                pixel.style.backgroundColor = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
                pixel.dataset.x = x;
                pixel.dataset.y = y;

                // Attacher un événement au clic pour colorer le pixel
                pixel.addEventListener("click", () => colorPixel(userId, x, y));

                // Afficher les coordonnées au survol
                pixel.addEventListener("mouseover", () => {
                    coordinatesDisplay.textContent = `Coordonnées : (${x}, ${y})`;
                });

                // Réinitialiser l'affichage des coordonnées lorsqu'on quitte le pixel
                pixel.addEventListener("mouseout", () => {
                    coordinatesDisplay.textContent = "Coordonnées : (x, y)";
                });

                grid.appendChild(pixel);
            });
        });
    }

    // Fonction pour rafraîchir la grille
    async function refresh(userId) {
        try {
            const response = await fetch(`${PREFIX}/deltas?id=${userId}`, { credentials: "include" });
            const json = await response.json();

            json.deltas.forEach(([x, y, r, g, b]) => {
                const pixel = document.querySelector(`div[data-x="${x}"][data-y="${y}"]`);
                if (pixel) {
                    pixel.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
                }
            });
        } catch (error) {
            console.error("Erreur lors du rafraîchissement :", error);
        }
    }

    // Fonction pour colorer un pixel
    async function colorPixel(userId, x, y) {
        const [r, g, b] = getPickedColorInRGB();
        try {
            // Correction : les coordonnées doivent être passées dans l'ordre (y, x) à l'API
            const response = await fetch(`${PREFIX}/set/${userId}/${y}/${x}/${r}/${g}/${b}`, { credentials: "include" });
            const result = await response.json();

            if (result !== 0) {
                console.log(`Attendez encore ${result / 1e9} secondes avant de peindre un autre pixel.`);
            } else {
                console.log(`Pixel (${x}, ${y}) coloré avec succès.`);
                refresh(userId); // Rafraîchir la grille après avoir coloré un pixel
            }
        } catch (error) {
            console.error("Erreur lors de la coloration du pixel :", error);
        }
    }

    // Petite fonction facilitatrice pour récupérer la couleur cliquée en RGB
    function getPickedColorInRGB() {
        const colorHexa = document.getElementById("colorpicker").value;

        const r = parseInt(colorHexa.substring(1, 3), 16);
        const g = parseInt(colorHexa.substring(3, 5), 16);
        const b = parseInt(colorHexa.substring(5, 7), 16);

        return [r, g, b];
    }

    // Fonction pour transformer une couleur d'un pixel en hexadécimal
    function pickColorFrom(div) {
        const bg = window.getComputedStyle(div).backgroundColor;
        const [r, g, b] = bg.match(/\d+/g);
        const rh = parseInt(r).toString(16).padStart(2, "0");
        const gh = parseInt(g).toString(16).padStart(2, "0");
        const bh = parseInt(b).toString(16).padStart(2, "0");
        const hex = `#${rh}${gh}${bh}`;
        document.getElementById("colorpicker").value = hex;
    }
});
