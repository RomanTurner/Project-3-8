let ronUrl = "https://ron-swanson-quotes.herokuapp.com/v2/quotes";
let kanyeUrl = "https://api.kanye.rest/";
let trumpUrl = "https://api.whatdoestrumpthink.com/api/v1/quotes/random/";
let urlArray = [ronUrl, kanyeUrl, trumpUrl];
let currentQuote = 0;

function getQuote() {
  //GENERATE A RANDOM NUMBER FROM 1 TO 3
  //(RON=0), (KANYE=1), (TRUMP=2)
  let i = Math.floor(Math.random() * 3);
  //FETCHES QUOTE BASED OFF URL ARRAY INDEX
  fetch(urlArray[i])
    .then((response) => response.json())
    .then((data) => {
      console.log(i);
      currentQuote = i;
      if ((i = 0)) {
        console.log(data);
      }
      if ((i = 1)) {
        console.log(data);
      } else {
        console.log(data.message);
      }
    });
}
getQuote();

//grab div,
const ron = document.querySelector(".ron");
const kanye = document.querySelector(".kanye");
const trump = document.querySelector(".trump");

ron.addEventListener("click", (e) => answer(e));
kanye.addEventListener("click", (e) => answer(e));
trump.addEventListener("click", (e) => answer(e));

function answer(e) {
  let y = e.path[1];
  let x = parseInt(e.path[1].dataset.num);
  console.log(typeof x, x);
  if (x === currentQuote) {
    correct(y);
  } else {
    wrong(y);
  }
}

function correct(y) {
  y.classList.add("correct");
}

function wrong(y) {
  y.classList.add("wrong");
}
