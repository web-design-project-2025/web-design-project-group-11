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

document.addEventListener("DOMContentLoaded", () => {
  const carouselContent = document.getElementById("carousel-content");
  let swiper; // Swiper-instans
  let countries = [];

  // Ladda data från JSON
  async function loadData() {
    const response = await fetch("data/countries.json");
    const data = await response.json();
    countries = data.countries;

    renderCarousel(); // Rendera karusellen
    initSwiper(); // Initiera Swiper med coverflow
  }

  // Rendera karusellbilder i Swiper-format
  function renderCarousel() {
    carouselContent.innerHTML = "";

    countries.forEach((country) => {
      const slide = document.createElement("div");
      slide.classList.add("swiper-slide");

      slide.innerHTML = `
        <img src="${country.image}" alt="${country.title}" class="carousel-images" />
        <p>${country.title}</p>
      `;

      carouselContent.appendChild(slide);
    });
  }

  function initSwiper() {
    if (swiper) swiper.destroy(true, true);

    swiper = new Swiper(".trending-slider", {
      slidesPerView: 5,
      spaceBetween: 20,
      loop: true,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    });
  }

  loadData();
});
