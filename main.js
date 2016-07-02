
var bgImg = document.createElement("img");
bgImg.src = "images/map.png";
var heroImg = document.createElement("img");
heroImg.src ="images/jason.gif";
var btnImg =document.createElement("img");
btnImg.src ="images/tower-btn.png";
var towerImg =document.createElement("img");
towerImg.src ="images/tower.png";
var hero={
  x: 0 ,
  y: 0
};
var canvas = document.getElementById("game-canvas");
var ctx = canvas.getContext("2d");
var cursor={x:offsetX,y:offsetY};
$("#game-canvas").mousemove(function(event){
  console.log("x:"+event.offsetX+"y:"+event.offsetY);
});
function draw(){
  ctx.drawImage(bgImg,0,0);
  ctx.drawImage( heroImg, hero.x, hero.y);
  ctx.drawImage(btnImg,540 ,380,100,100 );
  ctx.drawImage(towerImg,cursor.x,cursor.y);
}

setInterval( draw, 40);
