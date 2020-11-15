class Player {
  constructor(){
    this.index = null;
    this.distance = 0;
    this.name = null;
    this.rank; //C-41
  }

  getCount(){
    var playerCountRef = database.ref('playerCount');
    playerCountRef.on("value",(data)=>{
      playerCount = data.val();
    })
  }

  updateCount(count){
    database.ref('/').update({
      playerCount: count
    });
  }

  update(){
    var playerIndex = "players/player" + this.index;
    database.ref(playerIndex).set({
      name:this.name,
      distance:this.distance
    });
  }

  static getPlayerInfo(){
   
    var playerInfoRef = database.ref('players');
    playerInfoRef.on("value",(data)=>{
      allPlayers = data.val();
    })
   // console.log(allPlayers);
  }

  //C-41
  getCarsAtEnd(){
    database.ref('carsAtEnd').on("value",(data)=>{
      this.rank = data.val();
    })
  }

  //C-41
  static updateCarsAtEnd(rank){
    console.log("carsAtEnd :"+rank);
    if(rank !=undefined ||rank!=null){
      database.ref('/').update({
        carsAtEnd: rank
      });
    }
  }
}
