//getting the date
let now = new Date();
let hour = now.getHours();
let min = now.getMinutes();
let days = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];
let day = days[now.getDay()];

document.querySelector("#currentDate").innerHTML = `${day} ${hour}:${min}`;

//search and getting temperature

let currentCity = document.querySelector("#currentCity");
let searchInput = document.querySelector("#search-input");
let currentTemperature = document.querySelector("#currentTemp");
function searchCity(event) {
  let apiKey = "502951590779e9a44b221563a4491245";

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}`;
  event.preventDefault();

  currentCity.innerHTML = searchInput.value;
  axios.get(`${apiUrl}&appid=${apiKey}&units=metric`).then(showTemperature);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCity);

//getting current weather

function showTemperature(response) {
  console.log(response);
  let temperature = Math.round(response.data.main.temp);
  let city = response.data.name;
  let currentTemperature = document.querySelector("#currentTemp");
  currentTemperature.innerHTML = `${temperature}°C`;
}

// function convertTemperaturetoC(event) {
//   event.preventDefault();
//   currentF.innerHTML = "19";
// }
// function convertTemperaturetoF(event) {
//   event.preventDefault();
//   currentC.innerHTML = "66";
// }

// let currentF = document.querySelector("#currentF");
// currentF.addEventListener("click", convertTemperaturetoC);
// let currentC = document.querySelector("#currentC");
// currentC.addEventListener("click", convertTemperaturetoF);
