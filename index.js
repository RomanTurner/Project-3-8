let ronUrl = ('https://ron-swanson-quotes.herokuapp.com/v2/quotes');
let kanyeUrl = ('https://api.kanye.rest/');
let trumpUrl = ('https://api.whatdoestrumpthink.com/api/v1/quotes/random/');
let urlArray = [ronUrl, kanyeUrl, trumpUrl];

function getQuote(){
  //GENERATE A RANDOM NUMBER FROM 1 TO 3
  //(RON=0), (KANYE=1), (TRUMP=2)
  let i = Math.floor(Math.random()*3)
  //FETCHES QUOTE BASED OFF URL ARRAY INDEX
  fetch(urlArray[i])
    .then(response => response.json())
    .then(data => {
      if (i = 0){
      console.log(data)
      }
      if (i = 1){
      console.log(data)
      }
      else {
      console.log(data.message)
      }
    })
}
getQuote();