// DOM.js - Build/Update DOM Elements.

/**
 * Display weather data on the page.
 * @param {object} oWeatherData - The weather data to display.
 */
export function displayWeather(oData) {
  const oResult = document.querySelector("#weather-result"); // Get the weather result element.
  oResult.innerHTML = ""; // Clear previous results.

  const sCity = oData.name; // Get the city name from the data.
  const sTemp = `${Math.round(oData.main.temp)}°F`; // Get the temperature and round it.
  const sDescription = oData.weather[0].description; // Get the weather description.
  const sIconCode = oData.weather[0].icon; // Get the weather icon code.
  const sIconURL = `https://openweathermap.org/img/wn/${sIconCode}@2x.png`; // Construct the icon URL.

  const oCard = document.createElement("div"); // Create a new div for the weather card.
  oCard.classList.add("weather-card"); // Add a class to the card.

  oCard.innerHTML = `
    <h2>${sCity}</h2>
    <img src="${sIconURL}" alt="${sDescription}" />
    <p><strong>${sTemp}</strong></p>
    <p>${sDescription}</p>
    `;

  oResult.appendChild(oCard); // Append the card to the result element.
}
