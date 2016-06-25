
var bgImg = document.createElement("img");
bgImg.src = "images/map.png";
var sasukeImg = document.createElement("img");
sasukeImg.src ="http://vignette4.wikia.nocookie.net/vsbattles/images/d/d0/Sasuke_Weapons_Loaded_Render_By_Skodwarde.png/revision/latest?cb=20151203062503"
var sasuke={
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
