var helicopterIMG, helicopterSprite, packageSprite,packageIMG;
var packageBody,ground;
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
var hasDropped;
var lastPos;

function preload()
{
	helicopterIMG=loadImage("helicopter.png");
	packageIMG=loadImage("package.png");
}

function setup() {
	createCanvas(800, 700);
	rectMode(CENTER);
	
	hasDropped = false;

	packageSprite = createSprite(width/2, 80, 10,10);
	packageSprite.addImage(packageIMG);
	packageSprite.scale=0.2;

	helicopterSprite=createSprite(width/2, 200, 10,10);
	helicopterSprite.addImage(helicopterIMG);
	helicopterSprite.scale=0.6;

	groundSprite=createSprite(width/2, height-35, width,10);
	groundSprite.shapeColor=color(255);


	engine = Engine.create();
	world = engine.world;

	packageBody = Bodies.circle(width/2 , 200 , 5 , {restitution:0.6, isSleeping: true});
	World.add(world, packageBody);
	

	//Create a Ground
	ground = Bodies.rectangle(width/2, 650, width, 10 , {isStatic:true} );
 	World.add(world, ground);


	Engine.run(engine);
  
}


function draw() {
  rectMode(CENTER);
  background(0);

  if (!hasDropped) {
	// helicopterSprite.velocityX = packageBody.velocity.x;
	// helicopterSprite.velocityY = packageBody.velocity.y;
	helicopterSprite.x = packageBody.position.x;
	helicopterSprite.y = packageBody.position.y;
  } else {
	packageBody.velocity.x = 0;
	helicopterSprite.velocity = {
		x : 0,
		y : 0
	}
  }

  packageSprite.x = packageBody.position.x 
  packageSprite.y = packageBody.position.y 
  drawSprites();
  keyPressed();
}

function keyPressed() {
 	if (keyWentDown("E") && !hasDropped) {
		// Look at the hints in the document and understand how to make the package body fall only on
		hasDropped = true;
		Matter.Sleeping.set(packageBody, false);
		console.log("banana");
	}

	if (((keyDown(LEFT_ARROW) || keyDown("A")) && helicopterSprite.x >= 75) && !hasDropped) {
		Matter.Body.applyForce(packageBody, packageBody.position, {x : 0, y : 10});
	}
	else if (((keyDown(RIGHT_ARROW) || keyDown("D")) && helicopterSprite.x <= 725) && !hasDropped) {
		packageBody.velocity.x = 2;
	}
	else {
		packageBody.velocity.x = 0;
	}

	if (((keyDown(UP_ARROW) || keyDown("W")) && helicopterSprite.y >= 50) && !hasDropped) {
		packageBody.velocity.y = -2;
	}
	else if (((keyDown(DOWN_ARROW) || keyDown("S")) && helicopterSprite.y <= 600) && !hasDropped) {
		packageBody.velocity.y = 2;
	} 
	else {
		packageBody.velocity.y = 0;
	}
}



