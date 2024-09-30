/**
 * Cuarto js que se lee, es el grueso del juego, desde aqui se generan los movimientos con escuchador de eventos,
 * ademas de generar un objeto con la información relativa a la partida
 */
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
function alClickar() {
    
    document.addEventListener('click', function (event) {
        let clicado = event.target;
        if(clicado.classList.contains("casillas") || clicado.parentNode.classList.contains("casillas")){
            if (clicado.parentNode.classList.contains("casillas")) {
                clicado = clicado.parentNode;
            }
            if (clicado.hasChildNodes() && clicado.firstChild.classList.contains(player ? "blanca" : "negra")) {

                if (seleccionada === null) {
    
                    clicado.classList.add("active");
                    seleccionada = clicado;
                    
                } else if(seleccionada !== null     
                    && (seleccionada.hasChildNodes() && seleccionada.firstChild.classList.contains("rey")) 
                    && (clicado.hasChildNodes() && clicado.firstChild.classList.contains("torre"))
                    && validarEnroque(seleccionada, clicado)){
                        turn++
                        turnoAnterior = document.getElementById("tablero").cloneNode(true)
                        generarTurno(seleccionada, clicado)
                        enroque(seleccionada, clicado)
                       
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
                    clicado.classList.add("active");
                    seleccionada = clicado;
                }
                
            } else if (seleccionada !== null 
                && (!clicado.hasChildNodes()
                || ( clicado.hasChildNodes() && clicado.firstChild.classList.contains(player ? "negra" : "blanca"))) 
                && validar(seleccionada, clicado, buscarTipo(seleccionada))) {  
                turn++

                if(esFinalCamino(seleccionada, clicado)){
                    turnoAnterior = document.getElementById("tablero").cloneNode(true)
                    generarTurno(seleccionada, clicado)
                    peonBecomesQueen(seleccionada, clicado)
                    
                    if(cuantasQuedan() <= 1){
                        contador++
                    }
                    player = !player
                    
                }else if (probarMovimiento(seleccionada, clicado)){

                    turnoAnterior = document.getElementById("tablero").cloneNode(true)
                    generarTurno(seleccionada, clicado)
                    mover(seleccionada, clicado)
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
        } else if(clicado.id === "boton"){
            crearTablero();
        } else if(clicado.id === "newGame"){
            newGame()
        } else if(clicado.id ==="ia"){
            ia()
        } else if(clicado.id === "acabar"){
            acabar()
        } else if(clicado.id ==="stop"){
            stop()
        }
    });
}
alClickar()
