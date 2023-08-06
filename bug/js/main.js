import { bugSvg } from "./bugSvg.js";
import { Square } from "./bugClasses.js";
let container;
let start; //starting grid point
let end; // ending grid point (goal)
let openSet = []; //array containing unevaluated grid points
let closedSet = []; //array containing completely evaluated grid points
let cols = 11;
let rows = 11;
let grid 
let path = [];
let freeBorderSquares = []
let bugPosition = [5,5]


function heuristic(position0, position1) {
    let d1 = Math.abs(position1.x - position0.x);
    let d2 = Math.abs(position1.y - position0.y);
  
    return d1 + d2;
}

//initializing the grid
function InitTable(){
    //making a 2D array
    grid = new Array(cols);
    for (let i = 0; i < cols; i++) {
        grid[i] = new Array(rows);
    }

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j] = createNumberButton(i, j);
            if(i == 0 || j == 0 || i == 10 || j == 10){
                grid[i][j].itsBorder = true
            }
        }
    }

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          grid[i][j].updateNeighbors(grid);
        }
    }
    
    console.log(grid)
}

function createNumberButton(x, y){
    const square = new Square(x, y)
    square.createBugButton()
    
    return square
    
}


function DisplayDivs(){
    container = document.querySelector('.bug-container')
    container.innerHTML = ''
    for(let i = 0; i < grid.length; i++ ){
        for(let j = 0; j < grid[i].length; j++){
            container.appendChild(grid[i][j].div)
        }
    }
}

function UpdateStartAndDeastinationPoint(){
    openSet = []
    start = null
    start = grid[bugPosition[0]][bugPosition[1]]
    const randomDestinationIndex = Math.floor(Math.random() * freeBorderSquares.length )
    end = freeBorderSquares[randomDestinationIndex]
    openSet = []
    openSet.push(start)
}   

function UpdateDestinationPointsTable(){
    freeBorderSquares = []
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
           if(grid[i][j].itsBorder && grid[i][j].canMove){
                freeBorderSquares.push(grid[i][j])
           }
        }
    }
}


function search() {
    while (openSet.length > 0) {
      //assumption lowest index is the first one to begin with
      let lowestIndex = 0;
      for (let i = 0; i < openSet.length; i++) {
        if (openSet[i].f < openSet[lowestIndex].f) {
          lowestIndex = i;
        }
      }
      let current = openSet[lowestIndex];
  
      if (current === end) {
        let temp = current;
        path.push(temp);
        while (temp.parent) {
          path.push(temp.parent);
          temp = temp.parent;
        }
        console.log("DONE!");
        // return the tracedd path
        let p = path.reverse()
        console.log(p)
        return p
        //.reverse();
      }
  
      //remove current from opendSet
      openSet.splice(lowestIndex, 1);
      //add current to closedSet
      closedSet.push(current);
  
      let neighbors = current.neighbors;
  
      for (let i = 0; i < neighbors.length; i++) {
        let neighbor = neighbors[i];
  
        if (!closedSet.includes(neighbor)) {
          let possibleG = current.g + 1;
  
          if (!openSet.includes(neighbor)) {
            openSet.push(neighbor);
          } else if (possibleG >= neighbor.g ) {
            continue;
          }
  
          neighbor.g = possibleG;
          neighbor.h = heuristic(neighbor, end);
          neighbor.f = neighbor.g + neighbor.h;
          neighbor.parent = current;
        }
      }
    }
  
    //no solution by default
    return [];
  }

  function updateNeightboards(){
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          grid[i][j].updateNeighbors(grid);
        }
    }
  }


  function enableButtons(){
    grid.map(buttonInside => {
        buttonInside.map(button =>{
            button.div.onclick = handleButtonClick
        })
    })
}

function handleButtonClick(e){
    
    const x = Number(e.target.dataset.x)
    const y = Number(e.target.dataset.y)
    if(grid[x][y].isBugHere) return
    if(!grid[x][y].canMove) return 
    const pathIndex = path.indexOf(grid[x][y])
    if(pathIndex != -1 ){
        path[pathIndex].diableSquare()
    }
    grid[x][y].diableSquare()
    MoveBug()
    
}

function MoveBug(){
    
    let nextMove = path.shift()
    console.log(nextMove)
    if(!nextMove.canMove) {
        if(path.length < 1 ){ console.log("chuj"); return}
        UpdateDestinationPointsTable()
        UpdateStartAndDeastinationPoint()
        updateNeightboards()
        path = []
        search()
       
        MoveBug()
    }else {
        grid[bugPosition[0]][bugPosition[1]].deleteBugFromSquare()
        bugPosition = [nextMove.x, nextMove.y]
        nextMove.addBugToSquare(bugSvg)
    }
        
    
    
    
    
}

function clearAll(){
    container = ""
    start; //starting grid point
    end; // ending grid point (goal)
    openSet = []; //array containing unevaluated grid points
    closedSet = []; //array containing completely evaluated grid points
    cols = 11;
    rows = 11;
    grid 
    path = [];
    freeBorderSquares = []
}

clearAll()
InitTable()
DisplayDivs()
UpdateDestinationPointsTable()
UpdateStartAndDeastinationPoint()
enableButtons()
path = search()
grid[bugPosition[0]][bugPosition[1]].addBugToSquare(bugSvg)
path.shift()
console.log(path);








// InitTable()
// DisplayDivs()
// enableButtons()
// bug.addBugToSquare(panelButtons[5][5])
