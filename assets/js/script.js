 var citySearchEl = document.querySelector("#citySearch");
 var formCityEl = document.querySelector("#citys");
 var forecastNowEl = document.querySelector("#forecastNow");
 var appId = "e4817a0deb146d8c3d95dc704d60b57c";
 var a = 0; // global variable to keep track of city array index for search history 
 var city = ["","","","","","","",""]; // global array of search history cities 
 $(".5day").hide();

 // initialize search history
if (city) { city1 = JSON.parse(localStorage.getItem("city")); }
if (city1) {
  for (i = 0; i<city.length; i++) {
      if (city1[i]) {
        $(".searchHistory").append('<li class = "history list-group-item" id ="'+JSON.stringify(i)+'">'+city1[i]+'</li>');
        city[i] = city1[i];
        a=i+1;
          }
          else {
            city[i] = "";
          }
      }
};

// Get the search city 
 var getSearchCity = function (event) {

    event.preventDefault();
    // get value from input element .. the city name
    var searchString = formCityEl.value.trim();
    // get weather parameters based on search city
    getWeatherValues(searchString);

 }
 
 // get weather parameters based on the search city
var getWeatherValues = function (citys) {
 // format the weather map api url
 
// URLs for the current weather forecast and future forecast 
 var apiUrl = ("http://api.openweathermap.org/data/2.5/weather?q=" + citys + "&appid="+ appId + "&units=imperial");
 var apiUrlfcst = ("http://api.openweathermap.org/data/2.5/forecast?q="+ citys +"&appid="+ appId + "&units=imperial");
// }
 fetch(apiUrl)
 .then(function(response) {
   // request was successful
   if (response.ok) {
     response.json().then(function(data) {
       //display the weather data 
       displayWeather (data); 
      if (!(city.includes(citys))) {
       // set search history  
       setSearchHistory(citys);
      }
     });
   } else {
     alert("Error: " + response.statusText);
   }
 })
 .catch(function(error) {
   // Notice this `.catch()` getting chained onto the end of the `.then()` method
   alert("Unable to connect to Weather Map");
 });

 fetch(apiUrlfcst)
 .then(function(response2) {
   // request was successful
   if (response2.ok) {
     response2.json().then(function(data2) {
       // display the 5 day forecast
       displayWeatherForecast (data2);
     });
   } else {
     alert("Error: " + response2.statusText);
   }
 })
 .catch(function(error) {
   // Notice this `.catch()` getting chained onto the end of the `.then()` method
   alert("Unable to connect to Weather Map");
 });

}

// set the search history and set the local storage
var setSearchHistory = function (search) {

 // global array index to keep track of city history
  if (a > 7) { a = 0};
  if (city) {
    
    if (city[a]) { 
      
     var val = (document.getElementById(JSON.stringify(a)));
     val.textContent = search;
     city[a] = search;

    }
   else { 
    // display search to screen
    city[a] = search;
    $(".searchHistory").append('<li class = "history list-group-item" id ="'+JSON.stringify(a)+'">'+city[a]+'</li>');
    

    }
    
  }
  else {
    city = ["","","","","","",""];
    city[a] = search;
    $(".searchHistory").append('<li class = "history list-group-item" id ="'+JSON.stringify(a)+'">'+city[a]+'</li>');
   
  }
      
    
 // add city to local storage  
  a++;
  localStorage.setItem("city",JSON.stringify(city));

}

// display the 5 day weather forecast
var displayWeatherForecast = function(wfcast) {
  
  
  $(".5day").show();

  for (i=1; i<6 ; i++) {
    $("#forecast"+i.toString()).empty();
  }
// get the forecast parameters 
 for (i=1; i<6 ; i++) {
  var date = wfcast.list[(8*(i-1))+1].dt; 
  date = parseInt (date);
  date = moment.unix(date).format('L');
  var weathericon = wfcast.list[(8*(i-1))+1].weather[0].icon ;
  var iconurl = "http://openweathermap.org/img/wn/" + weathericon + "@2x.png";
  
  // display the forecast parameters
   $("#forecast"+i.toString()).append('<p> <strong>'+ date + '</strong> </p>');
   $("#forecast"+i.toString()).append('<img class = "w-75" id="weathericon2" src="' +iconurl+'" alt="weathericon">');
   $("#forecast"+i.toString()).append('<p>'+ wfcast.list[(8*(i-1))+1].main.temp + 'F </p>');
   $("#forecast"+i.toString()).append('<p>'+ wfcast.list[(8*(i-1))+1].main.humidity + '% </p>');
}

}

// display the weather parameters
 var displayWeather = function (weather){

    var date = weather.lastupdate;
    var weathericon = weather.weather[0].icon;
    var iconurl = "http://openweathermap.org/img/wn/" + weathericon + "@2x.png";
    var datefrmt = moment(date).format('L');
    
    $("#forecastNow").empty();
    
    
    $("#forecastNow").append('<h2 class = "d-flex align-items-center">' + weather.name + " (" + datefrmt + ")" + '<img id="weathericon" src=" ' +iconurl+'" alt="weathericon"> </h2>');
    $("#forecastNow").append(' <p> Temperature: ' + weather.main.temp + 'F </p>' );
    $("#forecastNow").append(' <p> Humidity: ' + weather.main.humidity + '% </p>' );
    $("#forecastNow").append(' <p> Wind Speed: ' + weather.wind.speed + 'MPH </p>' );
    var lat = weather.coord.lat;
    var lon = weather.coord.lon;
    // display UV index which is a seperate API
    var apiUrl2 = ("http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid="+appId);
    // }
     fetch(apiUrl2)
     .then(function(response) {
       // request was successful
       if (response.ok) {
         response.json().then(function(data2) {
           // Color UV index according to value
          if (data2.value > 8) {var color = "bg-danger";}
          if (data2.value > 4 && data2.value < 8) {var color = "bg-warning";}
          if (data2.value > 0 && data2.value < 4) {var color = "bg-success";}
           $("#forecastNow").append('<p>  UV Index: <span class = "'+color+' text-light">' + data2.value + '</span> </p>' );
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

// city search input
$("#citySearch").submit(getSearchCity);

// click on search history
$(".searchHistory").click(function(e) {
var hist = e.target.id;
hist = document.getElementById(hist);
hist = hist.textContent;
getWeatherValues(hist);
});


