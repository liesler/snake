let canvas = document.getElementById("snake"); //criar elemento que irá rodar o jogo
let context = canvas.getContext("2d"); //....
let box = 34;
let snake = []; //criar cobrinha como lista, já que ela vai ser uma série de coordenadas, que quando pintadas, criam os quadradinhos
snake[0] ={
    x: 8 * box,
    y: 8 * box
}
let direction = "right";
let food ={
    x: Math.floor(Math.random() * 9 + 1) * box,
    y: Math.floor(Math.random() * 9 + 1) * box
}
var score = 0;
var screen_snake;
var screen_menu;
var screen_setting;
var screen_gameover;
var button_newgame_menu;
var button_newgame_setting;
var button_newgame_gameover;
var button_setting_menu;
var button_setting_gameover;
var ele_score;
var speed_setting;
var snake_speed;

screen_menu = document.getElementById("menu");
screen_gameover = document.getElementById("gameover");
screen_setting = document.getElementById("setting");
screen_snake = document.getElementById("snake");

button_newgame_menu = document.getElementById("newgame_menu");
button_newgame_setting = document.getElementById("newgame_setting");
button_newgame_gameover = document.getElementById("newgame_gameover");
button_setting_menu = document.getElementById("setting_menu");
button_setting_gameover = document.getElementById("setting_gameover");

ele_score = document.getElementById("score_value");
speed_setting = document.getElementsByName("speed");
	
var jogo; 

var showScreen = function (screen_opt) {
	switch (screen_opt) {
	  case 0:
	    screen_snake.style.display = "block";
		screen_menu.style.display = "none";
		screen_setting.style.display = "none";
		screen_gameover.style.display = "none";
		break;

	  case 1:
	  screen_snake.style.display = "none";
		screen_menu.style.display = "block";
		screen_setting.style.display = "none";
		screen_gameover.style.display = "none";
		break;

	  case 2:
	  screen_snake.style.display = "none";
		screen_menu.style.display = "none";
		screen_setting.style.display = "block";
		screen_gameover.style.display = "none";
		break;

	  case 3:
	  screen_snake.style.display = "none";
		screen_menu.style.display = "none";
		screen_setting.style.display = "none";
		screen_gameover.style.display = "block";
		break;
	}
};
  
var altScore = function (score_val) {
    ele_score.innerHTML = String(score_val);
};
  
var setSnakeSpeed = function (speed_value) {
    snake_speed = speed_value;
};


  
function criarBG(){
    context.fillStyle = "lightgreen";
    context.fillRect(0, 0, 16*box, 16*box); //desenha o retângulo usando x e y e a largura e altura setadas
}

function criarCobrinha (){
    for(i = 0; i < snake.length; i++){
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

function drawFood (){
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}

//quando um evento acontece, detecta e chama uma função
document.addEventListener('keydown', update);

function update(event){
    if(event.keyCode == 37 && direction != 'right') direction = 'left';
    if(event.keyCode == 38 && direction != 'down') direction = 'up';
    if(event.keyCode == 39 && direction != 'left') direction = 'right';
    if(event.keyCode == 40 && direction != 'up') direction = 'down';
}

function iniciarJogo(){    
	showScreen(0);
    if(snake[0].x > 9*box && direction == "right") snake[0].x = 0;
    if(snake[0].x < 0 && direction == 'left') snake[0].x = 10 * box;
    if(snake[0].y > 9*box && direction == "down") snake[0].y = 0;
    if(snake[0].y < 0 && direction == 'up') snake[0].y = 10 * box;
    
    for(i = 1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
			snake = [];
			 snake[0] ={
				x: 8 * box,
				y: 8 * box
			}
			
             clearInterval(jogo);			 
             alert('Game Over :(');
			 altScore(0);
			 showScreen(3);
			 
			 break;
        }
		if(score > 10){
			snake = [];
			 snake[0] ={
				x: 8 * box,
				y: 8 * box
			}
			 clearInterval(jogo);
			 alert('Parabens voce terminou o jogo!!');
			  altScore(0);
			  showScreen(1);
		}
    }

    criarBG();
    criarCobrinha();
    drawFood();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if (direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;

    if(snakeX != food.x || snakeY != food.y){
        snake.pop(); //pop tira o último elemento da lista
		
    }else{
        food.x = Math.floor(Math.random() * 9 +1) * box;
        food.y = Math.floor(Math.random() * 9 +1) * box;
		score += 1;
		altScore(score);
		
    }
    
    let newHead ={
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead); //método unshift adiciona como primeiro quadradinho da cobrinha
		
}

	
	button_newgame_menu.onclick = function () {
       jogo = setInterval(iniciarJogo, snake_speed);
    };
	
    button_newgame_gameover.onclick = function () {
       jogo = setInterval(iniciarJogo, snake_speed);
    };
	
    button_newgame_setting.onclick = function () {
       jogo = setInterval(iniciarJogo, snake_speed);
    };
	
    button_setting_menu.onclick = function () {
      showScreen(2);
    };
	
    button_setting_gameover.onclick = function () {
      showScreen(2);
    };

    setSnakeSpeed(snake_speed);
   

    showScreen("menu");

    
	var checkded = false;
    for (var i = 0; i < speed_setting.length; i++) {
      speed_setting[i].addEventListener("click", function () {
		
        for (var i = 0; i < speed_setting.length; i++) {
          if (speed_setting[i].checked) {
            setSnakeSpeed(speed_setting[i].value);
			checkded = true;
          }
        }		
      });
    }
	
	if(!checkded){
		setSnakeSpeed(100);
		console.log('aqui');
	}
