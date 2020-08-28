 var citySearchEl = document.querySelector("#citySearch");
 var formCityEl = document.querySelector("#citys");
 var forecastNowEl = document.querySelector("#forecastNow");
 var appId = "e4817a0deb146d8c3d95dc704d60b57c";
 var a = 0;
 var city = ["","","","","","","",""];
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

 var getSearchCity = function (event) {

    event.preventDefault();
    // get value from input element .. the city name
    var searchString = formCityEl.value.trim();

    getWeatherValues(searchString);


 }
 
var getWeatherValues = function (citys) {
 // format the weather map api url
 
 var apiUrl = ("http://api.openweathermap.org/data/2.5/weather?q=" + citys + "&appid="+ appId + "&units=imperial");
 var apiUrlfcst = ("http://api.openweathermap.org/data/2.5/forecast?q="+ citys +"&appid="+ appId + "&units=imperial");
// }
 fetch(apiUrl)
 .then(function(response) {
   // request was successful
   if (response.ok) {
     response.json().then(function(data) {
       displayWeather (data); 
      if (!(city.includes(citys))) {
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

var setSearchHistory = function (search) {

 
  if (a > 7) { a = 0};
  if (city) {
    


    if (city[a]) { 

      var b = document.getElementById("0");
    
      
     var val = (document.getElementById(JSON.stringify(a)));
    
     val.textContent = search;
     city[a] = search;

    }
   else { 
    
    city[a] = search;
    $(".searchHistory").append('<li class = "history list-group-item" id ="'+JSON.stringify(a)+'">'+city[a]+'</li>');
    

    }
    
  }
  else {
    city = ["","","","","","",""];
    city[a] = search;
    $(".searchHistory").append('<li class = "history list-group-item" id ="'+JSON.stringify(a)+'">'+city[a]+'</li>');
   
  }
      
    
  
  a++;
  localStorage.setItem("city",JSON.stringify(city));

}

var displayWeatherForecast = function(wfcast) {
  
  
  $(".5day").show();

  for (i=1; i<6 ; i++) {
    $("#forecast"+i.toString()).empty();
  }

 for (i=1; i<6 ; i++) {
  var date = wfcast.list[(8*(i-1))+1].dt; 
  date = parseInt (date);
  date = moment.unix(date).format('L');
  var weathericon = wfcast.list[(8*(i-1))+1].weather[0].icon ;
  var iconurl = "http://openweathermap.org/img/wn/" + weathericon + "@2x.png";
  
   $("#forecast"+i.toString()).append('<p> <strong>'+ date + '</strong> </p>');
   $("#forecast"+i.toString()).append('<img class = "w-75" id="weathericon2" src="' +iconurl+'" alt="weathericon">');
   $("#forecast"+i.toString()).append('<p>'+ wfcast.list[(8*(i-1))+1].main.temp + 'F </p>');
   $("#forecast"+i.toString()).append('<p>'+ wfcast.list[(8*(i-1))+1].main.humidity + '% </p>');
}

}

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
    var apiUrl2 = ("http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid="+appId);
    // }
     fetch(apiUrl2)
     .then(function(response) {
       // request was successful
       if (response.ok) {
         response.json().then(function(data2) {
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


$("#citySearch").submit(getSearchCity);

$(".searchHistory").click(function(e) {
var hist = e.target.id;
hist = document.getElementById(hist);
hist = hist.textContent;
getWeatherValues(hist);
});


