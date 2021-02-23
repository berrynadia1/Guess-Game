// Access the DOM element 'msg'
const msgEl = document.getElementById('msg');
const randomNum = getRanNum();

// Create a Random Number
function getRanNum(){
    return Math.floor(Math.random()*100) + 1;
}



console.log('Number:' + randomNum)
// Line 14 - 20 are utilizing the code from API
// Initalize the Speech Recognition object

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

// Create a new Instance called recognition
let recognition = new window.SpeechRecognition();

recognition.start();

recognition.addEventListener('result', onSpeak);

function onSpeak(e){
    // console.log(e)
    const msg = e.results[0][0].transcript;
    console.log(msg);


    writeMessage(msg);
    checkNumber(msg);
}
// display user's input into the UI
function writeMessage(msg){
    msgEl.innerHTML = `
    <div>You said: </div>
    <span class="box">${msg}</span>
        `;
}
// Check the user's guess against the number
function checkNumber(msg){
    const num = +msg;

    //Check number to see if it's valid
    if(Number .isNaN(num)){
msgEl.innerHTML += `<div>That is not a valid number</div>`
return;
    }

    //Check if number is in range 
    //So the number needs to be between 1 and 100
    if(num>100 || num<1){
        msgEl.innerHTML += `<div>Number must be between 1 and 100</div>`
return;
    }
    //Check the number
    if(num === randomNum){
        //Let the user know they have won
        document.body.innerHTML = `
        <h2>CONGRATS! You have guessed the right number!!!<br><br>
        It was ${num}</h2>
        <button class="play-again" id="play-again">Play Again</button>
        `;
    } else if(num > randomNum){
        msgEl.innerHTML += `<div>GO LOWER</div>`;
    } else{
        msgEl.innerHTML += `<div>GO HIGHER</div>`;
    }

}



//End speech recognition service
recognition.addEventListener('end', () => recognition.start());

document.body.addEventListener('click', e => {
    if(e.target.id == 'play-again'){
        window.location.reload();
    }
})