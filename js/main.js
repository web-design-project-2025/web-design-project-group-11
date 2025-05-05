window.addEventListener("DOMContentLoaded", () => {
  let countries = [];
  const contentElement = document.getElementById("content");

  let likedCountries = JSON.parse(localStorage.getItem("likedCountries")) || [];

  async function loadData() {
    const response = await fetch("data/countries.json");
    const json = await response.json();
    countries = json.countries;

    // const selectedContinent = getContinentFromURL();
    // if (selectedContinent && selectedContinent !== "all") {
    //   const filtered = countries.filter((item) => item.continent === selectedContinent);
    //   renderContent(filtered);
    // } else {
    //   renderContent(countries);
    // }

    renderContent(countries);
  }

  function renderContent(countryList) {
    contentElement.innerHTML = "";
    for (let country of countryList) {
      const countryElement = createCountryElement(country);
      contentElement.appendChild(countryElement);
    }
  }

  function createCountryElement(country) {
    const countryElement = document.createElement("section");
    countryElement.classList.add("country");

    const link = document.createElement("a");
    link.href = `detail-page.html?title=${encodeURIComponent(country.title)}`;

    const isLiked = likedCountries.includes(country.id);
    country.liked_by_user = isLiked;

    const likeButtonElement = document.createElement("button");
    likeButtonElement.innerHTML = isLiked
      ? '<img src="img/heart-filled.svg" alt="liked">'
      : '<img src="img/heart-line.svg" alt="not liked">';
    likeButtonElement.classList.add("like-button");

    likeButtonElement.addEventListener("click", () => {
      country.liked_by_user = !country.liked_by_user;

      if (country.liked_by_user) {
        if (!likedCountries.includes(country.id)) {
          likedCountries.push(country.id);
        }
      } else {
        const index = likedCountries.indexOf(country.id);
        if (index > -1) likedCountries.splice(index, 1);
      }

      localStorage.setItem("likedCountries", JSON.stringify(likedCountries));

      likeButtonElement.innerHTML = country.liked_by_user
        ? '<img src="img/heart-filled.svg" alt="liked">'
        : '<img src="img/heart-line.svg" alt="not liked">';
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

    return countryElement;
  }

  function filterByContinent(continent) {
    const filtered = countries.filter((item) => item.continent === continent);
    renderContent(filtered);
  }

  const europeButton = document.getElementById("button-europe");
  const asiaButton = document.getElementById("button-asia");
  const allButton = document.getElementById("button-all");

  europeButton.addEventListener("click", () => {
    filterByContinent("Europe");
  });

  asiaButton.addEventListener("click", () => {
    filterByContinent("Asia");
  });

  allButton.addEventListener("click", () => {
    renderContent(countries);
  });

  loadData();
});
