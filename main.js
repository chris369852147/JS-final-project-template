var clock=0;
var FPS=60;
var bgImg = document.createElement("img");
bgImg.src = "images/map.png";
var heroImg = document.createElement("img");
heroImg.src ="images/slime.gif";
var btnImg =document.createElement("img");
btnImg.src ="images/tower-btn.png";
var towerImg =document.createElement("img");
towerImg.src ="images/tower.png";
var crosshairImg=document.createElement("img");
crosshairImg.src="images/crosshair.png";
var treehp=10;
var score=0;
var money=10;

function Tower(){
  this.range=96;
  this.aimingHerold=null;
  this.searchHero=function (){
    this.launch-=1/FPS;
    for(var i=0;i<heros.length;i++){
      var d=Math.sqrt(Math.pow(this.x-heros[i].x,2)+Math.pow(this.y-heros[i].y,2));
      if(d<=this.range){
        this.aimingHerold=i;
        if(this.launch<=0){
          this.shoot(i);
          this.launch=this.fireperiod;
        }
        return;
      }
    }
    this.aimingHerold=null;
  };
  this.shoot=function (id){
    ctx.beginPath();
    ctx.moveTo(this.x+16,this.y);
    ctx.lineTo(heros[id].x+16,heros[id].y+16);
    ctx.strokeStyle='blue';
    ctx.lineWidth=3;
    ctx.stroke();
    heros[id].hp-=this.power;
  };
  this.fireperiod=0.5;
  this.launch=0.5;
  this.power=5;
}
var towers=[];

var enemypath=[
  {x:96,y:64},
  {x:384,y:64},
  {x:384,y:192},
  {x:224,y:192},
  {x:224,y:320},
  {x:544,y:320},
  {x:544,y:96}
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

function Hero(){
  this.hp=1;
  this.x=96;
  this.y=448;
  this.speed=64;
  this.pathdes=0;
  this.direction={x:0,y:-1};
  this.move=function(){
    if(iscollided(
      enemypath[this.pathdes].x,
      enemypath[this.pathdes].y,
      this.x,this.y,
      this.speed/FPS,
      this.speed/FPS)){
      this.x=enemypath[this.pathdes].x;
      this.y=enemypath[this.pathdes].y;
      this.pathdes++;
      if(this.pathdes>=enemypath.length){
        this.hp=0;
        treehp-=1
        return;
      }
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
}
var heros=[];

var canvas = document.getElementById("game-canvas");
var ctx = canvas.getContext("2d");
ctx.font="24px Arial";
ctx.fillStyle="white";
var cursor={x:0,y:0};
$("#game-canvas").mousemove(function(event){
  cursor.x=event.offsetX;
  cursor.y=event.offsetY;
});

var isbuilding=false;

$("#game-canvas").click(function(event){
  if(event.offsetX>540 && event.offsetY>380 && money>=10){
    isbuilding=true;
  }else{
    if(isbuilding==true){
      var tower=new Tower();
      tower.x=event.offsetX-event.offsetX%32;
      tower.y=event.offsetY-event.offsetY%32;
      towers.push(tower);
      money=money-10;
    }
    isbuilding=false;
  }
})
function draw(){
  if(clock%80==0){
    var hero=new Hero();
    heros.push(hero);
  }
  clock++;
  ctx.drawImage(bgImg,0,0);
  for(var i=0;i<heros.length;i++){
    if(heros[i].hp<=0){
      heros.splice(i,1);
      score++;
      money=money+2
    }else{
    heros[i].move();
    ctx.drawImage(heroImg,heros[i].x,heros[i].y);
     }
    }
  ctx.drawImage(btnImg,540 ,380,100,100 );
  
  if(isbuilding==true){
  ctx.drawImage(towerImg,cursor.x,cursor.y);
  }for(var i=0;i<towers.length;i++){
    towers[i].searchHero();
  if(tower.aimingHerold!=null){
    var id=towers[i].aimingHerold;
    ctx.drawImage(crosshairImg,heros[id].x,heros[id].y);
   ctx.drawImage(towerImg,towers[i].x,towers[i].y);
  }
  ctx.fillText("HP:"+treehp,32,32);
  ctx.fillText("Score:"+score,32,48);
  ctx.fillText("Money:"+money,32,64);
 }
} 

setInterval( draw, 1000/FPS);

