document.addEventListener("DOMContentLoaded", function () {
  // API URL for San Francisco Bay Area weather forecast
  const api_url = "https://api.weather.gov/gridpoints/MTR/84,105/forecast";

  // Function to fetch and display weather information
  async function getWeatherForecast() {
      try {
          // Make a GET request to the Weather API
          const response = await fetch(api_url);

          // Check if the request was successful (status code 200)
          if (response.ok) {
              // Parse the JSON response
              const data = await response.json();

              // Extract forecast for the upcoming three days
              const forecast = data.properties.periods.slice(1, 4);

              // Display the results in the HTML table
              displayWeatherTable(forecast);
          } else {
              // Display an error message if the request was not successful
              console.error(`Error: Unable to retrieve data. Status code: ${response.status}`);
          }
      } catch (error) {
          // Display an error message if an exception occurs
          console.error(`An error occurred: ${error.message}`);
      }
  }

  // Display weather data in the HTML table
  function displayWeatherTable(forecastData) {
      const tableBody = document.getElementById("weather-data");

      forecastData.forEach(period => {
          const row = document.createElement("tr");
          const dayCell = document.createElement("td");
          const startTimeCell = document.createElement("td");
          const endTimeCell = document.createElement("td");
          const weatherCell = document.createElement("td");
          const temperatureCell = document.createElement("td");
          const windSpeedCell = document.createElement("td");

          dayCell.textContent = period.name;
          startTimeCell.textContent = new Date(period.startTime).toLocaleTimeString();
          endTimeCell.textContent = new Date(period.endTime).toLocaleTimeString();
          weatherCell.innerHTML = `${getWeatherIcon(period.shortForecast)} ${period.detailedForecast}`;
          temperatureCell.textContent = period.temperature + " °F";
          windSpeedCell.textContent = period.windSpeed + " mph";

          row.appendChild(dayCell);
          row.appendChild(startTimeCell);
          row.appendChild(endTimeCell);
          row.appendChild(weatherCell);
          row.appendChild(temperatureCell);
          row.appendChild(windSpeedCell);
          tableBody.appendChild(row);
      });
  }

  // Get the appropriate weather icon based on the shortForecast
  function getWeatherIcon(shortForecast) {
      if (shortForecast.toLowerCase().includes("cloudy")) {
          return '<img class="weather-icon" src="cloudy.png" alt="Cloudy">';
      } else if (shortForecast.toLowerCase().includes("sunny")) {
          return '<img class="weather-icon" src="sunny.png" alt="Sunny">';
      } else {
          // Default icon for other conditions
          return '<img class="weather-icon" src="default.png" alt="Weather">';
      }
  }

  // Call the function to get and display the weather forecast
  getWeatherForecast();
});
