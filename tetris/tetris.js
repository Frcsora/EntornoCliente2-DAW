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
let siguientePieza = generarPieza();//se elige la siguiente pieza que va a salir
let avancePieza = 1;//El patron de inicializacion y posiciones que deben avanzar las piezas a cada iteracion
let horizontalPieza = parseInt(tablero[0].length / 2);//La posicion inicial de las piezas en el eje Y
function generarPieza(){
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

    dibujarTablero();
    dibujoPieza(avancePieza - siguientePieza.forma.length, horizontalPieza -(parseInt(siguientePieza.forma.length / 2)), siguientePieza);
    if(chequearColisiones(siguientePieza, avancePieza, horizontalPieza)){
        insertarPieza(siguientePieza, avancePieza - siguientePieza.forma.length, horizontalPieza)
        avancePieza = 0;
        siguientePieza = generarPieza();
    }
    avancePieza++;
    
}, 500)
function insertarPieza(pieza, x, y){
    for(let i = 0 ; i < pieza.forma.length ; i++){
        for(let j = 0 ; j < pieza.forma[i].length ; j++){
            if(pieza.forma[i][j] == 1){
                console.log("y: ", y, "j: ", j)
                tablero[x + i][y + j - 1] = 1;
            }
        }
    }
    //Problema con las L, la siguiente pieza se come todo menos la fila de abajo de la l
}
function dibujarTablero(){
    //reinicia el tablero poniendo todo lo que no sean fichas anteriormente ya caidas como espacios vacios, para permitir dibujar el siguiente intervalo sin que se acumule con el anterior
    for(i = 0 ; i < tablero.length ; i++){
        for(j = 0 ; j < tablero[i].length ; j++){
            if(tablero[i][j] != 1){
                lienzo.fillStyle = "black";
                lienzo.fillRect(j * tamañoCelda, i * tamañoCelda, tamañoCelda, tamañoCelda);
                tablero[i][j] = 0;
            } else{
                lienzo.fillStyle = "grey"
                lienzo.fillRect(j * tamañoCelda, i * tamañoCelda, tamañoCelda, tamañoCelda);
            }
            
        }
    }
    

}

function dibujoPieza(x, y, pieza){
    //dibuja la situacion en la presente iteracion del intervalo
    for(let i = pieza.forma.length - 1 ; i >= 0 ; i--){
        if(i < 0) continue;
        for(let j = 0 ; j < pieza.forma[i].length ; j++){
            if(pieza.forma[i][j] == 1){                
                lienzo.fillStyle = pieza.color;
                lienzo.fillRect((j + y) * tamañoCelda, (i + x)* tamañoCelda, tamañoCelda, tamañoCelda);
            }
        }
    }
}

function chequearColisiones(pieza, x, y){
    for(let i = 0 ; i < pieza.forma[0].length;i++){
        if(x >= filas || tablero[x][y + i] == 1) return true
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
