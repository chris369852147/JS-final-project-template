
var bgImg = document.createElement("img");
bgImg.src = "images/map.png";
var sasukeImg = document.createElement("img");
Img.src =""
var ={
  x: 0 ,
  y: 0
};
var canvas = document.getElementById("game-canvas");
var ctx = canvas.getContext("2d");

function draw(){
ctx.drawImage(bgImg,0,0);
ctx.drawImage( heroImg, hero.x, hero.y);
}

setInterval( draw, 40);
