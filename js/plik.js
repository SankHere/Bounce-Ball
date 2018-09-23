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
let ballSpeedX = 1.2;
let ballSpeedY = -1.2;

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
    for (let i = 85; i <= 900; i = i + 50) {
        ctx.fillStyle = "blue";
        ctx.fillRect(i, 80, blockHeight, blockHeight);
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

}


//f zeby powtarzac rysowanie wszystkiego(ruch)
function game() {
    table();
    ball();
    player();
}

setInterval(game, 1000 / 60);
