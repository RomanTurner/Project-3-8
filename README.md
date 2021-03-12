# Who Said It :question:

![Countdown](/imgs/who-said-it.png)

A surprising whirlwind of words. Who Said It? puts your social acuity on display as you try to decipher who said the displayed quote. 

![](/imgs/main.gif)

>The game we didn't need but the game that we deserved. 


# Table of contents
1. [Contestants](#contestants)
    1. [Ron Swanson](#ron)
    1. [Kanye West](#kanye)
    1. [Donald Trump](#trump)
2. [What We Use](#apis)
3. [Features](#features)
4. [Favorites](#favorites)

## Contestants <a name="contestants"></a>

![Countdown](/imgs/contestants.png)

We feature the APIs of three dubious and famous characters, one fictional, one stranger than fiction, one delusional. (*We will leave you to decide who is who in that list*)

* **Ronald Ulysses Swanson<a name="ron"></a>**

![](/imgs/ron.jpg)

>Ron, who has an extremely deadpan and stereotypical masculine .personality, actively works to make city hall less effective and despises interacting with the public. He loves meat, woodworking, hunting, whisky, breakfast foods, nautical literature, and sex. He hates and fears his ex-wives, both named Tammy, one of whom is played by Offerman's real-life wife, Megan Mullally. Ron claims not to be interested in the personal lives of those around him.
>[- Ron Swanson Wikipedia](https://en.wikipedia.org/wiki/Ron_Swanson)

---
* **Kanye Omari West<a name="kanye"></a>**

![](/imgs/kanye.jpeg)

>West's outspoken views and life outside of music have received significant media attention. He has been a frequent source of controversy for his conduct at award shows, on social media, and in other public settings, as well as for his comments on the music and fashion industries, U.S. politics, and race.
>[- Kanye West Wikipedia](https://en.wikipedia.org/wiki/Kanye_West)

---
* **Donald J. Trump<a name="trump"></a>**

![](/imgs/drump.jpeg)

>Born and raised in Queens, New York City, Trump attended Fordham University for two years and received a bachelor's degree in economics from the Wharton School of the University of Pennsylvania. He became the president of his father Fred Trump's real estate business in 1971, and renamed it to The Trump Organization. Trump expanded the company's operations to building and renovating skyscrapers, hotels, casinos, and golf courses. He later started various side ventures, mostly by licensing his name. Trump and his businesses have been involved in more than 4,000 state and federal legal actions, including six bankruptcies. 
>[- Donald Trump Wikipedia](https://en.wikipedia.org/wiki/Donald_Trump)


With the battle lines drawn lets find out who really said it..
---

# What We Use <a name="contestants"></a>
After searching the web for fun APIs to work with we ran across the **KanyeREST** API and thus *Who Said It?* Was born. 


:boom:

[Best Kanye Rest API](https://kanye.rest/)

![Best Kanye Rest API](/imgs/kanyeRest.png)

What a great resource and the fuel for this idea. When we saw that Donald Trump and Ron Swanson all had quote APIs, we knew what we had to do. 

---
:boom:

[What Does Trump Think?](https://whatdoestrumpthink.com/api-docs/index.html#introduction)

![What Does Trump Think?](/imgs/what-does-trump-think.png)



---

:boom:

[Ron Swanson Quote API](https://github.com/jamesseanwright/ron-swanson-quotes)

**No Image Availible** 

---


# Features <a name="features"></a>

What is a simple idea presented a lot of fun for our first project. Working with json servers, creating persistence for users and being able to validate(to an extent) for unique users was a fun learning point. Here are some of our fave features and code blocks. 

## We are on the clock! 
![Countdown](/imgs/countdown-timer.gif)
![Countdown](/imgs/countdown-timer.gif)
![Countdown](/imgs/countdown-timer.gif)
![Countdown](/imgs/countdown-timer.gif)

Setting an interval for a timer and changing the class on a conditional. 

## We have Unique Users
We have basic user sign in and validation. 
![Sign-in](/imgs/sign-in.png)

```javascript
let x = sortedUsers.find((user) => user.username === username);
    if (x != undefined) {
      x.pin === pin ? exitSignIn(x) : alert("incorrect password");
    } else {
      console.log("at else Existing User");
      alert("invalid input, try again");
    }
```

## We have persistence! 

We have a database with users that hold a unique PIN and the user's best score. The leaderboard is updated asyncronously as a user plays through rounds. 

![Countdown](/imgs/leaderboard.png)


Our *"GET"* from the server return an array of user-objects. They are immediately sorted by highscore and the top five are displayed. 

Our *"PATCH"* updates the server and initates a new *"GET"* which inturn displays the leaderboard. 

**A Simple For Loop Constructor**
```javascript
  for (let i = 0; i < 5; i++) {
      let li = document.createElement("li");
      li.textContent = `${sortedUsers[i].username} - ${sortedUsers[i].highScore}`;
      appender(ul, li);
    }

```

# Favorite Sections of Code <a name="contestants"></a>

Besides all the fun with CSS and learning how to beautify a markdown page, here is a section of code we had fun writing. 


Creating an array with the url APIs and generating a random *"GET"*.

```javascript
let ronUrl = "https://ron-swanson-quotes.herokuapp.com/v2/quotes";
  let kanyeUrl = "https://api.kanye.rest/";
  let trumpUrl = "https://api.whatdoestrumpthink.com/api/v1/quotes/random/";

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


```
---
We really enjoyed making choices trees. In validation, and in selecting a contestant. 

Using the interval to transition the *"GET"* and reloading of the quote. 

```javascript
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

```
We had a lot of fun creating the leaderboard, having it asyncronously updating while the user continues to play through the round. 

Using a ***"GET"*** we collect the array of user object, then we sort them with the built in array method **.sort()** sorting highest to lowest based on the **highScore** value each user has. Passing the sorted array into a display function that iterates over the first *five* users who will have the highest scores. ***"PATCH"***-ing and ***"GET"***-ing as the scores change. 

```javascript

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
    let ul = document.querySelector("#top-scores");
    darlingCide(ul);
    for (let i = 0; i < 5; i++) {
      let li = document.createElement("li");
      li.textContent = `${sortedUsers[i].username} - ${sortedUsers[i].highScore}`;
      appender(ul, li);
    }
  }

```


Trying to keep sections attuned to Functional JS practices. 


---
#### Thanks For Stopping By

We Appriciate you spending the time looking at this project. 
---
```javascript

if("You would like to Connect"){
 let email = ["rn.turner@live.com",
 "evanahouse@gmail.com"]
}else{
    let adieu = "Thanks for stopping by."
}

```