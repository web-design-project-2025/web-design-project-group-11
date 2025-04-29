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

  loadData();
});
