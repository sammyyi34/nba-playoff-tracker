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
      console.log(data)
      console.log(data.response[0].id)
      var teamId = data.response[0].id
      currentTeamEl.textContent = data.response[0].name
      getOpp(teamId)

    })
    .catch(function(err) {
      console.error(err)
    });
})



function getOpp(teamId) {
  console.log(teamId)
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
    console.log(data)
    var playOffGame = data.response.slice(-1);
    var homeId = playOffGame[0].teams.home.id;
    console.log(homeId);
    var awayId = playOffGame[0].teams.visitors.id;
    console.log(awayId);
    var h2h = awayId + '-' + homeId;
    console.log(h2h);
    
  })
  .catch(function(err) {
    console.error(err)
  });
}


// make function that gets Local data
// make function that fetches data and displays (make so only playoff teams show)
// make function that determines winner
// display the date of the game somewhere
