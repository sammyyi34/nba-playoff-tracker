// //  MARJORIE FETCH .
var a = "";
var gamesButtonEl= document.getElementById("games-button");

var dateToday= dayjs().format('YYYY[-]MM[-]DD');
            
    // document.querySelector('#date-today').innerHTML = dateToday;

gamesButtonEl.addEventListener('click', function(event){
    event.preventDefault();
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '9277b1da26mshab4060e33beceb0p12fbc1jsn88d4dba937cd',
            'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
        } };
    fetch('https://api-nba-v1.p.rapidapi.com/games?date='+ dateToday, options)
        .then (function(response){
            return response.json()
        })
        .then(function(response){
            console.log(response)
            
            console.log(dateToday);
            //  ne function
            for(var i=0;i < response.response.length; i++){
            // document.querySelector('#date-today').innerHTML = dateToday;

           a += 
            `
            <div class=" container   " id='boxResult' style="width: 18rem;">
            <!-- teams Names -->
                <div class=" row text-center  " id="teamsName">
                    <div class="col-6  text-center"  id="homeName">
                        ${ [i],response.response[i].teams.home.nickname}
                    </div>
                  
                    <div class="col-6  text-center"  id='visitorName'>
                        ${[i],response.response[i].teams.visitors.nickname}
                    </div>
                </div>
                <!-- will display the logo -->
                <div class="row text-center justify-content-around " id="teamsLogo">
                    <div class="col-5 text-center  " id="homeLogo">
                        <img id="homeLogoImg"  width="40 "height="40" src='${[i],response.response[i].teams.home.logo}' > 
                    </div>
                    <div class="col-2 text-center  " id="vsLogo">
                        <p>VS</p> 
                    </div> 
                    <div class="col-5 text-center   " id="visitorLogo">
                        <img id="visitorLogoImg"  width="40" height="40" src='${[i],response.response[i].teams.visitors.logo}'>
                    </div>
                </div>
                <!-- display the score -->
                <div class="row justify-content-start" id="teamsScore">
                    <div class="col-6 text-center" id="homeScore">
                    ${[i],response.response[i].scores.home.points}
                    </div>
                    <div class="col-6 text-center" id="visitorScore">
                    ${[i],response.response[i].scores.visitors.points}
                    </div>
                </div>
            </div>`
            document.getElementById("containerWBoxes").innerHTML = a;
        
           
            console.log("Home: ", [i], response.response[i].teams.home.nickname);
            console.log("Visitors: ", [i],response.response[i].teams.visitors.nickname);
            console.log("Home points: ", [i], response.response[i].scores.home.points);
            console.log("Visitors points : ", [i], response.response[i].scores.visitors.points)
            console.log(response.response[i].teams.home.logo);
            }
        })
        .catch(err => console.error(err));

    console.log('hi')
     })

