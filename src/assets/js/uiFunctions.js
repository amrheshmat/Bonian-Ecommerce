
//Adjust Header Height
function adjustHeaderHeight() {
    let windowHeight = $(window).height();
    $('header').height(windowHeight);
    $('#loginForm').height(windowHeight - 24 );
    $('.slick-item').height(windowHeight)
}


let direction = $('html').css('direction');

//slick slider trigger
function slickSliderTrigger() {

 
        $('.single-item').slick({
            accessibility: false,
            autoplay: true,
            autoplaySpeed: 2000,
            speed: 2000,
            adaptiveHeight: false,
            arrows: false,
            rtl: (direction === 'rtl')? true : false   
        });
   
}

/*(F) first and last word function*/
function firstAndLastWord() {

    $(".sectionTitle").html(function () {
        var text = $(this).text().trim().split(" "),
            first = text.pop();
        return (text.length > 0 ? "<span class='greyBlueColor'>" + first + "</span> " : first) + text.join(" ");
    });
    $(".sectionTitle").html(function () {
        var text = $(this).text().trim().split(" "),
            last = text.shift();
        return text.join(" ") + (text.length > 0 ? " <span class='greyBlueColor'>" + last + "</span>" : last);
    });
}

//devdivider position
function devdeviderPosition() {
    let dividerHeight = $('header .divider').height(),
        headerHeight = $('header').height();
    $('header .divider').css('top', headerHeight - dividerHeight + 10)
}


// scroll top to section

function animateToSection() {
    $(".sections a[href^='#']").click(function () {
        var src = $(this).attr("href"),
            offs = $(src).offset().top;

        $("html , body").animate({scrollTop: offs - 100  }, 800)

    })
}
//navbar styles on scroll

function customizeNavbarOnScroll() {

    let scrl = $(window).scrollTop(),
        homePage = document.querySelector('#home');
    
    if (homePage) {
        if (scrl > 20) {
            $('.main-nav').css({ 'background-color': '#FFF', 'border-bottom': '1px solid #DDD', 'box-shadow': '0px 23px 12px -20px rgba(153,153,153,1)' })
            $('.main-nav .nav-link').css('color', '#777');
            $('.navbarSmallScreen .navbar-toggler i').css('color', '#777');
        } else {
            $('.main-nav').css({ 'background-color': 'rgba(0,0,0,0.4)', 'border-bottom': '0', 'box-shadow': 'none' })
            $('.main-nav .nav-link').css('color', '#FFF');
            $('.navbarSmallScreen .navbar-toggler i').css('color', '#FFF');
        }
            
    } else {
        $('.main-nav').css({ 'background-color': '#FFF', 'border-bottom': '1px solid #DDD', 'box-shadow': '0px 23px 12px -20px rgba(153,153,153,1)' })
        $('.main-nav .nav-link').css('color', '#777');
        $('.navbarSmallScreen .navbar-toggler i').css('color', '#777');
    }

   
   
}

//search bar on mobile apperance
function searchBarOnMobile() {
    $('nav .fa-search').click(function (event) {
        event.preventDefault();
        $('.searchBarMobile').slideToggle()
    })
}

//animate to head (button)
function animateToHeadButton() {
    let scrl = $(window).scrollTop(),
        headerHeight = $('header').height()
    if (scrl > headerHeight - 100) {
        $('.up').fadeIn()
    } else {
        $('.up').fadeOut()
    }

}

//animate to head (function)
function animateToHead() {
    $('.up').click(function () {
        var offs = $('header').offset().top;

        $("html , body").animate({ scrollTop: offs }, 700)
    })
}

//spinner remover
function removeSpinner() {
    $('#spinnerScreen').css('display', 'none')
    $('.spinner').css('display', 'none')
}



function testimonialsSlider(){

    //testimonials slider
    let actived = $('.f-slider >  div:first-child');
    actived.addClass('activ');
     (function autoSlider() {
         
        $('.f-slider .activ').each(function () {
             if (!$(this).is(':last-child')) {
                 $(this).delay(3000).fadeOut(1000, function () {
    
                    $(this).removeClass('activ').next().addClass('activ').fadeIn(1000);
    
                    autoSlider();
                });
    
            } else {
    
                $(this).delay(3000).fadeOut(1000, function () {
    
                    $(this).removeClass('activ');
     
                    $('.f-slider div').eq(0).addClass('activ').fadeIn(1000);
    
                    autoSlider();
    
                });
    
            }
    
        });
    
    }());
}


function textareCalculation(){
    //textarea calculation
    $(function () {
        var maxText = $('textarea.remainingText').attr('maxlength'),
            ourMessage = $('div.remainingTextMessage');
    
        ourMessage.html('<span class="greyBlueColor">' + maxText + ' </span> Character Remaining ');
    
        $('textarea').keyup(function () {
            var textLength = $(this).val().length,
                remChars = maxText - textLength;
            ourMessage.html('<span class="greyBlueColor">' + remChars + ' </span> Character Remaining ');
    
        })
    });

}

//navbar toggler rotation
function navBarTogglerRotation() {
    $('.navbar-toggler').click(function () {
        let collapsed = $('.navbar-toggler').attr('aria-expanded');
        
        if (collapsed == 'false') {
            $('.navbar-toggler').addClass('rotate90')
        } else {
            $('.navbar-toggler').removeClass('rotate90')
        }
    })
}

//reset navbar from medium screens
function resetNavbar() {    
    $('nav.navbar li a').click(function () {
        $('nav.navbar .navbar-collapse').removeClass('show');
        $('.navbar-toggler').removeClass('rotate90')
    })
}


//owl carusol trigger
function owlCarouselTrigger() {
    $('.owl-carousel').owlCarousel({
        rtl: (direction === 'rtl') ? true : false,
        margin: 10,
        nav: true,
        dots: false
    })
}

//owl carusol trigger
function owlCarouselOffersTrigger() {
    $('.autoplay').slick({
        rtl: (direction === 'rtl') ? true : false,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        prevArrow: '<i class="fas fa-arrow-circle-left fa-fw"></i>',
        nextArrow: '<i class="fas fa-arrow-circle-right fa-fw"></i>',
        responsive: [
    {
        breakpoint: 992,
        settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            infinite: true,
        }
    },
    {
        breakpoint: 768,
        settings: {
            slidesToShow: 1,
            slidesToScroll: 1
        }
    }
        ]
    });
    
}


//adjust payment method
function showPaymentMethod() {
    $("#customRadio1").prop("checked", true)
    $(".creditCard").click(function () {
        $("#customRadio1").prop("checked", true)
        $("#customRadio2").prop("checked", false)
        $('.creditCardPayments input').attr('required', 'required')
        $('.creditCardPayments').slideDown();
    });
    $(".cashOnDelivery").click(function () {
        $("#customRadio1").prop("checked", false)
        $("#customRadio2").prop("checked", true)
        $('.creditCardPayments input').removeAttr('required')
        $('.creditCardPayments').slideUp(); 
    });
}

//activat category from aside
function selectCategoryFromAside() {
    let categories = document.querySelectorAll('#mainProductsSection .category');
    Array.from(categories).forEach(item => {
        item.addEventListener('click', function (e) {
            
            
            if (item.classList.contains('active')) {
                return;
                } else {
                    e.preventDefault()
                Array.from(item.parentElement.children).forEach(i => {
                    i.classList.remove('active');
                    Array.from(i.children).forEach(sub => {
                        sub.classList.remove('active')
                    })
                });
                item.classList.add('active');
                Array.from(item.children).forEach(i => {
                    i.classList.add('active')
                })
            }
        })
    })
}


//show password in login form
function showPassword() {
    $('main#loginForm form .password i').on('mousedown mouseup', function mouseState(e) {

        let inp = $('main#loginForm form .password input');
        if (e.type == 'mousedown') {
            inp.attr('type', 'text')
            inp.next().removeClass('fas fa-eye-slash').addClass('fas fa-eye')
        } else {
            inp.attr('type', 'password')
            inp.next().removeClass('fas fa-eye').addClass('fas fa-eye-slash')
        }
    })
}



//navbar cart carousel
function navbarCarousel() {
    var translation = 0.5;
    let sliderInterval;
    let sliderItems = $('#sliderBody').children().length;


    $('#translateLeft').mouseenter(function () {
        sliderInterval = setInterval(function () {
            let sliderBodyWidth = document.getElementById('sliderBody').offsetWidth;
            let carouselWrapper = document.getElementById('carouselOuter').offsetWidth;

            if (!(Math.abs(sliderBodyWidth - carouselWrapper) <= translation) && sliderBodyWidth > carouselWrapper) {
                $('.sliderBody').css({ "transform": "translate(" + translation + "px)" })
                translation += .5;
            }
        }, 5)
    }).mouseleave(function () {
        clearInterval(sliderInterval);
    })
    $('#translateRight').mouseenter(function () {
        sliderInterval = setInterval(function () {
            if (!(translation <= 0)) {
                $('.sliderBody').css({ "transform": "translate(" + translation + "px)" })
                translation -= .5;
            }
        }, 5)
    }).mouseleave(function () {
        clearInterval(sliderInterval);
    })
    if (sliderItems < 4) {
        $('#translateRight, #translateLeft').fadeOut(500)
    } else {
        $('#translateRight, #translateLeft').fadeIn(500)
    }
}