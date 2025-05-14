//SOURCE - INSPIRATION FROM https://github.com/devression/card-slider/blob/main/index.html

//JAVASCRIPT RUNS AFTER HTML IS LOADED

document.addEventListener("DOMContentLoaded", () => {
  const carouselContent = document.getElementById("carousel-content");
  let swiper;
  let countries = [];

  //FETCH DATA FROM JSON FILE - COUNTRIES
  async function loadData() {
    const response = await fetch("data/countries.json");
    const data = await response.json();
    countries = data.countries;

    renderCarousel();
    initSwiper();
  }

  //CREATE THE SWIPER SLIDE WITH IMAGES
  function renderCarousel() {
    carouselContent.innerHTML = "";

    countries.forEach((country) => {
      const slide = document.createElement("div");
      slide.classList.add("swiper-slide");

      slide.innerHTML = `
        <a href="detail-page.html?id=${encodeURIComponent(country.id)}">
          <img src="${country.image}" alt="${
        country.title
      }" class="carousel-images" />
          <p>${country.title}</p>
        </a>
      `;

      carouselContent.appendChild(slide);
    });
  }

  //IMAGE CAROUSEL - SWIPER

  function initSwiper() {
    if (swiper) swiper.destroy(true, true);

    swiper = new Swiper(".trending-slider", {
      slidesPerView: 4,
      spaceBetween: 35,
      loop: true,
      centeredSlides: true,
      effect: "coverflow",
      coverflowEffect: {
        rotate: 0,
        stretch: 14,
        depth: 100,
        modifier: 1,
        slideShadows: false,
      },
      navigation: {
        nextEl: ".carousel-section .swiper-button-next",
        prevEl: ".carousel-section .swiper-button-prev",
      },
      pagination: {
        el: ".carousel-section .swiper-pagination",
        clickable: false,
      },
    });
  }

  loadData();
});
