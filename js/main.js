'use strict';
(function () {
  var accordeon = document.querySelector('.accordeon');
  var accordeonButton = document.querySelector('.accordeon__button');
  if (accordeon) {
    document.addEventListener('click', function (evt) {
      if (evt.target.classList.contains('accordeon__button')) {
        evt.target.classList.toggle('accordeon__button--opened');
        evt.target.nextElementSibling.classList.toggle('accordeon__content--opened');
      }
    });
  };
})();

'use strict';
(function() {

  let initializeGallery = function() {
    let galleries = document.querySelectorAll('.lightgallery');
    for (let i = 0; i < galleries.length; i++) {
      lightGallery(galleries[i], {
        thumbnail: true,
        share: false,
        download: false,
      })
    }
  }

  setTimeout(initializeGallery, 0);

})();
//lazyload

  setTimeout(function() {
    lozad('.lazyload').observe();
    },0);


'use strict';
(function() {
  let yMap;
  const mapElement = document.querySelector('[data-map]');
  if (mapElement) {
      yMap = new YmapsInitializer(mapElement);
  }})();

'use strict';
(function() {
  let tel = document.querySelector('#tel');
  if (tel) {
    var phoneMask = IMask(
      document.getElementById('tel'), {
        mask: '+{7}(000)000-00-00'
      });
  }
})();
'use strict';
(function() {
  //кнопка открытия - <div><a href="#" class="(классы для стилей) open-modal" data-modal="1" и т.д. (data-modal="2" ...)></div>

  //сами модалки <section class="modal modal--closed" data-modal-content="1"> и т.д. (data-modal-сontent="2" (соответствует кнопке открытия))>
  var modal = document.querySelector('.modal');
  if (modal) {
    var ESC_KEYCODE = 27;
    var ENTER_KEYCODE = 13;
    var btnOpen = document.querySelectorAll('.open-modal');
    var btnClose = document.querySelectorAll('.modal__button-close');
    var modals = document.querySelectorAll('.modal');

    var closeModal = function(modal) {
      modal.classList.add('modal--closed');
      modal.classList.remove('modal--active');
    };
    var openModal = function(modal) {
      modal.classList.remove('modal--closed');
      modal.classList.add('modal--active');

      modal.querySelector('.modal__button-close').addEventListener('click', function() {
        closeModal(modal)
      });

      //обработчик клика по оверлею

      modal.querySelector('.modal__overlay').addEventListener('click', function() {
        closeModal(modal);
      });

      modal.querySelector('.modal__container').addEventListener('click', function(evt) {
        evt.stopPropagation();
      });

      //обработчик клика по ESC

      document.addEventListener('keydown', function(evt) {
        if (evt.keyCode === ESC_KEYCODE) {
          closeModal(modal);
        };
      });
    };

    for (var i = 0; i < btnOpen.length; i++) {
      //клики по кнопкам открытия
      btnOpen[i].addEventListener("click", function(e) {
        e.preventDefault();
        var activeModalAttr = e.target.closest('a').getAttribute('data-modal');
        for (var j = 0; j < btnOpen.length; j++) {
          var contentAttr = modals[j].getAttribute('data-modal-content');

          if (activeModalAttr === contentAttr) {
            openModal(modals[j]);
          }
        };
      }, false);

      // открытие по Enter

      btnOpen[i].addEventListener("keydown", function(e) {
        if (e.keyCode === ENTER_KEYCODE) {
          var activeModalAttr = e.target.closest('a').getAttribute("data-modal");
          e.preventDefault();
          for (var j = 0; j < btnOpen.length; j++) {
            var contentAttr = modals[j].getAttribute("data-modal-content");
            if (activeModalAttr === contentAttr) {
              openModal(modals[j]);
              return;
            };
          };
        };
      });
    };

    // for (var i = 0; i < btnClose.length; i++) {
    //   btnClose[i].addEventListener("click", function(e) {
    //     e.preventDefault();
    //     var activeModalAttr = e.target.closest('a').getAttribute('data-modal');
    //     for (var j = 0; j < btnOpen.length; j++) {
    //       var contentAttr = modals[j].getAttribute('data-modal-content');

    //       if (activeModalAttr === contentAttr) {
    //         closeModal(modals[j]);
    //       }
    //     };

    //   });
    // };

  };
})();
document.addEventListener('DOMContentLoaded', () => {
  // const createDiv = function(elmnt, style, text)  {
  //     console.log(elmnt, style, text);
  //     let newElmnt = document.createElement(elmnt);
  //     newElmnt.classList.add(style);
  //     newElmnt.textContent = text;
  //     document.querySelector('.main').append(newElmnt);
  //     setTimeout(() => {
  //         newElmnt.remove();
  //         newElmnt = null;
  //     }, 2000);
  // };

  const url = '../mail.php';

  const ajaxSend = async(formData) => {
    const fetchResp = await fetch('../mail.php', {
      method: 'POST',
      body: formData
    });
    if (!fetchResp.ok) {
      throw new Error(`Ошибка по адресу ${url}, статус ошибки ${fetchResp.status}`);
    }
    return await fetchResp.text();
  };

  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const formData = new FormData(this);

      ajaxSend(formData)
        .then((response) => {
          document.querySelector('.modal--success').classList.remove('modal--closed');
          form.reset(); // очищаем поля формы 
        })
        .catch((err) => document.querySelector('.modal--fail').classList.remove('modal--closed'));
    });
  });

});
'use strict';
(function() {


  var mainSwiper = new Swiper('.design__slider-container', {
    slidesPerView: 1,
    loop: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });

  var infoSwiper = new Swiper('.design__info-slider', {
    slidesPerView: 1,
    loop: true,
  });

  mainSwiper.controller.control = infoSwiper;
  infoSwiper.controller.control = mainSwiper;

  var previewSwiper = new Swiper('.card__previews', {
    slidesPerView: 2,
    spaceBetween: 10,
    loop: true,
    breakpoints: {
      500: {
        slidesPerView: 3,
      },
    }
  });

  var cardSwiper = new Swiper('.card__slider', {
    slidesPerView: 1,
    loop: true,
    thumbs: {
      swiper: previewSwiper,
    },
    on: {
      slideChange: function() {
        let activeIndex = this.activeIndex + 1;

        let activeSlide = document.querySelector(`.gallery-thumbs .swiper-slide:nth-child(${activeIndex})`);
        let nextSlide = document.querySelector(`.gallery-thumbs .swiper-slide:nth-child(${activeIndex + 1})`);
        let prevSlide = document.querySelector(`.gallery-thumbs .swiper-slide:nth-child(${activeIndex - 1})`);

        if (nextSlide && !nextSlide.classList.contains('swiper-slide-visible')) {
          this.thumbs.swiper.slideNext()
        } else if (prevSlide && !prevSlide.classList.contains('swiper-slide-visible')) {
          this.thumbs.swiper.slidePrev()
        }
      }
    }
  });
})();