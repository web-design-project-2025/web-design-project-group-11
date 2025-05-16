//RUNS WHEN THE HTML IS LOADED
window.addEventListener("DOMContentLoaded", () => {
  const favoriteContentElement = document.getElementById("favorite-content");

  //ARRAY OF COUNTRY IDs THE USER HAS LIKED, LOADED FROM LOCAL STORAGE
  let likedCountries = JSON.parse(localStorage.getItem("likedCountries")) || [];
  let countries = [];

  //FETCH THE DATA FROM JSON COUNTRIES - ONLY INCLUDE COUNTRIES WHOSE ID IS IN likedCountries
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

  //CREATES A SECTION ELEMENT FOR A COUNTRY
  function createCountryElement(country) {
    const countryElement = document.createElement("section");
    countryElement.classList.add("country");

    const link = document.createElement("a");
    link.href = `detail-page.html?id=${encodeURIComponent(country.id)}`;

    const likeButtonElement = document.createElement("button");
    likeButtonElement.innerHTML =
      '<img src="img/heart-filled.svg" alt="liked">';
    likeButtonElement.classList.add("like-button");

    likeButtonElement.addEventListener("click", () => {
      //REMOVE THE COUNTRY FROM likedCountries
      likedCountries = likedCountries.filter((id) => id !== country.id);
      //UPDATE LOACAL STORAGE
      localStorage.setItem("likedCountries", JSON.stringify(likedCountries));
      //ANIMATES REMOVAL OF THE COUNTRY
      countryElement.classList.add("fade-out");
      setTimeout(() => {
        countryElement.remove();
      }, 400);
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

  //FILTERS THE COUNTIRES ARRAY - INCLUDE LIKED AND THOSE THAT MATCH THE GIVEN CONTINENT

  function filterByContinent(continent) {
    const filtered = countries.filter(
      (country) =>
        likedCountries.includes(country.id) && country.continent === continent
    );
    renderContent(filtered);
  }

  //GRABS BUTTONS FOR FILTERING EUROPE, ASIA AND ALL DESTINATIONS
  const favoriteEuropeButton = document.getElementById(
    "favorite-button-europe"
  );
  const favoriteAsiaButton = document.getElementById("favorite-button-asia");
  const favoriteAllButton = document.getElementById("favorite-button-all");

  const favoriteButtons = document.querySelectorAll(".filter-button");

  //REMOVE OR ADD IF THE BUTTONS ARE ACTIVE OR NOT
  function setActiveButton(clickedButton) {
    favoriteButtons.forEach((button) => {
      button.classList.remove("active");
    });
    clickedButton.classList.add("active");
  }

  //HANDLE FILTER BUTTONS IF CLICKED
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
