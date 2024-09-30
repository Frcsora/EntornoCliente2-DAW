/**
 * Tercer js que se lee, en este documento encontramos los procedimientos relacionados con el juego, comprobar si hay jaque, jaquemate y este tipo de cosas
 */
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
function tomarCoordenadas(clicado) {
    const coords = clicado.id.slice(7);
    const x = parseInt(coords.charAt(0));
    const y = parseInt(coords.charAt(1));
    return [x, y];
}
function llamarIA(){
    //intervalo = setInterval(ia, 1)
    ia()
}
