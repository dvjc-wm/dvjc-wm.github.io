function openMazeTab(tabName) {
  var i;
  var x = document.getElementsByClassName("mzTab");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  document.getElementById(tabName).style.display = "block";

  if (tabName == 'versionInfo'){
    refreshVersionHistory();
  }
}

function toggleDisplay(eleId){
    if (!!document.getElementById(eleId)){
        let currentDisplay = document.getElementById(eleId).style.display;
        let updatedDisplay = currentDisplay == "block" ? "none" : "block";
        document.getElementById(eleId).style.display = updatedDisplay;
    }
}

let versionHistory = {

};
async function refreshVersionHistory(){
    const url = 'https://dvjc-wm.github.io/versionInfo.txt';
    try {
        const response = await fetch(url);
        if (!response.ok){
            throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();
        console.log(result);
    } catch (error) {
        console.error(error.message);
    }
}

// triviality
function hamburger(details){
    alert('nope!');
}