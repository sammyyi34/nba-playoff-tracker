var textAreaEl = document.getElementById('team-search');
var searchBtn = document.getElementById('search-btn');
var currentTeamEl = document.getElementById('user-team-name');
var oppTeamEl = document.getElementById('opp-team-name');
var userStat1 = document.getElementById('user-stat1');
var userStat2 = document.getElementById('user-stat2');
var userStat3 = document.getElementById('user-stat3');
var oppStat1 = document.getElementById('opp-stat1');
var oppStat2 = document.getElementById('opp-stat2');
var oppStat3 = document.getElementById('opp-stat3');




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
      currentTeamEl.textContent = data.response[0].name
      //passes the value of teamID to the getOpp()
      getOpp(teamId)

    })
    .catch(function(err) {
      console.error(err)
    });
})

// takes the searched team's id and finds their playoff matchup
function getOpp(teamId) {
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
    var oppName = homeId === teamId ? awayId : homeId;
    if (homeId === teamId) {
      oppName = awayId;
    } else {
      oppName = homeId;
    }
    //passes both user team id and opponent team id to getStats()
    getStats(teamId, oppName);
    // for every matchup between the 2 teams
    var h2h = awayId + '-' + homeId;
    // getLastGames(h2h);
    
  })
  .catch(function(err) {
    console.error(err)
  });
}

// a fetch call that grabs team stats
function getStats(teamId, oppName) {
  console.log(teamId, oppName)
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'e2a9fb97bamshed18b6fd03679f7p164ac8jsn8814d63a32e0',
      'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
    }
  };
  
  fetch('https://api-nba-v1.p.rapidapi.com/teams/statistics?id=' + teamId + '&season=2022', options)
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    var ftp = data.response[0].fgp;
    var tpp = data.response[0].tpp;
    var points = data.response[0].points;
    console.log(tpp)
    // displays team stats to corresponding element
    userStat1.innerHTML += ' ' + ftp + '%';
    userStat2.innerHTML += ' ' + tpp + '%';
    userStat3.innerHTML += ' ' + points + ' pts';
  })
  .catch(function(err) {
    console.error(err)
  });
}





// make function that gets Local data
// make function that fetches data and displays (make so only playoff teams show)
// make function that determines winner
// display the date of the game somewhere

