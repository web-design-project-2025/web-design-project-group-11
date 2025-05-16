//RUNS WHEN THE HTML IS LOADED
window.addEventListener("DOMContentLoaded", () => {
  let countries = [];

  const contentElement = document.getElementById("content");

  let continents = [];

  const continentElement = document.getElementById("continent-container");

  let likedCountries = JSON.parse(localStorage.getItem("likedCountries")) || [];

  //GOT HELP FROM ChatGPT https://chatgpt.com/c/680b5321-980c-8001-ba93-747dc051dc71

  //EXTRACTS ?CONTINENT="CONTINENT" FROM THE URL
  function getContinentFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get("continent"); // t.ex. "Asia", "Europe", eller null
  }

  //FETCHES COUNTRY AND CONTINENT DATA FROM JSON FILES
  async function loadData() {
    const response = await fetch("data/countries.json");
    const json = await response.json();
    countries = json.countries;

    //SORTS COUNTRIES ALPHABETICALLY
    countries.sort((a, b) => a.title.localeCompare(b.title));

    //CHECK FOR A CONTINENT URL
    const continentResponse = await fetch("data/continents.json");
    const continentJson = await continentResponse.json();
    continents = continentJson.continents;

    const selectedContinent = getContinentFromURL();
    if (selectedContinent && selectedContinent !== "all") {
      const filtered = countries.filter(
        (item) => item.continent === selectedContinent
      );
      renderContent(filtered);
    } else {
      renderContent(countries);
    }

    //DISPLAY THE MATCHING CONTINENT DESCRIPTION
    renderSingleContinent(
      selectedContinent === "all" ? "All Destinations" : selectedContinent
    );

    if (selectedContinent === "Europe") {
      activeButton(europeButton);
    } else if (selectedContinent === "Asia") {
      activeButton(asiaButton);
    } else {
      activeButton(allButton);
    }
  }

  //CLEAR THE EXISTING CONTENT & ITERATES OVER THE COUNTRY LIST AND APPENDS EACH TO THE DOM VIA createCountryElement
  function renderContent(countryList) {
    contentElement.innerHTML = "";
    for (let country of countryList) {
      const countryElement = createCountryElement(country);
      contentElement.appendChild(countryElement);
    }
  }

  //CREATE ELEMENTS ON DESTINATION PAGE
  function createContinentElement(continent) {
    const section = document.createElement("section");

    const title = document.createElement("h2");
    title.textContent = continent.title;
    section.appendChild(title);
    title.classList.add("title");

    const description = document.createElement("p");
    description.textContent = continent.description;
    section.appendChild(description);
    description.classList.add("description");

    return section;
  }

  //CREATE ELEMENTS, CLASSES AND LINKS TO DETAIL PAGE
  function createCountryElement(country) {
    const countryElement = document.createElement("section");
    countryElement.classList.add("country");

    const link = document.createElement("a");
    link.href = `detail-page.html?id=${encodeURIComponent(country.id)}`;

    //FILLED HEART IF LIKED/HOVER EFFECT AND LOCAL STORAGE
    const isLiked = likedCountries.includes(country.id);
    country.liked_by_user = isLiked;

    //CREATING LIKE BUTTON
    const likeButtonElement = document.createElement("button");

    likeButtonElement.innerHTML = isLiked
      ? '<img src="img/heart-filled.svg" alt="liked">'
      : '<img src="img/heart-line.svg" alt="not liked">';
    likeButtonElement.classList.add("like-button");

    //LOAD THE HEART IMAGE
    const heartImg = likeButtonElement.querySelector("img");

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

    //ADDING EVENT IF CLICKED - FAVORITE ARRAY
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

      const heartImg = likeButtonElement.querySelector("img");

      //HOVER EFFECT IF NOT LIKED
      if (!country.liked_by_user) {
        likeButtonElement.addEventListener("mouseover", () => {
          heartImg.src = "img/heart-filled.svg";
          heartImg.alt = "hovered";
        });

        likeButtonElement.addEventListener("mouseout", () => {
          heartImg.src = "img/heart-line.svg";
          heartImg.alt = "not liked";
        });
      }
    });

    countryElement.appendChild(likeButtonElement);

    //CREATE IMAGES
    const img = document.createElement("img");
    img.src = country.image;
    img.alt = country.title;
    link.appendChild(img);
    countryElement.appendChild(link);

    //CREATE IMAGE TEXT
    const title = document.createElement("h2");
    title.textContent = country.title;
    countryElement.appendChild(title);

    return countryElement;
  }

  //RENDER THE RIGHT CONTINENT TITLE AND TEXT
  function filterByContinent(continent) {
    const filtered = countries.filter((item) => item.continent === continent);
    renderContent(filtered);
  }

  //FINDS THE MATCHING CONTINENT FROM CONTINENTS
  function renderSingleContinent(continentName) {
    const selected = continents.find(
      (continent) => continent.title === continentName
    );
    continentElement.innerHTML = "";

    if (selected) {
      const continentSection = createContinentElement(selected);
      continentElement.appendChild(continentSection);
    }
  }

  //GRABS FILTER BUTTONS FOR INTERACTION
  const europeButton = document.getElementById("button-europe");
  const asiaButton = document.getElementById("button-asia");
  const allButton = document.getElementById("button-all");

  const scrollButtons = document.querySelectorAll(".scroll-filter-button");

  //HIGHLIGHT THE ACTIVE BUTTON
  function activeButton(clickedButton) {
    scrollButtons.forEach((button) => {
      button.classList.remove("active");
    });
    clickedButton.classList.add("active");
  }

  //GRABS FILTER BUTTONS FOR INTERACTION
  europeButton.addEventListener("click", () => {
    activeButton(europeButton); //HIGHLIGT ACTIVE BUTTON
    filterByContinent("Europe"); //FILTER THE COUNTRY LIST
    renderSingleContinent("Europe"); //UPDATE THE DISPLAYED CONTINENT DESCRIPTION
  });

  asiaButton.addEventListener("click", () => {
    activeButton(asiaButton);
    filterByContinent("Asia");
    renderSingleContinent("Asia");
  });

  allButton.addEventListener("click", () => {
    activeButton(allButton);
    renderContent(countries);
    renderSingleContinent("All Destinations");
  });

  loadData();
});
