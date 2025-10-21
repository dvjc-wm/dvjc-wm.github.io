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

        const versionHistory = await response.json();
        
        let tableElement = document.getElementById('versionHistoryTable');
        if (!!tableElement){
            Object.keys(versionHistory).forEach( versionKey => {
                let record = versionHistory[versionKey];
                var tr = document.createElement("tr");
                var td1 = document.createElement("td");
                td1.classList = ['versionInfoC1'];
                td1.createTextNode = record.version;
                tr.appendChild(td1);
                var td2 = document.createElement("td");
                td2.classList = ['versionInfoC2'];
                td2.createTextNode = record.time;
                tr.appendChild(td2);
                var td3 = document.createElement("td");
                td3.classList = ['versionInfoC3'];
                td3.createTextNode = record.text;
                tr.appendChild(td3);
                tableElement.appendChild(tr);
            });
        }
    } catch (error) {
        console.error(error.message);
    }
}

// triviality
function hamburger(details){
    alert('nope!');
}