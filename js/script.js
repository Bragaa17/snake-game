// Definição de variáveis
let canvas = document.getElementById("snake");
let image = document.getElementById("maca");
let image1 = document.getElementById("bg-grama");
let context = canvas.getContext("2d");
let button = document.getElementById("restart");
let box = 32; // Definindo o tamanho em px de um box
let hbox = 16; // Definindo o height do background
let wbox = 24; // Definindo a width do background
let snake = []; // criando o array da cobra
let direction = "right"; // Definindo a direção inicial da cobra no jogo
let food = { // Definindo a posição inicial da comida no jogo
    x: Math.round(Math.random()*(wbox-1))*box,
    y: Math.round(Math.random()*(hbox-1))*box
} 

snake[0] = { // Definindo a posição inicial da cobra no jogo
    x:(wbox/2-1)*box, 
    y:(hbox/2-1)*box
} 

// Função de desenho do background
function criarBG(){
    context.drawImage(image1, 0, 0, wbox*box, hbox*box);
}

// Função de desenho da cobra
function criarCobrinha(){
    for(i=0; i<snake.length; i++){
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

// Função de desenho da comida
function drawFood(){
    context.drawImage(image, food.x, food.y, box, box);
}

// Atribuindo o evento de teclar à função 'update'
document.addEventListener('keydown', update);

// Alterando a diração da cobra com a função 'update'
function update(event){
    if(event.keyCode == 37){
        if(snake.length>1){
            if(snake[0].x == snake[1].x) direction = "left";
        }else{
            if(direction != "right") direction = "left";
        }
    }
    if(event.keyCode == 38){
        if(snake.length>1){
            if(snake[0].y == snake[1].y) direction = "up";
        }else{
            if(direction != "down") direction = "up";
        }
    }
    if(event.keyCode == 39){
        if(snake.length>1){
            if(snake[0].x == snake[1].x) direction = "right";
        }else{
            if(direction != "left") direction = "right";
        }
    }
    if(event.keyCode == 40){
        if(snake.length>1){
            if(snake[0].y == snake[1].y) direction = "down";
        }else{
            if(direction != "up") direction = "down";
        }
    }
}

function iniciarJogo(){

    // Evitando que a comida apareça em lugares ocupados pelo corpo da cobra
    let a=0;
    let b=0;
    while(a==0){
        for(i=0;i<snake.length;i++){
            if(food.x==snake[i].x && food.y==snake[i].y){
                food.x = Math.round(Math.random()*(wbox-1))*box;
                food.y = Math.round(Math.random()*(hbox-1))*box;
            }else{
                b++;
            }
            if(b==snake.length){
                a=1;
            }
        }
    }

    // Desenhando o background e a comida
    criarBG();
    drawFood();
    
    // Definindo a posição inicial da cabeça da cobra
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // Determinando o caminho a ser seguido pela cabeça da cobra
    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if(direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;

    // Posicionando a cabeça da cobra conforme passo anterior
    let newHead = {x: snakeX, y: snakeY}

    // Empurrando a cordenada da cabeça da cobra para dentro do array 'snake'
    snake.unshift(newHead);
    
    // Evitando que a cobra "fuja" do espaço definido pelo canva
    if(snake[0].x > (wbox-1)*box) snake[0].x = 0;
    if(snake[0].x < 0) snake[0].x = (wbox-1)*box;
    if(snake[0].y > (hbox-1)*box) snake[0].y = 0;
    if(snake[0].y < 0) snake[0].y = (hbox-1)*box;

    // Fazendo com que a comida apareça novamente e fazendo a cobra crescer
    if(snakeX==food.x && snakeY==food.y){
        food.x = Math.round(Math.random()*(wbox-1))*box;
        food.y = Math.round(Math.random()*(hbox-1))*box;
    }else{
        snake.pop();
    }

    // Definindo o critério de end game
    for(i=1; i<snake.length;i++){
        if(snake[0].x==snake[i].x && snake[0].y==snake[i].y){
            clearInterval(jogo);
            alert("Game Over! :(\nSua pontuação foi de: " + snake.length + " maçãs!\nParabéns!");
            button.style.display = "unset";
        }
    }

    // Desenhando a cobra no canva
    criarCobrinha();
}

criarBG();

// Definindo a velocidade do jogo
function play(){
    button.style.display = "none";
    snake = [];
    snake[0] = { // Definindo a posição inicial da cobra no jogo
        x:(wbox/2-1)*box, 
        y:(hbox/2-1)*box
    } 
    direction = "right";
    jogo = setInterval(iniciarJogo, 100);
}