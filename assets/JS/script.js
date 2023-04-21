var textAreaEl = document.getElementById("team-search");
var searchBtn = document.getElementById("search-btn");
var homeTeamEl = document.getElementById("home-team-name");
var awayTeamEl = document.getElementById("away-team-name");
var homeStat1 = document.getElementById("home-stat1");
var homeStat2 = document.getElementById("home-stat2");
var homeStat3 = document.getElementById("home-stat3");
var awayStat1 = document.getElementById("away-stat1");
var awayStat2 = document.getElementById("away-stat2");
var awayStat3 = document.getElementById("away-stat3");
var homeImg = document.getElementById("home-logo");
var awayImg = document.getElementById("away-logo");

// madison code
var link1 = document.getElementById("link1");
var link2 = document.getElementById("link2");
var link3 = document.getElementById("link3");
var link4 = document.getElementById("link4");
const options = {
  method: "GET",
  headers: {
    'X-RapidAPI-Key': '9277b1da26mshab4060e33beceb0p12fbc1jsn88d4dba937cd',
		'X-RapidAPI-Host': 'nba-latest-news.p.rapidapi.com',
  },
};

fetch(
  "https://nba-latest-news.p.rapidapi.com/articles?source=espn&limit=4",
  options
)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    link1.textContent = data[0].title;
    link1.href = data[0].url;
    link2.textContent = data[1].title;
    link2.href = data[1].url;
    link3.textContent = data[2].title;
    link3.href = data[2].url;
    link4.textContent = data[3].title;
    link4.href = data[3].url;
  })
  .catch(function (err) {
    console.log(err);
  });

// //  MARJORIE FETCH .
var a = "";
var gamesButtonEl = document.getElementById("games-button");

var dateToday = dayjs().format("YYYY[-]MM[-]DD");

// document.querySelector('#date-today').innerHTML = dateToday;

gamesButtonEl.addEventListener("click", function (event) {
  event.preventDefault();
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "9277b1da26mshab4060e33beceb0p12fbc1jsn88d4dba937cd",
      "X-RapidAPI-Host": "api-nba-v1.p.rapidapi.com",
    },
  };
  fetch("https://api-nba-v1.p.rapidapi.com/games?date=" + dateToday, options)
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      console.log(response);

      console.log(dateToday);
      //  ne function
    for (var i = 0; i < response.response.length; i++) {
      // document.querySelector('#date-today').innerHTML = dateToday;

      a += `
          <div class=" container   " id='boxResult' style="width: 18rem;">
          <!-- teams Names -->
              <div class=" row text-center  " id="teamsName">
                  <div class="col-6  text-center"  id="homeName">
                      ${([i], response.response[i].teams.home.nickname)}
                  </div>
                
                  <div class="col-6  text-center"  id='visitorName'>
                      ${([i], response.response[i].teams.visitors.nickname)}
                  </div>
              </div>
              <!-- will display the logo -->
              <div class="row text-center justify-content-around align-items-center " id="teamsLogo">
                  <div class="col-5 text-center  " id="homeLogo">
                      <img id="homeLogoImg"  width="50 "height="50" src='${
                        ([i], response.response[i].teams.home.logo)
                      }' > 
                  </div>
                  <div class="col-2 text-center  " id="vsLogo">
                      <p>VS</p> 
                  </div> 
                  <div class="col-5 text-center   " id="visitorLogo">
                      <img id="visitorLogoImg"  width="50" height="50" src='${
                        ([i], response.response[i].teams.visitors.logo)
                      }'>
                  </div>
              </div>
              <!-- display the score -->
              <div class="row justify-content-start" id="teamsScore">
                  <div class="col-6 text-center" id="homeScore">
                  ${([i], response.response[i].scores.home.points)}
                  </div>
                  <div class="col-6 text-center" id="visitorScore">
                  ${([i], response.response[i].scores.visitors.points)}
                  </div>
              </div>
          </div>`;
      document.getElementById("containerWBoxes").innerHTML = a;

      console.log("Home: ", [i], response.response[i].teams.home.nickname);
      console.log(
        "Visitors: ", [i],response.response[i].teams.visitors.nickname );
      console.log("Home points: ", [i],response.response[i].scores.home.points);
      console.log(
        "Visitors points : ",[i],response.response[i].scores.visitors.points);
      console.log(response.response[i].teams.home.logo);
    }
  })
  .catch((err) => console.error(err));
},  {once : true});

// saves user input then fetches that team
searchBtn.addEventListener("click", function (event) {
  event.preventDefault();
  var userInput = textAreaEl.value;
  onlyPlayoffTeams(userInput);
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "e2a9fb97bamshed18b6fd03679f7p164ac8jsn8814d63a32e0",
      "X-RapidAPI-Host": "api-nba-v1.p.rapidapi.com",
    },
  };

  fetch("https://api-nba-v1.p.rapidapi.com/teams?search=" + userInput, options)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // converts the user's searched team to corresponding team id
      var teamId = data.response[0].id;
      //passes the value of teamID to the getOpp()
      getOppId(teamId);
      homeStat1.innerHTML = "Field goal percentage:" + "";
      homeStat2.innerHTML = "3-point percentage:" + "";
      homeStat3.innerHTML = "Total pts scored:" + "";
      awayStat1.innerHTML = "Field goal percentage:" + "";
      awayStat2.innerHTML = "3-point percentage:" + "";
      awayStat3.innerHTML = "Total pts scored:" + "";
    })
    .catch(function (err) {
      console.error(err);
    });
});

// takes the searched team's id and finds their playoff matchup
function getOppId(teamId) {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "e2a9fb97bamshed18b6fd03679f7p164ac8jsn8814d63a32e0",
      "X-RapidAPI-Host": "api-nba-v1.p.rapidapi.com",
    },
  };

  fetch(
    "https://api-nba-v1.p.rapidapi.com/games?league=standard&season=2022&team=" +
      teamId,
    options
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // targets the lastest game played (would not work in dynamic setting)
      var playOffGame = data.response.slice(-1);
      // distinguises searched team vs opponent by home/visiter id
      var homeId = playOffGame[0].teams.home.id;
      var awayId = playOffGame[0].teams.visitors.id;
      // checks to see if searched team is the home or away by id and assigns the false to opponent
      if (homeId === teamId) {
        oppId = awayId;
      } else {
        oppId = homeId;
      }

      getStats(homeId, awayId);
      // for every matchup between the 2 teams
      var h2h = homeId + "-" + awayId;
      getNames(h2h);
    })
    .catch(function (err) {
      console.error(err);
    });
}

// gets the name of both teams by using their id numbers
function getNames(h2h) {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "1796dbdd1dmsh6234b7a56ccb43bp136d3djsn7e79ec7f91d2",
      "X-RapidAPI-Host": "api-nba-v1.p.rapidapi.com",
    },
  };

  fetch(
    "https://api-nba-v1.p.rapidapi.com/games?league=standard&season=2022&h2h=" +
      h2h,
    options
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var playOffGame = data.response.slice(-1);
      var homeName = playOffGame[0].teams.home.name;
      var awayName = playOffGame[0].teams.visitors.name;
      homeTeamEl.innerHTML = homeName;
      awayTeamEl.innerHTML = awayName;

      getLogo(homeName, awayName);
    })
    .catch(function (err) {
      console.log(err);
    });
}

// PAUL's CODE
var textAreaEl = document.getElementById('team-search');
var searchBtn = document.getElementById('search-btn');
var currentTeamEl = document.getElementById('user-team-name');


searchBtn.addEventListener('click', function(event) {
event.preventDefault();
var userInput = textAreaEl.value;

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'e2a9fb97bamshed18b6fd03679f7p164ac8jsn8814d63a32e0',
		'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
	}
};
console.log(userInput)
fetch('https://api-nba-v1.p.rapidapi.com/teams?search=' + userInput, options)
	.then(function(response) {
		return response.json();
	})
	.then(function(data) {
		var teamId = (data.response[0].id)
		getH2h(teamId)

	})
	.catch(function(err) {
		console.log(err)
	});
})

function getH2h(teamId) {

const options = {
		method: 'GET',
		headers: {
			'X-RapidAPI-Key': 'e2a9fb97bamshed18b6fd03679f7p164ac8jsn8814d63a32e0',
			'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
		}
};

fetch('https://api-nba-v1.p.rapidapi.com/games?league=standard&season=2022&team='+ teamId, options)
.then(function(response) {
		return response.json();
})
.then(function(data) {
		var playOffGame = data.response.slice(-1)
		var homeId = playOffGame[0].teams.home.id
		var awayId = playOffGame[0].teams.visitors.id
		var h2h = awayId + '-' + homeId
		getLastGames(h2h);
})
.catch(function(err) {
		console.log(err)
})

}

function getLastGames(h2h) {

  const options = {
		method: 'GET',
		headers: {
				'X-RapidAPI-Key': '1796dbdd1dmsh6234b7a56ccb43bp136d3djsn7e79ec7f91d2',
				'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
		}
	};

	fetch('https://api-nba-v1.p.rapidapi.com/games?league=standard&season=2022&h2h='+ h2h, options)

		.then(function(response) {
				return response.json();
		}) 
		.then(function(data) {
			var dataSet = data.response.filter(function(obj) {
				return obj.status.long.toLowerCase() === "finished";
			}).reverse().slice(0, 5);
			var game1El = document.getElementById('prevGame1');
			var game2El = document.getElementById('prevGame2');
			var game3El = document.getElementById('prevGame3');
			var game4El = document.getElementById('prevGame4');
			var game5El = document.getElementById('prevGame5');
			// Displaying the last 5 games played 2 teams
			game1El.textContent = dataSet[0].teams.home.nickname + " vs " + dataSet[0].teams.visitors.nickname;
			game2El.textContent = dataSet[1].teams.home.nickname + " vs " + dataSet[1].teams.visitors.nickname;
			game3El.textContent = dataSet[2].teams.home.nickname + " vs " + dataSet[2].teams.visitors.nickname;
			game4El.textContent = dataSet[3].teams.home.nickname + " vs " + dataSet[3].teams.visitors.nickname;
			game5El.textContent = dataSet[4].teams.home.nickname + " vs " + dataSet[4].teams.visitors.nickname;

			var score1 = document.getElementById('gameScore1');
			var score2 = document.getElementById('gameScore2');
			var score3 = document.getElementById('gameScore3');
			var score4 = document.getElementById('gameScore4');
			var score5 = document.getElementById('gameScore5');
			// Displaying the scores of the listed games
			score1.textContent = dataSet[0].scores.home.points + " - " + dataSet[0].scores.visitors.points;
			score2.textContent = dataSet[1].scores.home.points + " - " + dataSet[1].scores.visitors.points;
			score3.textContent = dataSet[2].scores.home.points + " - " + dataSet[2].scores.visitors.points;
			score4.textContent = dataSet[3].scores.home.points + " - " + dataSet[3].scores.visitors.points;
			score5.textContent = dataSet[4].scores.home.points + " - " + dataSet[4].scores.visitors.points;
		})
		.catch(function(err) {
				console.log(err)
		})
}
// END OF PAUL's code

// a fetch call that grabs team stats
function getStats(homeId, awayId) {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "e2a9fb97bamshed18b6fd03679f7p164ac8jsn8814d63a32e0",
      "X-RapidAPI-Host": "api-nba-v1.p.rapidapi.com",
    },
  };

  fetch(
    "https://api-nba-v1.p.rapidapi.com/teams/statistics?id=" +
      homeId +
      "&season=2022",
    options
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var fgp = data.response[0].fgp;
      var tpp = data.response[0].tpp;
      var points = data.response[0].points;

      // displays home team stats to corresponding element
      homeStat1.innerHTML += " " + fgp + "%";
      homeStat2.innerHTML += " " + tpp + "%";
      homeStat3.innerHTML += " " + points + " pts";
    })
    .catch(function (err) {
      console.error(err);
    });

  fetch(
    "https://api-nba-v1.p.rapidapi.com/teams/statistics?id=" +
      awayId +
      "&season=2022",
    options
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var fgp = data.response[0].fgp;
      var tpp = data.response[0].tpp;
      var points = data.response[0].points;

      // displays away team stats to corresponding element
      awayStat1.innerHTML += " " + fgp + "%";
      awayStat2.innerHTML += " " + tpp + "%";
      awayStat3.innerHTML += " " + points + " pts";
    })
    .catch(function (err) {
      console.error(err);
    });
}

// grabs logos and assigns according to whos home or away
function getLogo(homeName, awayName) {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "1796dbdd1dmsh6234b7a56ccb43bp136d3djsn7e79ec7f91d2",
      "X-RapidAPI-Host": "api-nba-v1.p.rapidapi.com",
    },
  };

  fetch("https://api-nba-v1.p.rapidapi.com/teams?name=" + homeName, options)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // gets home team logo and adds the src to already exisiting img src
      var homeLogo = data.response[0].logo;
      homeImg.src = homeLogo;
      homeImg.classList.remove("hide");
    })
    .catch(function (err) {
      console.log(err);
    });

  fetch("https://api-nba-v1.p.rapidapi.com/teams?name=" + awayName, options)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // gets away team logo and adds the src to already exisiting img src
      var awayLogo = data.response[0].logo;
      awayImg.src = awayLogo;
      awayImg.classList.remove("hide");
    })
    .catch(function (err) {
      console.log(err);
    });
}
