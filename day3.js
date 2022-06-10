console.log("Page loaded");

let pokemonForm = document.querySelector("form");
let pokemonArea = document.querySelector("#pokemon-area");

// addEventListener method has 2 parameters:
// one is event to listen for, second is callback function

// (1) control the form behavior upon submit
pokemonForm.addEventListener("submit", getPokemon);

async function getPokemon(evt) {
    console.log("Inside function getPokemon - form submitted");
    console.log(evt);

    // this prevents the page from re-loading
    evt.preventDefault();
    console.log("evt.target.pokemon.value = ", evt.target.pokemon.value);
    let apiUrl = "https://pokeapi.co/api/v2/pokemon/" + evt.target.pokemon.value.toLowerCase();
    // all these console.log entries are kinda ugly - but facilitate debugging
    console.log(apiUrl);

    // (2) upon form submit, call the Pokemon API
    //let response = fetch(apiUrl);
    //console.log("response is: ", response);   // a Promise is placeholder for future data

    // async and await go together
    // the next two lines with await ARE THE DEAL!!!
    let response = await fetch(apiUrl);
    console.log("response is: ", response);   // now call is made, but data still not arrived
    let responseData = await response.json(); 
    console.log("responseData is: ", responseData);   // now have actual data
    // (3) grab what we want from results of the pokemon API call, and put it on page
    generateHTML(responseData);
}

function generateHTML(pokeData) {
    pokemonArea.innerHTML = `
        <h1>${pokeData.species.name}</h1>
        <p>Height: ${pokeData.height}</p>
        <p>Weight: ${pokeData.weight}</p>
        <img src="${pokeData.sprites.front_default}" alt="Pokemon image" />
    `;
}