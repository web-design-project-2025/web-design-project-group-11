window.addEventListener("DOMContentLoaded", () => {
  const favoriteContentElement = document.getElementById("favorite-content");
  let likedCountries = JSON.parse(localStorage.getItem("likedCountries")) || [];
  let countries = [];

  async function loadFavorites() {
    const response = await fetch("data/countries.json");
    const json = await response.json();
    countries = json.countries;

    const favoriteCountries = countries.filter((country) =>
      likedCountries.includes(country.id)
    );

    renderContent(favoriteCountries);
  }

  function renderContent(countryList) {
    favoriteContentElement.innerHTML = "";
    for (let country of countryList) {
      const countryElement = createCountryElement(country);
      favoriteContentElement.appendChild(countryElement);
    }
  }

  function createCountryElement(country) {
    const countryElement = document.createElement("section");
    countryElement.classList.add("country");

    const link = document.createElement("a");
    link.href = `detail-page.html?title=${encodeURIComponent(country.title)}`;

    const likeButtonElement = document.createElement("button");
    likeButtonElement.innerHTML =
      '<img src="img/heart-filled.svg" alt="liked">';
    likeButtonElement.classList.add("like-button");

    likeButtonElement.addEventListener("click", () => {
      // Remove from likedCountries
      likedCountries = likedCountries.filter((id) => id !== country.id);
      localStorage.setItem("likedCountries", JSON.stringify(likedCountries));
      // Remove from UI
      countryElement.remove();
    });

    countryElement.appendChild(likeButtonElement);

    const img = document.createElement("img");
    img.src = country.image;
    img.alt = country.title;
    link.appendChild(img);
    countryElement.appendChild(link);

    const title = document.createElement("h2");
    title.textContent = country.title;
    countryElement.appendChild(title);
    title.classList.add("title");

    return countryElement;
  }

  // FILTERING BY CONTINENT

  function filterByContinent(continent) {
    const filtered = countries.filter(
      (country) =>
        likedCountries.includes(country.id) && country.continent === continent
    );
    renderContent(filtered);
  }

  const favoriteEuropeButton = document.getElementById(
    "favorite-button-europe"
  );
  const favoriteAsiaButton = document.getElementById("favorite-button-asia");
  const favoriteAllButton = document.getElementById("favorite-button-all");

  const favoriteButtons = document.querySelectorAll(".filter-button");

  function setActiveButton(clickedButton) {
    favoriteButtons.forEach((button) => {
      button.classList.remove("active");
    });
    clickedButton.classList.add("active");
  }

  favoriteEuropeButton.addEventListener("click", () => {
    setActiveButton(favoriteEuropeButton);
    filterByContinent("Europe");
  });

  favoriteAsiaButton.addEventListener("click", () => {
    setActiveButton(favoriteAsiaButton);
    filterByContinent("Asia");
  });

  favoriteAllButton.addEventListener("click", () => {
    setActiveButton(favoriteAllButton);
    const favoriteCountries = countries.filter((country) =>
      likedCountries.includes(country.id)
    );
    renderContent(favoriteCountries);
  });

  loadFavorites();
});
