// ------------------------------------------------------------------
// API.js - This module handles communication with the OpenWeatherMap API.
// It builds the URL, sends a request, and returns the weather data.
// ------------------------------------------------------------------

// ------------------------------------------------------------------
// Step 1: Define constants used to call the API
// ------------------------------------------------------------------

// This is your unique API key from OpenWeatherMap.
// It’s required to authenticate your requests.
const API_KEY = "b1e2c513d6ab29a1c672c7aebd164505";

// This is the base endpoint URL for current weather data.
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

// ------------------------------------------------------------------
// Step 2: Create and export a function to fetch weather data.
// ------------------------------------------------------------------

/**
 * Fetch weather data from OpenWeatherMap for a given city string.
 *
 * @param {string} sCity - The formatted location string (e.g., "Cincinnati,OH,US")
 * @returns {Promise<object>} - A Promise that resolves with the weather data object.
 */
export async function fetchWeatherData(sCity) {
  // ----------------------------------------------------------------
  // Step 2.1: Construct the full API URL
  // ----------------------------------------------------------------
  // encodeURIComponent handles special characters and spaces safely (e.g., "San Francisco")
  // units=imperial requests temperatures in Fahrenheit (vs metric for Celsius)
  const sURL = `${BASE_URL}?q=${encodeURIComponent(
    sCity
  )}&appid=${API_KEY}&units=imperial`;

  try {
    // ----------------------------------------------------------------
    // Step 2.2: Make the network request using fetch()
    // ----------------------------------------------------------------
    const oResponse = await fetch(sURL);

    // ----------------------------------------------------------------
    // Step 2.3: Check for HTTP-level errors
    // ----------------------------------------------------------------
    // If the response is not OK (e.g., 404 or 500), throw an error
    if (!oResponse.ok) {
      throw new Error(`Error fetching weather data: ${oResponse.statusText}`);
    }

    // ----------------------------------------------------------------
    // Step 2.4: Convert the raw JSON response into a usable object
    // ----------------------------------------------------------------
    const oData = await oResponse.json(); // This returns a JavaScript object

    // ----------------------------------------------------------------
    // Step 2.5: Return the parsed data to the calling code (main.js)
    // ----------------------------------------------------------------
    return oData;
  } catch (err) {
    // ----------------------------------------------------------------
    // Step 2.6: Catch any errors (network problems, bad JSON, etc.)
    // ----------------------------------------------------------------
    console.error("Error fetching weather data: ", err.message); // Log error for developers
    throw err; // Rethrow the error so main.js can show a user-friendly alert
  }
}
