// -initial data-

let currentColor = 'black'; // é a cor selecionada

let screen = document.querySelector('#tela'); //selecionei o canvas

let ctx = screen.getContext('2d'); //peguei um conceito 2d da minha tela

let canDraw = false // posso desenhar ? não = false

let mouseX = 0; //posição do mouse na horizontal

let mouseY = 0; //posição do mouse na vertical

// - Events -

// vou até a class color area e seleciono todo mundo que tem a class "color"
document.querySelectorAll('.colorArea .color').forEach(item =>{ //seleciono todos os itens, percoro cada item e adciono um evento de clique


    item.addEventListener('click', colorClickEvent) //nesse"item" eu adciono o evento de click

})

//adicionar os eventos de movimentação do mouse

screen.addEventListener('mousedown',mouseDownEvent);
screen.addEventListener('mousemove',mouseMoveEvent);
screen.addEventListener('mouseup',mouseUpEvent);
document.querySelector('.clear').addEventListener('click', clearScreen); // evento de click para limpar a tel;

// - Function 

function colorClickEvent(e){

    let color = e.target.getAttribute("data-color") //toda vez que eu clicar  no data color eu vou pegar o atributo dele (blue, green e etc)
    currentColor = color //armazenei o resultado do evento de click nessa variável para saber qual a cor

    //vamos deixar o active (efeito do css) dinamico, de modo que ele apareça quando vc utiliza determinada cor

    document.querySelector('.color.active').classList.remove('active') //quem tiver com a class active eu removo

    e.target.classList.add('active') //adiciono em quem eu clicar a class active 

}

  /* Se algum dos .color tiver active, o meu eraser
  não está ativado/true, está desativado/false
  (função criada para ser executada a cada draw) */

/* PASSO A PASSO PARA DESENHAR NO CANVAS

- Quando o click do mouse abaixa, ative  o modo desenho (apertar botão mouse)
- Quando o mouse se mover, se o modo desenho estiver ativado, desenhe
- Quando o click do mouse Levantar, desative o modo desenho (soltar botão mouse)

*/

function mouseDownEvent(e){

    canDraw = true;

    //serve para pegar a posição atual do mouse
    mouseX = e.pageX  - screen.offsetLeft ; // e.pagX:vai pegar a posição horizontal que o mouse se econtra - sreen.offSetLeft (significa que vou pegar a distancia horizontal do elemento até o final da tela) =  e vai subtrair com a distancia
    mouseY = e.pageY - screen.offsetTop; // vai ser a mesma coisa só que da vertical

};

function mouseMoveEvent(e){

    if(canDraw){ //se eu posso desenhar, aparece a mensagem

        draw(e.pageX, e.pageY)

    }

};

function mouseUpEvent(){

    canDraw = false;

};

function draw(x,y){

    //peguei a posição
    let pointX = x - screen.offsetLeft;
    let pointY = y - screen.offsetTop;

    //fiz meu desenho = desenhei

    ctx.beginPath(); //iniciar processo de desenho
    ctx.lineWidth = 5; //largua da linha de 5
    ctx.lineJoin = 'round' //linha com bordas aredondadas
    ctx.moveTo(mouseX, mouseY); //mova para a posição inicial
    ctx.lineTo(pointX, pointY); // faça uma linha ate o pointx, point y
    ctx.closePath(); //fechar meu processo de desenha
    ctx.strokeStyle = currentColor; // cor que quero na minha linha
    ctx.stroke(); //finalizar o processo


    //salvei a posição nessa variável

    mouseX = pointX;
    mouseY = pointY


}

function clearScreen(){

    ctx.setTransform(1, 0, 0, 1, 0, 0) //zera o cursos e processo de desenho, contudo essa função ele não explicou ao certo pois demandaria maiores conhecimentos
    ctx.clearRect(0,0,ctx.canvas.width, ctx.canvas.height)
}

