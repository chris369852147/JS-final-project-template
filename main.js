
var bgImg = document.createElement("img");
bgImg.src = "images/map.png";
var heroImg = document.createElement("img");
heroImg.src ="images/jason.gif"
var btnImg =document.createElement("img");
btnImg.src ="images/tower-btn.png"
var hero={
  x: 0 ,
  y: 0
};
var canvas = document.getElementById("game-canvas");
var ctx = canvas.getContext("2d");

function draw(){
  ctx.drawImage(bgImg,0,0);
  ctx.drawImage( heroImg, hero.x, hero.y);
  ctx.drawImage(btnImg,600 ,400 )
}

setInterval( draw, 40);
