const placeForTime = document.querySelector(".time");
const playBtn = document.querySelector(".buttonPlay");
const pauseBtn = document.querySelector(".buttonPause");
const stopBtn = document.querySelector(".buttonStop");
const resetBtn = document.querySelector(".buttonReset");
const saveBtn = document.querySelector(".buttonSave");
const nextBtn = document.querySelector(".buttonNext");
const showSaved = document.querySelector(".buttonShow");

let play;
let timeZero;
let timePassed = 0;
let newTime;
let stopClicked = false;

//FUNCTIONS
function playWithouthReset(){
    timeZero = Date.now() - timePassed;
    play = setInterval(() => {
        timePassed = Date.now() - timeZero;
        newTime = `${timeRendered(timePassed)}`;
        placeForTime.innerHTML = newTime;
        return newTime;
    }, 10);
};

function playWithReset(){
    placeForTime.innerHTML = `00:00.00`;
        timePassed = 0;
        counter = 0;
        placeForTimes.innerHTML = ``;
        timeZero = Date.now() - timePassed;
    play = setInterval(() => {
        timePassed = Date.now() - timeZero;
        newTime = `${timeRendered(timePassed)}`;
        placeForTime.innerHTML = newTime;
        return newTime;
    }, 10);
stopClicked = false
};

function reset(){
    clearInterval(play);
    placeForTime.innerHTML = `00:00.00`;
    timePassed = 0;
    counter = 0;
    placeForTimes.innerHTML = ``;
    stopClicked = false;
    pauseClicked = false;
    playBtn.disabled = false;
    stopBtn.classList.add("hidden");
}

// window.localStorage.getItem('First person');

//PLAY

playBtn.addEventListener("click", () => {
    playBtn.disabled = true;
    stopBtn.disabled = false;
 
    stopBtn.classList.remove("hidden");
    
    if (pauseClicked === true)
    {
        playWithouthReset();
        pauseClicked = false;
        
    }
    else if (stopClicked === true || pauseClicked === false)
    {
        playWithReset()
    }

    }
);

//STOP
stopClicked = false;
stopBtn.addEventListener("click",  function stop() {
    stopBtn.classList.add("hidden");
    clearInterval(play);
    
    stopClicked = true;
playBtn.disabled=false;})

//PAUSE
let pauseClicked = false;

pauseBtn.addEventListener("click",  () => {   

    if (pauseClicked === false){
        clearInterval(play);
        pauseClicked = true;
        
}
else if (pauseClicked === true) {
    playWithouthReset();
    pauseClicked = false;
    
}
playBtn.disabled = false;
})

//SAVE IN LOCAL STORAGE 

let keyNamesStorage = [];
let emptyRows = [[], [], [], [], [], [], [], [], [], []];

saveBtn.addEventListener("click", () => {
    if (stopClicked === true) {
        let keyName = prompt("Give the name");
        keyNamesStorage.push(keyName);
        reset();

        // remove doubled names from array of names
        let uniqueArray = [];
        for (let i = 0; i < keyNamesStorage.length; i++) {
            if (uniqueArray.indexOf(keyNamesStorage[i]) === -1) {
                uniqueArray.push(keyNamesStorage[i]);
            }
        }

        console.log(uniqueArray);

        let newArr = [...emptyRows];
        let indexTobeChanged = uniqueArray.indexOf(keyName);

        newArr[indexTobeChanged].push(newTime);

        for (let i = 0; i < newArr.length; i++) {
            newArr[i];
        }

        stopClicked = false;
        window.localStorage.setItem(keyName, JSON.stringify(newArr[indexTobeChanged]));
        firebase.firestore().collection("times").add({
            nameSaved: keyName,
            timesSaved: JSON.stringify(newArr[indexTobeChanged])
            })
    }
    else {
        alert("Stop the timer to save the result.")
    }
});

//SAVE IN FIREBASE
// firebase.firestore().collection("times").add({
// nameSaved: keyName,
// timesSaved: JSON.stringify(newArr[indexTobeChanged])
// })

//SHOW RESULTS SAVED IN LOCAL STORAGE
showSaved.addEventListener("click", () => {
    let placeForTimesFromStorage = document.querySelector(".listFromStorage");
    let tableOfStoredValues = [];
    let names = [];
    let counter = 0;
    
    for(var i =0; i < localStorage.length; i++){

        let keyNames = window.localStorage.key(i);
        let elem = window.localStorage.key(i) + localStorage.getItem(localStorage.key(i));
// let tableOfStoredValues = table.sort();
names.push(keyNames);

console.log(names);
    let p = document.createElement("p");
let html = `<p>${counter}. ${names[i]}</p>`;
p.innerHTML = html;
placeForTimesFromStorage.appendChild(p);


tableOfStoredValues.push(elem);


    }

tableOfStoredValues.filter((elem) =>{
})

    console.log(tableOfStoredValues);
console.log(names); 
})

///NEXT - SAVE AND SHOW CURRENT RESULT AND CONTINUE GOING
let placeForTimes = document.querySelector(".times");
let counter = 0;

nextBtn.addEventListener("click", () => {
    counter = counter + 1;
    let p = document.createElement("p");
    let html = `<p>${counter}. ${newTime}</p>`;
    p.innerHTML = html;
    placeForTimes.appendChild(p);
}
)

//RESET
resetBtn.addEventListener("click", () => {
    reset();
})

//RENDER AND FORMAT OF DISPLAYING TIME
function timeRendered(dateUpdated) {
    
    let hours = Math.floor(dateUpdated / 3600000);
    let minutes = Math.floor(((dateUpdated / 3600000) - hours) * 60);
    let seconds = Math.floor((((dateUpdated / 3600000) - hours) * 60 - minutes) * 60);
    let milisec = Math.floor(((((dateUpdated / 3600000) - hours) * 60 - minutes) * 60 - seconds) * 100);

    let minFormat = minutes.toString();
    let secFormat = seconds.toString();
    let milisecFormat = milisec.toString();

    let wholeTime = `${minFormat.padStart(2, "0")}:${secFormat.padStart(2, "0")}.${milisecFormat.padStart(2, "0")}`;
    return wholeTime;
};
