class Form {

  constructor() {
    this.input = createInput("Name");
    this.button = createButton('Play');
    this.greeting = createElement('h2');
    this.reset = createButton("Reset"); // C-40 SA
  }

  hide(){
    //console.log("I am Called");
    this.greeting.hide();
    this.button.hide();
    this.input.hide();
  }

  display(){
    var title = createElement('h2')
    title.html("Car Racing Game");
    title.position(displayWidth/2 - 50, 0);

    this.input.position(displayWidth/2 -40, displayHeight/2 -80); // C-38 TA
    this.button.position(displayWidth/2 + 30, displayHeight/2); // C-38 TA
    this.reset.position(displayWidth-100,40); //C-40 SA

    this.button.mousePressed(()=>{
      this.input.hide();
      this.button.hide();
      player.name = this.input.value();
      playerCount+=1;
      player.index = playerCount;
      player.update();
      player.updateCount(playerCount);
      this.greeting.html("Hello " + player.name)
      this.greeting.position(displayWidth/2 - 70, displayHeight/4); // C-38 TA
    });

    //C-40 SA
    this.reset.mousePressed(()=>{
      player.updateCount(0);
      game.update(0);
    });

  }
}
