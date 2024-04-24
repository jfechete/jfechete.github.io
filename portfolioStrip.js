let UPDATE_TIME = 1000/30;
let MOVE_SPEED = 20;

let prevLoadFunc = window.onload;
let strips = null;
let width = 0;
let currentStripOffset = 0;

function updateStrips() {
    currentStripOffset += MOVE_SPEED/UPDATE_TIME;
    currentStripOffset = currentStripOffset%width;
    for (let i = 0; i < strips.length; i++) {
        strips[i].style.right = currentStripOffset + "px";
    }
}

window.onload = function() {
    if (prevLoadFunc != null) {
        prevLoadFunc();
    }
    strips = document.getElementsByClassName("portfolio-strip");
    width = strips[0].width;
    setInterval(updateStrips, UPDATE_TIME);
}
