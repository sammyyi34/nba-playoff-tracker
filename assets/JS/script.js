var textAreaEl = document.getElementById('team-search');
var searchBtn = document.getElementById('search-btn');
var homeTeamEl = document.getElementById('home-team-name');
var awayTeamEl = document.getElementById('away-team-name');
var homeStat1 = document.getElementById('home-stat1');
var homeStat2 = document.getElementById('home-stat2');
var homeStat3 = document.getElementById('home-stat3');
var awayStat1 = document.getElementById('away-stat1');
var awayStat2 = document.getElementById('away-stat2');
var awayStat3 = document.getElementById('away-stat3');




// saves user input then fetches that team
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
 
  fetch('https://api-nba-v1.p.rapidapi.com/teams?search=' + userInput, options)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      // converts the user's searched team to corresponding team id
      var teamId = data.response[0].id
      //passes the value of teamID to the getOpp()
      getOppId(teamId)

    })
    .catch(function(err) {
      console.error(err)
    });
})

// takes the searched team's id and finds their playoff matchup
function getOppId(teamId) {
   const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'e2a9fb97bamshed18b6fd03679f7p164ac8jsn8814d63a32e0',
        'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
      }
  };

  fetch('https://api-nba-v1.p.rapidapi.com/games?league=standard&season=2022&team=' + teamId, options)
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
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
    //passes both user team id and opponent team id to getStats()
    getStats(homeId, awayId);
    // for every matchup between the 2 teams
    var h2h = homeId + '-' + awayId;
    getNames(h2h);
    getLastGames(h2h);
    
  })
  .catch(function(err) {
    console.error(err)
  });
}

function getNames(h2h) {
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '1796dbdd1dmsh6234b7a56ccb43bp136d3djsn7e79ec7f91d2',
      'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
    }
  };

  fetch('https://api-nba-v1.p.rapidapi.com/games?league=standard&season=2022&h2h=' + h2h, options)
  .then(function(response) {
    return response.json();
  }) 
  .then(function(data) {
    console.log(data);
    var playOffGame = data.response.slice(-1);
    console.log(playOffGame)
    var homeName = playOffGame[0].teams.home.name;
    var awayName = playOffGame[0].teams.visitors.name;
    homeTeamEl.innerHTML = homeName;
    awayTeamEl.innerHTML = awayName;
    
  })
  .catch(function(err) {
    console.log(err)
  })
}

// a fetch call that grabs team stats
function getStats(homeId, awayId) {
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'e2a9fb97bamshed18b6fd03679f7p164ac8jsn8814d63a32e0',
      'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
    }
  };
  
  fetch('https://api-nba-v1.p.rapidapi.com/teams/statistics?id=' + homeId + '&season=2022', options)
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    var fgp = data.response[0].fgp;
    var tpp = data.response[0].tpp;
    var points = data.response[0].points;
  
    // displays team stats to corresponding element
    
    homeStat1.innerHTML += ' ' + fgp + '%';
    homeStat2.innerHTML += ' ' + tpp + '%';
    homeStat3.innerHTML += ' ' + points + ' pts';
  })
  .catch(function(err) {
    console.error(err)
  });

  fetch('https://api-nba-v1.p.rapidapi.com/teams/statistics?id=' + awayId + '&season=2022', options)
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    var fgp = data.response[0].fgp;
    var tpp = data.response[0].tpp;
    var points = data.response[0].points;
  
    // displays team stats to corresponding element
    awayStat1.innerHTML += ' ' + fgp + '%';
    awayStat2.innerHTML += ' ' + tpp + '%';
    awayStat3.innerHTML += ' ' + points + ' pts';
  })
  .catch(function(err) {
    console.error(err)
  });

}

function getLastGames(h2h) {
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '1796dbdd1dmsh6234b7a56ccb43bp136d3djsn7e79ec7f91d2',
      'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
    }
  };

  fetch('https://api-nba-v1.p.rapidapi.com/games?league=standard&season=2022&h2h=' + h2h, options)
  .then(function(response) {
    return response.json();
  }) 
  .then(function(data) {
    var dataSet = data.response.filter(function(obj) {
      return obj.status.long.toLowerCase() === "finished";
    }).reverse().slice(0, 5);
  })
  .catch(function(err) {
    console.log(err)
  })
}


// make function that gets Local data
// make function that fetches data and displays (make so only playoff teams show)
// make function that determines winner
// display the date of the game somewhere

