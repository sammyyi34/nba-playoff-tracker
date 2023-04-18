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
  
  fetch('https://api-nba-v1.p.rapidapi.com/teams', options)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      console.log(data.response[0]);
      var currentTeam = data.response[0].name
      console.log(currentTeam)
      currentTeamEl.textContent = currentTeam
    })
    .catch(function(err) {
      console.error(err)
    });
})

// make function that gets Local data
// make function that fetches data and displays (make so only playoff teams show)
// make function that determines winner
// display the date of the game somewhere
