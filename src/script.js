// firebase.initializeApp(firebaseConfig);

const placeForTime = document.querySelector(".time");
const playBtn = document.querySelector(".buttonPlay");
const pauseBtn = document.querySelector(".buttonPause");
const stopBtn = document.querySelector(".buttonStop");
const resetBtn = document.querySelector(".buttonReset");
const saveBtn = document.querySelector(".buttonSave");
const nextBtn = document.querySelector(".buttonNext");
const showSaved = document.querySelector(".buttonShow");
const sendFirebase = document.querySelector(".buttonFirebase")


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
    nextBtn.disabled = true;
    stopClicked = false;
    pauseClicked = false;
    playBtn.disabled = false;
    nextBtn.disabled = true;
    pauseBtn.disabled = true;
    showClicked = false;
    stopBtn.classList.add("hidden");
    document.querySelector(".listFromStorage").innerHTML = "";
}

//PLAY
let playClicked;

playBtn.addEventListener("click", () => {
    nextBtn.disabled = false;
    playBtn.disabled = true;
    stopBtn.disabled = false;
    pauseBtn.disabled = false;
    saveBtn.classList.add("hidden");
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
    saveBtn.classList.remove("hidden");
    clearInterval(play);
    pauseBtn.disabled = true;
    stopClicked = true;
    nextBtn.disabled = true;
playBtn.disabled=false;})

//PAUSE
let pauseClicked = false;
pauseBtn.disabled = true;

saveBtn.classList.add("hidden");

pauseBtn.addEventListener("click",  () => {   

    if (pauseClicked === false){
        nextBtn.disabled = true;
        clearInterval(play);
        pauseClicked = true;
        
}
else if (pauseClicked === true) {
    nextBtn.disabled = false;
    playWithouthReset();
    pauseClicked = false;
    
}
playBtn.disabled = false;
})

//SAVE IN LOCAL STORAGE 

let keyNamesStorage = [];
let emptyRows = [[], [], [], [], [], [], [], [], [], []];

saveBtn.addEventListener("click", () => {
    saveBtn.classList.add("hidden");
    if (stopClicked === true) {
        
        let keyName = prompt("Enter a name");
        if(keyName == false || keyName == null) {keyName = "Anonymous"};
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

    //THESE THREE LINES SAVE RESULTS IN FIREBASE
    //     firebase.firestore().collection("times").add({
    //         nameSaved: keyName,
    //         timesSaved: JSON.stringify(newArr[indexTobeChanged])
    //         })
    }
    else {
        alert("Stop the timer to save the result.")
    }
});

// SAVE IN FIREBASE
// sendFirebase.addEventListener ("click", () => {

// firebase.firestore().collection("times").add({
// nameSaved: keyName,
// timesSaved: JSON.stringify(newArr[indexTobeChanged])
// })
// })


//SHOW RESULTS SAVED IN LOCAL STORAGE
let showClicked = false;

showSaved.addEventListener("click", () => {
    let placeForTimesFromStorage = document.querySelector(".listFromStorage");
    let tableOfStoredValues = [];
    let names = [];
    // let counter = 0;
    if (showClicked === false) {
        for (var i = 0; i < localStorage.length; i++) {

            let keyNames = window.localStorage.key(i);
            let elem = window.localStorage.key(i) + localStorage.getItem(localStorage.key(i));
            let results = JSON.parse(localStorage.getItem(localStorage.key(i)))
            names.push(keyNames);

            let p = document.createElement("p");

            html = `<p class="btn arrow_down">${window.localStorage.key(i)}</p>
<ul class="hidden">${results.map(i => `<li>${i}</li>`).join('')}</ul>`;
            p.innerHTML = html;
            placeForTimesFromStorage.appendChild(p);

            tableOfStoredValues.push(elem);
        }
        const toggleBtn = document.querySelectorAll(".btn");
        toggleBtn.forEach((elem) => {
            const toggleBtnSibling = elem.nextElementSibling;
            elem.addEventListener("click", () => {
                toggleBtnSibling.classList.toggle("hidden");
                elem.classList.toggle("arrow_down");
                elem.classList.toggle("arrow_up");
            })
        })
        showClicked = true;
        console.log("stored" + tableOfStoredValues);
}})

///NEXT - SHOW CURRENT RESULT AND CONTINUE GOING
let placeForTimes = document.querySelector(".times");
let counter = 0;
nextBtn.disabled = true;

nextBtn.addEventListener("click", () => {
    counter = counter + 1;
    let par = document.createElement("p");
    let html = `<p>${counter}. ${newTime}</p>`;
    par.innerHTML = html;
    placeForTimes.appendChild(par);
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
