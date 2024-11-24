class Pieza{
    constructor(nombre, forma, probabilidad, color){
        this.nombre = nombre;
        this.forma = forma;
        this.probabilidad = probabilidad;
        this.color = color;
    }
    girarPieza() {
        let nuevaForma = [];
        for(let i = this.forma[0].length - 1 ; i >= 0 ; i--){
            let nuevaFila = [];
            for(let j = 0 ; j < this.forma.length ; j++){
                nuevaFila.push(this.forma[j][i]);
            }
            nuevaForma.push(nuevaFila);
        }
        
        this.forma = nuevaForma
    }
    desgirarPieza() {
        let nuevaForma = [];
        for(let i = 0 ; i < this.forma[0].length ;i++){
            let nuevaFila = [];
            for(let j = this.forma.length - 1 ; j >= 0 ; j--){
                nuevaFila.push(this.forma[j][i]);
            }
            nuevaForma.push(nuevaFila);
        }
        
        this.forma = nuevaForma
    }
    validarGiro(tablero, x, y){
        this.girarPieza();
        for(let i = 0 ; i < this.forma.length ; i++){
            for(let j = 0 ; j < this.forma[i].length ; j++){
                if(this.forma[i][j] === 1){
                    if(tablero[i + x + 1][j + y] === 1) {
                        this.desgirarPieza();
                        return false;
                    }
                }
            }
        }
        this.desgirarPieza();
        return true;
    }
}

const piezas = [
    new Pieza("C", [[1,1,1], [1,0,1]], 0.2, "red"),
    new Pieza("S", [[1,1], [1,1]], 0.2, "blue"),//s de square
    new Pieza("L", [[1,0], [1,0], [1,1]] , 0.1, "green"),
    new Pieza("-L", [[0,1],[0,1],[1,1]], 0.1, "lightcoral"),
    new Pieza("T", [[1,1,1], [0,1,0], [0,1,0]], 0.2, "yellow"),
    new Pieza("Z", [[1,1,0], [0,1,1]], 0.1, "purple"),
    new Pieza("-Z", [[0,1,1],[1,1,0]],0.1, "cyan")
]

const canvas = document.getElementById("tetris");//Lienzo donde se ejecutara el juego principal
const lienzo = canvas.getContext("2d");
const canvasSiguiente = document.getElementById("siguiente");//Lienzo donde mostraremos la siguiente pieza. 90 x 90 porque es lo maximo para mostrar las piezas
const lienzoSiguiente = canvasSiguiente.getContext("2d");
const filas = 20;//height canvas = 600, 20 filas /600 px = 30px por fila(tamañoCelda)
const columnas = 10;//width canvas = 300, 10 columnas / 300 px = 30px por columna(tamañoCelda)
const tamañoCelda = 30;//tamaño en pixeles de la pieza
let juego;
let tablero = inicializarTablero();//el tablero se inicializa con todo 0
const tableroSiguiente = [[0,0,0], [0,0,0], [0,0,0]];
let piezaActual = generarPieza();//se elige la siguiente pieza que va a salir
let siguientePieza = generarPieza();
siguientePieza.girarPieza()
siguientePieza.desgirarPieza()
let x = -1;//El patron de inicializacion y posiciones que deben avanzar las piezas a cada iteracion
let y = parseInt(tablero[0].length / 2);//La posicion inicial de las piezas en el eje Y
let puntuacion = 0;
let puntuacionDiv = document.getElementById("puntuacion");
puntuacionDiv.innerText = "Puntos: " + puntuacion;
lienzo.strokeStyle = "white";
lienzoSiguiente.strokeStyle = "white";
const botonPausa = document.getElementById("pausa");
let velocidad = 500;
const audio = document.getElementById("audio");
const botonAudio = document.getElementById("musica");
juego = setInterval(() => jugar(), velocidad);//Se inicializa el juego
let proximoCambio = 1000;
let musicaOn = true;
const imagenesMusica= [
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--!Font Awesome Free 6.7.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M301.1 34.8C312.6 40 320 51.4 320 64l0 384c0 12.6-7.4 24-18.9 29.2s-25 3.1-34.4-5.3L131.8 352 64 352c-35.3 0-64-28.7-64-64l0-64c0-35.3 28.7-64 64-64l67.8 0L266.7 40.1c9.4-8.4 22.9-10.4 34.4-5.3zM425 167l55 55 55-55c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-55 55 55 55c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-55-55-55 55c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l55-55-55-55c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0z"/></svg>',
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.7.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M499.1 6.3c8.1 6 12.9 15.6 12.9 25.7l0 72 0 264c0 44.2-43 80-96 80s-96-35.8-96-80s43-80 96-80c11.2 0 22 1.6 32 4.6L448 147 192 223.8 192 432c0 44.2-43 80-96 80s-96-35.8-96-80s43-80 96-80c11.2 0 22 1.6 32 4.6L128 200l0-72c0-14.1 9.3-26.6 22.8-30.7l320-96c9.7-2.9 20.2-1.1 28.3 5z"/></svg>'
];

dibujarSiguiente(siguientePieza);
dibujarTablero();

function mostrarInstrucciones(){
    if(botonPausa.innerText != "Reiniciar"){
        if(botonPausa.innerText == "Pausa"){
            clearInterval(juego);
            alert("Instrucciones:\nI: instrucciones\nP: pausar/reanudar/reiniciar\nM: parar/reanudar música\nW: rotar la pieza\nS: avance rápido\nA: mover a la izquierda\nD: mover a la derecha")
            juego = setInterval(() => jugar(), velocidad);
        }else{
            alert("Instrucciones:\nI: instrucciones\nP: pausar/reanudar/reiniciar\nM: parar/reanudar música\nW: rotar la pieza\nS: avance rápido\nA: mover a la izquierda\nD: mover a la derecha")            
        }
    }else{
        alert("Instrucciones:\nI: instrucciones\nP: pausar/reanudar/reiniciar\nM: parar/reanudar música\nW: rotar la pieza\nS: avance rápido\nA: mover a la izquierda\nD: mover a la derecha")
    }
    
}

function generarPieza(){
    //Elige cual sera la siguiente pieza que sale, tiene en cuenta la probabilidad de que salga cada pieza
    const resultado = Math.random()
    let sumatorio = 0;
    for(let i = 0 ; i < piezas.length ; i++){
        //pieza0: piezas[0].probabilidad(0.2) + 0 = 0.2
        //pieza1: piezas[1].probabilidad(0.2) + 0.2(lo acumulado de piezas anteriores) = 0.4
        //pieza2: piezas[2].probabilidad(0.1) + 0.4 = 0.5
        //pieza3: piezas[3].probabilidad(0.1) + 0.5 = 0.6
        //pieza4: piezas[4].probabilidad(0.2) + 0.6 = 0.8
        //pieza5: piezas[5].probabilidad(0.1) + 0.8 = 0.9
        //pieza6: piezas[6].probabilidad(0.1) + 0.9 = 1
        //Seguiria funcionando dando igual la cantidad de tipos de fichas posibles, siempre que ajustaramos la probabilidad para que sume 1
        if(resultado < piezas[i].probabilidad + sumatorio){
            return piezas[i];
        }
        sumatorio += piezas[i].probabilidad
    }
}
function dibujarSiguiente(pieza){
    limpiarSiguiente()
    for(let i = 0 ; i < pieza.forma.length ; i++){
        for(let j = 0 ; j < pieza.forma[0].length ; j++){
            if(pieza.forma[i][j] == 1){
                lienzoSiguiente.fillStyle = pieza.color;
                lienzoSiguiente.fillRect(j * tamañoCelda, i * tamañoCelda ,tamañoCelda, tamañoCelda)
                lienzoSiguiente.strokeRect(j * tamañoCelda, i * tamañoCelda ,tamañoCelda, tamañoCelda)
            }
        }
    }
}
function limpiarSiguiente(){
    for(let i = 0 ; i < tableroSiguiente.length ; i++){
        for(let j = 0 ; j < tableroSiguiente[i].length ; j++){
            lienzoSiguiente.fillStyle = "black";
            lienzoSiguiente.fillRect(j * tamañoCelda,i * tamañoCelda,tamañoCelda,tamañoCelda)
            lienzoSiguiente.strokeRect(j * tamañoCelda, i * tamañoCelda ,tamañoCelda, tamañoCelda)
        }
    }
}
function jugar(){
    dibujarTablero();
    actualizar();
}
function actualizar(){
    x++;

    if(finalizar(piezaActual, x, y)){
        botonPausa.innerText = "Reiniciar";
        puntuacionDiv.innerText = `Se acabó la partida!\n Conseguiste ${puntuacion} puntos!`;
        puntuacionDiv.style.backgroundColor = "yellow";
        puntuacionDiv.style.color = "black";
        tablero = tableroFinal();
        dibujarTablero()
        clearInterval(juego);
        return - 1; //De esta forma evito que se dibuje una nueva pieza en el momento en que termina la partida
    }
    if(y + piezaActual.forma[0].length > 19){
        y--;
    }
    dibujoPieza(piezaActual, x, y -(parseInt(piezaActual.forma.length / 2)));
    
    if(chequearColisiones(piezaActual, x, y - 1)){
        insertarPieza(piezaActual, x, y)
        x = - 1;
        piezaActual = siguientePieza;
        siguientePieza = generarPieza();
        dibujarSiguiente(siguientePieza)
        if(piezaActual.forma[0].length === 3 && y === 9) y--;
    }
    
    
}
function insertarPieza(pieza, x, y){
    for (let i = 0; i < pieza.forma.length; i++) {
        for (let j = 0; j < pieza.forma[i].length; j++) {

            if (pieza.forma[i][j] == 1) {
                tablero[x + i][y + j - 1] = 1;
            }
        }
    }
    eliminarLinea()
    
}
function eliminarLinea(){
    let lineasEliminadas = 0;
    for(let i = 0 ; i < tablero.length ; i++){
        for(let j = 0 ; j < tablero[i].length ; j++){
            if(tablero[i][j] != 1){
                break;
            }
            if(j >= tablero[i].length - 1){
                tablero.splice(i, 1)
                i--;
                lineasEliminadas++;
                nuevaFila = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                tablero.unshift(nuevaFila)
                
            }
        }
    }
    if(lineasEliminadas > 0){
        puntuacion += lineasEliminadas * 350;
        puntuacionDiv.innerText = "Puntos: " + puntuacion;
    }
    if(puntuacion >= proximoCambio){
        let diferencia = parseInt((puntuacion - proximoCambio) / 1000) + 1;
        while(diferencia > 0){
            velocidad -= 20;
            diferencia--;
        }
        proximoCambio += 1000;
        clearInterval(juego)
        juego = setInterval(() => jugar(), velocidad)
    }
}
function dibujarTablero(){
    //reinicia el tablero poniendo todo lo que no sean fichas anteriormente ya caidas como espacios vacios, para permitir dibujar el siguiente intervalo sin que se acumule con el anterior
    for(i = 0 ; i < tablero.length ; i++){
        for(j = 0 ; j < tablero[i].length ; j++){
            if(tablero[i][j] != 1){
                lienzo.fillStyle = "black";
                lienzo.fillRect(j * tamañoCelda, i * tamañoCelda, tamañoCelda, tamañoCelda);
                lienzo.strokeRect(j * tamañoCelda, i * tamañoCelda, tamañoCelda, tamañoCelda)
            } else{
                lienzo.fillStyle = "grey"
                lienzo.fillRect(j * tamañoCelda, i * tamañoCelda, tamañoCelda, tamañoCelda);
                lienzo.strokeRect(j * tamañoCelda, i * tamañoCelda, tamañoCelda, tamañoCelda    )
            }
            
        }
    }
}

function dibujoPieza(pieza, x, y){
    //dibuja la situacion en la presente iteracion del intervalo
    
    for(let i = pieza.forma.length - 1 ; i >= 0 ; i--){
        if(i < 0) continue;
        for(let j = 0 ; j < pieza.forma[i].length ; j++){
            if(pieza.forma[i][j] == 1){                
                lienzo.fillStyle = pieza.color;
                lienzo.fillRect((j + y) * tamañoCelda, (i + x) * tamañoCelda, tamañoCelda, tamañoCelda);
                lienzo.strokeRect((j + y) * tamañoCelda, (i + x)* tamañoCelda, tamañoCelda, tamañoCelda)
            }
        }
    }
}

function chequearColisiones(pieza, x, y){
    for(let i = 0 ; i < pieza.forma.length;i++){
       
        for(let j = 0 ; j < pieza.forma[i].length ; j++){
            try{
                if(pieza.forma[i][j] == 1){
                    if(tablero[x + i + 1] === undefined) throw new Error(); 
                
                    if(tablero[x + i + 1][y + j] == 1){
                        return true
                    }
                }
            }catch(error){
                return true
            }
            
        }
    }
    return false;
}
function chequearColisionesLaterales(pieza, x, y, lado){
    //La variable lado hace la función de bandera, en caso de ser true compruebo el lado de la derecha, en el caso contra la izquierda.
    //Por tanto lo voy a llamar como true a la hora de pulsar la "D" y como false a la hora de pulsar la "A"
    //Si no lo hacia tenia el problema de que queria comprobar ambos lados siempre, y al estar en un extremo no dejaba mover al otro
    for(let i = 0 ; i < pieza.forma.length;i++){
       
        for(let j = 0 ; j < pieza.forma[i].length ; j++){
            if(pieza.forma[i][j] == 1){
                    
                if(lado ? y  + j + 1 >= tablero[0].length : y + j - 1 < 0) return true; 
                
                if(lado ?tablero[x + i + 1][y + j + 1] == 1 : tablero[x + i + 1][y + j - 1] == 1){
                    return true
                }

            }
        }
    }
    return false;
}

function inicializarTablero(){
    //devuelve un array con las dimensiones que queremos lleno de 0's
    let array = [];
    for(let index = 0 ; index < filas ; index++){
        let fila = [];
        for(let jindex = 0 ; jindex < columnas ; jindex++){
            fila.push(0);
        }
        array.push(fila);
    }
    return array;
}

function finalizar(pieza, x, y){
    for(let i = 0 ; i < pieza.forma.length ; i++){
        for(let j = 0 ; j < pieza.forma[0].length ; j++){
            if(x == 0 && pieza.forma[i][j] == 1 && tablero[i + x][j + y] == 1){
                return true;
            }
        }
    }
    return false;
}
function pararMusica(){
    if(musicaOn){
        audio.pause();
        botonAudio.innerHTML = imagenesMusica[1];
        musicaOn = !musicaOn;
    }else{
        audio.play();
        botonAudio.innerHTML = imagenesMusica[0];
        musicaOn = !musicaOn;
    }
}
function tableroFinal(){
    let array = [];
    for(let i = 0 ; i < tablero.length ; i++){
        let fila = []
        for(let j = 0 ; j < tablero[0].length ; j++){
            fila.push(1);
        }
        array.push(fila);
    }
    return array;
}
function pausarReiniciar(){
    if(botonPausa.innerText == "Pausa"){
        botonPausa.innerText = "Reanudar";
        clearInterval(juego);
    }else if(botonPausa.innerText == "Reiniciar"){
        
        tablero = inicializarTablero();
        piezaActual = generarPieza();
        siguientePieza = generarPieza();
        x = -1;        
        y = parseInt(tablero[0].length / 2);
        puntuacion = 0;
        velocidad = 500;
        proximoCambio = 1000;
        juego = setInterval(() => jugar(), velocidad)
        botonPausa.innerText = "Pausa";
        puntuacionDiv.innerText = "Puntuación: " + puntuacion;
        puntuacionDiv.style.backgroundColor = "black";
        puntuacionDiv.style.color = "white";
    }else{
        botonPausa.innerText = "Pausa";
        juego = setInterval(() => jugar(), velocidad)
    }
}
document.addEventListener("keypress", (event) => {

    if(event.key == "i" || event.key == "I") mostrarInstrucciones();
    if(event.key == "m" || event.key == "M") pararMusica()
    if(event.key == "p" || event.key == "P") pausarReiniciar();
    if((event.key == "a" || event.key == "A") 
        &&!chequearColisionesLaterales(piezaActual, x, y - 1, false) && botonPausa.innerText == "Pausa"){
        y--;
    }
    if((event.key == "d" || event.key == "D") && !chequearColisionesLaterales(piezaActual, x, y -1, true) && botonPausa.innerText == "Pausa"){
        y++;
    }
    if((event.key == "s" || event.key == "S") && x < filas && botonPausa.innerText == "Pausa"){
        if(x >= 20) x = 19
        if(!chequearColisiones(piezaActual, x + 1, y - 1)){
            x++;    
        }        
    }
    if((event.key == "w" || event.key == "W" )&& botonPausa.innerText == "Pausa" &&
        piezaActual.validarGiro(tablero, x, y)){
        piezaActual.girarPieza();
        if(piezaActual.forma[0].length === 3 && y === 9) y--;
    }
})
botonAudio.addEventListener('click', () => pararMusica())
botonPausa.addEventListener('click', () => pausarReiniciar())
document.getElementById("instrucciones").addEventListener('click', () => mostrarInstrucciones());