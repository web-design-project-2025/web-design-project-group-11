//WEATHER CODES

function getWeatherIcon(code) {
  if (code === 0) return "☀️"; //CLEAR SKY
  if ([1, 2, 3].includes(code)) return "⛅"; //MAINLY CLEAR, PARTLY CLOUDY
  if ([45, 48].includes(code)) return "🌫️"; //FOG
  if ([51, 53, 55].includes(code)) return "🌦️"; //DRIZZLE
  if ([56, 57].includes(code)) return "🥶🌦️"; //FREEZING DRIZZLE
  if ([61, 63, 65].includes(code)) return "🌧️"; //RAIN
  if ([66, 67].includes(code)) return "🥶🌧️"; //FREEZING RAIN
  if ([71, 73, 75].includes(code)) return "❄️"; //SNOW FALL
  if (code === 77) return "🌨️"; //SNOW GRAINS
  if ([80, 81, 82].includes(code)) return "🌦️"; //RAIN SHOWER
  if ([85, 86].includes(code)) return "🌨️"; //SNOW SHOWERS
  if (code === 95) return "⛈️"; //THUNDERSTORM
  if ([96, 99].includes(code)) return "🌩️❄️"; //THUNDERSTORM WITH HAIL
  return "❓"; //UNKNOWN
}

//RUNS WHEN THE HTML IS LOADED
window.addEventListener("DOMContentLoaded", () => {
  const detailcontentElement = document.getElementById("detail-content");
  let countries = [];

  //CREATE THE RIGHT URL
  function getIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get("id");
  }

  //FETCH THE DATA FROM JSON COUNTRIES - DISPLAY COUNTRY DETAILS BASED ON ID
  async function loadData() {
    const response = await fetch("data/countries.json");
    const json = await response.json();
    countries = json.countries;

    const id = getIdFromURL();
    if (id) {
      displayCountryDetail(id);
    }
  }

  //FINDS DATA FROM THE JSON COUNTRY FILE (ID)
  function displayCountryDetail(id) {
    const country = countries.find((c) => String(c.id) === String(id));

    if (country) {
      detailcontentElement.innerHTML = "";

      //CREATE HTML ELEMENTS
      const likeButtonElement = document.createElement("button");
      likeButtonElement.classList.add("like-button");

      const titleElement = document.createElement("h1");
      titleElement.textContent = country.title;
      detailcontentElement.appendChild(titleElement);
      titleElement.classList.add("title");

      //LIKE A COUNTRY AND STORE WITH LOCAL STORAGE

      let likedCountries =
        JSON.parse(localStorage.getItem("likedCountries")) || [];
      let isLiked = likedCountries.includes(country.id);

      function updateLikeButton() {
        const heartImg = document.createElement("img");
        heartImg.src = isLiked ? "img/heart-filled.svg" : "img/heart-line.svg";
        heartImg.alt = isLiked ? "liked" : "not liked";

        likeButtonElement.innerHTML = "";
        likeButtonElement.appendChild(heartImg);

        if (!isLiked) {
          likeButtonElement.addEventListener("mouseover", () => {
            heartImg.src = "img/heart-filled.svg";
            heartImg.alt = "hovered";
          });

          likeButtonElement.addEventListener("mouseout", () => {
            heartImg.src = "img/heart-line.svg";
            heartImg.alt = "not liked";
          });
        }
      }

      updateLikeButton();

      //IN ORDER TO HOVER IF THE BUTTON HAS BEEN LIKED BEFORE

      likeButtonElement.addEventListener("click", () => {
        isLiked = !isLiked;

        if (isLiked) {
          if (!likedCountries.includes(country.id)) {
            likedCountries.push(country.id);
          }
        } else {
          const index = likedCountries.indexOf(country.id);
          if (index > -1) likedCountries.splice(index, 1);
        }

        localStorage.setItem("likedCountries", JSON.stringify(likedCountries));
        updateLikeButton();
      });

      detailcontentElement.appendChild(likeButtonElement);

      //CREATE TEMPERATURE ELEMENTS (OPEN MATEO - API)
      const temperatureElement = document.createElement("p");
      temperatureElement.id = "temperature";
      temperatureElement.textContent = "Load temperature...";
      detailcontentElement.appendChild(temperatureElement);

      //INTRO TEXT

      const introElement = document.createElement("intro");
      introElement.textContent = country.intro;
      detailcontentElement.appendChild(introElement);
      introElement.classList.add("intro");

      //FIRST IMAGE
      const firstImage = document.createElement("img");
      firstImage.src = country.additional_images[0].url;
      firstImage.alt = country.additional_images[0].alt;
      firstImage.classList.add("first-image");
      detailcontentElement.appendChild(firstImage);

      // // Mer text
      // const moreText = document.createElement("p");
      // moreText.textContent = country.description.slice(200); // resten av beskrivningen
      // detailcontentElement.appendChild(moreText);

      //INTRO TITLE
      const introTitleElement = document.createElement("intro-title");
      introTitleElement.textContent = country.subtitle;
      detailcontentElement.appendChild(introTitleElement);
      introTitleElement.classList.add("subtitle");

      //DESCRIPTION
      const descriptionElement = document.createElement("p");
      descriptionElement.textContent = country.description;
      detailcontentElement.appendChild(descriptionElement);
      descriptionElement.classList.add("description");

      //SECOND IMAGE
      const secondImage = document.createElement("img");
      secondImage.src = country.additional_images[1].url;
      secondImage.alt = country.additional_images[1].alt;
      secondImage.classList.add("second-image");
      detailcontentElement.appendChild(secondImage);

      //THIRD IMAGE
      const thirdImage = document.createElement("img");
      thirdImage.src = country.additional_images[2].url;
      thirdImage.alt = country.additional_images[2].alt;
      thirdImage.classList.add("third-image");
      detailcontentElement.appendChild(thirdImage);

      //GET WEATHER FROM RIGHT COUNTRY
      const lat = country.location.latitude;
      const lon = country.location.longitude;
      const apiURL = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weathercode`;

      //WAITS FOR THE RESPONS FROM THE API, ERROR MESSAGE IF DATA COULD NOT BE LOADED
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
          temperatureElement.innerHTML = `
  <span class="temperature-label">Temperature in ${country.capital}:</span><br>
  <span class="temperature-value">${temperature}°C</span>
  <span class="temperature-icon">${icon}</span>
`;
        })

        //ERROR HANDLING - IF SOMETHING IS WRONG IN THE FETCH PROCESS
        .catch((error) => {
          temperatureElement.textContent = "Could not fetch weather data.";
          console.error("Error when rendering weather data:", error);
        });
    } else {
      detailcontentElement.innerHTML =
        "No information was found about this country.";
    }
  }
  loadData();
});
