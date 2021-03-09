let ronUrl = "https://ron-swanson-quotes.herokuapp.com/v2/quotes";
let kanyeUrl = "https://api.kanye.rest/";
let trumpUrl = "https://api.whatdoestrumpthink.com/api/v1/quotes/random/";
let urlArray = [ronUrl, kanyeUrl, trumpUrl];
let currentQuote = 0;
let scoreCounter = 0;
//Hey YO!
getQuote();

<<<<<<< HEAD
function getQuote(){
=======
function getQuote() {
>>>>>>> f3c12a0191c2b09968cf647b6eb9be5c81f81cba
  //GENERATE A RANDOM NUMBER FROM 1 TO 3
  //(RON=0), (KANYE=1), (TRUMP=2)
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
  console.log(i);
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
  let y = e.path[1];
  let x = parseInt(e.path[1].dataset.num);
  if (x === currentQuote) {
    correct(y);
  } else {
    wrong(y);
  }
}

function correct(y) {
  y.classList.add("correct");
  incrementScore();
  const nextQ = setInterval(() => nextQuestion(nextQ), 2000);
}

function wrong(y) {
  y.classList.add("wrong");
  alert("You Lost, boo-hoo");
  const nextQ = setInterval(() => nextQuestion(nextQ), 2000);
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
