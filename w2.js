
const searchInput = document.querySelector('.search input');
const searchBtn = document.querySelector('.search button');
const weatherIcon = document.querySelector('.weather-icon');
const errorElement = document.querySelector('.error');
const weatherElement = document.querySelector('.weather');
const tempElement = document.querySelector('.temp');
const cityElement = document.querySelector('.city');
const humidityElement = document.querySelector('.humidity');
const windElement = document.querySelector('.wind');


const apiKey = '4cacaebbe9e145aa0e930156102030c0'; // Get one from OpenWeatherMap
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';


async function checkWeather(city) {
    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        
        if (response.status === 404) {
            errorElement.style.display = 'block';
            weatherElement.style.display = 'none';
            return;
        }
        
        const data = await response.json();
        
        
        cityElement.textContent = data.name;
        tempElement.textContent = `${Math.round(data.main.temp)}°C`;
        humidityElement.textContent = `${data.main.humidity}%`;
        windElement.textContent = `${data.wind.speed} km/h`;
        
        
        const weatherCondition = data.weather[0].main.toLowerCase();
        weatherIcon.src = `${weatherCondition}.png`;
        
       
        weatherElement.style.display = 'block';
        errorElement.style.display = 'none';
        
    } catch (error) {
        console.error('Error fetching weather data:', error);
        errorElement.style.display = 'block';
        weatherElement.style.display = 'none';
    }
}


searchBtn.addEventListener('click', () => {
    const city = searchInput.value.trim();
    if (city) {
        checkWeather(city);
    }
});


searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const city = searchInput.value.trim();
        if (city) {
            checkWeather(city);
        }
    }
});