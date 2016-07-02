
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
var tower={x:0,y:0};
var canvas = document.getElementById("game-canvas");
var ctx = canvas.getContext("2d");
var cursor={x:0,y:0};
$("#game-canvas").mousemove(function(event){
  cursor.x=event.offsetX;
  cursor.y=event.offsetY;
});

var isbuilding=false;

$("#game-canvas").click(function(event){
  isbuilding=false;
  if(event.offsetX>540 && event.offsetY>380){
    isbuilding=true;
  }else{
    if(isbuilding==true){
      tower.x=event.offsetX-event.offsetX%32;
      tower.y=event.offsetY-event.offsetY%32;
    }
    isbuilding=false
  }
})
function draw(){
  ctx.drawImage(bgImg,0,0);
  ctx.drawImage( heroImg, hero.x, hero.y);
  ctx.drawImage(btnImg,540 ,380,100,100 );
  if(isbuilding==true){
  ctx.drawImage(towerImg,cursor.x,cursor.y);
  }else{
   ctx.drawImage(towerImg,tower.x,tower.y);
  }
}

setInterval( draw, 40);

