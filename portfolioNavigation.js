let loaded = false;

function updateArrows() {
    if (!loaded) {
        return;
    }
    let portfolio = document.getElementById("main-portfolio");
    let portfolioRect = portfolio.getBoundingClientRect();
    let floatPos = Math.abs(portfolioRect.top/portfolioRect.height);
    floatPos = Math.max(0, floatPos - 0.25);
    floatPos = floatPos * 2;
    let pxOffset = 10-20*floatPos;

    let leftArrow = document.getElementById("left-portfolio-arrow");
    let rightArrow = document.getElementById("right-portfolio-arrow");
    leftArrow.style.left = pxOffset - floatPos*leftArrow.offsetWidth + "px";
    rightArrow.style.right = pxOffset - floatPos*rightArrow.offsetWidth + "px";
}

const SPRING_FORCE = 0.2;
let videos = [];
let currentOffset = 0;
let desiredOffset = 0;

function updateVideos() {
    if (!loaded) {
        return;
    }

    let normalLeft = 10;
    if (screen.width <= screen.height) {
        normalLeft = 2.5;
    }
    currentOffset += SPRING_FORCE*(desiredOffset-currentOffset);
    for (let i = 0; i < videos.length; i++) {
        let vidPos = mod(i+currentOffset, videos.length);
        videos[i].style.left = (vidPos-1)*100 + normalLeft + "vw";
        videos[i].style.opacity = Math.max(0,
            -Math.abs(vidPos-1)+1
        );
    }
}

function nextVid() {
    desiredOffset -= 1;
    pauseVideos();
}

function prevVid() {
    desiredOffset += 1;
    pauseVideos();
}

function pauseVideos() {
    let videos = document.querySelectorAll(".portfolio-div>div>video");
    for (let i = 0; i < videos.length; i++) {
        if (!videos[i].paused) {
            videos[i].pause();
        }
    }
}

function mod(a,b) {
    return ((a%b)+b)%b;
}

setInterval(updateVideos, 1000/30);
let prevScroll = window.onscroll;
window.onscroll = function() {
    if (prevScroll != null) {
        prevScroll();
    }
    updateArrows();
}
let prevLoad = window.onload;
window.onload = function() {
    if (prevLoad != null) {
        prevLoad();
    }
    let loadingPrompts = document.getElementsByClassName("loading-display");
    for (let i = 0; i < loadingPrompts.length; i++) {
        loadingPrompts[i].remove();
    }
    videos = document.getElementsByClassName("portfolio-div");
    loaded = true;
    updateArrows();
}
