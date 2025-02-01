class Coche{
    constructor(marca, modelo, anio){
        this.marca = marca;
        this.modelo = modelo;
        this.anio = anio;
    }
}
const coches = [
    new Coche("coche", 1, 2017),
    new Coche("coche", 2, 2015),
    new Coche("coche", 3, 2023)
]
function callbackFunction(n1, n2, callback){
    return callback(n1, n2);
}
addEventListener('DOMContentLoaded',() => {
    /*let promise = new Promise((resolve, reject) => {
        setTimeout(()=>{
            resolve(coches[1]);
            reject(new Error("Whoops!"));
        }, 2000)
    })
    promise.then(res=>{
        console.log(res);
    }).catch(err=>{
        console.log(err);
    })*/
    /*let promise = new Promise(function(resolve, reject) {
        resolve(1);

        setTimeout(() => resolve(2), 1000);
    });
    promise.then(alert);*/
    //callbackFunction(5, 5, (a,b) => 5 + 5)
    /*function aumentarTamano(circle){
        const width = circle.getBoundingClientRect().width;
        const height = circle.getBoundingClientRect().height;
        circle.style.width = width + 'px';
        circle.style.height = height + 'px';
    }
    function grow(circle, limit){
        const interval = setInterval(() => {
            if(circle.getBoundingClientRect().width < limit){
                aumentarTamano(circle);
            }else{
                clearInterval(interval);
            }
        }, );
    }
    const showCircle = new Promise(resolve => {
        setTimeout(resolve, 100);
    })
    showCircle(150, 150, 100).then(div => {
        div.classList.add('message-ball');
        div.append("Hello, world!");
    });*/
    /*fetch("https://pokeapi.co/api/v2/pokemon?limit=100&offset=0")
            .then((response) => response.json())
                .then((data) => {
                    Array.from(data['results']).forEach((item) => {
                        console.log(item['name']);
                    })
                })*/
    let pokemons;
    let arrayCompleto = [];
    fetch("https://pokeapi.co/api/v2/pokemon?limit=151&offset=0")
        .then(res => res.json())
    .then(json => {
        pokemons = json['results'];
    }).catch(err => console.log(err));
    const intervaloPokemon = setInterval(()=>{
        if(pokemons){
            clearInterval(intervaloPokemon);
            Array.from(pokemons).forEach(pokemon => {
                fetch(pokemon['url'])
                    .then(res => res.json())
                .then(json => {
                    arrayCompleto.push(json);
                    document.body.classList.add('loaded');
                })
                    .catch(err => console.log(err));
            })
            document.body.classList.remove('loaded');
        }
    },1000)

    function crearTipo(tipos){
        const form = document.getElementById('form');
        const label = document.createElement("label");
        label.innerText = "Tipos:   ";
        label.setAttribute("for", "tipo");
        const tipoSelect = document.createElement("select");
        tipoSelect.setAttribute("id", "tipo");
        form.insertAdjacentElement('afterbegin', label);
        form.insertAdjacentElement("beforeend", tipoSelect);
        Array.from(tipos).forEach((tipo) => {
            const option = document.createElement("option");
            option.textContent = tipo['name'];
            option.value = tipo['name'];
            tipoSelect.insertAdjacentElement('beforeend',option);
        })
    }
    fetch("https://pokeapi.co/api/v2/type/",{
        headers: {"Content-Type": "application/json"}
    }).then((response) => response.json()).
    then((data) => {
        crearTipo(data['results'])
    }).catch((error) => {
        console.log(error);
    })

    const interval = setInterval(()=>{
        if(document.getElementById("tipo")){
            document.getElementById("tipo").addEventListener("change", (event)=>{
                const valor = event.target.value;
                if(document.getElementById("pokemons")) document.getElementById("pokemons").remove();
                const div = document.createElement("div");
                div.id = "pokemons";
                div.classList.add("tarjetas")
                document.getElementById("form").insertAdjacentElement('afterend',div);
                if(arrayCompleto.length === 151){
                    Array.from(arrayCompleto).forEach((pokemon) => {
                        const tipos = [];
                        pokemon.types.forEach(tipo => {
                            tipos.push(tipo.type.name);
                        })
                        if(tipos.includes(valor)){
                            crearTarjeta(pokemon);
                        }
                    })
                    if(document.getElementById("pokemons").children.length === 0){
                        const h1 = document.createElement("h1");
                        h1.innerText = "No tenemos registro de pokemon de ese tipo";
                        document.getElementById("pokemons").insertAdjacentElement('beforeend', h1)
                    }
                }
            });
            clearInterval(interval);
        }
    },1000)
    function primeraMayus(str){
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    function crearTarjeta(pokemon){
        const div = document.createElement("div");
        div.classList.add('tarjeta');
        document.getElementById("pokemons").insertAdjacentElement('beforeend', div);
        const h3 = document.createElement("h3");
        h3.innerText = primeraMayus(pokemon['name']);
        div.insertAdjacentElement('beforeend', h3);
        const img = document.createElement("img");
        img.src = pokemon.sprites.other.dream_world.front_default;
        const img2 = document.createElement("img");
        //img2.src = pokemon.sprites.back_default;
        //img2.classList.add('hidden');
        /*img.addEventListener('mouseenter', () => {
            img.classList.add('hidden');
            img2.classList.remove('hidden');
        })
        img2.addEventListener('mouseleave', () => {
            img.classList.remove('hidden');
            img2.classList.add('hidden');
        })*/
        div.insertAdjacentElement('beforeend', img);
        div.insertAdjacentElement('beforeend', img2);
        const br = document.createElement("br");
        div.insertAdjacentElement('beforeend', br);
        const small = document.createElement("small");
        small.innerText = pokemon['id'];
        div.insertAdjacentElement('beforeend', small);
    }
})