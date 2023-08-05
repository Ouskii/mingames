import { gameIndexes } from "./gameIndexes.js";
const progressBar = document.getElementById('progress-bar');
const hackContainer = document.querySelector('.container-hack--main')
const hackInfo = document.querySelector('.container-hack--info')
const hackText = document.querySelector('.container-hack--text')
const container = document.querySelector('.container')
import { gameOver } from "./gameStates.js";
import { apiPost } from "./utils.js";
import { interval } from "./gameStates.js";

let progressBarInterval



export function ProgressBarInterval(type, time, gameToInit = "", __timePlay = 0, won = false) {
    const maxWidth = 1000;
    let width = maxWidth;

    const process = () => {

        if(width > 0){
            if(type == 'start' || type == 'end')width = width - 3;      
            else width --
            progressBar.style.width = `${(width * 100.0) / maxWidth}%` 
        }
        else {
            if(type == 'start'){
                hackInfo.style.display = 'none'
                hackText.style.display = ''
                hackContainer.style.display = ''
                gameIndexes[gameToInit]()
                clearInterval(interval)
                ProgressBarInterval('game', __timePlay, gameToInit);
                
                return;
            }
            if (type =='game'){
                gameOver()
                return;
            }    
            if (type =='end'){
                // setting all components to not displaying on screen
                hackContainer.innerHTML = ''
                hackContainer.style.display = 'none'
                hackInfo.style.display = 'none'
                hackText.style.display = 'none'
                container.style.display = 'none'
                apiPost({action: "EXIT", gameState: won})
                clearInterval(interval)
                clearInterval(progressBarInterval)
                return;
            }
        }
    }

    clearInterval(progressBarInterval)
    progressBarInterval = setInterval(process, time)
}



