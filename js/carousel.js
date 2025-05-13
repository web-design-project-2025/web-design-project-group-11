//SOURCE - INSPIRATION FROM https://github.com/devression/card-slider/blob/main/index.html

//JAVASCRIPT RUNS AFTER HTML IS LOADED

document.addEventListener("DOMContentLoaded", () => {
  const carouselContent = document.getElementById("carousel-content");
  let swiper;
  let countries = [];
  let currentIndex = 0; // Starta från den första bilden

  //FETCH DATA FROM JSON FILE - COUNTIRES
  async function loadData() {
    const response = await fetch("data/countries.json"); // Ange sökvägen till din JSON-fil
    const data = await response.json();
    countries = data.countries;

    //RENDER THE SLIDES AND START SWIPER CAROUSEL
    renderCarousel();
    initSwiper();
  }

  //CREATE THE SWIPER SLIDE WITH IMAGES
  function renderCarousel() {
    carouselContent.innerHTML = ""; // Töm karusell-track innan vi fyller på

    countries.forEach((country) => {
      const slide = document.createElement("div");
      slide.classList.add("swiper-slide");

      slide.innerHTML = `
        <img src="${country.image}" alt="Country image" class="carousel-images" />
      `;

      carouselContent.appendChild(slide);
    });
  }

  //IMAGE CAROUSEL - SWIPER

  function initSwiper() {
    if (swiper) swiper.destroy(true, true);

    swiper = new Swiper(".trending-slider", {
      //CREATING NEW SWIPER FROM HTML
      slidesPerView: 4,
      spaceBetween: 35,
      loop: true,
      centeredSlides: true, //MIDDLE SLIDE CENTERED
      effect: "coverflow", //ENABLES ANIMATION
      coverflowEffect: {
        rotate: 0,
        stretch: 14,
        depth: 100,
        modifier: 1,
        slideShadows: false,
      },
      navigation: {
        //CREATING NAVIGATION ARROWS FROM HTML
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      pagination: {
        //CLICKABLE DOTS UNDER THE CAROUSEL
        el: ".swiper-pagination",
        clickable: true,
      },
    });
  }

  loadData(); // Ladda och rendera karusellen när sidan är klar
});
