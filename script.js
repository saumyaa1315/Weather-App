async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const apiKey = "e9a07ce5e43abd117e478661fa6ee667";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  const weatherResult = document.getElementById("weatherResult");
  weatherResult.innerHTML = "Loading...";

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod !== 200) {
      weatherResult.innerHTML = "❌ City not found or error in API!";
      return;
    }

    const temp = data.main.temp;
    const desc = data.weather[0].description;
    const humidity = data.main.humidity;
    const wind = data.wind.speed;
    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    weatherResult.innerHTML = `
      <img src="${iconUrl}" alt="Weather Icon" class="weather-icon" />
      <p><strong>Temperature:</strong> ${temp} °C</p>
      <p><strong>Condition:</strong> ${desc}</p>
      <p><strong>Humidity:</strong> ${humidity}%</p>
      <p><strong>Wind Speed:</strong> ${wind} m/s</p>
    `;
  } catch (error) {
    weatherResult.innerHTML = "❌ Error fetching data.";
    console.error(error);
  }
}
