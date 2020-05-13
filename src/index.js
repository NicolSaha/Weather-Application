// Time + Date

let now = new Date();
let currentDate = document.querySelector("#current-date");

let date = now.getDate();
let hours = now.getHours();
let minutes = now.getMinutes();
let year = now.getFullYear();

let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[now.getDay()];

let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

let month = months[now.getMonth()];

currentDate.innerHTML = `${day}, ${month} ${date}, ${year}, ${hours}:${minutes} `;

// Info and Extra

function formatSunrise(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  return `${hours}:${minutes}`;
}

function displayWeather(response) {
  console.log(response.data);

  let city = response.data.name;
  document.querySelector("#chosencity").innerHTML = city;

  celsiusTemperature = response.data.main.temp;

  let currentTemperature = Math.round(celsiusTemperature);
  document.querySelector("#current-temperature").innerHTML = currentTemperature;

  let description = response.data.weather[0].description;
  document.querySelector("#temperature-description").innerHTML = description;

  let feelsLike = Math.round(response.data.main.feels_like);
  document.querySelector("#feels-like").innerHTML = `${feelsLike} ºC`;

  let humidity = response.data.main.humidity;
  document.querySelector("#humidity").innerHTML = `${humidity}%`;

  let wind = Math.round(response.data.wind.speed * 3.6);
  document.querySelector("#wind").innerHTML = `${wind} km/h`;

  let visibility = Math.round(response.data.visibility / 1000);
  document.querySelector("#visibility").innerHTML = `${visibility} km`;

  let pressure = response.data.main.pressure;
  document.querySelector("#pressure").innerHTML = `${pressure} hPa`;

  let sunrise = formatSunriseTime(response.data.sys.sunrise * 1000);
  document.querySelector("#sunrise").innerHTML = `${sunrise}`;

  let icon = (document.getElementById(
    "#weathericontoday"
  ).src = `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  document.querySelector("#weathericontoday").innerHTML = icon;

  icon.setAttribute("alt", response.data.weather[0].description);
}

// Forecast

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 6; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `
        <div class="col-2">
            <strong>${formatHours(forecast.dt * 1000)}</strong> <br />
            <span class="weathericon">
                <img align="middle" src="http://openweathermap.org/img/wn/${
                  forecast.weather[0].icon
                }@2x.png" alt="" />
            </span>
            <br />
            <span> ${Math.round(forecast.main.temp_max)}°</span> |
            <span id="mintemp" >
                 ${Math.round(forecast.main.temp_min)}°
            </span>
            <br />
        </div>
    `;
  }
}

// Sunrise Time

function formatSunriseTime(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

// Forecast Time

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

// Search Engine

function searchCity(city) {
  let units = "metric";
  let apiKey = "0546a51e6ee07afd4031494f64e6a747";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeather);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayForecast);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city-input").value;
  searchCity(city);

  let searchInput = document.querySelector("#search-city-input");
  let currentCity = document.querySelector("#chosencity");

  if (searchInput.value) {
    currentCity.innerHTML = `${searchInput.value}`;
  } else {
    currentCity.innerHTML = null;
    alert("Please type a city");
  }
}

// Current Location

function handleLocation(location) {
  let units = "metric";
  let apiKey = "0546a51e6ee07afd4031494f64e6a747";

  let latitude = location.coords.latitude;
  let longitude = location.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(handleLocation);
}

// Form Handling
let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let findLocation = document.querySelector("#currentlocation");
findLocation.addEventListener("click", getCurrentLocation);

// Convert Fahrenheit and Celsius

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let currentTemperature = document.querySelector("#current-temperature");

  // Remove active class celcius add to fahrenheit
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");

  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  currentTemperature.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();

  // Add active class celcius remove to fahrenheit
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");

  let currentTemperature = document.querySelector("#current-temperature");
  currentTemperature.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

// Initial Search
searchCity("Porto");
