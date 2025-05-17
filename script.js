const apiKey = "ef1e8210e64448249e2142906251705";
const weatherCard = document.getElementById("weatherCard");
const themeToggle = document.getElementById("themeToggle");
const body = document.body;

function getWeather() {
  const location = document.getElementById("locationInput").value;
  if (!location) return;

  const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=yes`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      const temp = data.current.temp_c;
      const condition = data.current.condition.text;
      const icon = data.current.condition.icon;
      let note = "";

      if (temp > 30) {
        note = "🌞 It's getting warm! Stay cool and drink water.";
      } else if (temp < 15) {
        note = "🧣 It's cold outside! Stay warm and cozy.";
      } else {
        note = "🌤️ The weather is quite pleasant today!";
      }

      weatherCard.innerHTML = `
        <h2>📍 ${data.location.name}</h2>
        <img src="https:${icon}" alt="weather icon">
        <p>🌡️ ${temp}°C</p>
        <p>📋 ${condition}</p>
        <p class="note">${note}</p>
      `;
    })
    .catch(() => {
      weatherCard.innerHTML = `<p>❌ Unable to fetch weather data. Please try again.</p>`;
    });
}

// Theme Toggle
themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark");
  body.classList.toggle("light");

  if (body.classList.contains("dark")) {
    themeToggle.textContent = "☀️ Light Mode";
  } else {
    themeToggle.textContent = "🌙 Dark Mode";
  }
});
