let conteiner = document.getElementById("contenedor")
let contenedorCheckBox = document.getElementById("contenedorCheckBox")
let searchBar = document.getElementById("search")
let eventos
let categorias 

fetch ("http://amazing-events.herokuapp.com/api/events")
    .then( response => response.json() )
    .then( json => {
        data = json
        eventos = data.events
        categorias = eventos.map(evento => evento.category)
        categorias = new Set(categorias)
        categorias = Array.from(categorias)

        crearTarjetas(eventos)
        crearCheckbox(categorias)
    } )

    .catch( error => console.log(error) )


function crearTarjetas(listaEventos) {

    let fragment = document.createDocumentFragment()

    listaEventos.forEach(element => {

        conteiner.innerHTML = ""

        if (element.date < data.currentDate) {
            
            let div = document.createElement('div')
            div.classList.add('card', 'col-3', 'rounded-4')
            div.innerHTML = `
                            <img src="${element.image}" class="card-img-top imagenCarta" alt="FeriaDeComidas">
                            <div class="card-body">
                                <h5 class="card-title text-center"> ${element.name}</h5>
                                <p class="card-text text-center"> ${element.description}</p>
                                <p class="card-text text-center"> ${element.date}</p>
                                <div class="botonCarta">
                                    <a href="./details.html?id=${element._id}" class="btn btn-primary">More info</a>
                                </div>
                            </div>
                            `
            fragment.appendChild(div)
        }
    })
    conteiner.appendChild(fragment)
}   

function crearCheckbox(categoriasCheckbox) {

    let fragment = document.createDocumentFragment()

    categoriasCheckbox.forEach(categoria =>{

        let div = document.createElement("div")
        div.className = "form-check d-md-flex align-items-center"
        div.innerHTML = `
                        <input class="form-check-input" type="checkbox" checkBox value="${categoria}" id="">
                        <label class="form-check-label labelText lavelSize" for=""> ${categoria}
                        </label>
                        `
        fragment.appendChild(div)


    })

    contenedorCheckBox.appendChild(fragment)
}


contenedorCheckBox.addEventListener( 'change', (e) => {
    crearTarjetas(filtroSearch (filtrarPorChecked(eventos))) // creartarjeta reicbe un array 
} )


function filtrarPorChecked(eventos){ // retorna un array tarjetas filtradas por categoria 

    let checked = Array.from( document.querySelectorAll( 'input[type="checkbox"]:checked' ) ).map( input => input.value )

    if( checked.length != 0){ // si tiene contenido lo filtra sino retorna el array como lo recibe
        return eventos.filter( evento => checked.includes( evento.category ))
    }else {
        return eventos
    }
}

function filtroSearch(eventos){ // return un array filtrado por busqueda 

    let searchChecked = searchBar[0].value.toLowerCase().trim()

    if(searchChecked != ""){
        return eventos.filter( evento => evento.name.toLowerCase().includes( searchChecked )) // array eventos recorre 1 x 1 los objetos y le 
    }else{                                                                                    // 
        return eventos
    }

}

searchBar.addEventListener("keyup" , (e) =>{

    crearTarjetas(filtroSearch (filtrarPorChecked(eventos))) // doble filtro 1filtra x boton de checked y luego por la barra d ebusqueda
})

searchBar.addEventListener("submit" , (e) => e.preventDefault()) // como se comporta como un formulario le digo que no haga la recarga de la pagina