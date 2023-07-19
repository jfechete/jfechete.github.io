let loaded = false;

function updateArrows() {
    if (!loaded) {
        return;
    }
    let portfolio = document.getElementById("main-portfolio");
    let portfolioRect = portfolio.getBoundingClientRect();
    let yDiff = Math.abs(portfolioRect.top/portfolioRect.height);
    let pxOffset = 10-20*yDiff;

    let leftArrow = document.getElementById("left-portfolio-arrow");
    let rightArrow = document.getElementById("right-portfolio-arrow");
    leftArrow.style.left = pxOffset - yDiff*leftArrow.offsetWidth + "px";
    rightArrow.style.right = pxOffset - yDiff*rightArrow.offsetWidth + "px";
}

const SPRING_FORCE = 0.2;
let videos = [];
let currentOffset = 0;
let desiredOffset = 0;

function updateVideos() {
    if (!loaded) {
        return;
    }

    currentOffset += SPRING_FORCE*(desiredOffset-currentOffset);
    for (let i = 0; i < videos.length; i++) {
        let vidPos = mod(i+currentOffset, videos.length);
        videos[i].style.left = (vidPos-1)*100 + 10 + "vw";
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
    let videos = document.getElementsByClassName("portfolio-vid");
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
window.onscroll = function() {
    updateArrows();
}
window.onload = function() {
    let loadingPrompts = document.getElementsByClassName("loading-display");
    for (let i = 0; i < loadingPrompts.length; i++) {
        loadingPrompts[i].remove();
    }
    videos = document.getElementsByClassName("portfolio-div");
    loaded = true;
    updateArrows();
}
