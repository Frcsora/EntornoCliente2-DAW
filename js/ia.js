function esSeguro(casilla){
    for(let i = 0 ; i < 8 ; i++){
        for(let j = 0 ; j < 8 ; j++){
            const casillaOrigen = document.getElementById("casilla" + i + "" + j)
            if(casilla === casillaOrigen){break;}
            if(casillaOrigen.hasChildNodes() && casillaOrigen.firstChild.classList.contains(player ? "negra" : "blanca")){
                if(probarMovimiento(casillaOrigen, casilla)){
                    return true
                } 
            }
        }
    }

    return false;
}
function puedeMover(casilla){
    //confirma que haya almenos un movimiento posible para la pieza en $casilla
    for(let i = 0 ; i < 8 ; i++){
        for(let j = 0 ; j < 8 ; j++){
            let casillaDestino = document.getElementById("casilla" + i + "" + j)

            if(probarMovimiento(casilla, casillaDestino)){
                return true            
            }
        }
    }
    return false
}
function dondeMover(casilla){
    //funcion void que recibe una pieza y devuelve un array con todos los posibles movimientos, en caso de poder comer solamente toma las que pueda comer
    
    const prioridad2 = []
    const prioridad3 = []
    const prioridad4 = []
    const prioridad5 = []
    for(let i = 0 ; i < 8 ; i++){
        for(let j = 0 ; j < 8 ; j++){
            let casillaDestino = document.getElementById("casilla" + i + "" + j)
            if(probarMovimiento(casilla, casillaDestino)){
                if(casillaDestino.hasChildNodes()){
                    
                    if(esSeguro(casillaDestino)){
                        prioridad2.push(casillaDestino)
                        continue;
                    }
                    prioridad4.push(casillaDestino)
                    continue;
                }
                if(!casillaDestino.hasChildNodes()){
                    if(esSeguro(casillaDestino)){
                        prioridad3.push(casillaDestino)
                        continue;  
                    }
                }
                prioridad5.push(casillaDestino)
            }
        }
    }
    if(prioridad2.length > 0){
        return prioridad2;
    }
    if(prioridad3.length > 0){
        return prioridad3
    }
    if(prioridad4.length > 0){
        return  prioridad4
    }
    return prioridad5
}
function crearListaPiezas(){
    //retornar un array con las piezas del equipo que tiene el turno que pueden hacer almenos 1 movimiento en este turno y las filtramos
    //para dar prioridad a las que pueden comer
    const listaPiezas = []
    for(let i = 0 ; i < 8 ; i++){
        for(let j = 0 ; j < 8 ; j++){
            const casilla = document.getElementById("casilla" + i + "" + j)

            if((casilla.hasChildNodes() && casilla.firstChild.classList.contains(player ? "blanca" : "negra")) && puedeMover(casilla)){
                listaPiezas.push(casilla)
            }
        }
    }
    return listaPiezas
}

function ia(){
    let casilla;
    let destino;
    let piezasFiltradas;
    let posibilidades;
    piezasFiltradas = crearListaPiezas()
    //creamos lista de piezas que puedan mover y la filtramos si pueden comer    
    casilla = piezasFiltradas[random(piezasFiltradas.length)]
    //tomamos 1 casilla de las que tengan prioridad si existe, o de las que puedan mover si no, de forma aleatoria
    posibilidades = dondeMover(casilla)
    destino = posibilidades[random(posibilidades.length)]
    if(casilla === null || casilla == undefined || destino == null || destino == undefined){
        throw new Error
    }
    casilla.click() //hace click solo en la casilla
    //hacemos lo mismo con la casilladeDestino
    destino.click()    
}
function random(n){
    return parseInt(Math.random() * n)
}
