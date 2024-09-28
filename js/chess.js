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
function llamarIA(){
    //intervalo = setInterval(ia, 1)
    ia()
}
function generarObjeto(fechaFinalFormato){
    const partida = {
        fecha: fechaInicioFormato,
        fechaFinal: fechaFinalFormato,
        listaTurnos: turnos,
        ganador: empate() ? "Tablas" : player ? "negra" : "blanca"  
    }
    return partida
}
function generarTurno(casillaOrigen, casillaDestino){
    let [x,y] = tomarCoordenadas(casillaOrigen)
    let [a,b] = tomarCoordenadas(casillaDestino)
    const letras =['a','b','c','d','e','f','g','h' ]
    const piece = buscarTipo(casillaOrigen)
    const piezaMap = {
        "peon": 'p',
        "alfil": 'a',
        "reina": 'r',
        "rey": 'R',
        "torre": 't',
        "caballo": 'c'
    }
    x = letras[x]
    a = letras[a]
    const turno = {
        tablero: dibujotablero(),
        numero: turn,
        movimiento: piezaMap[piece] + " " + x + "" + y + " " + a + "" + b
    }
    turnos.push(turno);
}
function dibujotablero(){
    const tablero = []
    for(let i = 0 ; i < 8 ; i++){
        const fila = []
        for(let j = 0 ; j < 8 ; j++){
            const casilla = document.getElementById("casilla" + i + "" + j)
            let valor = ""
            let pieza = ""
            let color = ""
            if(!casilla.hasChildNodes()){
                valor = null;
            }else{
                pieza = buscarTipo(casilla)
                color = casilla.firstChild.classList.contains("blanca") ? "blanca" : "negra"
                valor = pieza + "_" + color
            }
            fila.push(valor)
        }
        tablero.push(fila)
    }
    return tablero
}

function retroceder(){

    const main = document.getElementsByTagName("main")[0]
    main.removeChild(document.getElementById("tablero"))
    main.appendChild(turnoAnterior)
    if(iniciado){
        player = !player
    }
}
function cuantasQuedan(){
    let cuenta = 0
    for(let i = 0 ; i < 8 ; i++){
        for(let j = 0 ; j < 8 ; j++){
            const casilla = document.getElementById("casilla" + i + "" + j)
            if(casilla.hasChildNodes() && casilla.firstChild.classList.contains(player ? "blanca" : "negra")){
                cuenta++
            }
        }
    }
    return cuenta;
}
function esFinalCamino(casillaOrigen, casillaDestino){
    const [a,b] = tomarCoordenadas(casillaDestino)

    if(buscarTipo(casillaOrigen) === "peon" && ((player && a == 0) || (!player && a == 7))){
        return true
    }   
    return false
}
function peonBecomesQueen(casillaOrigen, casillaDestino){

    const [a,b] = tomarCoordenadas(casillaDestino)
    mover(casillaOrigen, casillaDestino)
    casillaDestino.removeChild(casillaDestino.firstChild)
    crearPieza("reina", player ? "blanca" : "negra", a, b)
}
function empate(){
    if(contador >= 25){
        return true
    }
    return !jaque()
}

function enroque(rey, torre){
    const [x,y] = tomarCoordenadas(rey)    
    const [a,b] = tomarCoordenadas(torre)

    let cambioRey = y < b ? 2 : -3
    let cambioTorre = y < b ? -2 : 2
    let casilla1 = document.getElementById("casilla" + x + "" + (b + cambioTorre))
    let casilla2 = document.getElementById("casilla" + x + "" + (y + cambioRey))
        
    mover(rey, casilla2)
    mover(torre, casilla1)
}
function buscarTipo(casilla){
    if (casilla === null) return ""
    for(let i = 0 ; i < tipo.length ; i++){
        if(casilla.hasChildNodes() && casilla.firstChild.classList.contains(tipo[i])){ return tipo[i] }
    }
    return ""  
}
function crearTablero() {
    const boa = document.getElementById("tablero");
    for (let i = 0; i < 8; i++) {
        const fila = document.createElement("div");
        fila.id = "fila" + i;
        fila.className = "filas";
        boa.appendChild(fila);
        fila.style.border = "none";
        for (let j = 0; j < 8; j++) {
            const columna = document.createElement("div");
            fila.appendChild(columna);
            columna.id = "casilla" + i + "" + j;
            columna.classList.add("columns");
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

function crearPieza(pieza, color, i, j) {
    const imagen = document.createElement("img");
    const columna = document.getElementById("casilla" + i + "" + j);
    color[0] = color[0].toUpperCase();
    columna.appendChild(imagen);
    imagen.classList.add(pieza, color, "piezas");
    imagen.src = "img/" + pieza + color + ".png";
    imagen.alt = pieza + color;
}

function tomarCoordenadas(clickedElement) {
    const coords = clickedElement.id.slice(7);
    const x = parseInt(coords.charAt(0));
    const y = parseInt(coords.charAt(1));
    return [x, y];
}

function moverPieza() {
    
    document.addEventListener('click', function (event) {
        let clickedElement = event.target;

        if (clickedElement.parentNode.classList.contains('columns')) {
            clickedElement = clickedElement.parentNode;
        }
        if(clickedElement.classList.contains('columns')){
            if (clickedElement.hasChildNodes() && clickedElement.firstChild.classList.contains(player ? "blanca" : "negra")) {

                if (seleccionada === null) {
    
                    clickedElement.classList.add("active");
                    seleccionada = clickedElement;
                    
                } else if(seleccionada !== null     
                    && (seleccionada.hasChildNodes() && seleccionada.firstChild.classList.contains("rey")) 
                    && (clickedElement.hasChildNodes() && clickedElement.firstChild.classList.contains("torre"))
                    && validarEnroque(seleccionada, clickedElement)){
                        turn++
                        turnoAnterior = document.getElementById("tablero").cloneNode(true)
                        generarTurno(seleccionada, clickedElement)
                        enroque(seleccionada, clickedElement)
                       
                        if(cuantasQuedan() <= 1){
                            contador++
                        }
                        player = !player
                        seleccionada = null
                        if(!player){
                            llamarIA()  
                        }
                }else if (seleccionada !== null) {
                    seleccionada.classList.remove("active")
                    clickedElement.classList.add("active");
                    seleccionada = clickedElement;
                }
                
            } else if (seleccionada !== null 
                && (!clickedElement.hasChildNodes()
                || ( clickedElement.hasChildNodes() && clickedElement.firstChild.classList.contains(player ? "negra" : "blanca"))) 
                && validar(seleccionada, clickedElement, buscarTipo(seleccionada))) {  
                turn++

                if(esFinalCamino(seleccionada, clickedElement)){
                    turnoAnterior = document.getElementById("tablero").cloneNode(true)
                    generarTurno(seleccionada, clickedElement)
                    peonBecomesQueen(seleccionada, clickedElement)
                    
                    if(cuantasQuedan() <= 1){
                        contador++
                    }
                    player = !player
                    
                }else if (probarMovimiento(seleccionada, clickedElement)){

                    turnoAnterior = document.getElementById("tablero").cloneNode(true)
                    generarTurno(seleccionada, clickedElement)
                    mover(seleccionada, clickedElement)
                    if(cuantasQuedan() <= 1){
                        contador++
                    }
                    player = !player;    
                }
                
                if(jaquemate()){
                    clearInterval(intervalo)
                    let fechaFinal = new Date(Date.now())
                    let fechaFinalFormato = fechaFinal.toLocaleString()

                    partida = generarObjeto(fechaFinalFormato)
                    console.log(generarObjeto(fechaFinalFormato))
                    
                    const fin = document.getElementById("casillaFinal");
                    const final = document.getElementById("textoFinal");
                    const ganador = player ? "2" : "1"
                    const mensaje = empate() ? "Tablas" : "Ganador jugador " + ganador
    
                    final.innerHTML = mensaje + "<br>¿Quieres jugar de nuevo?"
                    fin.style.display = "flex"
                    
                    //reiniciar()
                }
                if(!player){
                    llamarIA()  
                }
            }
        }
    });
}
function encontrarRey(){
  
    for(let a = 0; a <= 7; a++){
        for(let b = 0; b <= 7; b++){
            const currentCasilla = document.getElementById("casilla" + a + b);
            if(currentCasilla.hasChildNodes() && currentCasilla.firstChild.classList.contains("rey") && 
               currentCasilla.firstChild.classList.contains(player ? "blanca" : "negra")){
                return currentCasilla
            }
        }
    }
    return ""
}
function jaque(){
    let casillaDestino = encontrarRey()

    for(let i = 0 ; i < 8 ; i++){
        for(let j = 0 ; j < 8 ; j++){
            
            const casillaOrigen = document.getElementById("casilla" + i + "" + j)
            esPeon = buscarTipo(casillaOrigen) == "peon" ? true : false
            if(!casillaOrigen.hasChildNodes() || casillaOrigen.firstChild.classList.contains(player ? "blanca" : "negra")){
                continue
            }
            if(casillaOrigen.hasChildNodes()
            && casillaOrigen.firstChild.classList.contains(player ? "negra" : "blanca")
            && validar(casillaOrigen, casillaDestino, buscarTipo(casillaOrigen))){
                esPeon = false
                return true
            }
        }
    }

    esPeon = false
    return false
}
function jaquemate(){
    if(contador >= 25){
        return true
    }
    for(let i = 0 ; i < 8 ; i++){
        for(let j = 0 ; j < 8 ; j++){
            
            const casillaOrigen = document.getElementById("casilla" + i + "" + j)
            if(!casillaOrigen.hasChildNodes() || casillaOrigen.firstChild.classList.contains(player ? "negra" : "blanca")){
                
                continue;
            }

            for(let k = 0 ; k < 8 ; k++){
                for(let l = 0 ; l < 8 ; l++){
                    const casillaDestino = document.getElementById("casilla" + k + "" + l)
                    
                    if(probarMovimiento(casillaOrigen, casillaDestino)){
                        return false
                    }

                }
            }
           
        }
    }

    return true
}
function probarMovimiento(casillaOrigen, casillaDestino) {
    const piezaDestino = casillaDestino.firstChild ? casillaDestino.firstChild.cloneNode(true) : null;

    let esMovimientoValido = false;

    if (casillaOrigen !== null && casillaDestino !== null 
        && (!casillaDestino.hasChildNodes() 
        || casillaDestino.firstChild.classList.contains(player ? "negra" : "blanca"))) {
        if(validar(casillaOrigen, casillaDestino, buscarTipo(casillaOrigen))){
            mover(casillaOrigen, casillaDestino);  

            if(!jaque()) {  
                esMovimientoValido = true;
            }

            seleccionada = casillaOrigen

            mover(casillaDestino, casillaOrigen);
            if (piezaDestino) {
                casillaDestino.appendChild(piezaDestino); 
            }
        }
        
    }

    seleccionada = casillaOrigen;
    return esMovimientoValido;
    
}
function mover(casillaOrigen, casillaDestino){

    iniciado = true
    if(casillaDestino.hasChildNodes()){
        casillaDestino.removeChild(casillaDestino.firstChild);
    }
        
    const copia = casillaOrigen.firstChild.cloneNode(false);
    casillaDestino.appendChild(copia);
    casillaOrigen.removeChild(casillaOrigen.firstChild);
    casillaOrigen.classList.remove("active");
    seleccionada = null;           

}
moverPieza()
