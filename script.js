document.addEventListener('DOMContentLoaded', () => {
    const API_KEY = 'ace9a0e846b2405922e64d366fb36e58'; // Replace with your actual OpenWeatherMap API key
    const weatherContainer = document.getElementById('weather-container');
    const searchButton = document.getElementById('search-button');
    const locationInput = document.getElementById('location-input');
    const currentLocationButton = document.getElementById('current-location-button');

    searchButton.addEventListener('click', () => {
        const location = locationInput.value;
        if (location) {
            fetchWeatherData(location);
        }
    });

    currentLocationButton.addEventListener('click', () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;
                fetchWeatherDataByCoords(latitude, longitude);
            }, (error) => {
                alert('Unable to retrieve your location');
            });
        } else {
            alert('Geolocation is not supported by this browser');
        }
    });

    function fetchWeatherData(location) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => displayWeatherData(data))
            .catch(error => {
                alert('Unable to retrieve weather data: ' + error.message);
                console.error(error);
            });
    }

    function fetchWeatherDataByCoords(lat, lon) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => displayWeatherData(data))
            .catch(error => {
                alert('Unable to retrieve weather data: ' + error.message);
                console.error(error);
            });
    }

    function displayWeatherData(data) {
        if (data.cod === 200) {
            weatherContainer.style.display = 'block';
            weatherContainer.innerHTML = `
                <p><strong>Location:</strong> ${data.name}, ${data.sys.country}</p>
                <p><strong>Temperature:</strong> ${data.main.temp} °C</p>
                <p><strong>Weather:</strong> ${data.weather[0].description}</p>
                <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
                <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
            `;
        } else {
            weatherContainer.style.display = 'none';
            alert('Location not found');
        }
    }
});
