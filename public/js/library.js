// js fixed menu pc
$(document).ready(function () {
    $(window).scroll(function () {
        if ($(window).scrollTop() > 300) {
            $('.sticky-wrapper').addClass('header-sticky');
        }
        else {
            $('.sticky-wrapper').removeClass('header-sticky');
        }
    });
});



// js nice scroll
$(function () {
    $("body").niceScroll();
});

// scroll to id
// $(document).ready(function () {
//     $(document).on("scroll", onScroll);

//     //smoothscroll
//     $('a[href^="#"]').on('click', function (e) {
//         e.preventDefault();
//         $(document).off("scroll");

//         $('a').each(function () {
//             $(this).removeClass('active');
//         })
//         $(this).addClass('active');

//         var target = this.hash,
//             menu = target;
//         $target = $(target);
//         $('html, body').stop().animate({
//             'scrollTop': $target.offset().top+2
//         }, 2500, 'swing', function () {
//             window.location.hash = target;
//             $(document).on("scroll", onScroll);
//         });
//     });
// });

// function onScroll(event){
//     var scrollPos = $(document).scrollTop();
//     $('#navbarSupportedContent a').each(function () {
//         var currLink = $(this);
//         var refElement = $(currLink.attr("href"));
//         if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
//             $('#navbarSupportedContent ul li a').removeClass("active");
//             currLink.addClass("active");
//         }
//         else{
//             currLink.removeClass("active");
//         }
//     });
// }


$(function () {
    $('#navbarSupportedContent ul li').on('click', function () {
        $('#navbarSupportedContent').removeClass('show');
    })
})

/*js menu mobile*/$(document).ready(function ($) {
    $('#trigger-mobile').click(function () {
        $(".mobile-main-menu").addClass('active');
        $(".backdrop__body-backdrop___1rvky").addClass('active');
    });
    $('#close-nav').click(function () {
        $(".mobile-main-menu").removeClass('active');
        $(".backdrop__body-backdrop___1rvky").removeClass('active');
    });
    $('.backdrop__body-backdrop___1rvky').click(function () {
        $(".mobile-main-menu").removeClass('active');
        $(".backdrop__body-backdrop___1rvky").removeClass('active');
    });
    $(window).resize(function () {
        if ($(window).width() > 1023) {
            $(".mobile-main-menu").removeClass('active');
            $(".backdrop__body-backdrop___1rvky").removeClass('active');
        }
    });
    $('.ng-has-child1 a .fa1').on('click', function (e) {
        e.preventDefault();
        var $this = $(this);
        $this.parents('.ng-has-child1').find('.ul-has-child1').stop().slideToggle();
        $(this).toggleClass('active')
        return false;
    });
    $('.ng-has-child1 .ul-has-child1 .ng-has-child2 a .fa2').on('click', function (e) {
        e.preventDefault();
        var $this = $(this);
        $this.parents('.ng-has-child1 .ul-has-child1 .ng-has-child2').find('.ul-has-child2').stop().slideToggle();
        $(this).toggleClass('active')
        return false;
    });
});
/*resize img cùng cấp*/
/*$( window ).load(function() {
    render_size();
    var url = window.location.href;
    $('.menu-item  a[href="' + url + '"]').parent().addClass('active');
});
$( window ).resize(function() {
    render_size();
});*/
/*function render_size(){

    var h_1000 = $('.h_1000 img').width();
    $('.h_1000 img').height( 1.000 * parseInt(h_1000));


}*/
/*navText:["<i class=\"fa fa-long-arrow-left\"></i>","<i class=\"fa fa-long-arrow-right\"></i>"],*/
// js resize img
// var h_1 = $('.h_1 img').width();
// $('.h_1 img').height( 1.0 * parseInt(h_1));
// js back to top
if ($('#back-to-top').length) {
    var scrollTrigger = 800, // px
        backToTop = function () {
            var scrollTop = $(window).scrollTop();
            if (scrollTop > scrollTrigger) {
                $('#back-to-top').addClass('show');
            } else {
                $('#back-to-top').removeClass('show');
            }
        };
    backToTop();
    $(window).on('scroll', function () {
        backToTop();
    });
    $('#back-to-top').on('click', function (e) {
        e.preventDefault();
        $('html,body').animate({
            scrollTop: 0
        }, 700);
    });
}
/*js home slider banner*/
$('#slider-home').owlCarousel({
    loop: true,
    margin: 10,
    dots: true,
    nav: true,
    autoplay: true,
    navText: ["<i class=\"fas fa-chevron-left\"></i>", "<i class=\"fas fa-chevron-right\"></i>"],
    autoplayTimeout: 6000,
    autoplaySpeed: 1600,
    smartSpeed: 2000,
    responsive: {
        0: {
            items: 1
        },
        600: {
            items: 1
        },
        1000: {
            items: 1
        }
    }
})

/*js home slider banner*/
// $('#slider-doitac').owlCarousel({
//     loop:true,
//     margin:10,
//     dots:false,
//     nav:true,
//     autoplay:true,
//     autoplayTimeout:6000,
//     autoplaySpeed:1600,
//     smartSpeed:1200,
//     responsive:{
//         0:{
//             items:3
//         },
//         600:{
//             items:4
//         },
//         1000:{
//             items:6
//         }
//     }
// })
// js check aria add active
// $(document).ready(function() {
//     $(".card-header button").click(function(){
//         $(this).toggleClass('active')
//     });
//     // Search form  
//     var isOpen=false;
//     $('.btn-search').click(function(){
//         if(isOpen){
//             var a = $(this).closest('form').find('.search-form input').val();
//             console.log(a);
//             if($.trim(a)!=''){
//                 $(this).closest('form').submit();
//             }else{
//                 $('.search-form').animate({ width: 'hide' });
//                 isOpen=false;
//                 $('.overlay').removeClass('for-search');
//             }           
//         }else{
//             $('.search-form').animate({ width: 'show' });
//             isOpen=true;
//             $('.overlay').addClass('for-search');
//         }

//         return false;
//     })
//     $(document).mouseup(function(){
//         if(isOpen){
//             $('.search-form').css('display','none');
//             $('.overlay').removeClass('for-search');
//         }
//     })
//     $('.search-form').mouseup(function(){
//         return false;
//     })
// });
$('#slider-duan').owlCarousel({
    loop: false,
    margin: 0,
    dots: false,
    nav: true,
    autoplay: false,
    navText: ["<i class=\"fas fa-arrow-left\"></i>", "<i class=\"fas fa-arrow-right\"></i>"],
    autoplayTimeout: 6000,
    autoplaySpeed: 1600,
    smartSpeed: 1200,
    responsive: {
        0: {
            items: 1
        },
        600: {
            items: 1
        },
        1000: {
            items: 1
        }
    }
})

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
function validatePhoneNumber(input_str) {
    var re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

    return re.test(input_str);
}
function check(event) {
    event.preventDefault();

    var name = document.forms["myForm"]["name"].value;
    var company_name = document.forms["myForm"]["company_name"].value;
    var email = document.forms["myForm"]["email"].value;
    var phone = document.forms["myForm"]["phone"].value;
    var checkbox = document.forms["myForm"]["checkbox"];
    var description = document.forms["myForm"]["description"].value;
    if (company_name == "" || company_name == null || email == "" || email == null || !validateEmail(email)
        || ((phone && !(validatePhoneNumber(phone))) || (phone && (phone.length > 11)))
        || description == "" || description == null || !checkbox.checked || name == "" || name == null) {
        event.preventDefault();
        $("#fail").fadeTo(5000, 500).slideUp(500, function () {
            $("#fail").slideUp(500);

        });

    }
    else {
        // event.preventDefault();

        $("#success").fadeTo(5000, 500).slideUp(500, function () {
            $("#success").slideUp(500);

        })

        if (screen.width < 1024) {
            formData = {
                'name': name,
                'company_name': company_name,
                'email': email,
                'phone': phone,
                'description': description,
                'type': '1'
            }
        }
        else {
            formData = {
                'name': name,
                'company_name': company_name,
                'email': email,
                'phone': phone,
                'description': description,
                'type': '0'
            }
        }
        loadForm(formData);


    }
}
function loadForm(formData) {
    $.ajax({
        type: "POST",
        url: "/api/customer/create",
        data: formData,
        success: function () {
            setTimeout(() => {
                window.location.href = '/contact';
            }, 2500)
        }
    });
}





var el = document.getElementById('top_header');
var PADDING = document.getElementById("top_header").style.padding;



window.document.addEventListener('scroll', () => {
    if ((document.body.scrollTop > 90 || document.documentElement.scrollTop > 90)) {
        el.style.height = '0px';

        el.style.padding = '0px';
    } else {
        el.style.height = '100px';

        el.style.padding = PADDING;

    }
})



