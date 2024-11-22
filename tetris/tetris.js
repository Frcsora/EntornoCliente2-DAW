class Pieza{
    constructor(nombre, forma, probabilidad, color){
        this.nombre = nombre;
        this.forma = forma;
        this.probabilidad = probabilidad;
        this.color = color;
    }
}
const piezas = [
    new Pieza("C", [[1,1,1], [1,0,1]], 0.2, "red"),
    new Pieza("S", [[1,1], [1,1]], 0.3, "blue"),//s de square
    new Pieza("L", [[1,0], [1,0], [1,1]] , 0.1, "green"),
    new Pieza("T", [[1,1,1], [0,1,0], [0,1,0]], 0.2, "yellow"),
    new Pieza("Z", [[1,1,0], [0,1,1]], 0.2, "purple")
]
const canvas = document.getElementById("tetris");
const lienzo = canvas.getContext("2d");

const filas = 20;//height canvas = 600, 20 filas /600 px = 30px por fila(tamañoCelda)
const columnas = 10;//width canvas = 300, 10 columnas / 300 px = 30px por columna(tamañoCelda)
const tamañoCelda = 30;//tamaño en pixeles de la pieza

/*
    El tablero se compone de:
    0: vacio
    1: ocupado por una pieza ya caida
    2: ocupado por la pieza que esta cayendo
*/
let tablero = inicializarTablero();//el tablero se inicializa con todo 0
let siguientePieza = nuevaPieza();//se elige la siguiente pieza que va a salir
let avancePieza = 1;//El patron de inicializacion y posiciones que deben avanzar las piezas a cada iteracion
let horizontalPieza = parseInt(tablero[0].length / 2);//La posicion inicial de las piezas en el eje Y
function nuevaPieza(){
    //Elige cual sera la siguiente pieza que sale, tiene en cuenta la probabilidad de que salga cada pieza
    const resultado = Math.random()
    let sumatorio = 0;
    for(let i = 0 ; i < piezas.length ; i++){
        //pieza0: piezas[0].probabilidad(0.2) + 0 = 0.2
        //pieza1: piezas[1].probabilidad(0.3) + 0.2(lo acumulado de piezas anteriores) = 0.5
        //pieza2: piezas[2].probabilidad(0.1) + 0.5 = 0.6
        //pieza3: piezas[3].probabilidad(0.2) + 0.6 = 0.8
        //pieza4: piezas[4].probabilidad(0.2) + 0.8 = 1
        //Seguiria funcionando dando igual la cantidad de tipos de fichas posibles, siempre que ajustaramos la probabilidad para que sume 1
        if(resultado < piezas[i].probabilidad + sumatorio){
            return piezas[i];
        }
        sumatorio += piezas[i].probabilidad
    }
}


setInterval(() =>{
    //Todo el turno de caida de una pieza
    console.log(tablero)
    tablero = limpiarTablero(tablero);
    tablero = dibujoPieza(tablero, avancePieza - siguientePieza.forma.length, horizontalPieza -(parseInt(siguientePieza.forma.length / 2)), siguientePieza);
    avancePieza++;
    if(avancePieza > tablero.length) {
        avancePieza = 1;
        siguientePieza = nuevaPieza();
    }
}, 500)
function limpiarTablero(tablero){
    //reinicia el tablero poniendo todo lo que no sean fichas anteriormente ya caidas como espacios vacios, para permitir dibujar el siguiente intervalo sin que se acumule con el anterior
    for(i = 0 ; i < tablero.length ; i++){
        for(j = 0 ; j < tablero[i].length ; j++){
            if(tablero[i][j] != 1) tablero[i][j] = 0;
            lienzo.fillStyle = "black";
            lienzo.fillRect(j * tamañoCelda, i * tamañoCelda, tamañoCelda, tamañoCelda);
        }
    }
    return tablero;
}
function dibujoPieza(tablero, inicioV, inicioH, pieza){
    //dibuja la situacion en la presente iteracion del intervalo
    for(let i = pieza.forma.length - 1 ; i >= 0 ; i--){
        if(i < 0) continue;
        for(let j = 0 ; j < pieza.forma[i].length ; j++){
            if(pieza.forma[i][j] == 1){
                /*if(i + inicioV >= 0){
                    console.log("i: ", i + inicioV, "\nj: ", j + inicioH)
                    tablero[i + inicioV][j + inicioH] = 2;   
                }*/
                
                lienzo.fillStyle = pieza.color;
                lienzo.fillRect((j + inicioH) * tamañoCelda, (i + inicioV)* tamañoCelda, tamañoCelda, tamañoCelda);
            }
        }
    }
    return tablero;
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

