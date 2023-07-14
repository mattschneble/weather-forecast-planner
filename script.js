// Acceptance Criteria:

// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
    //Display current and future current conditions, and then the city is added to the search history

// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the wind speed

// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity

// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city

// JavaScript (most of acceptance criteria done here)
    // global variables:
        // variable that saves the list of cities
var cities = [];

        // variable that stores API key (NOTE: This is not standard practice, but needed for this project)
var apiKey = "a92822d61b314348f615f16c6e001a99";
var today = daysj().format("MM/DD/YYYY");
        // query selectors to append the returned information
            // ex: var currentDay (where the current day will be appended)
var localWeather = document.querySelector("#local-weather");
            // ex: var searchHistory/cityList etc.
var searchHistory = document.querySelector("#search-history");
            // ex: var input (for text field in the form)
var cityInput = document.querySelector("#city-input");
var searchButton = document.querySelector("#search-button");
            // ex: var 5DayForecast (where the forecast will be appended)
var fiveDayForecast = document.querySelector("#five-day-forecast");

    // functions:
        //gets information from localstorage and save it to array
        function getLocalStorage() {
            var storedCities = JSON.parse(localStorage.getItem("cities"));
            //check for saved information in local storage
            if (storedCities !== null) {
                //if there is saved information, set the cities array to the saved information
                cities = storedCities;
            } 
            //if there is no saved information, do nothing
            //call the generate button function
            generateButton();
        }
        

        // generate button (saved cities in search history)
        function generateButton() {
            // clear current buttons (target parent div and clear information if there already)
            searchHistory.innerHTML = "";
            // loop over cities and generate elements on the page (can sort if wanted, not required)
            for (var i = 0; i < cities.length; i++) {
                // create button element
                var cityButton = document.createElement("button");
                // add class to button
                cityButton.classList.add("btn", "btn-secondary", "btn-block", "city-button");
                // add text to button
                cityButton.textContent = cities[i];
                // append button to parent div
                searchHistory.appendChild(cityButton);
            }
        }

        // needs event listener that calls the function to display the weather data
        searchButton.addEventListener("click", function(event) {
            //create variable that holds the input
            var city = cityInput.value.trim();
            event.preventDefault();
            // validate the text field has information
            if (city === "") {
                alert("Please enter a city");
                // return to stop the function if the text field is empty
                return;
            // if the text field has information, run the function to get the weather data
            } else {
                getWeatherData(city);
            }
            // save input data to the array
            cities.push(city);
            // save the array to local storage
            localStorage.setItem("cities", JSON.stringify(cities));
            // call the generate button function
            generateButton();
            // call the fetch data function, passing the city searched
            getWeatherData(city);
        });
        
        // fetch call to pull city weather information and display
            // create variable with API that we are searching for
                // fetch call with API variable to retrieve weather data
            // create variables for: longitude, latitude, city
                // create new URL using the above variables
                // fetch call with new URL to retrieve the weather data
                // call render data function (passing variables to render data)
            // render data
                // create variables for: temperature, wind speed, humidity
                // fetch call to retrieve icons
                // append current conditions to current div
                // apend future forecast to future forecast div

        // function call to start application (will be at bottom)
