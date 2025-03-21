/* $(document).ready(function(){
    $('.carousel__inner').slick({
        infinite: true,
        speed: 1200,
        adaptiveHeight: false,
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/arrow_left.svg" alt="prev"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/arrow_right.svg" alt="next"></button>',
        responsive: [
            {
              breakpoint: 992,
              settings: {
                dots: true,
                arrows: false
              }
            }
        ]
      });
  }); */

const slider = tns({
  container: '.carousel__inner',
  items: 1,
  slideBy: 'page',
  autoplay: false,
  controls: false,
  nav: false,
  responsive: {
    640: {
      nav: false,
      items: 1
    },
    700: {
      nav: false,
    },
    900: {
      nav: false,
      items: 1
    }
  }
});

document.querySelector('.prev').addEventListener('click', function () {
  slider.goTo('prev');
});

document.querySelector('.next').addEventListener('click', function () {
  slider.goTo('next');
});


$(document).ready(function(){

      $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
          .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
          .closest('section.catalog').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
      });

/*       $('.catalog-item__link').each(function(i) {
        $(this).on('click', function(e) {
          e.preventDefault();
          $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
          $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
        })
      })

      $('.catalog-item__back').each(function(i) {
        $(this).on('click', function(e) {
          e.preventDefault();
          $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
          $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
        })
      }) */

      function toggleSlide(item) {
        $(item).each(function(i) {
          $(this).on('click', function(e) {
            e.preventDefault();
            $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
            $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
          })
        })
      }

      toggleSlide('.catalog-item__link');
      toggleSlide('.catalog-item__back');

      //modal

      $('[data-modal=consultation]').on('click', function() {
        $('.overlay, #consultation').fadeIn('fast');
      });

      $('.modal__close').on('click', function() {
        $('.overlay, #consultation, #order, #thanks').fadeOut('fast');
      });

      $('.button_mini').each(function(i) {
        $(this).on('click', function() {
          $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
          $('.overlay, #order').fadeIn('fast');
        })
      });


      function validateForm(form) {
        $(form).validate({
          rules: {
            // simple rule, converted to {required:true}
            name: {
              required: true,
              minlength: 2
            },
            phone: "required",
            email: {
              required: true,
              email: true
            }
          },
  
          messages: {
            name: {
              required: "Введите ваше имя",
              minlength: jQuery.validator.format("Количество символов не менее {0}")
            },
            phone: "Введите ваш номер телефона",
            email: {
              required: "Введите ваш e-mail адрес",
              email: "Введите корректный e-mail адрес"
            }
          }
  
        });
      };

      validateForm('#consultation-form');
      validateForm('#consultation form');
      validateForm('#order form');

      $("input[name=phone]").mask("+7 (999) 999-99-99");

      $('form').submit(function(e) {
        e.preventDefault();

        if (!$(this).valid()) {
          return;
        }

        $.ajax ({
          type: "POST",
          url: "mailer/smart.php",
          data: $(this).serialize()
        }).done(function() {
          $(this).find("input").val("");
          $('#consultation, #order').fadeOut();
          $('.overlay, #thanks').fadeIn('fast');

          $('form').trigger('reset');

        });
        return false;
      });

      //Smooth scroll and page up
      
      $(window).scroll(function() {
        if ($(this).scrollTop() > 1600) {
          $('.pageup').fadeIn();
        } else {
          $('.pageup').fadeOut();
        }
      });

      $("a[href='#up']").click(function(){
        const _href = $(this).attr("href");
        $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
        return false;
      });

/*       $("a").on('click', function(event) {
        if (this.hash !== "") {
        event.preventDefault();
        var hash = this.hash;
        $('html, body').animate({
                scrollTop: $(hash).offset().top
              }, 800, function(){
          window.location.hash = hash;
              });
        }
        }); */

        new WOW().init();
    
  });

