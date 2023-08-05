import { gameStart } from "./gameStates.js";

window.addEventListener('message', ({data}) => {
    const {action, actionData} = data;
    if (action == "OPEN") {
        if(!actionData) return;
        gameStart(actionData.gameName, actionData.playTime)
    }
})
