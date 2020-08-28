# weatherdashboard

### Main functions are as follows:
###  getSearchCity -- Grabs the city name from search submission and initiates the process of gathering and displaying weather data by calling other functions
### getWeatherValues --- Grabs the objects from the external openweathermap APIs 
### setSeachHistory -- set search history and local storage based on searched city. This function is only called if the city is not already part of the search history. All search history cities are clickable to initate a search.
### displayWeather - displays the current weather conditions based on parameters gathered by getWeatherValues. Note that the UV value information is gatheres from another openweathermap API
### displayWeatherForecast - displays the 5 day forecast weather based on parameters gathered by getWeatherValues
### There is an event listener for click on any search history city
### Limited search history to 8 cities/searches. Consequent searches overwrite the existing search history

### Screenshot: https://user-images.githubusercontent.com/46304828/91620818-e6a7e700-e945-11ea-9732-ddab5fa465a7.png
### URL: https://gtankha.github.io/weatherdashboard/


