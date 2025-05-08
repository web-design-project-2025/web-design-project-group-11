document.addEventListener("DOMContentLoaded", () => {
  const carouselContent = document.getElementById("carousel-content");
  const arrowRightButton = document.getElementById("arrow-right");
  const arrowLeftButton = document.getElementById("arrow-left");

  let countries = [];
  let currentIndex = 0;

  async function loadData() {
    const response = await fetch("data/countries.json"); // Ange sökvägen till din JSON-fil
    const data = await response.json();
    countries = data.countries; // Lagra alla länder i arrayen "countries"

    renderCarousel(); // Rendera karusellen när data är laddad
    updateTransform(); // Uppdatera scroll-positionen
  }

  function renderCarousel() {
    carouselContent.innerHTML = ""; // Töm karusell-track innan vi fyller på

    countries.forEach((country) => {
      const item = document.createElement("div");
      item.classList.add("carousel-item");

      const img = document.createElement("img");
      img.classList.add("carousel-images");
      img.src = country.image; // Använd bilden från JSON
      img.alt = country.title;

      const title = document.createElement("p");
      title.textContent = country.title;

      item.appendChild(img);
      item.appendChild(title);
      carouselContent.appendChild(item);
    });
  }

  function updateTransform() {
    const offset = -currentIndex * 220; // Justera för att visa 3 bilder samtidigt
    carouselContent.style.transform = `translateX(${offset}px)`;
  }

  // Högerpilen
  arrowRightButton.addEventListener("click", () => {
    if (currentIndex < countries.length - 3) {
      // Kontrollera att vi inte går förbi slutet
      currentIndex++;
    } else {
      currentIndex = 0; // Om vi är på sista bilden, börja om från början
    }
    updateTransform();
  });

  // Vänsterpilen
  arrowLeftButton.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--; // Minska index för att gå bakåt
    } else {
      currentIndex = countries.length - 3; // Om vi är på första, gå till sista uppsättningen av bilder
    }
    updateTransform();
  });

  loadData();
});
