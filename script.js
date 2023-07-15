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

//create function to display the weather conditions
function displayWeatherConditions(weatherConditions) {
    //clear the local weather container of any previous data in both local weather and five day forecast
    localWeatherContainer.innerHTML = "";
    fiveDayForecastContainer.innerHTML = "";

    //declare variables to hold the retruned weather conditions still to be displayed
    var currentConditions = weatherConditions.list[0];
    var currentCity = currentConditions.name;
    var currentTemp = currentConditions.main.temp;
    var currentHumidity = currentConditions.main.humidity;
    var currentWindSpeed = currentConditions.wind.speed;
    var conditionsIcon = currentConditions.weather[0].icon;

    //create the elements to display the data
    var currentCityEl = document.createElement("h4");
    var conditionsIconEl = document.createElement("img");
    var currentTempEl = document.createElement("p");
    var currentHumidityEl = document.createElement("p");
    var currentWindSpeedEl = document.createElement("p");

    //convert the weather conditions to text
    currentCityEl.textContent = currentCity + " (" + todayDate + ")";
    conditionsIconEl.src = "https://openweathermap.org/img/w/" + conditionsIcon + ".png";
    conditionsIconEl.alt = "Weather conditions icon";
    currentTempEl.textContent = "Temperature: " + currentTemp + " °F";
    currentHumidityEl.textContent = "Humidity: " + currentHumidity + "%";
    currentWindSpeedEl.textContent = "Wind Speed: " + currentWindSpeed + " MPH";

    //append the elements to the local weather container
    localWeatherContainer.appendChild(currentCityEl);
    localWeatherContainer.appendChild(conditionsIconEl);
    localWeatherContainer.appendChild(currentTempEl);
    localWeatherContainer.appendChild(currentHumidityEl);
    localWeatherContainer.appendChild(currentWindSpeedEl);
}

//create function to get the five day forecast
function getFiveDayForecast(weatherForecast) {
    //create the URL to get the five day forecast
    var getFiveDayForecastURL = "https://api.openweathermap.org/data/2.5/forecast?" + lat + "&lon=" + lon + "&appid=" + apiKey;
    //use fetch to get the data from the API
    fetch(getFiveDayForecastURL)
    //convert a successful response to JSON
    .then(function(response) {
        if (response.ok) {
            response.json().then(function(weatherForecast) {
                //use the returned data to display the five day forecast
                displayFiveDayForecast(weatherForecast);
            });
            //if the response is not ok, alert the user
        } else {
            alert('Unable to retrieve five day forecast for ' + city);
        }
        //if the fetch fails, alert the user
    }).catch(function(error) {
        alert('Unable to retrieve five day forecast for ' + city + "due to bad API connection. Please try again later.");
    });
}