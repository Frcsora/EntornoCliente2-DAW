let fecha = new Date(Date.now());
let fechaFormateada = fecha.toLocaleString();
let fechaconcierto = new Date(2024, 11, 26)

setInterval(function(){
    fecha = new Date(Date.now())
    fechaFormateada = fecha.toLocaleString()
    if(fecha.getSeconds() === 10){
        console.log(fechaFormateada)
    }

    }, 1000)

function timestamp(fecha){
    let fechaActual = new Date(Date.now())
    return Math.ceil((fecha.getTime() - fechaActual.getTime())
        / (1000 * 60 * 60 * 24))
}
console.log(timestamp(fechaconcierto))
