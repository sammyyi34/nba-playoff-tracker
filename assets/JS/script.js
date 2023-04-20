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