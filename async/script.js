addEventListener('DOMContentLoaded',() => {
    let anteriores = [];
    let pokemons;
    let arrayCompleto = [];
    document.body.classList.add('loading');
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

                })
                    .catch(err => console.log(err));
            })
            fetch("https://pokeapi.co/api/v2/type/",{
                headers: {"Content-Type": "application/json"}
            }).then((response) => response.json()).
            then((json) => {
                crearTipo(json['results'])

                document.getElementById("h1").remove();
                document.body.classList.remove('loading');
            }).catch((error) => {
                console.log(error);
            })
        }
    },1000)

    function crearTipo(tipos){
        const form = document.getElementById('form');
        form.classList.remove('none');
        form.classList.add('flexForm');
        const label = document.createElement("label");
        label.innerText = "Types:";
        label.setAttribute("for", "tipo");
        const tipoSelect = document.createElement("select");
        tipoSelect.setAttribute("id", "tipo");
        form.insertAdjacentElement('beforeend', label);
        form.insertAdjacentElement("beforeend", tipoSelect);
        const labelBuscador = document.createElement("label");
        labelBuscador.innerText = "Buscador:";
        labelBuscador.setAttribute("for", "buscador");
        const input = document.createElement("input");
        input.setAttribute("id", "buscador");
        input.setAttribute("type", "text");
        input.setAttribute("placeholder", "ID o nombre");
        form.insertAdjacentElement("beforeend", labelBuscador);
        form.insertAdjacentElement("beforeend", input);
        const boton = document.createElement("button");
        const option = document.createElement("option");
        option.innerText = "All";
        option.value = "all";
        tipoSelect.insertAdjacentElement('afterbegin', option);
        const noExisten = ["dark", "unknown", "stellar"];
        Array.from(tipos).forEach((tipo) => {
            if(!noExisten.includes(tipo.name)) {
                const option = document.createElement("option");
                option.textContent = primeraMayus(tipo['name']);
                option.value = tipo['name'];
                tipoSelect.insertAdjacentElement('beforeend',option);
            }
        })
        const div = document.createElement("div");
        div.classList.add('tarjetas');
        div.id = "pokemons";
        form.insertAdjacentElement('afterend',div);
        arrayCompleto.forEach(pokemon => {
            crearTarjeta(pokemon);
        })
        anteriores.push({
            type:"all",
            div: div
        })
    }

    const interval = setInterval(()=>{
        if(document.getElementById("tipo")){
            document.getElementById("tipo").addEventListener("change", (event)=>{
                const valor = event.target.value;
                if(document.getElementById("pokemons")) {
                    anteriores.push({
                        type: document.getElementById("pokemons").classList[1],
                        div: document.getElementById("pokemons")
                    });
                    document.getElementById("pokemons").remove();
                }
                const div = document.createElement("div");
                div.id = "pokemons";
                div.classList.add("tarjetas", document.getElementById("tipo").value);
                document.getElementById("form").insertAdjacentElement('afterend',div);
                if(arrayCompleto.length === 151){
                    if(valor === "all"){
                        Array.from(arrayCompleto).forEach(pokemon => {
                            crearTarjeta(pokemon);
                        })
                    }else{
                        Array.from(arrayCompleto).forEach((pokemon) => {
                            const tipos = [];
                            pokemon.types.forEach(tipo => {
                                tipos.push(tipo.type.name);
                            })
                            if(tipos.includes(valor)){
                                crearTarjeta(pokemon);
                            }
                        })
                    }

                    if(!document.getElementsByTagName("button")[0]){
                        const button = document.createElement("button");
                        button.innerText = "Back";
                        document.getElementById("pokemons").insertAdjacentElement('beforebegin', button);
                        button.addEventListener("click", ()=>{
                            const ultimo = anteriores.pop();
                            if(anteriores.length < 1) anteriores.push(ultimo);
                            document.getElementById("pokemons").remove();
                            if(ultimo) document.getElementById("form").insertAdjacentElement('afterend',ultimo.div);
                            if(anteriores.length <= 1) {
                                button.remove();
                                document.getElementById("tipo").value = "all";
                            }else{
                                document.getElementById("tipo").value = ultimo.type
                            }
                        });
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
        div.style.order = pokemon['id'];
        document.getElementById("pokemons").insertAdjacentElement('beforeend', div);
        const h3 = document.createElement("h3");
        h3.innerText = primeraMayus(pokemon['name']);
        div.insertAdjacentElement('beforeend', h3);
        const img = document.createElement("img");
        img.src = pokemon.sprites.other.dream_world.front_default;
        div.insertAdjacentElement('beforeend', img);
        const br = document.createElement("br");
        div.insertAdjacentElement('beforeend', br);
        const small = document.createElement("small");
        small.innerText = pokemon['id'];
        div.insertAdjacentElement('beforeend', small);
    }
})