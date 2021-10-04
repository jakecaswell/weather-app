var apiKey = "765a731e723a37657dfae4027003f17b";
var date = moment().format("MM/D/YYYY");
var citySearched = document.getElementById("city-search");
var searchButtonEl = document.getElementById("searchBtn");
var temperature = document.getElementById("temperature");
var windSpeed = document.getElementById("windSpeed");
var humidity = document.getElementById("humidity");
var uvIndex = document.getElementById("UV-index");
var weatherStatusIcon = document.getElementById("weather-icon");
var forecastEl = document.getElementById("five-day-forecast");
var searchHistoryEl = document.getElementById("saved-cities");
// var storedCities = { ...localStorage }
// var storageCount = getStorageCount();
// console.log(storedCities) 
// console.log(storageCount)

// function getStorageCount(storedCities) { 

//     return Object.keys(storedCities).length;
// }

function getCurrentWeather(city) {
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=765a731e723a37657dfae4027003f17b&units=imperial")
    .then(response => response.json())
    .then(
        data => displayTodaysWeather(data)); 
}

function getWeekWeather(city) {
    fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=765a731e723a37657dfae4027003f17b&units=imperial")
        .then(response => response.json())
        .then(data => displayForecast(data));
}

function displayTodaysWeather(data) {
    // variable to get the date and city for the current date
    var cityDate = document.getElementById("city-date");
    // setting the text content equal to all the necessary data
    cityDate.textContent = data.name + " " + date;
    temperature.textContent = "Temp: " + data.main.temp + "℉";
    windSpeed.textContent = "Wind Speeds: " + data.wind.speed + "MPH";
    humidity.textContent = "Humidity: " + data.main.humidity + "%";
    
    
    // conditional to change the icon depending on weather
    if (data.weather[0].main === "Clouds") {
        weatherStatusIcon.src = "https://icons-for-free.com/iconfiles/png/512/cloudy+foggy+weather+icon-1320196574869514194.png";
        uvIndex.textContent = "Cloudy";
    } else if (data.weather[0].main === "Rain") {
        weatherStatusIcon.src = "https://icons-for-free.com/iconfiles/png/512/clouds+rain+rainy+weather+icon-1320196492721656738.png";
        uvIndex.textContent = data.weather[0].main;
    } else if (data.weather[0].main === "Clear") {
        weatherStatusIcon.src = "https://icons-for-free.com/iconfiles/png/512/sunny+temperature+weather+icon-1320196637430890623.png";
        uvIndex.textContent = data.weather[0].main;
    } else if (data.weather[0].main === "Thunderstorm") {
        weatherStatusIcon.src = "https://icons-for-free.com/iconfiles/png/512/thunder+weather+icon-1320196485851739460.png";
        uvIndex.textContent = data.weather[0].main;
    }

    // save to localStorage
    var city = citySearched.value.trim();
    localStorage.setItem( "city", city);
}

function displayForecast(data) {
    forecastEl.textContent = "";
    for (var i = 0; i < data.list.length; i += 8) {
        // create a new div for forecast cards
        var dailyForecast = document.createElement("div");
        dailyForecast.classList = "col-md-2 dailyForecastCard";
        // create the date for the card
        var dailyDate = document.createElement("h5");
        dailyDate.textContent = data.list[i].dt_txt;
        dailyForecast.appendChild(dailyDate);
        // temperature
        var dailyTemp = document.createElement("p");
        dailyTemp.textContent = "Temperature: " + data.list[i].main.temp + "℉";
        dailyForecast.appendChild(dailyTemp);
        // wind
        var dailyWind = document.createElement("p");
        dailyWind.textContent = "Wind: " + data.list[i].wind.speed + "MPH";
        dailyForecast.appendChild(dailyWind);
        //humidity
        var dailyHumidity = document.createElement("p")
        dailyHumidity.textContent = "Humidity: " + data.list[i].main.humidity + "%";
        dailyForecast.appendChild(dailyHumidity);
        // append the forecast card to the html page
        forecastEl.appendChild(dailyForecast);
    }
    loadHistory();
}

$(document).ready(loadHistory());


function loadHistory() {
    var data = localStorage.getItem("city")
    if (data) {  
        var historyButtonEl = document.createElement("button");
        historyButtonEl.classList = "storageButton";
        historyButtonEl.setAttribute("id", "storage-button");
        historyButtonEl.type = "button";
        historyButtonEl.textContent = data;
        searchHistoryEl.appendChild(historyButtonEl);
    }

}


searchButtonEl.addEventListener("click", function() {
    citySearched.textContent = "";
    var city = citySearched.value.trim();
    getCurrentWeather(city);
    getWeekWeather(city);
    
})

document.getElementById("storage-button").addEventListener("click", function() {
    var city = localStorage.getItem("city");
    console.log(city);
    getCurrentWeather(city);
    getWeekWeather(city);
})
