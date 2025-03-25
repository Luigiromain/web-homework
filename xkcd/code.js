const XKCD = "https://xkcd.now.sh/?comic=";
let current_number = ""
let latest_number = ""

function fetchIssue(num) {
    console.log("Fetching comic:", num);
    return fetch(XKCD + String(num))
        .then(response => response.json())
        .then(data => {
            console.log("Fetched data:", data)
            current_number = data.num
            document.getElementById("num").placeholder = current_number
            document.getElementById("xkcd").children[0].src=data.img
            return data
        })
}

document.addEventListener('DOMContentLoaded',
    function () {
        document.getElementById("reset").addEventListener('click', function () {
            fetchIssue("latest").then(data => {latest_number = data.num})
        })
        document.getElementById("previous").addEventListener('click', function () {fetchIssue(current_number - 1)})

        document.getElementById("next").addEventListener('click', function () {
            console.log(current_number, latest_number)
            if (Number(current_number) < Number(latest_number)) { // vérification que le bouton next a un sens
                fetchIssue(current_number + 1)}})
        

        document.getElementById("rechercher").addEventListener("click", function () { //prends en compte l'input de l'utilisateur
            fetchIssue(document.getElementById("num").value)
        
        })}
    )
// faire question 2