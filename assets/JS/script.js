var textAreaEl = document.getElementById('team-search');
var searchBtn = document.getElementById('search-btn');
var currentTeamEl = document.getElementById('user-team-name');


searchBtn.addEventListener('click', function(event) {
    event.defaultPrevented();
    var userInput = textAreaEl.value;

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '1796dbdd1dmsh6234b7a56ccb43bp136d3djsn7e79ec7f91d2',
            'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
        }
    };
    
    fetch('https://api-nba-v1.p.rapidapi.com/teams', options)
        .then(function(response) {
            return response.json();
        }) 
        .then(function(data) {
            console.log(data.response[0]);
            var teamID = data.response[0].iD
            console.log(teamID)
            currentTeamEl.textContent = teamID
        })
        .catch(function(err) {
            console.error(err)
        });
})