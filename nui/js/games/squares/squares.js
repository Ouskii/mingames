import { squares } from "../../config.js";
import { gameOver, gameWin } from "../../gameStates.js";
import { utilsManager } from "../../utils.js";
import { SquaresContainer } from "./view.js";



let squaresInterval
let squaresTable = []; 
let squarePanel;
let allSquares = 0;


export function SquaresInitGame(){
    ResetGame()
    createSquares()
    utilsManager.addChild('.container-hack--main', SquaresContainer())
    displaySquares()
    generateNewSquare()
    enableButtons()
}


function createSquares(){
    for(let i = 0; i < 49; i++){
        const el = document.createElement('div');
		el.classList.add('el-square');
		el.setAttribute('id', i);
        squaresTable.push(el)
    }
}

function displaySquares(){
    squarePanel = document.querySelector('.squares--container');
    squarePanel.innerHTML = ''
    squaresTable.map(square => {
        squarePanel.appendChild(square)
    })
}



function enableButtons(){
    squaresTable.map((button) => {
        button.onclick = handleButtonClick;
      })
}

function handleButtonClick(e){
    let square = squaresTable[e.target.id]
    if(square.classList.contains('square-selected')){
        square.classList.remove('square-selected')
        allSquares --
    }
    else{
        gameOver();
        ResetGame();
    }
}

function generateNewSquare(){
    squaresInterval = setInterval(() => {
        let randomIndex = Math.floor(Math.random() * squaresTable.length - 1)
        let element = squaresTable[randomIndex]
        let buttonEnable = true;

        if(element.classList.contains('square-selected')) buttonEnable = false;

        if(buttonEnable){
            element.classList.add('square-selected')
            allSquares ++
        }

        if(allSquares > squares.defaultMaxsquare) {gameOver(); ResetGame()};

    }, squares.squaresSpawnTime)
}


function ResetGame(){
    clearInterval(squaresInterval)
    squaresTable = []; 
    allSquares = 0;
}