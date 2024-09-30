/**
 * Primer documento js que se lee, contiene las variables globales y el funcionamiento de los botones
*/
let player = true;
let seleccionada = null;
const tipo = ["peon", "alfil", "reina", "rey", "torre", "caballo"]
let esPeon = false
let contador = 0
let turnoAnterior = document.getElementById("tablero").cloneNode(true)
let iniciado = false
const fechaInicio = new Date(Date.now())
const fechaInicioFormato = fechaInicio.toLocaleString()
const turnos = []
let turn = 0
let intervalo = ""
function name1(){
    let nombre1 = document.getElementById("name").value;

    let form1 = document.getElementById("form1");
    let nombres = document.getElementById("nombre1");

    form1.style.display = "none"
    nombres.style.display = "flex"
    document.getElementById("nombre1").textContent = nombre1; 
}
function name2(){
    let nombre2 = document.getElementById("name2").value;
    let form2 = document.getElementById("form2");
    let nombres = document.getElementById("nombre2");
    document.getElementById("nombre2").textContent = nombre2; 
    form2.style.display = "none"
    nombres.style.display = "flex"
}
function procesarNombres()
{
    event.preventDefault()
    name1();
    name2();
    document.getElementsByTagName("article")[0].style.display = "flex";
}
function acabar(){
    document.getElementById("casillaFinal").style.display = "none";//Esconde la ventana que anuncia el final
}
function newGame(){
    location.reload();//si le damos que si recarga la pagina
}
function empezar(){
    const boton = document.getElementById("boton")
    boton.click()//da click al boton enviar para que empiece la partida
}
function activarIA(){
    const boton2 = document.getElementById("ia")
    boton2.click()//da click al boton ia para que ejecute un turno el solo
}
function reiniciar(){
    setInterval  ( function(){
        const boton3 = document.getElementById("newGame")
        boton3.click()//si se utiliza, da click a si en cuanto aparece la ventana del final a los 4 segundos
    }, 4000)
}
function stop(){
    clearInterval(intervalo)
}
function crearTablero() {
    event.preventDefault()
    const tablero = document.getElementById("tablero");

    document.getElementById("form1").style.display = "none"
    for (let i = 0; i < 8; i++) {
        const fila = document.createElement("div");
        fila.id = "fila" + i;
        fila.className = "filas";
        tablero.appendChild(fila);
        fila.style.border = "none";
        for (let j = 0; j < 8; j++) {
            const columna = document.createElement("div");
            fila.appendChild(columna);
            columna.id = "casilla" + i + "" + j;
            columna.classList.add("casillas");
            if ((i + j) % 2 != 0) {
                columna.style.backgroundColor = "#430d06";
            }
            columna.style.display = "flex";
        }
    }
    colocarFichas();
    turnoAnterior = document.getElementById("tablero").cloneNode(true)
}

function colocarFichas() {
    for (let i = 0; i < 8; i++) {
        const color = (i == 0 || i == 1) ? "negra" : (i === 6 || i === 7) ? "blanca" : "";

        for (let j = 0; j < 8; j++) {
            const pieza = (i == 1 || i == 6) ? "peon" : (j == 0 || j == 7) ? "torre" : j == 1 || j == 6 ? "caballo" : j == 2 || j == 5 ? "alfil" : j == 3 ? "reina" : "rey"
            color !== "" ? crearPieza(pieza, color, i, j) : null;
        }
    }
}
/*function retroceder(){

    const main = document.getElementsByTagName("main")[0]
    main.removeChild(document.getElementById("tablero"))
    main.appendChild(turnoAnterior)
    if(iniciado){
        player = !player
    }
}*/
function crearPieza(pieza, color, i, j) {
    const imagen = document.createElement("img");
    const columna = document.getElementById("casilla" + i + "" + j);
    color[0] = color[0].toUpperCase();
    columna.appendChild(imagen);
    imagen.classList.add(pieza, color, "piezas");
    imagen.src = "img/" + pieza + color + ".png";
    imagen.alt = pieza + color;
}
