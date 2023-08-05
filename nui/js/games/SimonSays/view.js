
export function SimonSaysView(){ 
    return `
    <section class="squares-container computer-selections">
        <div id="1" class="square"></div>
        <div id="2" class="square"></div>
        <div id="3" class="square"></div>
        <div id="4" class="square"></div>
        <div id="5" class="square"></div>
        <div id="6" class="square"></div>
        <div id="7" class="square"></div>
        <div id="8" class="square"></div>
        <div id="9" class="square"></div>
        <audio class="audio-error" src="assets/error.wav"></audio>
    </section>

    <section class="squares-container player-squares" style="margin-left: auto;">
        <div id="1" class="user-square"></div>
        <div id="2" class="user-square"></div>
        <div id="3" class="user-square"></div>
        <div id="4" class="user-square"></div>
        <div id="5" class="user-square"></div>
        <div id="6" class="user-square"></div>
        <div id="7" class="user-square"></div>
        <div id="8" class="user-square"></div>
        <div id="9" class="user-square"></div>
        <audio class="audio-error" src="assets/error.wav"></audio>
    </section>    
        
    `
}