function openMazeTab(tabName) {
  var i;
  var x = document.getElementsByClassName("mzTab");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  document.getElementById(tabName).style.display = "block";
}

function toggleDisplay(eleId){
    if (!!document.getElementById(eleId)){
        let currentDisplay = document.getElementById(eleId).style.display;
        let updatedDisplay = currentDisplay == "block" ? "none" : "block";
        document.getElementById(eleId).style.display = updatedDisplay;
    }
}

// trivial change
function displayAlert(message){
    alert(message);
}