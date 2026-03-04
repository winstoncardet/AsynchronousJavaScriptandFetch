let currentPokemon = null

document.getElementById("findBtn").addEventListener("click", findPokemon)
document.getElementById("addBtn").addEventListener("click", addToTeam)

async function findPokemon(){
  const input = document.getElementById("pokemonInput").value.trim().toLowerCase()
  if(!input) return

  const url = "https://pokeapi.co/api/v2/pokemon/" + encodeURIComponent(input)

  try{
    const response = await fetch(url)
    if(!response.ok) throw new Error("Not found")
    const data = await response.json()
    currentPokemon = data

    document.getElementById("pokemonImage").src = data.sprites.front_default || ""
    document.getElementById("pokemonAudio").src = (data.cries && (data.cries.latest || data.cries.legacy)) ? (data.cries.latest || data.cries.legacy) : ""

    loadMoves(data.moves || [])
  }catch(e){
    currentPokemon = null
    document.getElementById("pokemonImage").src = ""
    document.getElementById("pokemonAudio").src = ""
    loadMoves([])
    alert("Pokemon not found. Try a valid name or ID.")
  }
}

function loadMoves(moves){
  const selects = [
    document.getElementById("move1"),
    document.getElementById("move2"),
    document.getElementById("move3"),
    document.getElementById("move4")
  ]

  for(const s of selects) s.innerHTML = ""

  for(const m of moves){
    const name = m.move.name
    for(const s of selects){
      s.add(new Option(name, name))
    }
  }
}

function addToTeam(){
  if(!currentPokemon) return

  const teamBox = document.getElementById("teamBox")

  const row = document.createElement("div")
  row.className = "teamRow"

  const img = document.createElement("img")
  img.src = currentPokemon.sprites.front_default || ""

  const ul = document.createElement("ul")
  const chosen = [
    document.getElementById("move1").value,
    document.getElementById("move2").value,
    document.getElementById("move3").value,
    document.getElementById("move4").value
  ]

  for(const mv of chosen){
    const li = document.createElement("li")
    li.textContent = mv
    ul.appendChild(li)
  }

  row.appendChild(img)
  row.appendChild(ul)
  teamBox.appendChild(row)
}
