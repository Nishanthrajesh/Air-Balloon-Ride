var bgImg;
var Balloon,BalloonAni;
var database,positions;

function preload()
{
  BalloonAni=loadAnimation("hotairballoon1.png","hotairballoon2.png","hotairballoon3.png");
  bgImg=loadImage("cityImage.png");
}

function setup() 
{
  createCanvas(1350,600);

  database=firebase.database();

  Balloon = createSprite(400, 200, 50, 50);
  Balloon.addAnimation("ground",BalloonAni);
  Balloon.scale=0.5;

  var Balloonpositionref = database.ref('Balloon/height');
  Balloonpositionref.on("value",showError)
}

function draw() 
{
  background(bgImg);

  if(keyDown(LEFT_ARROW))
  {
    Balloon.x = Balloon.x-10;
  }
else if(keyDown(RIGHT_ARROW))
{
    Balloon.x = Balloon.x+10;
}
else if(keyDown(UP_ARROW))
{
  Balloon.addAnimation("ground",BalloonAni);
  Balloon.scale=Balloon.scale-0.01;
  Balloon.y = Balloon.y-10;
}
else if(keyDown(DOWN_ARROW))
{
    Balloon.addAnimation("ground",BalloonAni);
    Balloon.scale=Balloon.scale+0.01;
    Balloon.y = Balloon.y + 10;
}
  drawSprites();
}

function updateHeight(x,y)
{
database.ref('Ballon/height').set(
  {
  'x' : height.x + x ,
  'y' : height.y + y
  })
}

function readHeight(data)
{
  height = data.val();
  Balloon.x = height.x
  Balloon.y = height.y
}

function showError()
{
 console.log("Error in writing to the database");
}