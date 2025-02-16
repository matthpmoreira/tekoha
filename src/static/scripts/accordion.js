function setToggleListener(accordion) {
    const wrapper = accordion.querySelector(".accordion_bodyWrapper");
    const head = accordion.querySelector(".accordion_head");
    let isOpen = false;

    head.addEventListener("click", () => {
        accordion.classList.toggle("-toggled");
        isOpen = !isOpen;

        if (isOpen) {
            wrapper.style.height = wrapper.scrollHeight + "px";
        } else {
            wrapper.style.height = "0";
        }
    });
}

document.querySelectorAll(".accordion").forEach(setToggleListener);
