let weather = {
  apiKey: "45ad748d8387aeb2bae83fb1a1fa4656",
  fetchWeather: async function (city) {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.apiKey}`
      );

      if (!response.ok) {
        alert(`No se encontró el clima para la ciudad de ${city}.`);
        throw new Error(`No se encontró el clima para la ciudad de ${city}.`);
      }

      const data = await response.json();
      this.displayWeather(data);
    } catch (error) {
      console.error(error);
    }
  },

  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;

    console.log(name, icon, description, temp, humidity, speed);

    document.querySelector(".city").textContent = `Clima en ${name}`;
    document.querySelector(
      ".icon"
    ).src = `https://openweathermap.org/img/wn/${icon}.png`;
    document.querySelector(".description").textContent = description;
    document.querySelector(".temp").textContent = `${temp}°C`;
    document.querySelector(".humidity").textContent = `Humedad ${humidity}%`;
    document.querySelector(
      ".wind"
    ).textContent = `Velocidad del Viento: ${speed} km/h`;
    document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1600x900/?" + name + "')";
  },

  search: function () {
    const city = document.querySelector(".search-bar").value;
    if (city) {
      this.fetchWeather(city);
    } else {
      alert("Por favor, ingrese una ciudad.");
    }
  },
};

// Agregamos un listener al botón de búsqueda
document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});

document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });

weather.fetchWeather("Denver");
