fixTextOnWindows(); // For pre-existing .widget elements
main();

async function main() {
    const address = "***REMOVED***";
    const response = await fetch("https://api.mcsrvstat.us/3/" + encodeURIComponent(address));
    const data = await response.json();
    const status = {
        icon: document.querySelector(".status_icon img"),
        text: document.querySelector(".status_text")
    };

    console.log(data);

    if (data.online) {
        status.text.textContent = "O servidor está aberto!";
        status.icon.src = "assets/icons/open-lock.png";
        setPlayerList(data.players);
    } else {
        statusText.textContent = "O servidor está fechado!";
    }
}

function setPlayerList({ list }) {
    const players = {
        element: document.querySelector(".players"),
        text: document.querySelector(".players_text"),
        grid: document.querySelector(".players_grid")
    };

    players.element.style.display = "flex";
    if (!list) return;
    players.text.textContent = "Jogadores online";

    for (const player of list)
        players.grid.append(generatePlayerEntry(player.name));
}

function generatePlayerEntry(name) {
    const skin = document.createElement("img");
    skin.classList.add("players_skin");
    skin.onerror = () => skin.src = "assets/players/default.png";
    skin.src = `assets/players/${name}.png`;

    const nameDiv = document.createElement("div");
    nameDiv.classList.add("players_name");
    nameDiv.textContent = name;

    const entry = document.createElement("div");
    entry.classList.add("players_entry", "widget", "-disabled");
    entry.append(skin, nameDiv);

    return entry;
}

// Windows renders text severe pixels above center, so this fixes it
// Looks normal on Android and Linux, unknown on iOS and macOS
function fixTextOnWindows() {
    if (!navigator.userAgent.match(/Windows/))
        return;

    for (const button of document.querySelectorAll(".widget:not(.-icon)")) {
        button.style.paddingTop = "0.7em";
        button.style.paddingBottom = "0";
    }
}
