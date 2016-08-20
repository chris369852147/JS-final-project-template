var FPS=60
var bgImg = document.createElement("img");
bgImg.src = "images/map.png";
var heroImg = document.createElement("img");
heroImg.src ="images/jason.gif";
var btnImg =document.createElement("img");
btnImg.src ="images/tower-btn.png";
var towerImg =document.createElement("img");
towerImg.src ="images/tower.png";
var enemypath=[
  {x:96,y:64},
  {x:384,y:64},
  {x:384,y:192},
  {x:224,y:192},
  {x:224,y:320},
  {x:544,y:320}
  ];
function iscollided(pointX,pointY,targetX,targetY,targetW,targetH){
  if(pointX>=targetX
  &&pointX<=targetX+targetW
  &&pointY>=targetY
  &&pointY<=targetY+targetH){
    return true;
  }else{
    return false;
  }
}

var hero=new Hero
function Hero(){
  this.x:96,
  this.y:448,
  this.speed:64,
  this.pathdes:0,
  this.direction:{x:0,y:-1},
  this.move:function(){
    if(iscollided(
      enemypath[this.pathdes].x,
      enemypath[this.pathdes].y,
      this.x,this.y,
      this.speed/FPS,
      this.speed/FPS)){
      this.x=enemypath[this.pathdes].x;
      this.y=enemypath[this.pathdes].y;
      this.pathdes++;
      if(enemypath[this.pathdes].x>this.x){
        this.direction={x:1,y:0};
      }else if(enemypath[this.pathdes].x<this.x){
        this.direction={x:-1,y:0};
      }else if(enemypath[this.pathdes].y>this.y){
        this.direction={x:0,y:1};
      }else if(enemypath[this.pathdes].y<this.y){
        this.direction={x:0,y:-1};
      }
    }else{
      this.x=this.x+this.speed*this.direction.x/FPS;
      this.y=this.y+this.speed*this.direction.y/FPS;
    }
  }
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
  if(event.offsetX>540 && event.offsetY>380){
    isbuilding=true;
  }else{
    if(isbuilding==true){
      tower.x=event.offsetX-event.offsetX%32;
      tower.y=event.offsetY-event.offsetY%32;
    }
    isbuilding=false;
  }
})
function draw(){
  ctx.drawImage(bgImg,0,0);
  hero.move();
  ctx.drawImage( heroImg, hero.x, hero.y);
  ctx.drawImage(btnImg,540 ,380,100,100 );
  if(isbuilding==true){
  ctx.drawImage(towerImg,cursor.x,cursor.y);
  }else{
   ctx.drawImage(towerImg,tower.x,tower.y);
  }
}

setInterval( draw, 1000/FPS);

