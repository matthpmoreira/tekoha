const logo = document.querySelector("#logo");
const tooltip = document.querySelector("#tekoha-tooltip");

function moveTooltip(event) {
    const x = event.pageX;
    const y = event.pageY;

    tooltip.style.left = x + "px";
    tooltip.style.top = y + "px";
}

logo.addEventListener("mouseenter", () => {
    logo.addEventListener("mousemove", moveTooltip);
    tooltip.style.display = "block";
});

logo.addEventListener("mouseleave", () => {
    logo.removeEventListener("mousemove", moveTooltip);
    tooltip.style.display = "none";
});
