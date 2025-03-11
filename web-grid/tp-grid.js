document.addEventListener("DOMContentLoaded", () => {
  // Initial clean up. DO NOT REMOVE.
  initialCleanup();
  var grid = document.getElementById("grid");
  for (const child of grid.children){
    child.style.backgroundColor = "rgb(240, 128, 128)";
  }
  document.getElementById("original").innerHTML = 30;
  document.getElementById("clicked").innerHTML = 0;
  document.getElementById("blue").innerHTML = 0;
  document.getElementById("total").innerHTML = 30;
  var btn1 = document.getElementById("btn-add-line");
  btn1.addEventListener("click", addLine);
  var btn2 = document.getElementById("btn-rmv-line");
  btn2.addEventListener("click", removeLine);
  grid.addEventListener("click", colorChange);
  grid.addEventListener("mouseover", hoverColor);
});

/**
 * Cleans up the document so that the exercise is easier.
 *
 * There are some text and comment nodes that are in the initial DOM, it's nice
 * to clean them up beforehand.
 */
function initialCleanup() {
  const nodesToRemove = [];
  document.getElementById("grid").childNodes.forEach((node, key) => {
    if (node.nodeType !== Node.ELEMENT_NODE) {
      nodesToRemove.push(node);
    }
  });
  for (const node of nodesToRemove) {
    node.remove();
  }
}

function addLine() {
  const parent = document.getElementById("grid");
  for (let i = 0; i < 10; i++){
    var newDiv = document.createElement("div");
    newDiv.style.backgroundColor = "rgb(240, 128, 128)";
    parent.appendChild(newDiv);
  }
  document.getElementById("total").innerHTML = parseInt(document.getElementById("total").innerHTML) + 10;
  document.getElementById("original").innerHTML = parseInt(document.getElementById("original").innerHTML) + 10;
}

function removeLine(){
  var grid = document.getElementById("grid");
  if (grid.childElementCount < 10) return;
  var to_remove = Array.from(grid.children).slice(-10);
  for(let i = 0; i < 10; i++) {
    const el = to_remove[i];
    old = el.style.backgroundColor;
    if (old == "rgb(0, 0, 255)"){
      document.getElementById("blue").innerHTML = parseInt(document.getElementById("blue").innerHTML) - 1;
      document.getElementById("total").innerHTML = parseInt(document.getElementById("total").innerHTML) - 1;
    }
    else if (old == "rgb(240, 128, 128)"){
      document.getElementById("original").innerHTML = parseInt(document.getElementById("original").innerHTML) - 1;
      document.getElementById("total").innerHTML = parseInt(document.getElementById("total").innerHTML) - 1;
    }
    else {
      document.getElementById("clicked").innerHTML = parseInt(document.getElementById("clicked").innerHTML) - 1;
      document.getElementById("total").innerHTML = parseInt(document.getElementById("total").innerHTML) - 1;
    }
    el.remove();
  }
}

function colorChange(e) {
  let carre = e.target.closest("#grid > div");
  if(carre === null) return;
  const old = carre.style.backgroundColor;
  carre.style.backgroundColor = getRandomColor();
  if (old == "#0000ff"){
    document.getElementById("blue").innerHTML = parseInt(document.getElementById("blue").innerHTML) - 1;
    document.getElementById("clicked").innerHTML = parseInt(document.getElementById("clicked").innerHTML) + 1;
  }
  else if (old == "rgb(240, 128, 128)"){
    document.getElementById("original").innerHTML = parseInt(document.getElementById("original").innerHTML) - 1;
    document.getElementById("clicked").innerHTML = parseInt(document.getElementById("clicked").innerHTML) + 1;
  }
}

function hoverColor(e) {
  let carre = e.target.closest("#grid > div");
  if(carre === null) return;
  const old = carre.style.backgroundColor;
  carre.style.backgroundColor = "#0000FF";
  if (old == "rgb(0, 0, 255)") return;
  if (old == "rgb(240, 128, 128)"){
    document.getElementById("original").innerHTML = parseInt(document.getElementById("original").innerHTML) - 1;
    document.getElementById("blue").innerHTML = parseInt(document.getElementById("blue").innerHTML) + 1;
  }
  else {
    document.getElementById("clicked").innerHTML = parseInt(document.getElementById("clicked").innerHTML) - 1;
    document.getElementById("blue").innerHTML = parseInt(document.getElementById("blue").innerHTML) + 1;
  }
}
  
function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}