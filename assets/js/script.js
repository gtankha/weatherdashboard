 var citySearchEl = document.querySelector("#citySearch");
 var formCityEl = document.querySelector("#citys");
 var forecastNowEl = document.querySelector("#forecastNow");
 var appId = "e4817a0deb146d8c3d95dc704d60b57c";
 var getSearchCity = function (event) {

    event.preventDefault();
    // get value from input element .. the city name
    var searchString = formCityEl.value.trim();

    getWeatherValues(searchString, "");
  
    
 }
 
var getWeatherValues = function (city) {
 // format the weather map api url
 
 var apiUrl = ("http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid="+ appId + "&units=imperial");
// }
 fetch(apiUrl)
 .then(function(response) {
   // request was successful
   if (response.ok) {
     response.json().then(function(data) {
       displayWeather (data);
     });
   } else {
     alert("Error: " + response.statusText);
   }
 })
 .catch(function(error) {
   // Notice this `.catch()` getting chained onto the end of the `.then()` method
   alert("Unable to connect to Weather Map");
 });

 var displayWeather = function (weather){

    var date = weather.lastupdate;
    var weathericon = weather.weather[0].icon;
    var iconurl = "http://openweathermap.org/img/wn/" + weathericon + "@2x.png";
    var datefrmt = moment(date).format('L');
    console.log(weather);
  
    //$("#forecastNow").append("<h1> how are you </h1>");
 
    $("#forecastNow").append('<h2>' + weather.name + " (" + datefrmt + ")" + '<img id="weathericon" src='+iconurl+'alt="weathericon"> </h2>');
    $("#forecastNow").append(' <p> Temperature: ' + weather.main.temp + 'F </p>' );
    $("#forecastNow").append(' <p> Humidity: ' + weather.main.humidity + '% </p>' );
    $("#forecastNow").append(' <p> Wind Speed: ' + weather.wind.speed + 'MPH </p>' );
    var lat = weather.coord.lat;
    var lon = weather.coord.lon;
   
    var apiUrl2 = ("http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid="+appId);
    console.log(apiUrl2);
    // }
     fetch(apiUrl2)
     .then(function(response) {
       // request was successful
       if (response.ok) {
         response.json().then(function(data2) {
           console.log (data2);
         });
       } else {
         alert("Error: " + response.statusText);
       }
     })
     .catch(function(error) {
       // Notice this `.catch()` getting chained onto the end of the `.then()` method
       alert("Unable to connect to Weather Map");
     });
    
    
 }

}



$("#citySearch").submit(getSearchCity);





 
 /* 
 // format the github api url
 var apiUrl = "https://api.github.com/users/" + user + "/repos";
 
 // make a request to the url
 fetch(apiUrl)
 .then(function(response) {
   // request was successful
   if (response.ok) {
     response.json().then(function(data) {
       displayRepos(data, user);
     });
   } else {
     alert("Error: " + response.statusText);
   }
 })
 .catch(function(error) {
   // Notice this `.catch()` getting chained onto the end of the `.then()` method
   alert("Unable to connect to GitHub");
 });

 */
