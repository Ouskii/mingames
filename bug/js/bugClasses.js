
export class Square {
    constructor(x,y){
        this.canMove = true // its square free to move 
        this.div 
        this.isBugHere = false // is "bug" on this position
        this.x = x; //x location of the grid point
        this.y = y; //y location of the grid point
        this.f = 0; //total cost function
        this.g = 0; //cost function from start to the current grid point
        this.h = 0; //heuristic estimated cost function from current grid point to the goal
        this.neighbors = []; // neighbors of the current grid point
        this.parent = undefined; // immediate source of the current grid point
        this.itsBorder

    }

    createBugButton(){
        this.div = document.createElement('div');
        this.div.classList.add('bug-button');
        this.div.dataset.x = this.x;
        this.div.dataset.y = this.y;
    }

    // update neighbors array for a given grid point
    updateNeighbors(grid) {
        this.neighbors = new Array()
        let i = this.x;
        let j = this.y;
        if (i < 11 - 1 && grid[i + 1][j].canMove) {
            this.neighbors.push(grid[i + 1][j]);
        }
        if (i > 0 && grid[i - 1][j].canMove) {
            this.neighbors.push(grid[i - 1][j]);
        }
        if (j < 11 - 1 && grid[i][j + 1].canMove) {
            this.neighbors.push(grid[i][j + 1]);
        }
        if (j > 0 && grid[i][j - 1].canMove) {
            this.neighbors.push(grid[i][j - 1]);
        }
        if(i < 10 && j < 10 && grid[i + 1][j + 1].canMove){
            this.neighbors.push(grid[i + 1][j + 1]);
        }
          
        if(i < 10 && j >0 && grid[i + 1][j - 1].canMove){
            this.neighbors.push(grid[i + 1][j - 1]);
        }
      
    };

    diableSquare(){
        this.canMove = false
        this.div.classList.add('active-bug')
    }

    addBugToSquare(img){
        if(!this.canMove) return
        this.div.insertAdjacentHTML("beforeend", img);
        this.isBugHere = true
    }

    deleteBugFromSquare(){
        this.div.innerHTML = ''
        this.isBugHere = false
    }

}