window.addEventListener("DOMContentLoaded", () => {
  const favoriteContentElement = document.getElementById("favorite-content");
  let likedCountries = JSON.parse(localStorage.getItem("likedCountries")) || [];

  async function loadFavorites() {
    const response = await fetch("data/countries.json");
    const json = await response.json();
    const countries = json.countries;

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

  loadFavorites();
});
