$("#back-btn").on('click', function() {
    window.location.replace('./index.html');
})

// This code below will call for current weather data in Springdale Utah aka Zion
// TODO Create a button from index.html that takes the park chosen information to help populate correct location weather with openweathermap api
const apiKey = 'ebcf60ba77c2c60649057738c3342155';

    // URL for fetching weather data
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Springdale,us&appid=${apiKey}&units=metric`;

    // Function to fetch weather data and update the HTML
    async function fetchWeather() {
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            
            const weatherDescription = data.weather[0].description;
            const temperature = data.main.temp;
            
            const weatherInfo = `${weatherDescription}. Temperature: ${temperature}°C`;
            
            // Update the HTML with weather information
            const weatherInfoElement = document.getElementById('weather-info');
            weatherInfoElement.textContent = weatherInfo;
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    }

    // Get the button element by its ID
const fetchButton = document.getElementById('fetch-button');

// Add a click event listener to the button
fetchButton.addEventListener('click', fetchWeather);