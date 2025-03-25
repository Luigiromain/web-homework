let turn = 0
const display = document.getElementsByClassName("morpion_affichage")[0]
console.log(display)
const buttons = document.querySelector(".cases_morpion")
let array = Array(9)

document.addEventListener('DOMContentLoaded',
    function () {
        buttons.addEventListener('click', next_turn)
        }
    )

function next_turn(event) {
    key = event.target
    if (key.classList.contains("rouge") || key.classList.contains("bleu")) {
        return ;
    }
    if (turn == 0) {
        key.classList.add("rouge")
        array[key.id] = 0
        if (checkwin(key.id)) {
            display.textContent = "Les rouges ont gagné !"
            return
        }
        else {
            display.textContent = "C'est aux bleus de jouer."
            display.classList.remove("rouge")
            display.classList.add("bleu")
            }

    }
    else {
        key.classList.add("bleu")
        array[key.id] = 1
        if (checkwin(key.id)) {
            display.textContent = "Les bleus ont gagné !"
            return
        }
        else {
            display.textContent = "C'est aux rouges de jouer."
            display.classList.remove("bleu")
            display.classList.add("rouge")
            }
        
    }
    turn = 1 - turn
}

function checkwin(place) {
    // check si la ligne est gagnante :
    if (array[place-place%3]== array[place-place%3+1] && array[place-place%3]==array[place-place%3+2]) {
        console.log("test")
        return true
    }
    // check pour la colonne :
    if (array[place%3]== array[place%3 +3] && array[place%3] == array[place%3+6]) {
        return true
    }
    // check les diagonales :

    if (array[4] !== undefined && ((array[0]== array[4] && array[0] == array[8]) || (array[2]== array[4] && array[2] == array[6]))) {
        return true
    }
    return false
}