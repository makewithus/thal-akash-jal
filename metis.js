const metis = {
  pages: {
    slider() {
      var expertiseSwiper = new Swiper(".swiper-expertise", {
        a11y: false,
        loop: true,
        slidesPerView: 3,
        grabCursor: true,
        centeredSlides: true,
        navigation: {
          nextEl: ".home-next-btn",
          prevEl: ".home-prev-btn",
        },
        breakpoints: {
          0: {
            slidesPerView: 1,
          },
          478: {
            slidesPerView: 1,
          },
          767: {
            slidesPerView: 2,
          },
          988: {
            slidesPerView: 3,
          },
          1920: {
            slidesPerView: 5,
          },
        },
        autoplay: {
          delay: 2000,
          disableOnInteraction: true,
          pauseOnMouseEnter: true,
        },
      })
    },
  },

  scripts: {
    createScript(name, url, fn) {
      if (document.getElementById(name)) {
        fn()
        return
      }
      var script = document.createElement("script")
      script.type = "text/javascript"
      script.setAttribute("id", name)
      script.src = url
      script.onload = fn
      document.head.appendChild(script)
    },
  },
}
