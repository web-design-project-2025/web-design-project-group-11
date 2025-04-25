window.addEventListener("DOMContentLoaded", () => {
  const contentElement = document.getElementById("content");

  let countries = [];

  async function loadData() {
    const response = await fetch("data/countries.json");
    const json = await response.json();
    countries = json.countries;
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

    const img = document.createElement("img");
    img.src = country.image;
    countryElement.appendChild(img);

    const title = document.createElement("h2");
    title.textContent = country.title;
    countryElement.appendChild(title);

    return countryElement;
  }

  function filterByContinent(continent) {
    const filtered = countries.filter((item) => item.continent === continent);
    renderContent(filtered);
  }

  const imgAllButton = document.getElementById("button-all-img");
  const imgAsiaButton = document.getElementById("button-asia-img");

  const europeButton = document.getElementById("button-europe");
  const asiaButton = document.getElementById("button-asia");
  const allButton = document.getElementById("button-all");

  // imgAsiaButton.addEventListener("click", () => {
  //   filterByContinent("Asia");
  // });

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
