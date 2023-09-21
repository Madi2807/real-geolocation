let now = new Date();
let Days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
let day = Days[now.getDay()];
let date = now.getDate();
let Months = [
  "jan",
  "feb",
  "mar",
  "apr",
  "may",
  "jun",
  "jul",
  "aug",
  "sep",
  "oct",
  "nov",
  "dec"
];
let month = Months[now.getMonth()];
let year = now.getFullYear();
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let seconds = now.getSeconds();
if (seconds < 10) {
  seconds = `0${seconds}`;
}
let formattedTime = `${hour}:${minutes}:${seconds}`;
let todaylessDate = `${day}, ${month} ${date}, ${year}`;

let localTime = document.querySelector("h3");
function updateTime(event) {
  localTime.innerHTML = `${todaylessDate}  ${formattedTime}`;
}
let updater = document.querySelector("#city-search");
updater.addEventListener("submit", updateTime);

let cityName = document.querySelector("form");
cityName.addEventListener("submit", updateCity);

let cityHeader = document.querySelector("#city");

let cityInput = document.querySelector("#Enter-city");
function updateCity(event) {
  event.preventDefault();
  cityHeader.innerHTML = `${cityInput.value}`;
  searchCity(cityInput.value);
}
let cityForm = document.querySelector("#city-search");
cityForm.addEventListener("submit", updateCity);

function searchCity(city) {
  let apiKey = "8b9520a79b25739e20700b6959c2d5ce";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function showLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "8b9520a79b25739e20700b6959c2d5ce";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showLocation);
}
let getCurrentLocationBotton = document.querySelector("#currentlyButton");
getCurrentLocationBotton.addEventListener("click", getCurrentLocation);

function showTemperature(response) {
  console.log(response.data.main.temp);
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = Math.round(response.data.main.temp);

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
}
