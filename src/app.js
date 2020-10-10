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
  let nowHour = date.getHours();
  let nowMinutes = date.getMinutes();
  return `${nowDay} ${nowHour}:${nowMinutes}`;
}
//City
function displayWeatherCondition(response) {
  let cityElement = document.querySelector("h1");
  let temperatureElement = document.querySelector("#temperature");
  let humidtyElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let momentElement = document.querySelector("#moment");
  cityElement.innerHTML = response.data.name;
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  humidtyElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  momentElement.innerHTML = formatDate(response.data.dt * 1000);

  document.querySelector("#right-now").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#feel-like").innerHTML = Math.round(
    response.data.main.feels_like
  );
  console.log(response.data);
}

function search(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text-input").value;
  let apiKey = "ded3e7c16686147e3f17fde35f693c3f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

//Celcius and Farenheight Change
function seeFarenheight(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 86;
}

let farenheightLink = document.querySelector("#changef");
farenheightLink.addEventListener("click", seeFarenheight);

function seeCelcius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 30;
}

let celciusLink = document.querySelector("#changec");
celciusLink.addEventListener("click", seeCelcius);
