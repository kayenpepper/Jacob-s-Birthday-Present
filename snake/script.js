var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var width = canvas.width;
var height = canvas.height;
var scoreText = document.getElementById("scoreText");
var fps = 90;
let againButton = document.querySelector(".button");
var img = document.getElementById("img");
var pat = ctx.createPattern(img, "repeat");
let imgArray = ["TschoolidJacob.png", "TtooBigForRockingChair.png"];
var index = 0;

// set the canvas background to black
ctx.fillStyle = "yellowgreen";
ctx.fillRect(0, 0, width, height);
ctx.strokeStyle = "yellowgreen";
ctx.strokeRect(0, 0, width, height);
var size = 40; // size of green square

//change img src
// function patArray(){
//   patArray = [];
//   for(var i = 0; i < imgArray.length; i++){
//     pattern = {
//       name: `pat${i}`,
//       pat: createPat(i)
//     };
//      patArray[i] = pattern;
//   }
//   console.log(patArray);
// }
// function createPat(i){
//   img.src = imgArray[i];
//   ctx.createPattern(img, "repeat");
// }

// draw a green square on the canvas
// at position (x,y) with a width and height of size
function drawSquare(x, y) { 
  // change();
  ctx.rect(x*size, y*size, size, size);
  ctx.fillStyle = pat;
  ctx.fillRect(x * size, y * size, size, size);
  ctx.strokeStyle = "black";
  ctx.strokeRect(x * size, y * size, size, size);
}

function createFood() {
  // create the food in a random location
  food = {
    x: Math.round(Math.random() * (width - size) / size),
    y: Math.round(Math.random() * (height - size) / size),
  };
  drawSquare(food.x, food.y);
}

function createSnake() {
  var length = 5;
  snakeArray = [];

  // create a snake of length 5 squares
  for (var i = length - 1; i >= 0; i--) {
    // save the x and y positions for each square
    segment = {
      x: i,
      y: 0
    };
    snakeArray[length - 1 - i] = segment;
    drawSquare(segment.x, segment.y);
  }
}

var direction;

//play again button
againButton.addEventListener("click", function(e) {
  // img.src = "TtooBigForRockingChair.png";
  startGame();
});

// keyboard control for arrow keys
// make sure the snake does not go back on itself
document.addEventListener("keydown", function(e) {
  var key = e.which;
  //console.log(key)
  if (key == "65" && direction != "right") {
    direction = "left";
  } else if (key == "87" && direction != "down") {
    direction = "up";
  } else if (key == "68" && direction != "left") {
    direction = "right";
  } else if (key == "83" && direction != "up") {
    direction = "down";
  }
}, false);

function gameLoop() {

  // set the canvas background to black
  ctx.fillStyle = "yellowgreen";
  ctx.fillRect(0, 0, width, height);
  ctx.strokeStyle = "yellowgreen";
  ctx.strokeRect(0, 0, width, height);
  

  // get position of first segment of snake
  var nx = snakeArray[0].x;
  var ny = snakeArray[0].y;

  // get next position of snake based on direction
  // if direction is right, increase "x" position by 1.
  // if direction is left, decrease "x" position by 1.
  // if direction is down, increase "y" position by 1.
  // if direction is up, decrease "y" position by 1.
  if (direction == "right") {
    nx++;
  } else if (direction == "left") {
    nx--;
  } else if (direction == "up") {
    ny--;
  } else if (direction == "down") {
    ny++;
  }

  // failed (touching edge) ?
  if (nx == -1 || nx == width / size || ny == -1 ||
    ny == height / size) {
    // game over
    againButton.innerHTML = "Game Over";
    againButton.classList.toggle("is-link");
    againButton.classList.add("is-warning");
    ctx.fillStyle = "skyblue";
    ctx.fillRect(0, 0, width, height);
    ctx.strokeStyle = "skyblue";
    ctx.strokeRect(0, 0, width, height);
    // stop the game
    clearInterval(loopId);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
  }

  // ate food ?
  if (nx == food.x && ny == food.y) {
    // add a new segment (tail) to the snake
    var tail = {
      x: nx,
      y: ny
    };
    var startingPos = snakeArray.length - 1;

    // create food in a new location
    createFood();
    // change();

    // update score HUD
    length++;
    document.getElementById("scoreText").innerHTML = length;


    if (length > 19) {
      fps = 60
    }
  } else {
    // save last segment of snake (tail)
    var tail = snakeArray[snakeArray.length - 1];
    var startingPos = snakeArray.length - 2;
    tail.x = nx;
    tail.y = ny;
  }

  // move the rest of the segments one up and 
  // add the tail to the front of the snake to 
  // simulate movement in the direction
  for (var i = startingPos; i >= 0; i--) {
    snakeArray[i + 1] = snakeArray[i];
  }
  snakeArray[0] = tail;

  // draw snake
  for (var i = 0; i < snakeArray.length; i++) {
    var c = snakeArray[i];
    drawSquare(c.x, c.y);
  }

  // draw food
  drawSquare(food.x, food.y);

}

function startGame() {
  // create snake
  createSnake();

  // reset score
  length = 0
  document.getElementById("scoreText").innerHTML = 0;

  // create food
  createFood();

  // change button html
  againButton.innerHTML = "Play Again";
  againButton.classList.toggle("is-link");
  againButton.classList.toggle("is-warning");
  
  // set initial direction for the snake to move
  direction = "right";

  if (typeof loopId != "undefined") {
    clearInterval(loopId);
  }

  fps = 90

  // start the game loop
  loopId = setInterval(gameLoop, fps);

}
 // createPat();