document.addEventListener("DOMContentLoaded", async () => {
    const container = document.getElementById("container");
    for(let i = 0 ; i < 4 ; i++){
        const div = document.createElement("div");
        div.classList.add("pista");
        const img = document.createElement("img");
        img.classList.add("jinetes");
        img.id = `jinete${i + 1}`;
        img.src = "parado.png";
        div.insertAdjacentElement("beforeend", img);
        container.insertAdjacentElement("beforeend", div);
    }

    function carrera(){
        const jinetes = document.getElementsByClassName("jinetes");
        const arrayCaballos = [];
        const promesas = [];
        if(arrayCaballos.length < 4){
            for(let i = 0 ; i < jinetes.length ; i++){

                const intervalo = setInterval(() => {
                    let rand = parseInt(Math.random() * 60);
                    const posicionActual = Math.abs(container.getBoundingClientRect().left - jinetes[i].getBoundingClientRect().left);
                    const final = container.getBoundingClientRect().right < jinetes[i].getBoundingClientRect().right + document.body.getBoundingClientRect().width / 100 + rand;
                    if(!final) {
                        jinetes[i].style.left = (parseInt(posicionActual) + document.body.getBoundingClientRect().width / 100 + rand) + "px";
                    }else{
                        arrayCaballos.push(primeraMayus(jinetes[i].id));
                        clearInterval(intervalo);
                        if(arrayCaballos.length >= 4){
                            alert(arrayCaballos.join(", "));
                        }
                    }
                }, 1000 )
            }
        }
    }
    document.getElementById("boton").addEventListener("click", carrera);
    function primeraMayus(str){
        return str.substr(0,1).toUpperCase() + str.substr(1, 5) + " " + str.substr(-1);
    }

})