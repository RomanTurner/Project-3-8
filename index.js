
let ronUrl = ('https://ron-swanson-quotes.herokuapp.com/v2/quotes');
let kanyeUrl = ('https://api.kanye.rest/');
let trumpUrl = ('https://api.whatdoestrumpthink.com/api/v1/quotes/random/');
let urlArray = [ronUrl, kanyeUrl, trumpUrl];

getQuote();


function getQuote(){
  //GENERATE A RANDOM NUMBER FROM 1 TO 3
  //(RON=0), (KANYE=1), (TRUMP=2)
  let i = Math.floor(Math.random()*3)
  //FETCHES QUOTE BASED OFF URL ARRAY INDEX
  fetch(urlArray[i])
    .then(response => response.json())
    .then(data => renderQuote(data, i))
}

function renderQuote(data, i){
  console.log(i)
  let newQuote = document.querySelector(".quote");
  switch(i){
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
      newQuote.textContent = "Press Start to Play"
  }
}
  
 


