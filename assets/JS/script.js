var textAreaEl = document.getElementById('team-search');
var searchBtn = document.getElementById('search-btn');
var currentTeamEl = document.getElementById('user-team-name');




// saves user input
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
      var teamId = data.response[0].id
      currentTeamEl.textContent = data.response[0].name
      getOpp(teamId)

    })
    .catch(function(err) {
      console.error(err)
    });
})


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
    var playOffGame = data.response.slice(-1);
    var homeId = playOffGame[0].teams.home.id;
    var awayId = playOffGame[0].teams.visitors.id;
    var oppName = homeId === teamId ? awayId : homeId;
    if (homeId === teamId) {
      oppName = awayId;
    } else {
      oppName = homeId;
    }
    console.log(oppName);
    
    
    var h2h = awayId + '-' + homeId;
    getLastGames(h2h);
    
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
    console.log(nextGame);
    for (var i = 0; i < data.length; i++) {
      console.log(data.length)
    }

  })
  .catch(function(err) {
    console.log(err)
  })
}


// make function that gets Local data
// make function that fetches data and displays (make so only playoff teams show)
// make function that determines winner
// display the date of the game somewhere
