const XKCD = "https://xkcd.now.sh/?comic="

function fetchIssue(num) {
    fetch(XKCD+String(num))
    .then(response => response.json())
    .then(data => console.log(data.num))
}