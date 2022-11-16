let conteiner = document.getElementById("contenedor-tarjetas")
let contenedorCheckBox = document.getElementById("contenedorCheckBox")
let searchBar = document.getElementById("search")
let eventos;
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

    conteiner.innerHTML = ""

    let fragment = document.createDocumentFragment() 

    listaEventos.forEach(element => {

        let div = document.createElement('div')
        div.classList.add('card', 'col-3', 'rounded-4')
        div.innerHTML += `
        <img src="${element.image}" class="card-img-top imagenCarta" alt="FeriaDeComidas">
        <div class="card-body">
            <h5 class="card-title text-center"> ${element.name}</h5>
            <p class="card-text text-center"> ${element.description}</p>
            <div class="botonCarta">
                <a href="./details.html?id=${element._id}" class="btn btn-primary">More info</a>
            </div>
        </div>
        `
        fragment.appendChild(div)
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
    crearTarjetas(filtroSearch (filtrarPorChecked(eventos)))  
} )


function filtrarPorChecked(listaEventos){ 

    let checkedValues = Array.from( document.querySelectorAll( 'input[type="checkbox"]:checked' ) ).map( input => input.value )// lista de los valores de los checkbox chequeado

    if( checkedValues.length != 0){ 
        return listaEventos.filter( evento => checkedValues.includes( evento.category )) 
    }else {  
        return listaEventos
    }
}

function filtroSearch(listaEventos){ 
    let searchChecked = searchBar[0].value.toLowerCase().trim() // 

    if(searchChecked != ""){
        return listaEventos.filter( evento => evento.name.toLowerCase().includes( searchChecked )) 
    }else{                                                                               
        return listaEventos
    }

}

searchBar.addEventListener( "keyup" , (e) =>{

    crearTarjetas(filtroSearch (filtrarPorChecked(eventos))) 
})

searchBar.addEventListener("submit" , (e) => e.preventDefault()) 