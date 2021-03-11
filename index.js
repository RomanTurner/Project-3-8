displaySignIn();
function displaySignIn() {
  document.getElementById("overlay").style.display = "flex";
}

function exitSignIn() {
  document.getElementById("overlay").style.display = "none";
}


function playGame(){
let ronUrl = "https://ron-swanson-quotes.herokuapp.com/v2/quotes";
let kanyeUrl = "https://api.kanye.rest/";
let trumpUrl = "https://api.whatdoestrumpthink.com/api/v1/quotes/random/";
let urlArray = [ronUrl, kanyeUrl, trumpUrl];
let currentQuote = 0;
let scoreCounter = 0;
let counter;
document.addEventListener('DOMContentLoaded', () => {
  
  let quote = document.querySelector(".quote")
  let start = document.createElement("button")
  start.textContent = "Click to Start!"
  start.style.fontSize = "30px"
  quote.appendChild(start)
  start.setAttribute("class", "button")
  start.addEventListener('click', () => {
  getQuote();
})
})


function getQuote(){
//GENERATE A RANDOM NUMBER FROM 0 TO 2
//(RON=0), (KANYE=1), (TRUMP=2)
  clearInterval(counter)
  contestantArr.forEach((contestant) => {
  contestant.classList.remove("wrong");
  contestant.classList.remove("correct");
  });
  let i = Math.floor(Math.random() * 3);
  //FETCHES QUOTE BASED OFF URL ARRAY INDEX
  fetch(urlArray[i])
    .then((response) => response.json())
    .then((data) => {
      currentQuote = i;
      renderQuote(data, i);
    });
}

function renderQuote(data, i) {
  setTimer();
  let newQuote = document.querySelector(".quote");
  switch (i) {
    case 0:
      newQuote.textContent = `"${data}"`;
      break;
    case 1:
      newQuote.textContent = `"${data.quote}"`;
      break;
    case 2:
      newQuote.textContent = `"${data.message}"`;
      break;
    default:
      newQuote.textContent = "Press Start to Play";
  }
}

function setTimer(){
  
  let timerText = document.querySelector('.seconds')
  timerText.style.color = "white"
  let count = 11;
  counter = setInterval(timer, 1000)
  timer()
  function timer(){
    count = count - 1;
    timerText.textContent = count 
    if (count <= 5){
      timerText.style.color = "red";
      timerText.style.fontSize = "55px"; 
    }
    if (count <= 0){
      displayLoss();
      return;
    }
  }
}

function displayLoss(){
  clearInterval(counter);
  let youLose = document.querySelector(".quote")
  let mainBox = document.querySelector(".main-box")
  youLose.textContent = ""
  let button = document.createElement("button")
  button.textContent = "Play Again?"
  button.style.fontSize = "30px"
  youLose.appendChild(button)
  button.setAttribute("class", "button")
  button.addEventListener('click', () => {
    getQuote();
  })
  
  
}

//grab div,
const ron = document.querySelector(".ron");
const kanye = document.querySelector(".kanye");
const trump = document.querySelector(".trump");
const score = document.querySelector(".score>h3>span");

let contestantArr = [ron, kanye, trump];
ron.addEventListener("click", (e) => answer(e));
kanye.addEventListener("click", (e) => answer(e));
trump.addEventListener("click", (e) => answer(e));

function incrementScore() {
  scoreCounter++;
  score.textContent = scoreCounter;
}

function answer(e) {
  clearInterval(counter)
  let y = e.path[1];
  let x = parseInt(e.path[1].dataset.num);
  if (x === currentQuote) {
    correct(y);
  } else {
    wrong(y);
  }
}

function correct(y) {
  clearInterval(counter)
  y.classList.add("correct");
  incrementScore();
  const nextQ = setInterval(() => nextQuestion(nextQ), 2000);
}

function wrong(y) {
  clearInterval(counter)
  y.classList.add("wrong");
  displayLoss();
  scoreCounter = -1;
  incrementScore();
}

function nextQuestion(nextQ) {
  contestantArr.forEach((contestant) => {
    contestant.classList.remove("wrong");
    contestant.classList.remove("correct");
  });
  getQuote();
  clearInterval(nextQ);
}
}

playGame();