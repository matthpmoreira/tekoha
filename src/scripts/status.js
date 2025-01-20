const address = "mc.hypixel.net";
const api = "https://api.mcsrvstat.us/3/";

const textElement = document.querySelector("#status_text");
const iconElement = document.querySelector("#status_icon");
const iconImgElement = iconElement.querySelector("img");
const playersTextElement = document.querySelector("#players_text");
const playersGridElement = document.querySelector("#players_grid");

async function queryStatus() {
    disableUI();

    const data = await fetch(api + encodeURIComponent(address)).then(res => res.json());

    enableUI(data);
}

function disableUI() {
    iconElement.disabled = true;
    iconImgElement.src = "/assets/icons/connecting.webp";

    textElement.disabled = true;
    textElement.textContent = "Conectando...";

    playersTextElement.disabled = true;
    playersTextElement.textContent = "Conectando...";
    playersGridElement.style.display = "none";
}

function enableUI(data) {
    iconElement.disabled = false;
    iconImgElement.src = "/assets/icons/" + (data.online ? "success.png" : "failure.png");

    textElement.disabled = false;
    textElement.textContent = data.online ? "Aberto!" : "Fechado!";

    playersTextElement.textContent = data.players.online + " Jogadores";

    if ("list" in data.players) {
        playersTextElement.disabled = false;
        updatePlayerGrid(data.players.list.map(player => player.name));
    }
}

function updatePlayerGrid(playerNames) {
    for (const name of playerNames) {
        const skin = document.createElement("img");
        skin.classList.add("players_skin");
        skin.onerror = () => (skin.src = "/assets/players/default.png");
        skin.src = `/assets/players/${name}.png`;

        const nameDiv = document.createElement("div");
        nameDiv.classList.add("players_name");
        nameDiv.textContent = name;

        const entry = document.createElement("div");
        entry.classList.add("players_entry");
        entry.append(skin, nameDiv);

        playersGridElement.append(entry);
    }
}

function setButtons() {
    iconElement.addEventListener("click", () => queryStatus());
    textElement.addEventListener("click", () => queryStatus());
    playersTextElement.addEventListener("click", () => {
        playersGridElement.style.display = "";
        playersTextElement.disabled = true;
    });
}

queryStatus();
setButtons();
