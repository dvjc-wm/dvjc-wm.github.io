let previouslyRefreshedVersionHistory = false;
function openMazeTab(tabName) {
  var i;
  var x = document.getElementsByClassName("mzTab");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  document.getElementById(tabName).style.display = "block";

  if (tabName == 'versionInfo' && !previouslyRefreshedVersionHistory){
    previouslyRefreshedVersionHistory = !previouslyRefreshedVersionHistory;
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

            // add new
            Object.keys(versionHistory).forEach( versionKey => {
                let record = versionHistory[versionKey];
                var tr = document.createElement("tr");

                var td1 = document.createElement("td");
                td1.classList = ['versionInfoC1'];
                td1.innerText = record.version;
                tr.appendChild(td1);

                var td2 = document.createElement("td");
                td2.classList = ['versionInfoC2'];
                td2.innerText = record.time;
                tr.appendChild(td2);

                var td3 = document.createElement("td");
                td3.classList = ['versionInfoC3'];
                td3.innerText = record.text;
                tr.appendChild(td3);

                tableElement.appendChild(tr);
            });
        }
    } catch (error) {
        console.error(error.message);
    }
}

function getNextIndex(){
    let buttonIndex = '00';
    let programElement = document.getElementById("programmedCommands");
    if (!!programElement){
        let current_count = programElement.children.length;
        buttonIndex = ('00' + current_count).substring(('00' + current_count).length-2);
        let buttonId = `button${buttonIndex}`;
        while (!!document.getElementById(buttonId)){
            current_count++;
            buttonIndex = ('00' + current_count).substring(('00' + current_count).length-2);
            buttonId = `button${buttonIndex}`;
        }
    }
    return buttonIndex;
}

function addCommand(command){
    let programElement = document.getElementById("programmedCommands");
    if (!!programElement){
        let li = document.createElement("li");

        let input = document.createElement("input");
        let buttonIndex = getNextIndex();
        let buttonId = `button${buttonIndex}`;

        let li_id = `listItem${buttonIndex}`;
        li.setAttributeNS(null, "id", li_id);

        input.setAttributeNS(null, "id", buttonId);
        input.setAttributeNS(null, "type","button");
        input.setAttributeNS(null, "onclick",`removeCommand('${li_id}')`);
        input.setAttributeNS(null, "value",command);

        li.appendChild(input);

        programElement.appendChild(li);
    }
}

function removeCommand(buttonId){
    let li = document.getElementById(buttonId);
    if (!!li){
        li.parentNode.removeChild(li);
    }
}

/* polar - north, west, south, east
// walls: 1 - north
          2 - west
          4 - south
          8 - east
    so, for instances, west + south = 6
//*/          
let mazeBoard = [
    // meta - width, height, exit { position, direction }, entrance (position, direction)
    [ 5, 5, { position: { x: 2, y: 0 }, direction: 1 },  { position: { x: 4, y: 4 }, direction: 4 } ],
    // 
    [   // example 5x5
        [  3,  4,  5,  1,  9],
        [ 10,  3,  5,  8, 14],
        [ 14,  6,  1,  6,  9],
        [ 11,  3, 12,  3, 12],
        [  6,  4, 13,  6,  9],
    ]
];
function drawMazeBoard(){
    let ele = document.getElementById('mazeBoard');
    if (!!ele){
        ele.innerHTML = "";
        let table = document.createElement('table');
        table.style = "text-align: center; border-collapse: collapse;";
        let tbody = document.createElement('tbody');

        let x = mazeBoard[0][0];
        let y = mazeBoard[0][1];
        for (let j = 0; j < y; j++){
            let tr = document.createElement('tr');
            tr.style = "height: 2em;";
            for (let i = 0; i < x; i++){
                let td = document.createElement("td");
                let text = mazeBoard[1][j][i];
                td.style.width = "2em";
                td.style.borderCollapse = "collapse";
                if (text >= 8) {
                    td.style.borderRight = "2px solid black";
                    text -= 8;
                }
                if (text >= 4) {
                    td.style.borderBottom = "2px solid black";
                    text -= 4;
                }
                if (text >= 2) {
                    td.style.borderLeft = "2px solid black";
                    text -= 2;
                }
                if (text >= 1) {
                    td.style.borderTop = "2px solid black";
                    text -= 1;
                }
                //td.innerText = text;
                tr.appendChild(td);
            }
            tbody.appendChild(tr);
        }
        table.appendChild(tbody);
        ele.appendChild(table);
    }
}