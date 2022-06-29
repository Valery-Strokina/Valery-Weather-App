let currentDayTime = new Date();

function formatDate(timestamp) {
  let date = new Date(timestamp);
  let currentHour = date.getHours();
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }
  let currentMinutes = date.getMinutes();
  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let currentDay = days[date.getDay()];

  let formattedDate = `${currentDay} ${currentHour}:${currentMinutes}`;
  return formattedDate;
}

let now = document.querySelector("#now");
now.innerHTML = formatDate(currentDayTime);

function displayWeatherCondition(response) {
  console.log(response.data);
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  document.querySelector("#city").innerHTML =
    response.data.name + ", " + response.data.sys.country;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
}

function searchCity(city) {
  let apiKey = "62bc298785543e137bc6756e514eb1c3";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

function showFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 44;
}
let fahrenheitClick = document.querySelector("#fahrenheit");
fahrenheitClick.addEventListener("click", showFahrenheit);

function showCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 20;
}
let celsiusClick = document.querySelector("#celsius");
celsiusClick.addEventListener("click", showCelsius);

function searchLocation(position) {
  let apiKey = "62bc298785543e137bc6756e514eb1c3";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", getCurrentLocation);

searchCity("London");
