class Game {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    //C-38 SA
    car1 = createSprite(100,200);
    car1.addImage(car1_Img); //C-39 SA

    car2 = createSprite(300,200);
    car2.addImage(car2_Img); //C-39 SA

    car3 = createSprite(500,200);
    car3.addImage(car3_Img); //C-39 SA

    car4 = createSprite(700,200);
    car4.addImage(car4_Img); //C-39 SA

    cars = [car1,car2,car3,car4];
  }

  play(){
    form.hide();
   // textSize(30);
   // text("Game Start", 120, 100)
   
   Player.getPlayerInfo();
   player.getCarsAtEnd(); // C-41

    if(allPlayers !== undefined){
     // C-39 SA
     background("#C68767");
     image(track,0,-displayHeight*4,displayWidth,displayHeight*5);

     //c-38 SA 
     var index = 0; //Index of the array

     // x and y position of the cars
     var x = 175; // C-39 SA
     var y;

      for(var plr in allPlayers){
        //add 1 to index for every loop
        index = index +1;
      //  console.log(index + " - " +player.index);
        //position cars a little away from each other in x direction
        x = x+200;

        //use data from database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;

        if(index === player.index) {
          //C-40 SA [Circle around current car]
          stroke(10);
          fill("red");
          ellipse(x,y,60,60);

          cars[index-1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y;
        }
      }
    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=50
      player.update();
    }

    //C-39 SA
    if(player.distance > 3860){
      gameState = 2;
      
      //C-41
      player.rank += 1;
 
      Player.updateCarsAtEnd(player.rank);

    }
    drawSprites(); //C-38 SA
  }

  //C-39 SA
  end(){
    console.log("Game Ended");
    console.log(player.rank);
  }
}
