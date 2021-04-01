var dog, dog2
var database
var foodS, foodstock
var feedPet, addFood
var fedTime, lastFed
var foodObj, fedTime

function preload()
{
	dog= loadImage("dogImg.png")
  dog2= loadImage("dogImg1.png")

}

function setup() {
	createCanvas(900, 500);
  
  database = firebase.database();

  feedPet=createButton("Feed the pet");
  feedPet.position(700,95);
  feedPet.mousePressed(dogFeed);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  dogb = createSprite(250,400,10,10);
	dogb.addImage(dog)
  dogb.scale= 0.15;
  foodStock=database.ref('Food');
  foodStock.on("value", readStock);

  foodObj = new Food()
}


function draw() {  
  background(46, 139, 87)

  fill(255,255,254);
  textSize(15);
  
  database.ref('lastFed').on('value',function(data){
    fedTime = data.val();
  }) 

  if(fedTime>=12){
    text("Last Feed : "+ fedTime%12 +" PM",350,60);
  }else if(fedTime==0){
    text("Last Feed : "+ "12 AM" ,350,60);
  }else{
    text("Last Feed : "+ fedTime +" AM",350,60);
  }

  drawSprites();
  foodObj.display();
  
  textSize(15);
  fill("black");
  text("Score = "+ foodS, 50,100);
  
}
function readStock(data){
  foodS = data.val()
  foodObj.updateFoodStock(foodS);
}

function addFoods(){
  foodS= foodS+1
  database.ref('/').update({Food:foodS})
}

function dogFeed(){
  dogb.addImage(dog2);
  if(foodObj.getFoodStock()<=0){
    foodObj.updateFoodStock(foodObj.getFoodStock()*0)
  }else{
    foodObj.updateFoodStock(foodObj.getFoodStock()-1)
  }
  database.ref("/").update({
    Food:foodObj.getFoodStock(),
    lastFed: hour()
  })
}

