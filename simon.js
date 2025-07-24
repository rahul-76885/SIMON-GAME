let gameseq = [];
let userseq = [];

let started = false;
let level = 0;
let btns = ["red", "blue", "orange", "purple"];

// Selection
let body = document.querySelector("body");
let h2 = document.querySelector("h2");

// Start game on keypress
body.addEventListener("keypress", function () {
    if (!started) {
        console.log("Game started");
        started = true;
        levelup();
    }
});

// Flash effect for buttons
function btnflash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}

// Level up: update level, flash a random button, push to game sequence
function levelup() {
    userseq = [];
    level++;
    h2.innerText = `Level ${level}`;
    h2.style.marginLeft = "50%";

    let randidx = Math.floor(Math.random() * btns.length);
    let randcolor = btns[randidx];
    let randbtn = document.querySelector(`.${randcolor}`);

    if (randbtn) {
        btnflash(randbtn);
    } else {
        console.error(`Button with class '${randcolor}' not found.`);
    }

    gameseq.push(randcolor);
}

// Check user input at every step
function check(idx) {
    if (userseq[idx] === gameseq[idx]) {
        if (userseq.length === gameseq.length) {
            // Go to next level after a short pause
            setTimeout(levelup, 1000);
        }
    } else {
        h2.innerHTML = `Game Over <b>Your level: ${level} </b> <br><br> Press any key to start.`;
        body.style.backgroundColor = "red";

        setTimeout(function () {
            body.style.backgroundColor = "wheat";
        }, 250);

        reset();
    }
}

// On button click
function btnpress() {
    let btn = this;
    btnflash(btn);
    let usercolor = btn.getAttribute("id");

    userseq.push(usercolor);
    console.log(userseq);
    check(userseq.length - 1);
}

// Add click listener to all color boxes
let allbtns = document.querySelectorAll(".box");
for (let btn of allbtns) {
    btn.addEventListener("click", btnpress);
}

// Proper reset function
function reset() {
    gameseq = [];
    userseq = [];
    started = false;
    level = 0;
}
