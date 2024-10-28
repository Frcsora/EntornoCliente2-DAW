let fecha = new Date(Date.now());
let fechaFormateada = fecha.toLocaleString();
const fechaConcierto = new Date(2024, 9, 27, 19, 30)
const [dias, horas] = timestamp(fechaConcierto)
console.log(dias < 0 ?  "No puedes poner una fecha anterior" : "Queda" + (dias === 1  ? " " +  dias + " dia" :
        dias > 1 ? "n " + dias + " días" :
            dias === 0 && horas > 1 ? "n" : "") +
    (dias > 0 ? " y " : "") +
    ( horas === 1 ? " " + +horas + " hora" :
        horas > 1 ? " " + horas + " horas" : ""))

setInterval(function(){
    fecha = new Date(Date.now())
    fechaFormateada = fecha.toLocaleString()
    [dias, horas] = timestamp(fechaConcierto)
    console.log(dias < 0 ?  "No puedes poner una fecha anterior" : "Queda" + (dias === 1  ? " " +  dias + " dia" :
            dias > 1 ? "n " + dias + " días" :
                dias === 0 && horas > 1 ? "n" : "") +
        (dias > 0 ? " y " : "") +
        ( horas === 1 ? " " + +horas + " hora" :
                horas > 1 ? " " + horas + " horas" : ""))

}, 1000 * 60 * 60 * 24)

function timestamp(fecha_concierto){
    const dias = Math.floor((fecha_concierto.getTime() - fecha.getTime())
        / (1000 * 60 * 60 * 24))
    const horas = Math.abs(fecha_concierto.getHours() - fecha.getHours())
    return [dias, horas]
}
/*if(dias === 0 && fechaConcierto[1] > 0){
        console.log(fechaFormateada + "\n" + (horas === 1 ? + horas + " hora para el inicio del evento" :
            horas > 1 ? + horas + " horas para el inicio del evento" : ""))
    }else if(dias === 0 && fechaConcierto[1] === 0){
        console.log("El evento esta empezando!")
    }*/
