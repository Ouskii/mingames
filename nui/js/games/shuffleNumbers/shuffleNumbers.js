import { ShuffleNumbersContainer } from "./view.js"
import { gameOver, gameWin } from '../../gameStates.js';
import { utilsManager }  from '../../utils.js'
import { ShuffleNumbers } from "../../config.js";

let panelButtons = [];
let numbersPanel;
let nextNumber = 1;
const maxNumber = ShuffleNumbers.size;


export function ShuffleNumbersGameInit(){
    ResetGame()
    InitNumbersTable()
    utilsManager.addChild('.container-hack--main', ShuffleNumbersContainer())
    document.querySelector('.shuffle-numbers-container').style['grid-template-rows'] =  `repeat(${ShuffleNumbers.size / 5}, 100px)`;
    shuffleNumbersButtons()
    enableButtons()
}

function InitNumbersTable(){
    for (let i = 1; i <= maxNumber ; i++){
        createNumberButton(i)
    }
}

function createNumberButton(id){
    let panelButton = document.createElement('div');
    panelButton.classList.add('shuffle-numbers-button');
    panelButton.innerText = id
    panelButton.id = id
    panelButtons.push(panelButton)
}

function shuffleNumbersButtons(){
    numbersPanel = document.querySelector('.shuffle-numbers-container');
    numbersPanel.innerHTML = "";
    let panelButtonsCopy = [...panelButtons]
    for(let i = 0; i < panelButtons.length; i++){
        const buttonIndex = Math.floor(Math.random() * panelButtonsCopy.length);
        numbersPanel.appendChild(panelButtonsCopy[buttonIndex])
        panelButtonsCopy.splice(buttonIndex, 1);
    }
}

function enableButtons(){
    panelButtons.map((button, index) => {
        button.onclick = handleButtonClick;
      })
}

function activateButton(buttonIndex){
    panelButtons[buttonIndex - 1].classList.add('active-number');
    panelButtons[buttonIndex - 1].onclick = "";
}


function playSound(){
    const sound = new Audio('./assets/click.wav')
    sound.volume = 0.5;
    sound.play()
}

function handleButtonClick(e){
    playSound()
    if(e.target.id == nextNumber){
        activateButton(e.target.id)

        if(e.target.id == maxNumber){
            gameWin()
            return
        }

        nextNumber++;
        shuffleNumbersButtons()
    }
    else {
        gameOver()
    }
}


function ResetGame(){
    nextNumber = 1; 
    panelButtons = []
}