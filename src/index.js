// Time + Date

let now = new Date();
let currentDate = document.querySelector("#current-date");

let date = now.getDate();
let hours = now.getHours();
let minutes = now.getMinutes();
let year = now.getFullYear();

let days = ["Sun", "Mon", "Tue", "Wen", "Thu", "Fri", "Sat"];
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

function showWeather(response) {
  console.log(response.data);

  let city = response.data.name;
  document.querySelector("#chosencity").innerHTML = city;
  document.querySelector("#current-temperature").innerHTML = Math.round(
    response.data.main.temp
  );

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

  let sunrise = response.data.sys.sunrise;
  document.querySelector("#sunrise").innerHTML = `${sunrise}`;
}

// Search Engine

function searchCity(city) {
  let units = "metric";
  let apiKey = "0546a51e6ee07afd4031494f64e6a747";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeather);
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
  axios.get(apiUrl).then(showWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(handleLocation);
}

//
let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let findLocation = document.querySelector("#currentlocation");
findLocation.addEventListener("click", getCurrentLocation);
