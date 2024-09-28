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
