// handles the API call and gets city variable from handleSubmit function
function searchCity(city) {
  let apiKey = "502951590779e9a44b221563a4491245";

  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiURL).then(displayTemperature);
}
// formats Date and Time , returns out to displaytemperature function
function formatDate(timestamp) {
  //format Friday 10:00
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let mins = date.getMinutes();
  if (mins < 10) {
    mins = `0${mins}`;
  }
  let day = date.getDay();
  let days = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];
  let month = date.getMonth();
  let months = [
    "january",
    "februfary",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "October",
    "November",
    "December",
  ];
  let calDay = date.getDate();
  let year = date.getFullYear();

  return `<li> Last updated: ${days[day]} ${hours}:${mins}</li> <li>${months[month]} ${calDay} ${year}</li>`;
}
function formatDay(time) {
  let date = new Date(time * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];
  return days[day];
}
//displays the 5 day daily forecast
function displayForecast(response) {
  let forecastElement = document.querySelector("#weather-forecast");
  let forecast = response.data.daily;
  console.log(forecast);

  let forecastHTML = `<div class = "row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
  
              <div class="col-2">
                <div class="forecast-date">${formatDay(forecastDay.dt)}</div>
                <img class="forecast-icon" src=" http://openweathermap.org/img/wn/${
                  forecastDay.weather[0].icon
                }@2x.png" alt="" width="50"/>
                <div class="forecast-temperature">
                  <div class="forecast-temperature-max">Hi : ${Math.round(
                    forecastDay.temp.max
                  )}°</div>
                  <div class="forecast-temperature-min">Lo : ${Math.round(
                    forecastDay.temp.min
                  )}°</div>
                </div>

              </div>
           
            `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
// gets the coordinates from display temperature function
function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "502951590779e9a44b221563a4491245";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}
// takes the response from API call and displays it in the HTML
function displayTemperature(response) {
  console.log(response);
  console.log(response.data.weather[0].icon);
  console.log(response.data.wind.speed);
  let temperatureElement = document.querySelector("#temperature");
  let descriptionElement = document.querySelector("#description");
  let cityElement = document.querySelector("#city");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date-time");
  let iconElement = document.querySelector("#icon");
  let icon = response.data.weather[0].icon;
  celsiusTemperature = response.data.main.temp;
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  descriptionElement.innerHTML = response.data.weather[0].description;
  cityElement.innerHTML = response.data.name;
  humidityElement.innerHTML = `${response.data.main.humidity} %`;
  windElement.innerHTML = `${Math.round(response.data.wind.speed)} km/h`;
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.innerHTML = `<img src=" http://openweathermap.org/img/wn/${icon}@2x.png" width="120">`;
  getForecast(response.data.coord);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let fTemperature = (celsiusTemperature * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(fTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();

  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

// prevent page from loading & takes city input from user and calls SearchCity function
function handleSubmit(event) {
  event.preventDefault();
  let cityInputEl = document.querySelector("#city-input");
  searchCity(cityInputEl.value);
}
// loads default city when a page loads
searchCity("Montreal");

let celsiusTemperature = null;

let form = document.querySelector("#city-search");
form.addEventListener("submit", handleSubmit);

let unitF = document.querySelector("#units-f");
unitF.addEventListener("click", displayFahrenheitTemperature);

let unitC = document.querySelector("#units-c");
unitC.addEventListener("click", displayCelsiusTemperature);
