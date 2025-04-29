window.addEventListener("DOMContentLoaded", () => {
  const contentElement = document.getElementById("content");
  let countries = [];

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

    renderContent(countries); // eller filtrera som ovan
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

    const img = document.createElement("img");
    img.src = country.image;
    img.alt = country.title;
    countryElement.appendChild(img);
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
