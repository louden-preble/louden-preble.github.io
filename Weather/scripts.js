const weatherInfo = document.getElementById('weather-info');
const zipInput = document.getElementById('zip');
const submitZip = document.getElementById('submit-zip');

// Function to get weather data from NWS API
async function getWeatherData(lat, lon) {
    try {
        const response = await fetch(`https://api.weather.gov/points/${lat},${lon}`);
        const data = await response.json();
        const forecastUrl = data.properties.forecast;

        const forecastResponse = await fetch(forecastUrl);
        const forecastData = await forecastResponse.json();

        const today = forecastData.properties.periods[0];
        weatherInfo.querySelector('h2').innerText = data.properties.relativeLocation.properties.city;
        weatherInfo.querySelector('.temperature').innerText = `${today.temperature}°${today.temperatureUnit}`;
        weatherInfo.querySelector('.description').innerText = today.shortForecast;
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

// Function to get coordinates from zip code using an API
async function getCoordinatesFromZip(zip) {
    const response = await fetch(`https://api.zippopotam.us/us/${zip}`);
    if (response.ok) {
        const data = await response.json();
        const { latitude, longitude } = data.places[0];
        return { lat: latitude, lon: longitude };
    } else {
        alert('Invalid Zip Code. Please try again.');
    }
}

// Function to handle geolocation success
function geoSuccess(position) {
    const { latitude, longitude } = position.coords;
    getWeatherData(latitude, longitude);
}

// Function to handle geolocation errors
function geoError() {
    alert('Unable to retrieve your location.');
}

// Event listener for zip code submission
submitZip.addEventListener('click', async () => {
    const zip = zipInput.value;
    if (zip) {
        const coords = await getCoordinatesFromZip(zip);
        if (coords) {
            getWeatherData(coords.lat, coords.lon);
        }
    }
});

// Try to get the user's location on page load
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
} else {
    alert('Geolocation is not supported by your browser.');
}
