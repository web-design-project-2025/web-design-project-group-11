let europes = [];

const contentElement = document.getElementById("content");

async function loadData() {
  const europeResponse = await fetch("data/europe.json");
  const europeJSON = await europeResponse.json();
  europes = europeJSON.europe;

  renderContent();
}

function createCountryElement(country) {
  const countryElement = document.createElement("article");
  countryElement.classList.add("country");

  const imageElement = document.createElement("img");
  imageElement.src = country.image;
  countryElement.appendChild(imageElement);

  const titleElement = document.createElement("h2");
  titleElement.textContent = country.title;
  countryElement.appendChild(titleElement);

  return countryElement;
}

function renderContent() {
  contentElement.innerHTML = "";

  for (let country of europes) {
    const countryElement = createCountryElement(country);
    contentElement.appendChild(countryElement);
  }
}

loadData();
