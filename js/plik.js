const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

//wysokosc, dlugosc canvasa
canvas.width = 1000;
canvas.height = 600;

const cw = canvas.width;
const ch = canvas.height;

//rozmiar pilki i położenie
const ballSize = 15;
let ballX = 200 + 50; //do zmiany
let ballY = 530;

//rozmiary paletek i położenie
const paddleHeight = 10;
const paddleWidth = 100;

let playerX = 200 //do zmiany
const playerY = 560;

//przeszkody
const blockHeight = 35;
const blockWidth = 35;

//predkosc pileczki
let ballSpeedX = -6; //1,2
let ballSpeedY = -6; //-1,2

//tablica przeszkod lvl I
let przeszkodaXY = [];

przeszkodaXY.push({
    x: 100,
    y: 60
});
przeszkodaXY.push({
    x: 140,
    y: 60
});
przeszkodaXY.push({
    x: 180,
    y: 60
});
przeszkodaXY.push({
    x: 180,
    y: 100
});
przeszkodaXY.push({
    x: 140,
    y: 100
});

//f rysujaca deske
function player() {
    ctx.fillStyle = '#7fff00';
    ctx.fillRect(playerX, playerY, paddleWidth, paddleHeight);
}
//f rysujaca plansze
function table() {
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, cw, ch);

    //rysuje bloczki do zbicia
    for (let i = 0; i < przeszkodaXY.length; i++) {
        //console.log(przeszkodaXY[i].x);
        ctx.fillStyle = "blue";
        ctx.fillRect(przeszkodaXY[i].x, przeszkodaXY[i].y, blockHeight, blockHeight);
    }
}

//f rysujaca piłkę
function ball() {
    ctx.fillStyle = '#fff';
    ctx.fillRect(ballX, ballY, ballSize, ballSize);
    //    ctx.arc(ballX, ballY, ballSize, 0, 2 * Math.PI);
    //    ctx.fill();

    ballX = ballX + ballSpeedX;
    ballY = ballY + ballSpeedY;

    //odbijanie piłki
    //od gora
    if (ballY <= 0) {
        ballSpeedY = -ballSpeedY;
        speedUp();
    }
    //od deski
    //    if (((ballY + ballSize >= playerY || ballY + ballSize >= playerY + paddleWidth) && ballX > playerX && ballX + ballSize <= playerX + paddleWidth)) {
    //
    //    }

    if (ballY + ballSize >= playerY && ballY + ballSize <= playerY + paddleWidth && ballX >= playerX - ballSize + 5 && ballX + ballSize <= playerX + paddleWidth + ballSize - 5) {
        if (ballY > playerY) {
            console.log('koniec');
            clearInterval(help);
        } else {
            console.log('tutaj');
            ballSpeedY = -ballSpeedY;
            speedUp();
        }
    }
    //lewo prawo
    if (ballX <= 0 || ballX + ballSize >= cw) {
        ballSpeedX = -ballSpeedX;
        speedUp();
    }
    //koniec gry
    if (ballY >= ch) {
        console.log('koniec');
        clearInterval(help);
    }
    //odbijanie przeszkody
    for (let i = 0; i < przeszkodaXY.length; i++) {
        //odbijanie góra/dół
        if (
            ballY <= przeszkodaXY[i].y + blockHeight &&
            ballY + ballSize >= przeszkodaXY[i].y &&
            ballX + ballSize >= przeszkodaXY[i].x &&
            ballX <= przeszkodaXY[i].x + blockWidth
        ) {
            //console.log('hey');
            ballSpeedY = -ballSpeedY;
            przeszkodaXY.splice(i, 1);
        }
        //odbijanie lewa/prawa
        //            if (
        //                ballX + ballSize >= przeszkodyX[j] &&
        //                ballX <= przeszkodyX[j] + blockWidth &&
        //                ballY <= przeszkodyY[i] &&
        //                ballY + ballSize >= przeszkodyY[i]
        //            ) {
        //                //console.log('hey2');
        //                ballSpeedY = -ballSpeedY;
        //            }
    }
}

//f przyspieszenie pilki
function speedUp() {
    //po X
    if (ballSpeedX > 0 && ballSpeedX < 16) {
        ballSpeedX += .1;
    } else if (ballSpeedX >= 0 && ballSpeedX < 16) {
        ballSpeedX -= .1;
    }
    //po Y
    if (ballSpeedY > 0 && ballSpeedY < 16) {
        ballSpeedY += .1;
    } else if (ballSpeedY >= 0 && ballSpeedY < 16) {
        ballSpeedY -= .1;
    }
}
//Ruch rakietki
leftCanvas = canvas.offsetLeft;
//console.log(leftCanvas);

function playerPosition(e) {
    playerX = e.clientX - leftCanvas - paddleWidth / 2;

    if (playerX >= cw - paddleWidth) {
        playerX = cw - paddleWidth;
    }

    if (playerX <= 0) {
        playerX = 0;
    }
}
canvas.addEventListener("mousemove", playerPosition)

//f zeby powtarzac rysowanie wszystkiego(ruch)
function game() {
    table();
    ball();
    player();

    if (przeszkodaXY.length == 0) {
        console.log('wygrales');
        clearInterval(help);
    }
}

let help = setInterval(game, 1000 / 60);
