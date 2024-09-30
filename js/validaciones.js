/**
 * Segundo documento js que se lee, contiene las validaciones de movimiento de las piezas
 * que seran leidas desde la ejecución del juego
 */
function validar(casillaOrigen, casillaDestino, tipo){
    //llamamos a la validación según el tipo de pieza
    //si es la reina tendrá que pasar por la validación de alfil y de torre
    //el rey tiene también la validación del enroque
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
    //La diferencia en ambos ejes debe ser 0 o 1
    if(Math.abs(x - a) <= 1 && Math.abs(y - b) <=1){
        return true
    }
    return false
}
function validarPeon(casillaOrigen, casillaDestino){
    const [x, y] = tomarCoordenadas(casillaOrigen)
    const [a, b] = tomarCoordenadas(casillaDestino)

    const valor = player ? -1 : 1;//blancas mueven hacia -1(arriba) negras +1(abajo)
    const inicio = player ? 6 : 1;//fila inicial de los peones
    if(!esPeon){
        let siguienteCasilla = document.getElementById("casilla" + (x + valor) + "" + y)
        if((((x + valor === a && y === b) || (x === inicio && x + (valor * 2) === a && y === b)) && !siguienteCasilla.hasChildNodes() && !casillaDestino.hasChildNodes())
            || (x + valor === a && (y + valor === b || y + (valor * -1) === b) && casillaDestino.hasChildNodes())){
            /**Condiciones para que los peones se muevan
             * 1. que solo cambie el eje x en 1 hacia el lado que toque segun quien 
             * sea el jugador y no la casilla de destino este vacia 
             * 2. que la posición sea la inicial y el cambio sea en 2 en el eje X
             * si no tienen ocupado la casilla enfrente y la casilla de destino este vacia
             * 3.que el cambio sea de 1 sobre el eje X en la direccion correcta 
             * y de 1 en el Y, estando ocupada la casilla de destino
             */
            return true
        }
    }
    
    if(esPeon){
        /**Este caso esta reservado para la comprobacion del jaquemate,
         * en que se comprueban los posibles movimientos de ambos equipos 
         * por eso le doy la vuelta al valor multiplicando * -1 porque
         * al llamarse esta función en el momento de comprobar el jaquemate tiene
         * el turno el equipo rival*/
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
    //El valor absoluto debe cambiar en 1 sobre un eje y 2 sobre el otro
    if((d1 == 1 && d2 == 2) || (d1 == 2 && d2 == 1)){
        return true
    }
    return false
}
function validarAlfil(casillaOrigen, casillaDestino){
    const [x, y] = tomarCoordenadas(casillaOrigen)
    const [a, b] = tomarCoordenadas(casillaDestino)
    /**
     * El valor absoluto de la diferencia sobre un eje debe ser igual al valor
     * absoluto de la diferencia sobre el otro
     */
    if(Math.abs(x - a) == Math.abs(y - b)){
        /**Comprobamos hacia donde nos tenemos que mover sobre cada eje para
         * comprobar
         */
        const dx = (a > x) ? 1 : -1; 
        const dy = (b > y) ? 1 : -1; 
        let c = x + dx;
        let c2 = y + dy;

        while (c !== a && c2 !== b) {
            /**Comprobamos todas las casillas que hay por enmedio, moviendo
             * en las direcciones preestablecidas
             */
            const casilla = document.getElementById("casilla" + c + "" + c2);
            if (casilla.hasChildNodes()) {
                return false
            }
            c += dx;
            c2 += dy;
        }
        return true
    }
    return false
}

function validarTorre(antiguo, casillaDestino) {
    let [x, y] = tomarCoordenadas(antiguo);
    let [a, b] = tomarCoordenadas(casillaDestino);

    if ((x == a || y == b)) {
        let obstaculo = false;
        if (x != a) {
            let c = Math.min(x, a);
            let d = Math.max(x, a);
            for (let i = c + 1; i < d; i++) {
                let casilla = document.getElementById("casilla" + i + b);
                if (casilla.hasChildNodes()) {
                    obstaculo = true;
                    break;
                }
            }
        } else {
            let c = Math.min(y, b);
            let d = Math.max(y, b);
            for (let i = c + 1; i < d; i++) {
                let casilla = document.getElementById("casilla" + a + i);
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
