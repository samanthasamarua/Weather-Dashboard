const cityInput = document.getElementById("city-input");
const searchButton = document.querySelector(".search-btn");
const searchedCitiesContainer = document.querySelector(".searched-cities");

const getCityCoordinates = (event) => {
    event.preventDefault();

    const cityName = cityInput.value.trim();
    if (!cityName) return;
    console.log("City Name:", cityName);

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
