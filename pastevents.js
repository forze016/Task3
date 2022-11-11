// creo la constante de article. con un id y le doy sus clases de css
// declaro una constante que dice que data.events se guarda en eventsCards
const $article = document.getElementById("article")
$article.className = "Contenido card"
const eventsCards = data.events
const pastEvents = eventsCards.filter(events => events.date < data.currentDate)


//Aqui declaramos la constante de mi checkbox father... donde yo voy a tener mis input de categoria
//Lo llame por id ya que es más como para mi poder llamarlo . (getElementById) sirve solo para llamar
//a un contenedor con id unica definido en HTML

const $checkboxs = document.getElementById('checkbox')
let searchBar = document.getElementById("search")

//Aqui la constante fn guarda el valor de dato.events como  => eventsCards y desde ahi
//navego por el archivo datos.js encontrando la category para los checks

const fn = ( eventsCards ) => eventsCards.category

//Aqui lo que estoy haciendo con todas las constantes es filtrar que todas mis cartas tengan
//el atributo del array "CATEGORY" Lo que hace filter es que me de un booleano true si es que 
// tiene esa propiedad... Después usamos map otro metodo de filtrar para agarrar todos los atributos
// que tengan eventsCards.Category... Y aqui use algo nuevo ... el Set (Cuidado con usar set en minuxcula)
// puede tener fallos en el tipeo... Set sirve para hacer un unico objeto // array que no se repite
// es decir no se va a multiplicar 2 veces la mismo valor .. 1 sola vez guarda todos la anteriores.
// es como una caja de pañuelos... ves que es una caja pero no sabes cuantos pañuelos hay...
// el Array.from Sirve para yo poder reutilizar lo que use como Set y volverlo hacer un arrays.
// con sus propiedades de arrays...

const cardsForCategory = pastEvents.filter( fn )
const categori = cardsForCategory.map( fn )
const cardNoRepeat = new Set( categori )
const arrayNoRepeat = Array.from( cardNoRepeat )

let fragment = document.createDocumentFragment()

// Aqui cree una funcion de orden sup... para imprimir y crear los checks, use una variable
// let template.. para poder crear el check adentro de un "elemento vacio"...
// seria como usar un div pero en realidad no existe... dentro del html ...
// los Values lo saco de mi consts  arrayNoRepeat Que lo que hace es buscar el valor de category
// dandome asi los nombres de cada check que va a imprimir...
// el contenedor en este caso $checkbox... es como dice la palabra contiene lo que se imprime


function crearCheckBoxs(values, contenedor){
    let template = ''
    values.forEach( value => template  += `
        <label class="btn btn-light active">
            <input type="checkbox" class="me-2" value="${value}" name="" id="" checked autocomplete="off"> ${value}
        </label> 
    `)
    contenedor.innerHTML = template
}

crearCheckBoxs( arrayNoRepeat, $checkboxs )

//Desde aqui se crean las cards con sus indicaciones usando una funcion de orden superior Flecha
// el Href Lleva un atributo que a la hora de que se haga click lo redireccione a details.html
// y imprima su card en una carta grande ...


cardCreate(pastEvents)
function cardCreate(listEvents) {
    $article.innerHTML = ""

    listEvents.forEach(element => {

        let div = document.createElement('div')
        div.className = "imagenesytex card card shadow-lg text-bg-dark"
        div.style = "width: 18rem;"
        div.innerHTML = `
        <img src=${element.image} class="imagenesytex3 card-img-top card-img-top" alt="Feria de Comida">
    <div class="card-body d-flex flex-column">
    <h5 class="card-title">${element.name}</h5>
    <p class="card-text">${element.description}</p>
    <p class="card-text"><b>${element.category}</p>
    <div class="d-flex justify-content-between mt-auto align-items-center">
    <p class="m-0 fs-5 fw-bold">${element.price}</p>
    <a href="./details.html?id=${element._id}" class="btn btn-secondary my-auto w-30" id="Botones">More Info...</a>
        </div>
    </div>
</div>`
        $article.appendChild(div)

    });
}


// evento de los checkbox
let globalFiltred = []
$checkboxs.addEventListener( 'change', (event) => {
    const checked = Array.from( document.querySelectorAll( 'input[type="checkbox"]:checked' ) ).map( input => input.value )
    if( checked.length === 0 ){
     $article.innerHTML = '<h2> Select a card category </h2>'
     return
    }
    const cardsFilter = filterCards( pastEvents, checked )
    globalFiltred = cardsFilter.map(e => e)
    cardCreate(cardsFilter)
 } )

 searchBar.addEventListener("keyup", (event) =>{
    const inputSearch = Array.from(document.querySelectorAll('input[type="search"]')).map( input => input.value )
    const inputValues = inputSearch.toString().toLowerCase()
    globalFiltred = valueGlobal()
    const cardSeach = seachFilter( globalFiltred, inputValues)
    cardCreate(cardSeach)
 })
 
 // funcion para filtrar cartas segun su categoria
 
 function filterCards(eventsCards,createFilterCards){
    console.log(eventsCards)
    console.log(createFilterCards)
     let filtcard = events => createFilterCards.includes( events.category )
     let filterToCard = eventsCards.filter( filtcard )
     return filterToCard
 } 


function seachFilter(events, inputValue){
    const fnSearch = events => events.name.toLowerCase().includes(inputValue)
    const filtrated = events.filter(fnSearch)
    return filtrated
}

function valueGlobal(){
    if(globalFiltred.length === 0){
        return pastEvents
    }
    return globalFiltred
}