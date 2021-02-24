var balloon, database, position;

function preload() {
  bgImage = loadImage("images/Hot Air Balloon-01.png");
  balloonImage1 = loadAnimation("images/Hot Air Balloon-02.png");
  balloonImage2 = loadAnimation("images/Hot Air Balloon-02.png","images/Hot Air Balloon-02.png",
  "images/Hot Air Balloon-02.png","images/Hot Air Balloon-03.png","images/Hot Air Balloon-03.png",
  "images/Hot Air Balloon-03.png","images/Hot Air Balloon-04.png","images/Hot Air Balloon-04.png",
  "images/Hot Air Balloon-04.png");
}

function setup() {
  createCanvas(500,500);
  database = firebase.database();
  balloon = createSprite(250, 250, 50, 50);
  balloon.addAnimation("balloonImg", balloonImage1);
  balloon.scale = 0.3
  var balloonPosition = database.ref('balloon/position');
  balloonPosition.on("value", getBalloonPosition, showError);
}

function draw() {
  background(bgImage);
  fill("black");
  text("*Use the arrow keys to move the air balloon!", 10, 20);

  if (position !== undefined) {
    if (keyDown(UP_ARROW)) {
      updatePosition(0, -10);
      balloon.addAnimation("hotAirBalloon",balloonImage2);
      balloon.scale = balloon.scale - 0.01;
    }
    
    if (keyDown(DOWN_ARROW)) {
      updatePosition(0, 10);
      balloon.addAnimation("hotAirBalloon",balloonImage2);
      balloon.scale = balloon.scale + 0.01;
    }
    
    if (keyDown(RIGHT_ARROW)) {
      updatePosition(10, 0);
      balloon.addAnimation("hotAirBalloon",balloonImage2);
    }
    
    if (keyDown(LEFT_ARROW)) {
      updatePosition(-10, 0);
      balloon.addAnimation("hotAirBalloon",balloonImage2);
    }
  }

  drawSprites();
}

function updatePosition(x,y) {
  database.ref('balloon/position').set({
    'x': position.x+x,
    'y': position.y+y
  });
}

function getBalloonPosition(data) {
  position = data.val();
  balloon.x = position.x;
  balloon.y = position.y;
}

function showError() {
  console.log("Error in writing to the database");
}