import { ProgressBarInterval } from "./ProgressBar.js"
const hackContainer = document.querySelector('.container-hack--main')
const hackInfo = document.querySelector('.container-hack--info')
const hackText = document.querySelector('.container-hack--text')
const container = document.querySelector('.container')
import {txt} from './startTexts.js'

export let interval
let docfrag = document.createDocumentFragment();
let c = hackInfo
let textTable = txt;


export function gameOver() {
    hackInfo.style.display = 'block';
    hackInfo.innerHTML = ""
	hackContainer.innerHTML = ""
	hackText.style.display = 'none';
    const sound = new Audio('./assets/fail.wav')
    sound.play()
    interval = window.setInterval(updateContainer, 200);
    ProgressBarInterval('end', 10 , "", 0, false ) 
}


export function gameStart( gameName, gameTime) {
    container.style.display = ""
    hackInfo.style.display = 'block'
    interval = window.setInterval(updateContainer, 200);
    ProgressBarInterval('start', 10 , gameName, gameTime ) 
}


export function gameWin(){
    hackInfo.style.display = 'block';
	hackContainer.innerHTML = ""
	hackText.style.display = 'none';
    interval = window.setInterval(updateContainer, 200);
    const sound = new Audio('./assets/complete.wav')
    sound.play()
    ProgressBarInterval('end', 10 , "", 0, true ) 
}



function updateContainer() {

    textTable.push(textTable.shift())
    textTable.forEach(function(e) {
        let p = document.createElement("p");
        p.textContent = e;
        docfrag.appendChild(p);
    });
    //Clear DOM body
    while (c.firstChild) {
        c.removeChild(c.firstChild);
    }
    c.appendChild(docfrag);
}