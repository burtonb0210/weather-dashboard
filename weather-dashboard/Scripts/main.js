// --------------------------------------------------------------
// Main.js - Entry point for the Weather Dashboard app.
// It handles user input, formats it, fetches the weather data,
// and triggers the display of that data on the page.
// --------------------------------------------------------------

// --------------------------------------------------------------
// Step 1: Import functions from other JS modules.
// --------------------------------------------------------------
import { fetchWeatherData } from "./api.js"; // Function that talks to the weather API
import { displayWeather } from "./dom.js"; // Function that updates the page with weather info

// --------------------------------------------------------------
// Step 2: Reference key DOM elements.
// --------------------------------------------------------------
const oForm = document.querySelector("form"); // Finds the form element
const oCityInput = document.querySelector("#city-input"); // Finds the input box inside the form

// --------------------------------------------------------------
// Step 3: Set up form submission handler.
// This listens for when the user submits the form.
// --------------------------------------------------------------
oForm.addEventListener("submit", async (event) => {
  event.preventDefault(); // Prevents the default behavior (reloading the page)

  // Trim whitespace from user input to clean it up
  const sInput = oCityInput.value.trim();

  // --------------------------------------------------------------
  // Step 3.1: Validate the format of the input.
  // Expected format is: City, State (e.g., "Cincinnati, OH")
  // --------------------------------------------------------------
  const aParts = sInput.split(","); // Split on the comma to separate city and state

  // If format is invalid (not exactly two parts, or state isn't 2 characters long), show alert
  if (aParts.length !== 2 || aParts[1].trim().length !== 2) {
    alert(
      "Please enter a valid city and state in the format City, State (e.g., Cincinnati, OH)."
    );
    return; // Stop the function here if input is invalid
  }

  // --------------------------------------------------------------
  // Step 3.2: Format the input string for the API.
  // This converts "Cincinnati, oh" → "Cincinnati,OH,US"
  // --------------------------------------------------------------
  const sCity = `${aParts[0].trim()},${aParts[1].trim().toUpperCase()},US`;

  // --------------------------------------------------------------
  // Step 4: Fetch the weather data and display it.
  // Use a try-catch block to handle network/API errors.
  // --------------------------------------------------------------
  try {
    const oWeatherData = await fetchWeatherData(sCity); // Ask OpenWeatherMap for weather data
    displayWeather(oWeatherData); // Pass that data to the DOM function to display
  } catch (err) {
    // If there's an error during the fetch, log it and alert the user
    console.error("Error fetching weather data: ", err.message);
    alert("Could not fetch weather data. Please try again later.");
  }

  // --------------------------------------------------------------
  // Step 5: Clean up UI after the request.
  // Clear the input field so the user can type another city.
  // --------------------------------------------------------------
  oCityInput.value = "";
});
