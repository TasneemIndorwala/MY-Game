var girl,girlImg;
var bg1 , invsprite ;
var ptImg1,ptImg2;
var inv1;
var coin1Img,coin2Img;
var platform,coin;
var spider,spiderImg;
var coinGrp,spiderGrp;
var score=0;
var gameover,gameoverImg,restart,restartimg;
var gameState="play";
var jumpS,dieS;


function preload(){
  girlImg= loadAnimation("Images/g1.png","Images/g2.png","Images/g4.png","Images/g3.png","Images/g4.png");
  bg=loadImage("Images/bg1.png");
ptImg1 =loadImage("Images/P2.png");
ptImg2= loadImage("Images/p1.png");
coin1Img=loadImage("Images/coin1.png");
coin2Img=loadImage("Images/coin2.png");
gameoverImg=loadImage("Images/gameOver.png");
restartimg=loadImage("Images/restart.png");
jumpS=loadSound("sounds/jump.mp3");
dieS=loadSound("sounds/die.mp3");
spiderImg = loadAnimation ("Images/s1.png","Images/s2.png","Images/s3.png ", "Images/s4.png","Images/s5.png","Images/s6.png ", "Images/s7.png","Images/s8.png");
}


function setup() {
  createCanvas(1600,800);
gameOver=createSprite(200,200);
restart=createSprite(200,230);
gameOver.addImage("Images/gameOver.png");
restart.addImage("Images/restart.png");
  bg1=createSprite(600,400,1200,800);
  bg1.scale=2.5;
  bg1.addImage(bg);
  bg1.velocityX = -4;
  
  invsprite= createSprite(800,700,1600,20);
 //invsprite.visible = false ; 
  inv1= createSprite(800,100,1600,20);

 //inv1.visible = false ; 
  coinGrp=createGroup();
  spiderGrp=createGroup();

 // p1= createSprite(800,470,20,20)
  //p1.addImage(ptImg2);
  //p2= createSprite(530,430,20,20)
  //p2.addImage(ptImg2);

  
  girl=createSprite(100, 620, 50, 50);
  girl.addAnimation("girl",girlImg);
  edges= createEdgeSprites();
  //p1.velocityY = -10;
//p2.velocityY = -15;
  }

function draw() {
  background(255,255,255);  

  if(gameState==="play"){
  if(bg1.x<500){
    bg1.x = bg1.width/2; 
  }

  console.log(girl.y);

//p1.bounceOff(inv1)
//p2.bounceOff(invsprite)
//p2.bounceOff(inv1)
//p1.bounceOff(invsprite)
  if(keyDown("space") && girl.y>=350){
    jumpS.play();
    girl.velocityY = -15 ; }
    girl.velocityY = girl.velocityY+0.6;
  girl.collide(invsprite);
  for(var i = 0 ; i<coinGrp.length;i++){
  if(girl.isTouching(coinGrp)){
    
    coinGrp.get(i).destroy();
    score=score+1;
  }
  }
  Spider();
  spawnPlatform();
  for(var i = 0 ; i<spiderGrp.length;i++){}
    if(girl.isTouching(spiderGrp)){
      dieS.play();
      spiderGrp.get(i).destroy();
  gameState="end";
    }
spawnCoin();
  

}
if(gameState==="end"){
girl.velocityY=0;
bg1.velocityX=0;
}
  drawSprites();
  textSize(20)
  text("Score: "+ score, 200,200);  
 
}

function spawnPlatform(){
  if(frameCount % 300 === 0){
  platform = createSprite(1800,Math.round(random(350,500)),20,20);
  platform.velocityX = -4;
  platform.scale=1;
  var rand = Math.round(random(1,2))
  switch(rand){
  case 1: platform.addImage(ptImg2);
  break
  case 2 : platform.addImage(ptImg2);
  break

}
platform.depth=girl.depth;
girl.depth=girl.depth+1;
}
if(frameCount % 200 === 0){
  coin= createSprite(1800,200,20,20);
  coin.y=platform.y-60;
  coin.velocityX = -4;
  coin.scale=0.5;

  var rand = Math.round(random(1,1))
  switch(rand){
    case 1: coin.addImage(coin2Img);
    break
   
  
  }
  coin.depth=girl.depth;
girl.depth=girl.depth+1;

coinGrp.add(coin);

}
}


  function Spider(){
    if(frameCount % 200 === 0 ){
spider=createSprite(1800,650,104,50);
    spider.velocityX= -4;
    spider.scale = 1;
    spider.addAnimation("spider",spiderImg);
    spiderGrp.add(spider);
    }
    
  }

  
  function reset(){
    gameState = PLAY;
    gameOver.visible = false;
    restart.visible = false;
    
    obstaclesGroup.destroyEach();
    cloudsGroup.destroyEach();
    
    trex.changeAnimation("running",trex_running);
  
    camera.position.x=300;
    
    score = 0;
    
  }
  