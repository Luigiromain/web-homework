const XKCD = "https://xkcd.now.sh/?comic=";

function fetchIssue(num) {
    console.log("Fetching comic:", num);
    fetch(XKCD + String(num))
        .then(response => response.json())
        .then(data => {
            console.log("Fetched data:", data)
            document.getElementById("num").textContent = data.num
            document.getElementById("xkcd").children[0].src=data.img
        })
}

document.addEventListener('DOMContentLoaded',
    function () {
        document.getElementById("reset").addEventListener('click', function () {
            fetchIssue("latest")
        })
        }
    )