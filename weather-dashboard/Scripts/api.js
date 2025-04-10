// API.js - Fetch weather from OpenWeatherMap.

const API_KEY = "b1e2c513d6ab29a1c672c7aebd164505"; // Your OpenWeatherMap API key.
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather"; // Base URL for OpenWeatherMap API.

/**
 * Fetch weather data for a given city.
 * @param {string} city - The name of the city to fetch weather data for.
 * @return {Promise<object>} - JSON response containing weather data from the api.
 */
export async function fetchWeatherData(sCity) {
  const sURL = `${BASE_URL}?q=${encodeURIComponent(
    sCity
  )}&appid=${API_KEY}&units=imperial`; // Construct the API URL with the city name and API key.

  try {
    const oResponse = await fetch(sURL); // Fetch the weather data from the API.

    if (!oResponse.ok) {
      throw new Error(`Error fetching weather data: ${oResponse.statusText}`); // Handle HTTP errors.
    }

    const oData = await oResponse.json(); // Parse the JSON response.
    return oData; // Return the weather data.
  } catch (err) {
    console.error("Error fetching weather data: ", err.message); // Log any errors that occur during the fetch.
    throw err; // Rethrow the error to be handled by the calling function.
  }
}
