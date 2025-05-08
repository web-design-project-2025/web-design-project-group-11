// document.addEventListener("DOMContentLoaded", () => {
//   const carouselContent = document.getElementById("carousel-content");
//   const arrowRightButton = document.getElementById("arrow-right");
//   const arrowLeftButton = document.getElementById("arrow-left");

//   let countries = [];
//   let currentIndex = 0;

//   async function loadData() {
//     const response = await fetch("data/countries.json"); // Ange sökvägen till din JSON-fil
//     const data = await response.json();
//     countries = data.countries; // Lagra alla länder i arrayen "countries"

//     renderCarousel(); // Rendera karusellen när data är laddad
//     updateTransform(); // Uppdatera scroll-positionen
//   }

//   function renderCarousel() {
//     carouselContent.innerHTML = ""; // Töm karusell-track innan vi fyller på

//     countries.forEach((country) => {
//       const item = document.createElement("div");
//       item.classList.add("carousel-item");

//       const img = document.createElement("img");
//       img.classList.add("carousel-images");
//       img.src = country.image; // Använd bilden från JSON
//       img.alt = country.title;

//       const title = document.createElement("p");
//       title.textContent = country.title;

//       item.appendChild(img);
//       item.appendChild(title);
//       carouselContent.appendChild(item);
//     });
//   }

//   function updateTransform() {
//     const offset = -currentIndex * 220; // Justera för att visa 3 bilder samtidigt
//     carouselContent.style.transform = `translateX(${offset}px)`;
//   }

//   arrowRightButton.addEventListener("click", () => {
//     if (currentIndex < countries.length - 3) {
//       currentIndex++;
//     } else {
//       currentIndex = 0; // Återgå till första bilden
//       // För att förhindra hack eller konstig övergång kan vi återställa transformering direkt
//       carouselContent.style.transition = "none"; // Inget övergång
//       updateTransform();
//       setTimeout(() => {
//         // Återställ transition för smidig rörelse
//         carouselContent.style.transition = "transform 0.3s ease-in-out";
//       }, 20); // Vänta lite innan övergången sätts på igen
//     }
//     updateTransform();
//   });

//   // Vänsterpilen
//   arrowLeftButton.addEventListener("click", () => {
//     if (currentIndex > 0) {
//       currentIndex--;
//     } else {
//       currentIndex = countries.length - 3; // Gå till sista uppsättningen av bilder
//       // Återställ transformering för att skapa en smidig loop
//       carouselContent.style.transition = "none";
//       updateTransform();
//       setTimeout(() => {
//         carouselContent.style.transition = "transform 0.3s ease-in-out";
//       }, 20);
//     }
//     updateTransform();
//   });

//   loadData();
// });

//NEW CODE

document.addEventListener("DOMContentLoaded", () => {
  const carouselContent = document.getElementById("carousel-content");
  const arrowRightButton = document.getElementById("arrow-right");
  const arrowLeftButton = document.getElementById("arrow-left");

  let countries = [];
  let currentIndex = 0; // Starta från den första bilden

  // Ladda data från JSON
  async function loadData() {
    const response = await fetch("data/countries.json"); // Ange sökvägen till din JSON-fil
    const data = await response.json();
    countries = data.countries;

    renderCarousel(); // Rendera karusellen när data är laddad
    updateTransform(); // Uppdatera scroll-positionen
  }

  // Rendera karusellen med bilder
  function renderCarousel() {
    carouselContent.innerHTML = ""; // Töm karusell-track innan vi fyller på

    // Visa alltid 5 bilder (2 innan och 2 efter)
    const visibleItems = countries.slice(
      currentIndex, // Börja från den aktuella indexet
      currentIndex + 5 // Hämta 5 bilder (index till index+5)
    );

    visibleItems.forEach((country, i) => {
      const item = document.createElement("div");
      item.classList.add("carousel-item");

      const img = document.createElement("img");
      img.classList.add("carousel-images");
      img.src = country.image;
      img.alt = country.title;

      const title = document.createElement("p");
      title.textContent = country.title;

      item.appendChild(img);
      item.appendChild(title);
      carouselContent.appendChild(item);
    });

    // Uppdatera bildernas storlek och position
    updateCarouselItems();
  }

  // Uppdatera position och storlek på bilder beroende på deras index
  function updateCarouselItems() {
    const items = carouselContent.querySelectorAll(".carousel-item");
    items.forEach((item, index) => {
      item.classList.remove("center", "near", "far");
      if (index === 2) {
        // Mittersta bilden
        item.classList.add("center");
      } else if (index === 1 || index === 3) {
        // Nära bilder
        item.classList.add("near");
      } else {
        // De längre bort
        item.classList.add("far");
      }
    });
  }

  // Högerpil
  arrowRightButton.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % countries.length; // Loop tillbaks till första när vi når slutet
    renderCarousel();
    updateTransform();
  });

  // Vänsterpil
  arrowLeftButton.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + countries.length) % countries.length; // Loop tillbaks till sista när vi går till vänster
    renderCarousel();
    updateTransform();
  });

  loadData(); // Ladda och rendera karusellen när sidan är klar
});
