// Main.js - Handles app startup.

import { fetchWeatherData } from "./api.js";
import { displayWeather } from "./dom.js";

// Get reference to the form and input field
const oForm = document.querySelector("form");
const oCityInput = document.querySelector("#city-input");

// Listen for form submission
oForm.addEventListener("submit", async (event) => {
  event.preventDefault(); // Stop page from reloading.

  const sInput = oCityInput.value.trim(); // Get user input.

  // Basic format check, must be City, State as in Cincinnati, OH.
  const aParts = sInput.split(",");
  if (aParts.length !== 2 || aParts[1].trim().length !== 2) {
    alert(
      "Please enter a valid city and state in the format City, State (e.g., Cincinnati, OH)."
    );
    return;
  }
  ``;

  const sCity = `${aParts[0].trim()},${aParts[1].trim().toUpperCase()},US`; // Format the city and state for the API.

  try {
    const oWeatherData = await fetchWeatherData(sCity); // Fetch weather data.
    displayWeather(oWeatherData); // Display the weather data.
  } catch (err) {
    console.error("Error fetching weather data: ", err.message); // Log error if fetch fails.
    alert("Could not fetch weather data. Please try again later."); // Alert user of error.
  }
  oCityInput.value = ""; // Clear the input field.
});
