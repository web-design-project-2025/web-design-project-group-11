function getWeatherIcon(code) {
  if (code === 0) return "☀️"; // Clear sky
  if ([1, 2, 3].includes(code)) return "⛅"; // Mainly clear, partly cloudy, overcast
  if ([45, 48].includes(code)) return "🌫️"; // Fog
  if ([51, 53, 55].includes(code)) return "🌦️"; // Drizzle
  if ([56, 57].includes(code)) return "🥶🌦️"; // Freezing Drizzle
  if ([61, 63, 65].includes(code)) return "🌧️"; // Rain
  if ([66, 67].includes(code)) return "🥶🌧️"; // Freezing Rain
  if ([71, 73, 75].includes(code)) return "❄️"; // Snow fall
  if (code === 77) return "🌨️"; // Snow grains
  if ([80, 81, 82].includes(code)) return "🌦️"; // Rain showers
  if ([85, 86].includes(code)) return "🌨️"; // Snow showers
  if (code === 95) return "⛈️"; // Thunderstorm
  if ([96, 99].includes(code)) return "🌩️❄️"; // Thunderstorm with hail
  return "❓"; // Unknown
}

window.addEventListener("DOMContentLoaded", () => {
  const detailcontentElement = document.getElementById("detail-content");
  let countries = [];

  function getTitleFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get("title");
  }

  async function loadData() {
    const response = await fetch("data/countries.json");
    const json = await response.json();
    countries = json.countries;

    const title = getTitleFromURL();
    if (title) {
      displayCountryDetail(title);
    }
  }

  function displayCountryDetail(title) {
    const country = countries.find(
      (c) => c.title.toLowerCase() === title.toLowerCase()
    );

    if (country) {
      detailcontentElement.innerHTML = "";

      const titleElement = document.createElement("h1");
      titleElement.textContent = country.title;
      detailcontentElement.appendChild(titleElement);
      titleElement.classList.add("title");

      const temperatureElement = document.createElement("p");
      temperatureElement.id = "temperature";
      temperatureElement.textContent = "Laddar temperatur...";
      detailcontentElement.appendChild(temperatureElement);

      const descriptionElement = document.createElement("p");
      descriptionElement.textContent = country.description;
      detailcontentElement.appendChild(descriptionElement);
      descriptionElement.classList.add("description");

      //GET WEATHER FROM RIGHT COUNTRY//
      const lat = country.location.latitude;
      const lon = country.location.longitude;
      const apiURL = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weathercode`;

      fetch(apiURL)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          const temperature = data.current.temperature_2m;

          const weatherCode = data.current.weathercode;
          const icon = getWeatherIcon(weatherCode);
          temperatureElement.textContent = `Temperature in ${country.capital}: ${temperature}°C ${icon}`;
        })
        .catch((error) => {
          temperatureElement.textContent = "Kunde inte hämta väderdata.";
          console.error("Fel vid väderhämtning:", error);
        });

      country.additional_images.forEach((image, index) => {
        const imgElement = document.createElement("img");
        imgElement.src = image.url;
        imgElement.alt = image.alt;

        // Lägg till olika klasser beroende på vilken bild det är
        if (index === 0) {
          imgElement.classList.add("image-first");
        } else if (index === 1) {
          imgElement.classList.add("image-second");
        } else if (index === 2) {
          imgElement.classList.add("image-third");
        }

        detailcontentElement.appendChild(imgElement);
      });

      // const additionalImagesContainer = document.createElement("div");
      // country.additional_images.forEach((image) => {
      //   const imgElement = document.createElement("img");
      //   imgElement.src = image.url;
      //   imgElement.alt = image.alt;
      //   additionalImagesContainer.appendChild(imgElement);
      // });
      // detailcontentElement.appendChild(additionalImagesContainer);
    } else {
      detailcontentElement.innerHTML =
        "Ingen information hittades för detta land.";
    }
  }

  loadData();
});
