const dino = document.querySelector('.dino');
const background = document.querySelector('.background');

let position = 0;
let isJumping = false;
let p = 0;

let handleKeyUp = (event) => {
    if(event.keyCode === 32){
        if(!isJumping){  
            jump();
        }  
    }
}
let jump = () => {
    isJumping = true;

    let upInterval = setInterval(() => {
        if(position >= 150){
            clearInterval(upInterval);

            let downInterval = setInterval(() => {
                if(position <= 0){
                    clearInterval(downInterval);
                    isJumping = false;
                } else {
                    position -= 20;
                    dino.style.bottom = position + 'px';
                }
            }, 30);
        } else {
            position += 20;
            dino.style.bottom = position + 'px';
        }
    }, 20);
}

let createCactus = () => {
    const cactus = document.createElement('div');
    let cactusPosition = 1000;
    let randomTime = Math.random() * 6000;

    cactus.classList.add('cactus');
    background.appendChild(cactus);
    cactus.style.left = cactusPosition + 'px';

    let leftInterval = setInterval(() => {
        if(cactusPosition < -60){
            clearInterval(leftInterval);
            background.removeChild(cactus);
        } else if(cactusPosition > 0 && cactusPosition < 60 && position < 60) {
            clearInterval(leftInterval);
            background.removeChild(cactus);
            gameOver();
            //document.body.innerHTML = '<h1 class="game-over"> Fim de jogo </h1>';
        } else {
            cactusPosition -= 10;
            cactus.style.left = cactusPosition + 'px';
        } 
    }, 20);

    setTimeout(createCactus, randomTime);
}

let pontuacao = () => {
    setInterval(() => {
        p++;
        document.getElementById("pont").innerHTML = p;
    }, 1000);
}

let gameOver = () => {
    alert('Sua pontuação foi: '+ p);
    play();
}

let play = () => {
    p = 0;
    alert('Iniciar jogo');
}

pontuacao();
createCactus();
document.addEventListener('keyup', handleKeyUp);

play();