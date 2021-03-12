//*On coming to the site or refresh, have to sign in.
function displaySignIn() {
  document.getElementById("overlay").style.display = "flex";
}

displaySignIn();

//*Starts the game for the single player
function playGame() {
  //*game scope variables
  let ronUrl = "https://ron-swanson-quotes.herokuapp.com/v2/quotes";
  let kanyeUrl = "https://api.kanye.rest/";
  let trumpUrl = "https://api.whatdoestrumpthink.com/api/v1/quotes/random/";
  const userUrl = "http://localhost:3000/users";
  let sortedUsers = [];
  let currentUser = {};
  let urlArray = [ronUrl, kanyeUrl, trumpUrl];
  let currentQuote = 0;
  let scoreCounter = 0;
  let counter;

  //*Initializing the game
  let quote = document.querySelector(".quote");
  let start = document.createElement("button");
  start.textContent = "Click to Start!";
  start.style.fontSize = "30px";
  quote.appendChild(start);
  start.setAttribute("class", "button");
  start.addEventListener("click", () => {
    getQuote();
  });

  function getQuote() {
    //*GENERATE A RANDOM NUMBER FROM 0 TO 2
    //*(RON=0), (KANYE=1), (TRUMP=2)
    clearInterval(counter);
    contestantArr.forEach((contestant) => {
      contestant.classList.remove("wrong");
      contestant.classList.remove("correct");
    });
    let i = Math.floor(Math.random() * 3);
    //*FETCHES QUOTE BASED OFF URL ARRAY INDEX
    fetch(urlArray[i])
      .then((response) => response.json())
      .then((data) => {
        currentQuote = i;
        renderQuote(data, i);
      });
  }

  //*renders the quote to screen
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

  //*game countdown
  function setTimer() {
    let timerText = document.querySelector(".seconds");
    timerText.style.color = "white";
    let count = 11;
    counter = setInterval(timer, 1000);
    timer();
    function timer() {
      count = count - 1;
      timerText.textContent = count;
      if (count <= 5) {
        timerText.style.color = "red";
        timerText.style.fontSize = "55px";
      }
      if (count <= 0) {
        displayLoss();
        return;
      }
    }
  }

  //*on loss, possible reset.
  function displayLoss() {
    clearInterval(counter);
    //! Grab score and compare if highscore.
    scoreBoard();
    let youLose = document.querySelector(".quote");
    let mainBox = document.querySelector(".main-box");
    youLose.textContent = "";
    let button = document.createElement("button");
    button.textContent = "Play Again?";
    button.style.fontSize = "30px";
    youLose.appendChild(button);
    button.setAttribute("class", "button");
    button.addEventListener("click", () => {
      getQuote();
    });
  }
  //*compares highscores
  function scoreBoard() {
    if (scoreCounter > currentUser.highScore) {
      patchScore();
    }
  }

  //*update currentUser's highscore
  function patchScore() {
    let updateUser = {
      highScore: scoreCounter,
    };
    let configObj = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateUser),
    };

    fetch(userUrl + "/" + currentUser.id, configObj)
      .then((res) => res.json())
      .then((data) => getUsers())
      .catch((error) => console.error("ERROR: ", error));
  }
  function sortUsers(users) {
    sortedUsers = users.sort((a, b) => b.highScore - a.highScore);
    console.log(sortedUsers);
  }

  function displayLeaderBoard() {
    let ol = document.querySelector("#top-scores");
    darlingCide(ol);
    for (let i = 0; i < 5; i++) {
      let li = document.createElement("li");
      li.textContent = `${sortedUsers[i].username} : ${sortedUsers[i].highScore}`;
      appender(ol, li);
    }
  }

  //emptys divs
  function darlingCide(parent) {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  }

  //appends
  function appender(parent, child) {
    parent.appendChild(child);
  }

  //*Contestant divs
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

  //*On selecting a contestant, path tree
  function answer(e) {
    clearInterval(counter);
    let y = e.path[1];
    let x = parseInt(e.path[1].dataset.num);
    if (x === currentQuote) {
      correct(y);
    } else {
      wrong(y);
    }
  }
  //*if correct
  function correct(y) {
    clearInterval(counter);
    y.classList.add("correct");
    incrementScore();
    const nextQ = setInterval(() => nextQuestion(nextQ), 2000);
  }

  //*if wrong, resets the board.
  function wrong(y) {
    clearInterval(counter);
    y.classList.add("wrong");
    displayLoss();
    scoreCounter = -1;
    incrementScore();
  }
  //resets the board
  function nextQuestion(nextQ) {
    contestantArr.forEach((contestant) => {
      contestant.classList.remove("wrong");
      contestant.classList.remove("correct");
    });
    getQuote();
    clearInterval(nextQ);
  }

  //*** FORM  AND USER VALIDATION ***/
  //grab form
  const form = document.querySelector("#login");
  //add listener with validation callback
  form.addEventListener("submit", (e) => createOrValidate(e));

  //*collects db to search through
  function getUsers() {
    fetch(userUrl)
      .then((res) => res.json())
      .then((users) => {
        sortUsers(users);
        displayLeaderBoard();
      })
      .catch((error) => console.error("ERROR:", error));
  }
  //* user input decision tree
  function createOrValidate(e) {
    e.preventDefault();
    let radioBtn = e.target.radio.value;
    console.log(radioBtn);
    if (radioBtn === "existingUser") {
      validateUsers(e);
    } else {
      createUser(e);
    }
  }

  //*takes form input and checks database
  function validateUsers(e) {
    let username = e.target.name.value;
    let pin = e.target.pin.value;
    console.log(username, pin);
    let x = sortedUsers.find((user) => user.username === username);
    if (x != undefined) {
      x.pin === pin ? exitSignIn(x) : alert("incorrect password");
    } else {
      console.log("at else Existing User");
      alert("invalid input, try again");
    }
  }
  //*creates new user if they are a unique key/val
  function createUser(e) {
    e.preventDefault();
    let username = e.target.name.value;
    let pin = e.target.pin.value;
    console.log(username, pin);
    //check if user name is unique
    let x = sortedUsers.find((user) => user.username === username);
    if (x === undefined) {
      postUser(username, pin);
    } else {
      console.log("at else Create User");
      alert("Username taken, Try again.");
      form.reset();
    }
  }
  function assignUserData(user) {
    currentUser = Object.assign(currentUser, user);
    console.log(currentUser);
  }
  function exitSignIn(user) {
    assignUserData(user);
    document.getElementById("overlay").style.display = "none";
  }
  //POST new user if unique
  function postUser(username, pin) {
    newUser = {
      username: username,
      pin: pin,
      highScore: 0,
    };
    configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    };
    fetch(userUrl, configObj)
      .then((response) => response.json())
      .then((user) => {
        exitSignIn(user);
      })
      .catch((error) => console.error("ERROR: ", error));
  }

  getUsers();
}

playGame();
