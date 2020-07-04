//Global Variables
var gameState,PLAY,END;
var monkey,banana,stone,ground,jungle,score,monkeyDie;
var count,monkeyAnimation,bananaImage,stoneImage,jungleImage,groundImage;
var bananaGroup,stoneGroup;
var die,jump,bite;
var gameOver,restart,gameOverImage,restartImage;

function preload(){
  monkeyAnimation=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananaImage=loadImage("Banana.png");
  stoneImage=loadImage("stone.png");
  jungleImage=loadImage("jungle.jpg");
  groundImage=loadImage("ground.jpg");
  die=loadSound("die.mp3");
  jump=loadSound("jump.mp3");
  bite=loadSound("bit.mp3.mp3");
  monkeyDie=loadImage("Monkey_08.png");
  gameOverImage=loadImage("gameOver.png");
  restartImage=loadImage("restart.png");
  
}


function setup() {
  createCanvas(600,300);
  

  
  
    jungle=createSprite(300,150,600,300);
  jungle.addImage("jungle",jungleImage);
  jungle.x=jungle.width/2;
  jungle.velocityX=-2;
  
      ground=createSprite(300,400,1000,10)
  //ground.visible=false;
  ground.addImage("ground",groundImage);
  ground.scale=0.2;
  
  monkey=createSprite(40,80,10,10);
  monkey.addAnimation("monkey",monkeyAnimation);
  monkey.scale=0.1;
 
  gameOver=createSprite(260,70,10,10);
  restart=createSprite(300,100,10,10);
  gameOver.addImage("game",gameOverImage);
  restart.addImage("restart",restartImage);
  gameOver.scale=0.5;
  restart.scale=0.5;
  gameOver.visible=false;
    restart.visible=false;
  
bananaGroup=new Group();
  stoneGroup=new Group();
score=0;
  count=0;
  PLAY=1;
  END=0;
gameState=PLAY;

}


function draw(){
 background(255); 
 
  
  if(jungle.x<100){
     jungle.x=jungle.width/2;
     }
  
if(bananaGroup.isTouching(monkey)){
score=score+2;
  bananaGroup.destroyEach();
  bite.play();
   }
      
  monkey.collide(ground);
  if(keyDown("space")){
monkey.velocityY=-10;
    jump.play();
     }
  monkey.velocityY=monkey.velocityY+0.8;

  if(gameState===PLAY){
  spawnFood();
  spawnStones();
    jungle.velocityX=-3;
      if(stoneGroup.isTouching(monkey)){
   monkey.scale=0.1; 
    count=count+1;
    die.play();
        stoneGroup.destroyEach();
      }
     }

  switch(score){
    case 10:
      monkey.scale=0.12;
      break;
        case 20:
      monkey.scale=0.14;
      break;
        case 30:
      monkey.scale=0.16;
      break;  case 40:
      monkey.scale=0.18;
      break;
        case 50:
      monkey.scale=0.2;
      break;
      default:break;
  }


   drawSprites();
  stroke("white")
  textSize(10)
  fill("white")
  text("SCORE:"+score,530,25);
  
   
    if(gameState===END){
     jungle.velocityX=0;
    bananaGroup.lifetime=-1;
    stoneGroup.lifetime=-1;
      bananaGroup.setVelocityEach=0;
      stoneGroup.setVelocityEach=0;
        gameOver.visible=true;
    restart.visible=true;
   //text("GAME OVER",200,25);
       
        monkey.addImage("monkey",monkeyDie);
      
      if(mousePressedOver(restart)){
      reset();
         }
     
     }
    if(count===2){
      gameState=END;
     
      }
}
  function spawnFood(){
  //creating bananas(food)
  if(World.frameCount%80===0){
      banana=createSprite(600,180,10,10);
  banana.addImage("banana",bananaImage);
  banana.scale=0.05;
  banana.velocityX=-4;
 
  banana.y=random(120,200);

  banana.lifetime=300;
  banana.depth=monkey.depth;
  monkey.depth=monkey.depth+1;
  bananaGroup.add (banana);
  }
  }
  
  function spawnStones(){
  //creating stones(obstacles)
  if(World.frameCount%300===0){
  stone=createSprite(600,265,10,10);
  stone.scale=0.15;
  stone.addImage("stone",stoneImage);
  stone.velocityX=-4;

  stone.lifetime=300;
  stone.depth=monkey.depth;
  monkey.depth=monkey.depth+1;
  stoneGroup.add (stone);

  }
}
function reset(){
  gameState = PLAY;
  
  gameOver.visible = false;
  restart.visible = false;
  
  bananaGroup.destroyEach();
  stoneGroup.destroyEach();
  
  monkey.addAnimation("trex",monkeyAnimation);
  
  score = 0;
  count=0;
}