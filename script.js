//declare needed global variables
var cities = [];
var apiKey = "a92822d61b314348f615f16c6e001a99";
var localCity;
//declare DOM variables
var localWeatherContainer = document.querySelector("#local-weather-container");
var localWeather = document.querySelector("#local-weather");
var searchHistory = document.querySelector("#search-history");
var cityInput = document.querySelector("#city-input");
var citySearchForm = document.querySelector("#city-search-form");
var searchButton = document.getElementById("search-button");
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

//create function to get the five day forecast weather conditions using the latitude and longitude
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

//create function to display the five day forecast
function displayFiveDayForecast(weatherForecast) {
    //declare variables to hold the retruned weather forecast still to be displayed
    var forecast = weatherForecast.list[0];
    var forecastCity = forecast.name;
    var forecastTemp = forecast.main.temp;
    var forecastHumidity = forecast.main.humidity;
    var forecastWindSpeed = forecast.wind.speed;
    var forecastIcon = forecast.weather[0].icon;

    //create the elements to display the data
    var forecastCityEl = document.createElement("h4");
    var forecastIconEl = document.createElement("img");
    var forecastTempEl = document.createElement("p");
    var forecastHumidityEl = document.createElement("p");
    var forecastWindSpeedEl = document.createElement("p");

    //convert the weather forecast to text
    forecastCityEl.textContent = forecastCity + " (" + todayDate + ")";
    forecastIconEl.src = "https://openweathermap.org/img/w/" + forecastIcon + ".png";
    forecastIconEl.alt = "Weather forecast icon";
    forecastTempEl.textContent = "Temperature: " + forecastTemp + " °F";
    forecastHumidityEl.textContent = "Humidity: " + forecastHumidity + "%";
    forecastWindSpeedEl.textContent = "Wind Speed: " + forecastWindSpeed + " MPH";

    //append the elements to the five day forecast container
    fiveDayForecastContainer.appendChild(forecastCityEl);
    fiveDayForecastContainer.appendChild(forecastIconEl);
    fiveDayForecastContainer.appendChild(forecastTempEl);
    fiveDayForecastContainer.appendChild(forecastHumidityEl);
    fiveDayForecastContainer.appendChild(forecastWindSpeedEl);
}

//create function to save the city to local storage
function saveCity() {
    //create the city object
    var cityObject = {
        city: city,
        lat: lat,
        lon: lon
    };
    //push the city object to the city array
    cityArray.push(cityObject);
    //save the city array to local storage
    localStorage.setItem("cityArray", JSON.stringify(cityArray));
    //append the city to the saved cities list
    var savedCityEl = document.createElement("li");
    savedCityEl.textContent = city;
    search-history-list.appendChild(savedCityEl);
}

//create function to load the city from local storage
function loadSavedCities() {
    //get the city array from local storage
    var cityArray = JSON.parse(localStorage.getItem("cityArray"));
    //if the city array is not empty, load the city
    if (cityArray) {
        city = cityArray[cityArray.length - 1].city;
        lat = cityArray[cityArray.length - 1].lat;
        lon = cityArray[cityArray.length - 1].lon;
        //create button to display the city and append to the saved city list
        var savedCityEl = document.createElement("li");
        savedCityEl.textContent = city;
        search-history-list.appendChild(savedCityEl);
    }
}

//add event listener to the search button within the city search form
citySearchForm.addEventListener("submit", function(event) {
    //prevent the page from reloading
    event.preventDefault();
    //get the city name from the input field
    var searchCity = citySearchInput.value.trim();
    //if the city name is not empty, display the city
    if (searchCity) {
        displayCity(searchCity);
        //clear the input field
        citySearchInput.value = "";
    } else {
        alert("Please enter a city name.");
    }
});

//add event listener to the saved cities to reload information
search-history-list.addEventListener("click", function(event) {
    //get the city name from the event
    var city = event.target.textContent;
    //display the city
    displayCity(city);
});