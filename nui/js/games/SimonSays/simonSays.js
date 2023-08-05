import { utilsManager }  from '../../utils.js'
import { SimonSaysView } from './view.js';
import { SimonSays } from '../../config.js';
import { gameOver, gameWin } from '../../gameStates.js';
const hackText = document.querySelector('.container-hack--text')

let computerSquares;
let userSquares;
let computerSelection = [] 
let userSelection = [];
let round = 0



export function GameInit() {    
    //clear variables and hack component 
    ResetGame()
    // add Simon says view html
    utilsManager.addChild('.container-hack--main', SimonSaysView())
    // 
    computerSquares = document.querySelectorAll('.square')
    userSquares = document.querySelectorAll('.user-square')
   
    setTimeout(play, 2000) 
}


function play(){
    disableUserSquare();  
    let newSquare = getRandomSquare();
    console.log(newSquare.id)
    computerSelection.push(newSquare);
  
      const userTurnDelay = (computerSelection.length + 1) * 400;
      computerSelection.forEach(function (square, index) {
          const delay = (index + 1) * SimonSays.showTime;
          setTimeout(function () {
            highlightSquare(square); 
          }, delay);
        });
  
        setTimeout(function () { 
          enableUserSquare();
        }, userTurnDelay);
  }
  
  function checkUserSelection(e) {
      const square = e.target;
      highlightPlayerSquare(square);
      userSelection.push(square);
    
      const computerSquare = computerSelection[userSelection.length - 1];
      if (square.id !== computerSquare.id) {
        gameOver();
        return;
      }
    
      if (userSelection.length === computerSelection.length) {
        round ++
        setTimeout(play, 1000);
        userSelection = []
      }

      if(round == SimonSays.round){
        gameWin()
        return;
      }
    }
  
  function disableUserSquare() {
      userSquares.forEach(function (e) {
        e.onclick = "";
      });
    }
    
    function enableUserSquare() {
      userSquares.forEach(function (userSquares) {
          userSquares.onclick = checkUserSelection;
      });
    }
  
  function getRandomSquare() {
      let index = Math.floor(Math.random() * 9);
      return computerSquares[index];
    }
  
  function highlightSquare(square) {
      playSound(square.id)
      square.style.filter = "brightness(180%)";
      square.style.opacity = "1";
      setTimeout(function () {
        square.style.opacity = "0";
      }, 400);
    }
    
    function highlightPlayerSquare(square) {
      playSound(square.id)
      square.style.filter = "brightness(180%)";
      setTimeout(function () {
          square.style.filter = "brightness(100%)";
        }, 400);
     
    }
    
  function playSound(element) {
      // audio table with sounds of buttons
      const audio = [
          new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'),
          new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'),
          new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'),
          new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3')
      ]
      // switch to play sounds
      switch(element % 3){
          case 0: 
              audio[0].volume = 0.5;
              audio[0].play();
          break;
          case 1: 
              audio[1].volume = 0.5;
              audio[1].play();
          break;
          case 2: 
              audio[2].volume = 0.5;
              audio[3].play();
          break;
          default: 
              audio[3].volume = 0.5;
              audio[3].play();
          break;
      }
  }

function ResetGame(){
    document.querySelector('.container-hack--main').innerHTML = '';
    computerSelection = [];
    userSelection = [];
    round = 0;
}