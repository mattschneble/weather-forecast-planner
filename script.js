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
            var today = daysj().format("MM/DD/YYYY");
    // functions: 
        // gets the information from Local Storage and saves it to array
            // check for data saved already (not null)
                // localStorage.getItem
                    // conditional statement to check for null
                        // if null, do nothing (as there is nothing to create)
                        // if data is stored, set global variable of searchHistory to include saved data
                            // call generate button function

        // generate button (saved cities in search history)
            // clear current buttons (target parent div and clear information if there already)
            // loop over cities and generate elements on the page (can sort if wanted, not required)

        // needs event listener that calls the function to display the weather data 
            // target the "search button"
            // create variable that holds the input
            // preventDefault()
            // validate the text field has information
                // conditional statement
                    // if text is entered, pull and display weather data
                        // if no text is entered, alert saying "please enter a city"
            // save input data to the array
                // save to the array defined earlier
                    // arrayname.push (sends to the array)
                    // save to localStorage so the information persists upon refresh
                    // generateButton to re-render buttons on the aside
                    // call "fetch data function", pass the city searched to the "fetch data function"
        
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
