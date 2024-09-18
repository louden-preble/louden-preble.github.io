const weatherInfo = document.getElementById('weather-info');

async function getWeatherData(lat, lon) {
    const response = await fetch(`https://api.weather.gov/points/${lat},${lon}`);
    const data = await response.json();
    const forecastUrl = data.properties.forecast;

    const forecastResponse = await fetch(forecastUrl);
    const forecastData = await forecastResponse.json();

    const today = forecastData.properties.periods[0];
    weatherInfo.querySelector('h2').innerText = data.properties.relativeLocation.properties.city;
    weatherInfo.querySelector('.temperature').innerText = `${today.temperature}°${today.temperatureUnit}`;
    weatherInfo.querySelector('.description').innerText = today.shortForecast;
}

getWeatherData(38.8951, -77.0364); // Default location (Washington, DC)
