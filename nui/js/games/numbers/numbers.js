import { utilsManager }  from '../../utils.js'
import { gameOver, gameWin } from '../../gameStates.js';
import { NumbersContainer } from './view.js';
let panelButtons = [];
let numbersPanel;
let nextNumber = 1;
const maxNumber = 10;


export function NumbersGameInit(){
    ResetGame()
    InitNumbersTable()
    utilsManager.addChild('.container-hack--main', NumbersContainer())
    shuffleNumbersButtons()
    enableButtons()
}

function InitNumbersTable(){
    for (let i = 1; i <=10; i++){
        createNumberButton(i)
    }
}

function createNumberButton(id){
    let panelButton = document.createElement('div');
    panelButton.classList.add('numbers-button');
    panelButton.innerText = id
    panelButton.id = id
    panelButtons.push(panelButton)
}

function shuffleNumbersButtons(){
    numbersPanel = document.querySelector('.numbers-container');
    numbersPanel.innerHTML = "";
    let panelButtonsCopy = [...panelButtons]
    for(let i = 0; i < panelButtons.length; i++){
        const buttonIndex = Math.floor(Math.random() * panelButtonsCopy.length);
        numbersPanel.appendChild(panelButtonsCopy[buttonIndex])
        panelButtonsCopy.splice(buttonIndex, 1);
    }
}

function disableButtons(){
    panelButtons.map(button => {
        button.onclick = "";
    })
}

function playSound(){
    const sound = new Audio('./assets/click.wav')
    sound.play()
}


function enableButtons(){
    panelButtons.map((button, index) => {
        button.onclick =handleButtonClick;
      })
}

function activateButton(buttonIndex){
    panelButtons[buttonIndex - 1].classList.add('active-number');
    panelButtons[buttonIndex - 1].onclick = "";
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
    }
    else {
        gameOver()
    }
}


function ResetGame(){
    nextNumber = 1; 
    panelButtons = []
}