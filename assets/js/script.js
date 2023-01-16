// Elements
var searchInputEl = $("input[type=text]");
var searchButtonEl = $("#search-button");
var historyContainerEl = $("#history-container");

var cityEl = $("#city");
var currentDateEl = $("#current-date");
var currentTempEl = $("#current-temp");
var currentWindEl = $("#current-wind");
var currentHumEl = $("#current-hum");

var day1DateEl = $("#day1-date");
var day1TempEl = $("#day1-temp");
var day1WindEl = $("#day1-wind");
var day1HumEl = $("#day1-hum");

var day2DateEl = $("#day2-date");
var day2TempEl = $("#day2-temp");
var day2WindEl = $("#day2-wind");
var day2HumEl = $("#day2-hum");

var day3DateEl = $("#day3-date");
var day3TempEl = $("#day3-temp");
var day3WindEl = $("#day3-wind");
var day3HumEl = $("#day3-hum");

var day4DateEl = $("#day4-date");
var day4TempEl = $("#day4-temp");
var day4WindEl = $("#day4-wind");
var day4HumEl = $("#day4-hum");

var day5DateEl = $("#day5-date");
var day5TempEl = $("#day5-temp");
var day5WindEl = $("#day5-wind");
var day5HumEl = $("#day5-hum");

// Variables
var url;
var lat;
var lon;

// API URLs, key
var apiUrlGeo = "http://api.openweathermap.org/geo/1.0/";
var apiUrlCurrent = "https://api.openweathermap.org/data/2.5/weather";
var apiUrlForecast = "https://api.openweathermap.org/data/2.5/forecast";
var apiKey = "19c480cdb6d4cf47fa5ba4030638e6b3";

// Event listeners
searchButtonEl.click(parseSearch);

// Parse search input
function parseSearch() {
  var searchInput = searchInputEl.val();
  
  if (isNaN(parseInt(searchInput))) {
    // If search input is a string
    var searchInputArray = searchInput.split(",");
    if (!searchInputArray[1]) {
      return alert('Please follow this format: "City, State"');
    }
    var city = searchInputArray[0].trim();
    var state = searchInputArray[1].trim();
    getApiCoordFromCity(city, state);
  } else if (typeof parseInt(searchInput) === "number") {
    // If search in put is a number
    var zip = searchInput.trim();
    getApiCoordFromZip(zip);
  }
}

// API call to get coordinates from city name
function getApiCoordFromCity(city, state) {
  url = apiUrlGeo + "direct?q=" + city + "," + state + ",US&appid=" + apiKey;
  console.log(url);
  $.ajax({
    url: url,
    method: "GET",
  }).then(function (response) {
    console.log(response[0]);
    lat = response[0].lat;
    lon = response[0].lon;
    getApiCurrent(lat, lon);
    getApiForecast(lat, lon);
  })
}

// API call to get coordinates from ZIP
function getApiCoordFromZip(zip) {
  url = apiUrlGeo + "zip?zip=" + zip + "&appid=" + apiKey;
  console.log(url);
  $.ajax({
    url: url,
    method: "GET",
  }).then(function (response) {
    console.log(response);
    lat = response.lat;
    lon = response.lon;
    getApiCurrent(lat, lon);
    getApiForecast(lat, lon);
  })
}

// API call to get current weather
function getApiCurrent(lat, lon) {
  console.log("Latitude: " + lat);
  console.log("Longitude: " + lon);
  url = apiUrlCurrent + "?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + apiKey;
  console.log(url);
  $.ajax({
    url: url,
    method: "GET",
  }).then(function (response) {
    displayCurrent(response);
  })
}

// API call to get 5-day forecast
function getApiForecast(lat, lon) {
  url = apiUrlForecast + "?lat=" + lat + "&lon=" + lon + "&units=imperial&&appid=" + apiKey;
  console.log(url);
  $.ajax({
    url: url,
    method: "GET",
  }).then(function (response) {
    displayForecast(response);
  })
}


// Display current weather
function displayCurrent(forecast) {
  cityEl.text(forecast.name);
  currentDateEl.text(dayjs().format("M/D/YYYY"));
  currentTempEl.append(Math.round(forecast.main.temp) + " \u2109");
  currentWindEl.append(Math.round(forecast.wind.speed) + " mph");
  currentHumEl.append(Math.round(forecast.main.humidity) + "%");
}

// Display 5-day forecast
function displayForecast(forecast) {
  day1DateEl.text(dayjs().add(1, "day").format("M/D"));
  var day1 = forecast.list[5];
  day1TempEl.append(Math.round(day1.main.temp) + " \u2109");
  day1WindEl.append(Math.round(day1.wind.speed) + " mph");
  day1HumEl.append(Math.round(day1.main.humidity) + "%");

  day2DateEl.text(dayjs().add(2, "day").format("M/D"));
  var day2 = forecast.list[11];
  day2TempEl.append(Math.round(day2.main.temp) + " \u2109");
  day2WindEl.append(Math.round(day2.wind.speed) + " mph");
  day2HumEl.append(Math.round(day2.main.humidity) + "%");

  day3DateEl.text(dayjs().add(3, "day").format("M/D"));
  var day3 = forecast.list[17];
  day3TempEl.append(Math.round(day3.main.temp) + " \u2109");
  day3WindEl.append(Math.round(day3.wind.speed) + " mph");
  day3HumEl.append(Math.round(day3.main.humidity) + "%");

  day4DateEl.text(dayjs().add(4, "day").format("M/D"));
  var day4 = forecast.list[23];
  day4TempEl.append(Math.round(day4.main.temp) + " \u2109");
  day4WindEl.append(Math.round(day4.wind.speed) + " mph");
  day4HumEl.append(Math.round(day4.main.humidity) + "%");

  day5DateEl.text(dayjs().add(5, "day").format("M/D"));
  var day5 = forecast.list[29];
  day5TempEl.append(Math.round(day5.main.temp) + " \u2109");
  day5WindEl.append(Math.round(day5.wind.speed) + " mph");
  day5HumEl.append(Math.round(day5.main.humidity) + "%");
}