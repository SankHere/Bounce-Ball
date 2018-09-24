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
const playerY = 550;

//przeszkody
const blockHeight = 35;
const blockWidth = 35;

//predkosc pileczki
let ballSpeedX = -2.7; //1,2
let ballSpeedY = -3.7; //-1,2

//tablica przeszkod lvl I
const przeszkodyX = [85, 135, 185, 235, 285, 335, 385, 435, 485, 535, 585, 635, 685, 735, 785, 835, 885];
const przeszkodyY = [70, 120, 170];

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
    for (let i = 0; i < przeszkodyY.length; i++) {
        for (let j = 0; j < przeszkodyX.length; j++) {
            ctx.fillStyle = "blue";
            ctx.fillRect(przeszkodyX[j], przeszkodyY[i], blockHeight, blockHeight);
        }
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
    if (ballY <= 0 || ballY + ballSize >= ch) {
        ballSpeedY = -ballSpeedY;
    }

    if (ballX <= 0 || ballX + ballSize >= cw) {
        ballSpeedX = -ballSpeedX;
    }

    //odbijanie przeszkody
    for (let i = 0; i < przeszkodyY.length; i++) {
        for (let j = 0; j < przeszkodyX.length; j++) {

            if (
                ballY <= przeszkodyY[i] + blockHeight &&
                ballY + ballSize >= przeszkodyY[i] &&
                ballX + ballSize >= przeszkodyX[j] &&
                ballX <= przeszkodyX[j] + blockWidth
            ) {

                //console.log('hey');
                ballSpeedY = -ballSpeedY;
            }

            if (
                ballX + ballSize >= przeszkodyX[j] &&
                ballX <= przeszkodyX[j] + blockWidth &&
                ballY <= przeszkodyY[i] &&
                ballY + ballSize >= przeszkodyY[i]
            ) {
                //console.log('hey2');
                ballSpeedX = -ballSpeedX;
            }
        }
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
}

setInterval(game, 1000 / 60);
