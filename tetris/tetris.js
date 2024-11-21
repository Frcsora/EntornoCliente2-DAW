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
    for(let j = 4 ; j < piezas[3].forma[1].length + 4; j++){
        if(piezas[3].forma[i][j - 4] == 1){
            lienzo.fillStyle = piezas[3].color;
            lienzo.fillRect(j * 30, i * 30, tamañoCelda, tamañoCelda);
        }
    }
}


console.log(lienzo.fillStyle == "red")
function inicializarTablero(){
    let array = [];
    for(let index = 0 ; index < columnas ; index++){
        let fila = [];
        for(let jindex = 0 ; jindex < filas ; jindex++){
            fila.push(0);
        }
        array.push(fila);
    }
    return array;
}
let tablero = inicializarTablero();
function dibujarTablero(){
    for(let i = 0 ; i < tablero.length ; i++){
        for(let j = 0 ; j < tablero[i].length ; j++){
            if(tablero[i][j] === 1){
                lienzo.fillStyle = "grey";
                lienzo.fillRect(j * tamañoCelda, i* tamañoCelda, tamañoCelda, tamañoCelda)
            }
        }
    }
}
