// const apiKey = "a7385be162c3f61e0661895d96db3630";  // Replace with your API key
// const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

// const searchBox = document.querySelector(".search input");
// const searchButton = document.querySelector(".search button");
// const weatherIcon = document.querySelector(".weather-icon");

// async function checkWeather(city) {
//     const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

//     if (response.ok) {
//         const data = await response.json();

//         document.querySelector(".city").innerText = data.name;
//         document.querySelector(".temp").innerText = `${Math.round(data.main.temp)}°C`;
//         document.querySelector(".humidity").innerText = `${data.main.humidity}%`;
//         document.querySelector(".wind").innerText = `${data.wind.speed} km/h`;

//         // Change weather icon based on the condition
//         const weatherCondition = data.weather[0].main;

//         if (weatherCondition === "Clouds") {
//             weatherIcon.src = "clouds.png";
//         } else if (weatherCondition === "Clear") {
//             weatherIcon.src = "clear.png";
//         } else if (weatherCondition === "Rain") {
//             weatherIcon.src = "rain.png";
//         } else if (weatherCondition === "Drizzle") {
//             weatherIcon.src = "drizzle.png";
//         } else if (weatherCondition === "Mist") {
//             weatherIcon.src = "mist.png";
//         } else {
//             weatherIcon.src = "default.png";
//         }
//     } else {
//         alert("City not found. Please try again!");
//     }
// }

// // Trigger search on button click or "Enter" key press
// searchButton.addEventListener("click", () => {
//     checkWeather(searchBox.value);
// });

// searchBox.addEventListener("keypress", (e) => {
//     if (e.key === "Enter") {
//         checkWeather(searchBox.value);
//     }
// });

// Select elements from the DOM
const searchInput = document.querySelector('.search input');
const searchBtn = document.querySelector('.search button');
const weatherIcon = document.querySelector('.weather-icon');
const errorElement = document.querySelector('.error');
const weatherElement = document.querySelector('.weather');
const tempElement = document.querySelector('.temp');
const cityElement = document.querySelector('.city');
const humidityElement = document.querySelector('.humidity');
const windElement = document.querySelector('.wind');

// API key and URL - Replace with your actual API key
const apiKey = '4cacaebbe9e145aa0e930156102030c0'; // Get one from OpenWeatherMap
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';

// Function to check weather
async function checkWeather(city) {
    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        
        if (response.status === 404) {
            errorElement.style.display = 'block';
            weatherElement.style.display = 'none';
            return;
        }
        
        const data = await response.json();
        
        // Update weather data
        cityElement.textContent = data.name;
        tempElement.textContent = `${Math.round(data.main.temp)}°C`;
        humidityElement.textContent = `${data.main.humidity}%`;
        windElement.textContent = `${data.wind.speed} km/h`;
        
        // Update weather icon based on weather condition
        const weatherCondition = data.weather[0].main.toLowerCase();
        weatherIcon.src = `${weatherCondition}.png`;
        
        // Show weather and hide error
        weatherElement.style.display = 'block';
        errorElement.style.display = 'none';
        
    } catch (error) {
        console.error('Error fetching weather data:', error);
        errorElement.style.display = 'block';
        weatherElement.style.display = 'none';
    }
}

// Event listener for search button click
searchBtn.addEventListener('click', () => {
    const city = searchInput.value.trim();
    if (city) {
        checkWeather(city);
    }
});

// Event listener for Enter key press
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const city = searchInput.value.trim();
        if (city) {
            checkWeather(city);
        }
    }
});