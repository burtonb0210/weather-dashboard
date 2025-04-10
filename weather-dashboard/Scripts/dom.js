// -------------------------------------------------------------------
// DOM.js - This module handles updating the page (DOM = Document Object Model).
// It builds a weather "card" and inserts it into the web page dynamically.
// -------------------------------------------------------------------

/**
 * Displays weather data visually in the browser.
 *
 * @param {object} oData - A weather data object returned from the API.
 */
export function displayWeather(oData) {
  // -------------------------------------------------------------------
  // Step 1: Find the section in HTML where we want to place the result
  // -------------------------------------------------------------------
  const oResult = document.querySelector("#weather-result");

  // Clear any existing weather cards so only the latest result is shown
  oResult.innerHTML = "";

  // -------------------------------------------------------------------
  // Step 2: Extract the pieces of data we want to show
  // -------------------------------------------------------------------

  const sCity = oData.name; // City name (e.g., "Cincinnati")

  const sTemp = `${Math.round(oData.main.temp)}°F`;
  // Temperature, rounded to the nearest whole number, with °F added

  const sDescription = oData.weather[0].description;
  // A short description of the weather (e.g., "clear sky")

  const sIconCode = oData.weather[0].icon;
  // The icon code from the API, like "01d", used to find the correct image

  const sIconURL = `https://openweathermap.org/img/wn/${sIconCode}@2x.png`;
  // Full URL to the weather icon image (hosted on OpenWeatherMap's server)

  // -------------------------------------------------------------------
  // Step 3: Create the visual card that will display the weather
  // -------------------------------------------------------------------

  const oCard = document.createElement("div"); // Make a new <div> in memory
  oCard.classList.add("weather-card"); // Add a CSS class for styling

  // Fill the new <div> with HTML using template literals
  oCard.innerHTML = `
    <h2>${sCity}</h2>
    <img src="${sIconURL}" alt="${sDescription}" />
    <p><strong>${sTemp}</strong></p>
    <p>${sDescription}</p>
  `;

  // -------------------------------------------------------------------
  // Step 4: Add the finished weather card to the page
  // -------------------------------------------------------------------

  oResult.appendChild(oCard); // Insert the card into the result section
}
