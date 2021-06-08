
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var ground, groundImg;
var alienImg, alienImg2;
var bullet, bulletImg;
var spaceshipX;

var aliens, aliensGroup;
var replay, replayImg;
var gameover, gameoverImg

var life = 5;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){
	groundImg = loadImage("images/bg.png");
  alienImg = loadImage("images/alien.png");
  alienImg2 = loadImage("images/alien2.png");
  spaceshipImg = loadImage("images/spaceship.png");
  bulletImg = loadImage("images/bullet.png");
  gameoverImg = loadImage("images/gameover.png");
  replayImg = loadImage("images/replay.png");
}

function setup() {
	createCanvas(1000, 700);
    engine = Engine.create();
	world = engine.world;

	ground = createSprite(400, 400, 1200, 1000);
  ground.addImage(groundImg);
	ground.scale = 1.5
	ground.velocityY = 4;
    
  spaceship = createSprite(500, 600, 100, 100);
  spaceship.addImage(spaceshipImg);
  spaceship.scale = 0.08;
   
  gameover = createSprite(470, 250);
  gameover.addImage(gameoverImg);
  gameover.scale = 0.1

  replay = createSprite(470, 300);
  replay.addImage(replayImg);
  replay.scale = 0.1



	Engine.run(engine);

  aliensGroup = new Group();
  bulletsGroup = new Group();
  
}


function draw() {
  background(0);
  

  drawSprites();
  textSize(15);
  fill("white");
  text("Lifes: " + life, 100, 100);
  
  Engine.update(engine);
  
  if(gameState === PLAY){
    gameover.visible = false;
    replay.visible = false;
    if(ground.y>700){
	  ground.y = 400;
  }
    spaceship.velocityX = 0;

    if(keyDown(LEFT_ARROW)){
      spaceship.velocityX = -6;
    }

    if(keyDown(RIGHT_ARROW)){
      spaceship.velocityX = 6;
    }

    spawnAliens();
    spawnBullets();
    
    if(aliensGroup.y>700){
      life = life-1;
    }
    
    if(life === 0){
      gameover.visible = true;
      replay.visible = true;
      gameState = END;
    }
    /*if(aliensGroup.y>700){
      life = life-1;
      aliensGroup.destroyEach();
    }


    if(life === 0){
      gameState = END;
    }
    */
  }
    else if(gameState === END){
      ground.velocityY = 0;
      spaceship.velocityX = 0
      aliensGroup.setVelocityYEach(0);
      aliensGroup.destroyEach();
      aliensGroup.lifetimeEach(-1)
      
    }

}

function spawnAliens() {
  if(frameCount % 60 === 0) {
    aliens = createSprite(random(50, 950),0,50,50);
    aliens.addImage(alienImg);
    aliens.scale = 0.1 
    aliens.velocityY = 5;

    aliens.depth = gameover.depth;
    aliens.depth = aliens.depth - 1;

    aliens.depth = spaceship.depth;
    aliens.depth = aliens.depth - 1;
    aliensGroup.add(aliens);

    }
}

function spawnBullets(){
  if (keyWentDown(UP_ARROW)){
      bullet = createSprite(spaceship.x, spaceship.y);
      bullet.addImage(bulletImg);
      bullet.scale = 0.05;
      bullet.velocityY = -5
      bulletsGroup.add(bullet)
  }
}
