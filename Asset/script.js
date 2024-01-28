const cityInput = document.getElementById("city-input");
const searchButton = document.querySelector(".search-btn");
const weatherCardsDiv = document.querySelector(".weather-cards");
const searchedCitiesContainer = document.querySelector(".searched-cities");

const API_KEY = "8f0c579d46f90c2e420c33a62f35b5db"; //API Key for OpenWeatherMap API

const createWeatherCard = (weatherItem) => {
    return `<li class="card">
                <h3>(${weatherItem.dt_txt.split(" ")[0]})</h3>
                <img src="https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@2x.png" alt="weather-icon">
                <h4> Temp: ${(weatherItem.main.temp - 273.15).toFixed(2)}&deg;C </h4>
                <h4> Wind: ${(weatherItem.wind.speed * 2.2369).toFixed(2)} MPH </h4>
                <h4> Humidity: ${weatherItem.main.humidity} % </h4>
            </li>`;
}


const getWeatherDetails = (cityName, lat, lon) => {
    const WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`;

    fetch(WEATHER_API_URL).then(res => res.json()).then(data=> {

        // Filter the forecasts to get only one forecast per day
        const uniqueForecastDays = [];
        const fiveDaysForecast = data.list.filter(forecast => {
            const forecastDate = new Date(forecast.dt_txt).getDate();
            if(!uniqueForecastDays.includes(forecastDate)) {
                return uniqueForecastDays.push(forecastDate);
            }
            
        });

        cityInput.value = "";
        weatherCardsDiv.innerHTML = ""

        console.log(fiveDaysForecast);
        fiveDaysForecast.forEach(weatherItem => {
            weatherCardsDiv.insertAdjacentHTML("beforeend",createWeatherCard(weatherItem));
        });
        
    }).catch(() => {
        alert("An error occurred while fetching weather forecast!");
    });
}

const getCityCoordinates = (event) => {
    event.preventDefault();

    const cityName = cityInput.value.trim();
    if (!cityName) return;
    const GEOCODING_API_URL =`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`;
    
    fetch(GEOCODING_API_URL).then(res => res.json()).then(data => {
        if(!data.length) return alert(`No coordinates found for ${cityName}`);
        const {name, lat, lon } = data[0];
        getWeatherDetails(name, lat, lon);
    }).catch(() => {
        alert("An error occurred while fetching the coordinates!");
    });

    addToHistory(cityName);
};

const addToHistory = (city) => {
    const cityButton = document.createElement("button");
    cityButton.textContent = city;
    cityButton.classList.add("searched-city", "clear-history-btn");

    cityButton.addEventListener("click", () => {
        console.log("Clicked on searched city:", city);
        // You can add additional logic here, e.g., display more details about the city
    });

    if (searchedCitiesContainer) {
        searchedCitiesContainer.appendChild(cityButton);
    } else {
        console.error("Searched cities container not found in the DOM.");
    }
};


searchButton.addEventListener("click", getCityCoordinates);