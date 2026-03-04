let currentPokemon = null

async function findPokemon(){

let name = document.getElementById("pokemonInput").value.toLowerCase()

let response = await fetch("https://pokeapi.co/api/v2/pokemon/" + name)

let data = await response.json()

currentPokemon = data

document.getElementById("pokemonImage").src = data.sprites.front_default

document.getElementById("pokemonAudio").src = data.cries.latest

loadMoves(data.moves)

}

function loadMoves(moves){

let m1 = document.getElementById("move1")
let m2 = document.getElementById("move2")
let m3 = document.getElementById("move3")
let m4 = document.getElementById("move4")

m1.innerHTML = ""
m2.innerHTML = ""
m3.innerHTML = ""
m4.innerHTML = ""

moves.forEach(m => {

let name = m.move.name

let o1 = new Option(name,name)
let o2 = new Option(name,name)
let o3 = new Option(name,name)
let o4 = new Option(name,name)

m1.add(o1)
m2.add(o2)
m3.add(o3)
m4.add(o4)

})

}

function addToTeam(){

if(!currentPokemon) return

let team = document.getElementById("team")

let container = document.createElement("div")
container.className = "teamMember"

let img = document.createElement("img")
img.src = currentPokemon.sprites.front_default

let list = document.createElement("ul")

let moves = [
document.getElementById("move1").value,
document.getElementById("move2").value,
document.getElementById("move3").value,
document.getElementById("move4").value
]

moves.forEach(m => {

let li = document.createElement("li")
li.textContent = m
list.appendChild(li)

})

container.appendChild(img)
container.appendChild(list)

team.appendChild(container)

}
