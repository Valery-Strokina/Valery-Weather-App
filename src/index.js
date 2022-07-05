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

function getForecast(coordinates) {
  let apiKey = "62bc298785543e137bc6756e514eb1c3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayWeatherCondition(response) {
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

  getForecast(response.data.coord);
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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  let forecast = response.data.daily;

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6 && index > 0) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2 sat">
              <div class="weather-forecast-date">${formatDay(
                forecastDay.dt
              )}</div>
              <img
                src="http://openweathermap.org/img/wn/${
                  forecastDay.weather[0].icon
                }@2x.png"
                alt=" "
                width="42"
              />
              <div class="weather-forecast-temperatures">${Math.round(
                forecastDay.temp.day
              )}°C</div>
            </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;

  forecastElement.innerHTML = forecastHTML;
}
