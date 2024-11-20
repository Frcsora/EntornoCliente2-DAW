class Pieza{
    constructor(nombre, forma, color){
        this.nombre = nombre;
        this.forma = forma;
        this.probabilidad = 0.2;
        this.color = color;
    }
}
const piezas = [
    new Pieza("C", [[1,1,1], [1,0,1]], "red"),
    new Pieza("S", [[1,1], [1,1]], "blue"),//s de square
    new Pieza("L", [[1,0], [1,0],[1,0],[1,1]], "green"),
    new Pieza("T", [[1,1,1], [0,1,0],[0,1,0]], "yellow"),
    new Pieza("Z", [[1,1,0], [0,1,1]], "purple")
]
const canvas = document.getElementById("tetris");
const lienzo = canvas.getContext("2d");

const filas = 20;
const columnas = 10;
const tamañoCelda = 30;

for(let i = 0 ; i < piezas[3].forma.length ; i++){
    for(let j = 0 ; j < piezas[3].forma[1].length ; j++){
        if(piezas[3].forma[i][j] == 1){
            lienzo.fillStyle = piezas[3].color;
            lienzo.fillRect(i * 30, j * 30, tamañoCelda, tamañoCelda);
        }
    }
}



function inicializarTablero(){
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
let tablero = inicializarTablero();
