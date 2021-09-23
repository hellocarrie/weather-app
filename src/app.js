function searchCity(event) {
  let city = document.querySelector("#city-input").value;

  let apiKey = "502951590779e9a44b221563a4491245";

  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  event.preventDefault();
  axios.get(apiURL).then(displayTemperature);
}

function formatDate(timestamp) {
  //format Friday 10:00
  let date = new Date(timestamp);
  let hours = date.getHours();
  let mins = date.getMinutes();
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

  console.log(day);
  console.log(date);
  console.log(month);
  console.log(calDay);
  console.log(year);
  return `<li>${days[day]} ${hours}:${mins}</li> <li>${months[month]} ${calDay} ${year}</li>`;
}

function displayTemperature(response) {
  console.log(response);
  console.log(response.data.weather[0].description);
  console.log(response.data.wind.speed);
  let temperatureElement = document.querySelector("#temperature");
  let descriptionElement = document.querySelector("#description");
  let cityElement = document.querySelector("#city");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date-time");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  descriptionElement.innerHTML = response.data.weather[0].description;
  cityElement.innerHTML = response.data.name;
  humidityElement.innerHTML = `${response.data.main.humidity}%`;
  windElement.innerHTML = `${response.data.wind.speed} km/h`;
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
}

let form = document.querySelector("#city-search");
form.addEventListener("submit", searchCity);
