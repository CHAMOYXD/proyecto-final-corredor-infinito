var road, yuan;
var roadImg, yuanImg;
var moneda, espada, tesoro;
var espadaG, monedaG, tesoroG;
var treasureCollection = 0;
var espadaImg, monedaImg, tesoroImg;

var PLAY = 1;
var END = 0;
var gameState = 1;

function preload (){
    roadImg = loadImage("Road.png");
    yuanImg = loadAnimation("yuan-1.png", "yuan-2.png");
    monedaImg = loadAnimation("moneda-1.png", "moneda-2.png");
    espada = loadAnimation("espada-1-png","espada-2.png");
    endImg = loadAnimation("gameOver.png");
}

function setup (){
    createCanvas(windowWidth,windowHeight);

    road = createSprite(width/2, 200);
    road.addImage(roadImg);
    road.velocityY = 4;

    yuan = createSprite(width/2,height-20,20,20);
    yuan.addAnimation("yuan-1.png", "yuan-2.png", yuanImg); 
    yuan.scale = 0.15;

    espadaG = new Group();
    monedaG = new Group();
    tesoroG = new Group();
}

function draw (){

    if(gameState === PLAY){
    background(0);
    yuan.x = World.mouseX;
    edges = createEdgeSprites();
    yuan.collide(edges); 
    if (road.y>height){
        road.y = height/2;
    }
    createMoneda();
    createTesoro();
    createEspada();

    if (monedaG.isTouching(yuan)){
        monedaG.destroyEach();
        treasureCollection = treasureCollection + 50;       
    
     } else if(tesoroG.isTouching(yuan)){
        tesoroG.destroyEach();
        treasureCollection = treasureCollection + 150;
     } else {
         if(espadaG.isTouching(yuan)){
         gameState = END;

         yuan.addAnimation("yuan-1.png", "yuan-2.png", yuanImg); 
          yuan.x = width/2;
          yuan.y = height/2;    
          yuan.scale = 0.6;

          monedaG.destroyEach();
          tesoroG.destroyEach();
          espadaG.destroyEach();

          monedaG.setVelocityYEach(0);
          tesoroG.setVelocityYEach(0);
         espadaG.setVelocityYEach(0);
      }
       }
    drawSprites();
     textSize(20);
     fill (255);
     text("Tesoro:"+treasureCollection,width-150,30);
  }  
}

function createMoneda(){
    if (World.frameCount % 320 ==0){
        var moneda = createSprite(Math.round(random(50,width-50),40,10,10));
        moneda.addImage(monedaImg);
        moneda.scale = 0.03;
        moneda.velocityY = 3;
        moneda.lifetime = 180;
        monedaG.add(moneda);
    }
}

function createTesoro(){
    if (World.frameCount % 320 ==0){
        var tesoro = createSprite(Math.round(random(50,width-50),40,10,10));
       tesoro .addImage(tesoroImg);
       tesoro.scale = 0.03;
       tesoro.velocityY = 3;
       tesoro.lifetime = 180;
        tesoroG.add(tesoro);
}
  }

  function createEspada(){
    if (World.frameCount % 320 ==0){
        var espada = createSprite(Math.round(random(50,width-50),40,10,10));
        espada .addImage(espadaImg);
        espada.scale = 0.03;
        espada.velocityY = 3;
        espada.lifetime = 180;
        espadaG.add(espada);
}
  }

