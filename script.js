//declare needed global variables
var cities = [];
var apiKey = "a92822d61b314348f615f16c6e001a99";
var today = daysj().format("MM/DD/YYYY");
var localCity;
//declare DOM variables
var localWeatherContainer = document.querySelector("#local-weather-container");
var localWeather = document.querySelector("#local-weather");
var searchHistory = document.querySelector("#search-history");
var cityInput = document.querySelector("#city-input");
var searchButton = document.querySelector("#search-button");
var fiveDayForecastContainer = document.querySelector("#five-day-forecast-container");
var fiveDayForecast = document.querySelector("#five-day-forecast");