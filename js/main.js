window.addEventListener("DOMContentLoaded", () => {
  const contentElement = document.getElementById("content");
  const detailcontentElement = document.getElementById("detail-content");

  let countries = [];

  // ChatGPT https://chatgpt.com/c/680b5321-980c-8001-ba93-747dc051dc71
  function getContinentFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get("continent"); // t.ex. "Asia", "Europe", eller null
  }

  function getTitleFromURL() {
    const params = new URLSearchParams(window.location.search);
    const title = params.get("title");
    return title; // Flytta denna rad efter loggarna
  }

  async function loadData() {
    const response = await fetch("data/countries.json");
    const json = await response.json();
    countries = json.countries;
    renderContent(countries);

    const selectedContinent = getContinentFromURL();
    if (selectedContinent && selectedContinent !== "all") {
      const filtered = countries.filter(
        (item) => item.continent === selectedContinent
      );
      renderContent(filtered);
    } else {
      renderContent(countries);
    }

    const title = getTitleFromURL();
    if (title) {
      displayCountryDetail(title);
    }
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

    // Skapa länk till detaljsidan
    const link = document.createElement("a");
    link.href = `detail-page.html?title=${encodeURIComponent(country.title)}`;

    // Skapa bild
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

  async function displayCountryDetail(title) {
    const country = countries.find(
      (c) => c.title.toLowerCase() === title.toLowerCase()
    );

    if (country) {
      // Visa detaljerad information
      detailcontentElement.innerHTML = ""; // Rensa tidigare innehåll

      const titleElement = document.createElement("h1");
      titleElement.textContent = country.title;
      detailcontentElement.appendChild(titleElement);

      const descriptionElement = document.createElement("p");
      descriptionElement.textContent = country.description;
      detailcontentElement.appendChild(descriptionElement);

      const locationElement = document.createElement("p");
      locationElement.textContent = `Location: Latitude: ${country.location.latitude} Longitude: ${country.location.longitude}`;
      detailcontentElement.appendChild(locationElement);

      const additionalImagesContainer = document.createElement("div");
      country.additional_images.forEach((image) => {
        const imgElement = document.createElement("img");
        imgElement.src = image.url;
        imgElement.alt = image.alt;
        additionalImagesContainer.appendChild(imgElement);
      });
      detailcontentElement.appendChild(additionalImagesContainer);
    } else {
      detailcontentElement.innerHTML =
        "Ingen information hittades för detta land.";
    }
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
