var zenistu,zenistu_ani,zenistu_attack,restart,restartImage,background, edges, ground,groundImage;
var jij= false
var muzan0Image,muzan1Image,muzan2Image,muzan3Image,muzan4Image,muzan5Image,textuBlood
var wait= 0
var blood= []
var glicinea = []
var glicinea1Image, glicinea2Image, textuGlicinea
var speed= 2
var bulspeed= -3
var fr
var ani_cooldown= 0 
var bloodDrop,glicineaDrop, temp
var gamestage= "play"
var a= 1
var b= 0
var Lifes= 3
var score= 0
function preload() {
  zenistu_ani = loadAnimation("./zenitsu/1.png","./zenitsu/2.png","./zenitsu/3.png")
  zenistu_attack = loadAnimation("./zenitsu/4.png","./zenitsu/5.png","./zenitsu/5.1.png")
  muzan0Image= loadImage("./muzan/0.png")
  muzan1Image= loadImage("./muzan/1.png")
  muzan2Image= loadImage("./muzan/2.png")
  muzan3Image= loadImage("./muzan/3.png")
  muzan4Image= loadImage("./muzan/4.png")
  muzan5Image= loadImage("./muzan/5.png")
  glicinea1Image= loadImage("glicinea1.png")
  glicinea2Image= loadImage("glicinea2.png")
  backgroundi = loadImage("background.png")
  groundImage = loadImage("ground2.png")
  restartImage= loadImage("restart_button.png")
  temp= createSprite(300,800,600,1)
}

function setup() {
  createCanvas(600, 800);
  zenistu = createSprite(50, 700, 20, 50);
  background = createSprite(300,400,50,50)
  zenistu.addAnimation("idle",zenistu_ani);
  zenistu.addAnimation("attack",zenistu_attack)
  background.addAnimation("background", backgroundi);
  zenistu.scale = 1.5
  background.scale=1
  restart=createSprite(300,400)
  restart.addImage("restart",restartImage)
  restart.visible=false
  bloodDrop= createGroup()
  glicineaDrop= createGroup()
  zenistu.setCollider("circle",0,0,90)
  fr= 80
}

function draw() { 
  if(fr>=20){fr= 80-score}
  else(fr=10)
if(zenistu.x<30){
  zenistu.x=30
}
if(zenistu.x>570){
  zenistu.x=570
}
background.depth= 0
if(frameCount % fr ===0 &&jij==false){
  blood=createSprite(random(70,530),-50,20,20)
  blood.lifetime= 500
  bloodDrop.add(blood)
  bloodDrop.setVelocityYEach(random(20,30))
  textuBlood=Math.round(random(1,6))
  switch(textuBlood){
    case 1: blood.addImage(muzan0Image)
    break
    case 2: blood.addImage(muzan1Image)
    break
    case 3: blood.addImage(muzan2Image)
    break
    case 4: blood.addImage(muzan3Image)
    break
    case 5: blood.addImage(muzan4Image)
    break
    case 6: blood.addImage(muzan5Image)
    break
    default:
    break
  }
  blood.scale= 1.5
    }
if(frameCount % Math.round(random(400,600)) ===0 &&jij==false){
  glicinea=createSprite(random(70,530),-50,20,20)
  glicinea.lifetime= 500
  glicineaDrop.add(glicinea)
  glicineaDrop.setVelocityYEach(random(20,30))
  textuGlicinea=Math.round(random(1,2))
  glicinea.scale= 2
  switch(textuGlicinea){
    case 1: glicinea.addImage(glicinea1Image)
    break
    case 2: glicinea.addImage(glicinea2Image)
    break
    default:
    break
  }
    }

if(gamestage=="play"){
  zenistu.visible=true
}
temp.isTouching(bloodDrop,menosvida)
temp.isTouching(glicineaDrop,maisvida)
if(Lifes==0){
  gamestage="end"
}
if(gamestage=="end"){
     restart.visible=true
     bloodDrop.destroyEach()   
    zenistu.visible=false
    jij=true 
}
if(gamestage=="end",mousePressedOver(restart)){
restart.visible=false
Lifes=3
gamestage="play"
jij=false
score=0
}
if(ani_cooldown>=0){
  ani_cooldown-=1
}
if(ani_cooldown<=1){
  zenistu.changeAnimation("idle")
  zenistu.x=mouseX
}
zenistu.isTouching(bloodDrop,protect)
zenistu.isTouching(glicineaDrop,stun)
textSize(30)

drawSprites();
if(score>=100){
  bloodDrop.destroyEach()
  textSize(30)
  text("Você Ganhou",200,200)
}
text("Score:"+score,460,770)
text("Lifes:"+Lifes,10,770)
}
function protect(zenistu,sprite){
  sprite.remove()
  ani_cooldown= Math.round(random(10,20))
  zenistu.changeAnimation("attack")
  score+=1

}
function stun(zenistu,sprite){
  sprite.remove()
  ani_cooldown= 60
  zenistu.changeAnimation("attack")
}
function menosvida(temp,sprite){
 sprite.remove()
  Lifes-=1
}
function maisvida(temp,sprite){
  sprite.remove()
   Lifes+=1
 }