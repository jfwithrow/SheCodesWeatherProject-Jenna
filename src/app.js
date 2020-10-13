//Current Date

function formatDate(timestamp) {
  let date = new Date(timestamp);

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let nowDay = days[date.getDay()];
  return `${nowDay} ${formatHours(timestamp)}`;
}
//City

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let nowHour = date.getHours();
  if (nowHour < 10) {
    nowHour = `0${nowHour}`;
  }
  let nowMinutes = date.getMinutes();
  if (nowMinutes < 10) {
    nowMinutes = `0${nowMinutes}`;
  }
  return `${nowHour}:${nowMinutes}`;
}
function displayWeatherCondition(response) {
  let cityElement = document.querySelector("h1");
  let temperatureElement = document.querySelector("#temperature");
  let humidtyElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let momentElement = document.querySelector("#moment");
  let iconElement = document.querySelector("#icon");

  celciusTemperature = response.data.main.temp;
  cityElement.innerHTML = response.data.name;
  temperatureElement.innerHTML = Math.round(celciusTemperature);
  humidtyElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  momentElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  document.querySelector("#right-now").innerHTML =
    response.data.weather[0].main;
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 5; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += ` 
    <div class="col-2">
                <h3>${formatHours(forecast.dt * 1000)}</h3>
                  <img src="http://openweathermap.org/img/wn/${
                    forecast.weather[0].icon
                  }@2x.png" alt="" class="Sunday" />
                <div class="weather-forecast-temperature">
              <strong>${Math.round(
                forecast.main.temp_max
              )}°</strong> <span>${Math.round(forecast.main.temp_min)}°</span>
    </div>
            </div>
            `;
  }
}

function search(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text-input").value;
  let apiKey = "ded3e7c16686147e3f17fde35f693c3f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

//Celcius and Farenheight Change
function seeFarenheight(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let farenheightTemperature = (celciusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(farenheightTemperature);
  celciusLink.classList.remove("active");
  farenheightLink.classList.add("active");
}

function seeCelcius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celciusTemperature);
  celciusLink.classList.add("active");
  farenheightLink.classList.remove("active");
}

let celciusTemperature = null;

let farenheightLink = document.querySelector("#changef");
farenheightLink.addEventListener("click", seeFarenheight);

let celciusLink = document.querySelector("#changec");
celciusLink.addEventListener("click", seeCelcius);

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);
