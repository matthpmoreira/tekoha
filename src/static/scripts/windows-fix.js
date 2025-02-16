if (navigator.userAgent.match(/Windows/)) {
    for (const button of document.querySelectorAll(".menu_button:not(.-icon)")) {
        button.style.paddingTop = "0.9em";
        button.style.paddingBottom = "0.2em";
    }
}
