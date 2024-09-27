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
function validarEnroque(rey, torre){

    let [x,y] = tomarCoordenadas(rey)    
    let [a,b] = tomarCoordenadas(torre)
    //tomamos coordenadas de la posicion de rey y de torre
    
    const comprobacion = y < b ? 1 : -1
    
    //si y(coordenada horizontal del rey) es menor que b(coordinada horizontal de la torre), significa que la torre esta a la derecha del rey
    //en ese caso el movimiento del rey sera hacia la derecha por tanto, aumentara el valor de la coordenada, mientras que para la torre disminuira
    //en caso contrario sera alreves, ese cambio lo guardo en los valores cambioRey y cambioTorre
    //Por otra parte, para comprobar si las casillas de enmedio esta vacia, tendre que comprobar hacia la derecha(en positivo) o hacia la izquierda(en negativo)
    //por eso guardo ese cambio en comprobacion
    if((b == 0 || b==7) && ((rey.id == "casilla04" || rey.id == "casilla74") && a == x)){
            for(let i = y + comprobacion ; y < b ? i < b : i > b ; i += comprobacion){
                //empezamos desde i + comprobacion, que puede ser y + 1 O y + (-1) por tanto, empezaria por la casilla inmediatamente a la izquierda o a la derecha del rey
                //lo mismo pasa con el incremente, se ira haciendo i + 1 O i + (-1)a cada iteracion
                //la condicion de salida comprueba tambien que torre es, si la torre es la de la izquierda, como ira incrementando el valor de i hay que hacerlo
                //mientras sea menor que b, asi comprobaremos las casillas desde la derecha del rey hasta la izquierda de la torre
                //en caso contrario hay que hacerlo mientras i > b, ya que ira decreciendo
                let casilla = document.getElementById("casilla" + x + "" + i)
        
                if(casilla.hasChildNodes()){
                    return false;
                }
                
            }
            return true
            
    } 
    return false
    
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

function validar(casillaOrigen, casillaDestino, tipo){
    
    if(tipo === "peon"){
        if(validarPeon(casillaOrigen, casillaDestino)){
            return true
        }
    }
    if(tipo === "caballo"){

        if(validarCaballo(casillaOrigen, casillaDestino)){
            return true
        }
    }   
    if(tipo === "alfil" || tipo === "reina"){
            if (validarAlfil(casillaOrigen, casillaDestino)) {
                return true
            }
    }
    if(tipo === "torre" || tipo === "reina"){
            if (validarTorre(casillaOrigen, casillaDestino)) {
                return true
            }
    }
    if(tipo === "rey"){
        if(validarRey(casillaOrigen, casillaDestino || validarEnroque(casillaOrigen, casillaDestino))){
            return true
        }
    }
    return false
}
function validarRey(casillaOrigen, casillaDestino){
    
    const [x, y] = tomarCoordenadas(casillaOrigen)
    const [a, b] = tomarCoordenadas(casillaDestino)

    if(Math.abs(x - a) <= 1 && Math.abs(y - b) <=1){
        return true
    }
    return false
}
function validarPeon(casillaOrigen, casillaDestino){
    const [x, y] = tomarCoordenadas(casillaOrigen)
    const [a, b] = tomarCoordenadas(casillaDestino)

    const valor = player ? -1 : 1;
    const inicio = player ? 6 : 1;
    if(!esPeon){
        let siguienteCasilla = document.getElementById("casilla" + (x + valor) + "" + y)
        if((((x + valor === a && y === b) || (x === inicio && x + (valor * 2) === a && y === b)) && !siguienteCasilla.hasChildNodes() && !casillaDestino.hasChildNodes())
            || (x + valor === a && (y + valor === b || y + (valor * -1) === b) && casillaDestino.hasChildNodes())){
                
            return true
        }
    }
    
    if(esPeon){
        if(x + (valor * -1) === a && (y + valor === b || y + (valor * -1) === b) && casillaDestino.hasChildNodes()){
            return true
        }
        
    }

    
    return false
}
function validarCaballo(casillaOrigen, casillaDestino){
    
    const [x, y] = tomarCoordenadas(casillaOrigen)
    const [a, b] = tomarCoordenadas(casillaDestino)

    const d1 = Math.abs(x - a)
    const d2 = Math.abs(y - b)

    if((d1 == 1 && d2 == 2) || (d1 == 2 && d2 == 1)){
        return true
    }
    return false
}
function validarAlfil(casillaOrigen, casillaDestino){
    const [x, y] = tomarCoordenadas(casillaOrigen)
    const [a, b] = tomarCoordenadas(casillaDestino)
    if(Math.abs(x - a) == Math.abs(y - b)){
        let obstaculo = false;
        const dx = (a > x) ? 1 : -1; 
        const dy = (b > y) ? 1 : -1; 
        let c = x + dx;
        let c2 = y + dy;

        while (c !== a && c2 !== b) {
            const casilla = document.getElementById("casilla" + c + "" + c2);
            if (casilla.hasChildNodes()) {
                obstaculo = true;
                break;
            }
            c += dx;
            c2 += dy;
        }
        if (!obstaculo) {
            return true
        }
    }
    return false
}

function validarTorre(casillaOrigen, casillaDestino) {
    const [x, y] = tomarCoordenadas(casillaOrigen);
    const [a, b] = tomarCoordenadas(casillaDestino);

    if ((x == a || y == b)) {
        let obstaculo = false;
        if (x != a) {
            const c = Math.min(x, a);
            const d = Math.max(x, a);
            for (let i = c + 1; i < d; i++) {
                const casilla = document.getElementById("casilla" + i + b);
                if (casilla.hasChildNodes()) {
                    obstaculo = true;
                    break;
                }
            }
        } else {
            const c = Math.min(y, b);
            const d = Math.max(y, b);
            for (let i = c + 1; i < d; i++) {
                const casilla = document.getElementById("casilla" + a + i);
                if (casilla.hasChildNodes()) {
                    obstaculo = true;
                    break;
                }
            }
        }
        if (!obstaculo) {
            return true
        }
    }
    return false
}
moverPieza()
