// class Zombie {
//     constructor(x, y, speed) {
//         this.x = x; // Pozycja X
//         this.y = y; // Pozycja Y
//         this.speed = speed; // Prędkość ruchu
//         // this.size = Math.random() * 0.5 + 0.75; // Losowa skala (rozmiar zombie)
//         this.size = Math.random() * 0.3 + 0.5; // Losowa skala (rozmiar zombie)
//     }
//
//     // Rysowanie zombie
//     draw() {
//         const scaledWidth = zombieWidth * this.size;
//         const scaledHeight = zombieHeight * this.size;
//
//         ctx.drawImage(
//             zombieImage,
//             frameIndex * zombieWidth, // Pozycja X na sprite sheet
//             0, // Pozycja Y na sprite sheet
//             zombieWidth,
//             zombieHeight,
//             this.x,
//             this.y,
//             scaledWidth,
//             scaledHeight
//         );
//     }
//
//     // Aktualizacja pozycji zombie
//     update() {
//         this.x -= this.speed; // Zombie porusza się w lewo
//         if (this.x + zombieWidth * this.size < 0) {
//             // Jeśli zombie dotrze do lewej strony, tracimy życie
//             lives--;
//             this.reset();
//         }
//     }
//
//     // Resetowanie pozycji zombie po trafieniu lub opuszczeniu planszy
//     reset() {
//         this.x = canvas.width;
//         this.y = Math.random() * (canvas.height - zombieHeight);
//         this.speed = Math.random() * 1 + 1; // Nowa prędkość
//     }
// }

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let score = 0;
let lives = 3;
const zombies = [];


const zombieImage = new Image();
zombieImage.src = "walkingdead.png";
// ***********************************
zombieImage.onload = function() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    const imageWidth = zombieImage.width;
    const imageHeight = zombieImage.height;
    const numberOfPieces = 10;

    // Ustawienia canvas, aby pasował do rozmiaru obrazu
    canvas.width = imageWidth;
    canvas.height = imageHeight;

    // Szerokość każdego kawałka
    const pieceWidth = imageWidth / numberOfPieces;

    let currentPiece = 0;

    // Funkcja do rysowania kawałków obrazu
    function loadNextPiece() {
        if (currentPiece < numberOfPieces) {
            // Obliczamy pozycję na obrazie, którą będziemy rysować
            const xOffset = currentPiece * pieceWidth;

            // Rysowanie odpowiedniego kawałka obrazu na canvasie
            ctx.drawImage(zombieImage, xOffset, 0, pieceWidth, imageHeight, xOffset, 0, pieceWidth, imageHeight);

            // Przechodzimy do następnego kawałka
            currentPiece++;

            // Wywołanie rekurencyjne, aby ładować kawałki po kolei
            setTimeout(loadNextPiece, 100); // Czekaj 100ms przed załadowaniem kolejnego kawałka
        }
    }

    // Rozpoczęcie ładowania kawałków
    loadNextPiece();
};

// *********************************************
const zombieFrameWidth = 120; // szerokość pojedynczej klatki
const zombieFrameHeight = 120; // wysokość pojedynczej klatki

const gameOverPopup = document.getElementById("game-over-popup");
const restartButton = document.getElementById("restart-button");
const finalScore = document.getElementById("final-score");
const sadMusic = document.getElementById("sad-music");

function endGame() {
    sadMusic.play();
    finalScore.textContent = score;
    gameOverPopup.style.display = "block";
}

// Obsługa restartu gry
restartButton.addEventListener("click", () => {
    sadMusic.pause();
    sadMusic.currentTime = 0;
    score = 0;
    document.getElementById('score').innerText = '0';
    lives = 3;
    zombies.length = 0;
    updateLivesDisplay();
    gameOverPopup.style.display = "none";
    loop();
});

function updateLivesDisplay() {
    for (let i = 1; i <= 3; i++) {
        const heart = document.getElementById(`life${i}`);
        heart.src = i <= lives ? "full_heart.png" : "empty_heart.png";
    }
}

// Generowanie zombie
function spawnZombie() {
    const scale = Math.random() * 0.5 + 0.5; // Rozmiar zombie
    const speed = Math.random() * 2 + 1; // Prędkość
    const x = canvas.width;
    const y = Math.random() * (canvas.height - zombieFrameHeight * scale);
    zombies.push({ x, y, speed, scale, frame: 0 });
}

function drawZombies() {
    zombies.forEach((zombie, index) => {
        ctx.drawImage(
            zombieImage,
            zombie.frame * zombieFrameWidth,
            0,
            zombieFrameWidth,
            zombieFrameHeight,
            zombie.x,
            zombie.y,
            zombieFrameWidth * zombie.scale,
            zombieFrameHeight * zombie.scale
        );

        // Aktualizacja pozycji i klatek animacji
        zombie.x -= zombie.speed;
        zombie.frame = (zombie.frame + 1) % 10; // 10 klatek w animacji

        // Sprawdzanie, czy zombie dotarł do lewej strony
        if (zombie.x + zombieFrameWidth * zombie.scale < 0) {
            zombies.splice(index, 1);
            lives--;
            updateLivesDisplay();
            if (lives === 0) {
                endGame();
            }
        }
    });
}

const aimImage = new Image();
aimImage.src = "aim.png";

let cursorX = 0;
let cursorY = 0;

canvas.addEventListener("mousemove", (e) => {
    const rect = canvas.getBoundingClientRect();
    cursorX = e.clientX - rect.left;
    cursorY = e.clientY - rect.top;
});

function drawCursor() {
    const aimSize = 500; // Rozmiar kursora
    ctx.drawImage(aimImage, cursorX - aimSize / 2, cursorY - aimSize / 2, aimSize, aimSize);
}

canvas.addEventListener("click", (e) => {
    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    let hit = false;
    zombies.forEach((zombie, index) => {
        const zombieWidth = zombieFrameWidth * zombie.scale;
        const zombieHeight = zombieFrameHeight * zombie.scale;

        if (
            clickX > zombie.x &&
            clickX < zombie.x + zombieWidth &&
            clickY > zombie.y &&
            clickY < zombie.y + zombieHeight
        ) {
            hit = true;
            score += 20;
            zombies.splice(index, 1); // Usunięcie trafionego zombie
        }
    });

    if (!hit) {
        score -= 5;
    }

    document.getElementById("score").textContent = score;
});

function loop() {
    if (lives === 0) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawZombies();

    drawCursor();

    requestAnimationFrame(loop);
}



// Start gry
setInterval(spawnZombie, 1000); // Zombie co sekundę
loop();

