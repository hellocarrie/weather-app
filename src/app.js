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
  windElement.innerHTML = `${response.data.wind.speed} km/h`;
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.innerHTML = `<img src=" http://openweathermap.org/img/wn/${icon}@2x.png">`;
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let fTemperature = (celsiusTemperature * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(fTemperature);
}

// prevent page from loading & takes city input from user and calls SearchCity function
function handleSubmit(event) {
  event.preventDefault();
  let cityInputEl = document.querySelector("#city-input");
  searchCity(cityInputEl.value);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();

  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
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
