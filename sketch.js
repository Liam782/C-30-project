const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var box1;
var backgroundImg,platform;
var bird, slingshot;

var gameState = "onSling";
var bg = "sprites/bg1.png";
//var score = 0;

function preload() {
    getBackgroundImg();
}

function setup(){
    var canvas = createCanvas(1200,400);
    engine = Engine.create();
    world = engine.world;


    ground = new Ground(200,height,800,20);
    ground2 = new Ground(900, 300, 300, 20);

    box1 = new Box(800,120,70,70);
    box2 = new Box(870, 120,70,70);
    box3 = new Box(940,120,70,70);
    box4 = new Box(1010, 120,70,70);

    box5 = new Box(835,50,70,70);
    box6 = new Box(905,50,70,70);
    box7 = new Box(975, 50,70,70);

    box8 = new Box(870,0,70,70);
    box9 = new Box(940,0,70,70);

    box10 = new Box(905,-50,70,70);

    bird = new Bird(200,50);

    platform = new Ground(150, 305, 300, 170);
    slingshot = new SlingShot(bird.body,{x:200, y:50});   
}

function draw(){
    if(backgroundImg)
        background(backgroundImg);
    
        noStroke();
        textSize(35)
        fill("white")
        //text("Score  " + score, width-300, 50)
    
    Engine.update(engine);
    //strokeWeight(4);
    box1.display();
    box2.display();
    box3.display();
    box4.display();

    box5.display();
    box6.display();
    box7.display();

    box8.display();
    box9.display();

    box10.display();

    ground.display();
    ground2.display();

    bird.display();

    platform.display();
    slingshot.display();    

}

function keyPressed(){
    if(keyCode === 32){
        slingshot.attach(bird.body);
        gamestate = "onSling";
    }
}

function mouseDragged(){
    if (gameState === "onSling"){
        Matter.Body.setPosition(bird.body, {x: mouseX , y: mouseY});
    }
}


function mouseReleased(){
    slingshot.fly();
    gameState = "launched";
}

async function getBackgroundImg(){
    var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
    var responseJSON = await response.json();

    var datetime = responseJSON.datetime;
    var hour = datetime.slice(11,13);
    
    if(hour>=06 && hour<=19){
        bg = "sprites/bg1.png";
    }
    else{
        bg = "sprites/bg2.jpg";
    }

    backgroundImg = loadImage(bg);
    //console.log(backgroundImg);
}
