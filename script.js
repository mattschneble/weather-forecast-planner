//declare needed global variables
var cities = [];
var apiKey = "a92822d61b314348f615f16c6e001a99";
var todayDate = daysj().format("MM/DD/YYYY");
var localCity;
//declare DOM variables
var localWeatherContainer = document.querySelector("#local-weather-container");
var localWeather = document.querySelector("#local-weather");
var searchHistory = document.querySelector("#search-history");
var cityInput = document.querySelector("#city-input");
var searchButton = document.querySelector("#search-button");
var fiveDayForecastContainer = document.querySelector("#five-day-forecast-container");
var fiveDayForecast = document.querySelector("#five-day-forecast");

//create function to search for a given city
function searchCity(city) {
    //create the URL to search for the city
    var searchCityURL = "https://api.openweathermap.org/geo/1.0/direct?q=" + city + "{state code},{country code}&limit=3&appid=" + apiKey;
//use fetch to get the data from the API
    fetch(searchCityURL)
    //convert a successful response to JSON
    .then(function(response) {
        if (response.ok) {
            response.json().then(function(weatherConditions) {
                //use the returned latitude and longitude to get weather conditions
                retrieveWeatherConditions(weatherConditions[0].lat, weatherConditions[0].lon);
            });
            //if the response is not ok, alert the user
        } else {
            alert('Unable to retrieve weather conditions for ' + city);
        }
        //if the fetch fails, alert the user
    }).catch(function(error) {
        alert('Unable to retrieve weather conditions for ' + city + "due to bad API connection. Please try again later.");
    });
}

//create function to retrieve weather conditions using the latitude and longitude
function retrieveWeatherConditions(lat, lon) {
    //create the URL to get the weather conditions
    var retrieveWeatherConditionsURL = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + apiKey;
    //use fetch to get the data from the API
    fetch(retrieveWeatherConditionsURL)
    //convert a successful response to JSON
    .then(function(response) {
        if (response.ok) {
            response.json().then(function(weatherConditions) {
                //use the returned data to display the weather conditions
                displayWeatherConditions(weatherConditions);
            });
            //if the response is not ok, alert the user
        } else {
            alert('Unable to retrieve weather conditions for ' + city);
        }
        //if the fetch fails, alert the user
    }).catch(function(error) {
        alert('Unable to retrieve weather conditions for ' + city + "due to bad API connection. Please try again later.");
    });
}