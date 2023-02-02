//Complete the Weather API Backend part using openweathermap api

// Progression 1: Create a function and fetch data using "fetch" from openweathermap api and display the data as given in reference image.

const myAPIkey = '1fa52a27933fb2bf4fc6ed166dba886c';
var locationInput = document.getElementById('getLocation');
const info1 = document.getElementById('info1');

document.addEventListener('keypress', (event) => {
  if (event.keyCode == 13) {
    let locationEntered = locationInput.value;
    createCoordinateLink(locationEntered);
  }
});

function createCoordinateLink(locationPassed) {
  let geoCodeLink = `https://api.openweathermap.org/geo/1.0/direct?q=${locationPassed}&APPID=${myAPIkey}`;
  getLocationData(geoCodeLink);
}

function getLocationData(geoCodeLink) {
  fetch(geoCodeLink)
    .then((response) => response.json())
    .then((locationData) => {
      console.log(locationData);
      getCoordinates(locationData);
      updateLocation(locationData);
      updateDate();
    });
}

function getCoordinates(locationData) {
  let lattitude = locationData[0].lat;
  let logitude = locationData[0].lon;
  createWeatherLink(lattitude, logitude);
}

function createWeatherLink(lattitude, longitude) {
  let weatherLink = `https://api.openweathermap.org/data/2.5/weather?lat=${lattitude}&lon=${longitude}&appid=${myAPIkey}`;
  getWeatherData(weatherLink);
}

function getWeatherData(weatherLink) {
  fetch(weatherLink)
    .then((response) => response.json())
    .then((weatherData) => {
      console.log(weatherData);
      updateTemperature(weatherData);
      updateClouds(weatherData);
      updateMinAndMax(weatherData);
    });
}

function updateLocation(locationDetails) {
  let Location = document.getElementById('location');
  let update = `${locationDetails[0].name}, ${locationDetails[0].country}`;
  Location.innerText = update;
}

function updateTemperature(weatherDetails) {
  let temperature = document.getElementById('temperature');
  let update = `${Math.round(weatherDetails.main.temp - 273)}°C`;
  temperature.innerText = update;
}

function updateClouds(weatherDetails) {
  let clouds = document.getElementById('clouds');
  let update = `${weatherDetails.weather[0].main}`;
  clouds.innerText = update;
}

function updateMinAndMax(weatherDetails) {
  let minMax = document.getElementById('minAndMax');
  let update = `Min ${Math.round(
    weatherDetails.main.temp_min - 273
  )}°C  / Max ${Math.round(weatherDetails.main.temp_max - 273)}°C`;
  minMax.innerText = update;
}

function updateDate() {
  var currdate = new Date();
  let date = document.getElementById('date');
  date.innerText = currdate;
}
