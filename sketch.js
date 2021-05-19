var bird, birdImg;
var bg, bgImg;
var foodGroup , obstacleGroup;
var a,b,c, count;
var score;
var ground, topE, leftE;
var gameState =1;
var play;
var tempBg;
var ob1, ob2,ob3,ob4,ob5,f1,f2,f3,f4;
function preload(){

    bgImg = loadImage("bg.png")
    birdImg= loadAnimation("bird1.png","bird2.png")
    ob1= loadImage("ob1.png")
    ob2= loadImage("ob2.png")
    ob3= loadImage("ob3.png")
    ob4= loadImage("ob4.png")
    ob5= loadImage("ob5.png")
    f1=loadImage("f1.png")
    f2=loadImage("f2.png")
    f3=loadImage("f3.png")
    f4=loadImage("f4.png")


}

function setup(){

        createCanvas(600,500);

        bg = createSprite(300,250);
        bg.addImage(bgImg)
        bg.scale = 1.5;
       
        bird = createSprite(90,250,50,50);
        bird.scale = 0.4;
        bird.addAnimation("bird",birdImg);
        ground = createSprite(300,495,600,5);
        ground.visible = false;
       // ground.addImage()
        topE = createSprite(300,5,600,5);
        topE.visible = false;
        leftE = createSprite(2,250,2,500)
        leftE.visible = false;
        tempBg = createSprite(300,250,600,500);
        tempBg.shapeColor ="white";
        tempBg.visible=false;
        foodGroup = new Group();
        obstacleGroup = new Group();

        play = createSprite(300,300,100,50);
        play.visible = false;
        play.shapeColor ="black"
        a =0;
        b=0;
        c=0;
        count = 0;
        score = 0;
}


function draw(){

        background(240,177,119);

        if(gameState===0){
        bird.visible = false;
        play.visible = true;
        tempBg.visible=true

       if(keyDown("s")){
           gameState=1
           score=0
       }


        }else if(gameState===1){
            bird.visible = true;
            play.visible = false;
            tempBg.visible=false
            if(keyDown("space")){
                bird.velocityY = - 3;
            }
            bg.velocityX = -(3+(score/5))
            bird.velocityY = bird.velocityY +0.3;
            bird.collide(ground);
            bird.collide(topE);

        
        obstacles();
        food();

        if (bird.isTouching(foodGroup)){

            var x=foodGroup.get(a);
            if(bird.isTouching(x))
            {
                x.destroy();
                score = score+1;
            }
            else{
                a = a+1;
            }
            }
            if(leftE.isTouching(foodGroup)){
                var x = foodGroup.get(c)
                if (leftE.isTouching(c)){
                    c.destroy();
                    count+=1;
                }
                else{
                    c= c+1;
                }
            }
            
            if (bird.isTouching(obstacleGroup)){
                var x=obstacleGroup.get(b);
                if(bird.isTouching(x))
                {
                    x.destroy();
                    score = score-1;
                }
                else{
                    b = b+1;
                }
                }
                if(count===3 )  {
                    gameState=0;
                    obstacleGroup.setVelocityXEach(0)
                    foodGroup.setVelocityXEach(0)
                    obstacleGroup.destroyEach()
                    foodGroup.destroyEach()
        
        
                }
           
        }

         
        if(bg.x<0){
            bg.x = bg.width/2;
            }

        drawSprites();
        textSize(22);
        fill("white");
        text("score: "+score,480,40);

}


function obstacles(){
    if (frameCount%100===0){
        var ob=createSprite(610,440)
        var r=Math.round(random(1,5))
        ob.scale=0.3;
        switch(r){
            case 1:ob.addImage(ob1);break;
            case 2:ob.addImage(ob2);break;
            case 3:ob.addImage(ob3);break;
            case 4:ob.addImage(ob4);ob.scale = 0.7;break;
            case 5:ob.addImage(ob5);break;
            
        }
        ob.velocityX = -(3+(score/5));
        ob.lifetime = 600/3;
       
        obstacleGroup.add(ob);
    }
}
function food(){
    if (frameCount%80===0){
        var ob=createSprite(610,random(5,495),30,30)
        var r=Math.round(random(1,4))
        ob.scale = 0.2   
        switch(r){
            case 1:ob.addImage(f1);break;
            case 2:ob.addImage(f2);break;
            case 3:ob.addImage(f3);break;
            case 4:ob.addImage(f4);ob.scale = 0.7 ;break;

        }
        ob.velocityX = -(3+(score/5));
        ob.lifetime = 600/3;
         
        foodGroup.add(ob);
    }
}
