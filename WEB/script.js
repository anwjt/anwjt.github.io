// Initialize Typed.js
document.addEventListener("DOMContentLoaded", function() {
    var options = {
        strings: ["Web Developer", "Graphic Designer", "Content Creator"],
        typeSpeed: 50,
        backSpeed: 25,
        backDelay: 1000,
        startDelay: 500,
        loop: true
    };
    
    var typed = new Typed("#typed-text", options);
    
    // Button click events for SPA navigation
    document.querySelector(".btn-hover.color-1").addEventListener("click", function() {
        document.querySelector("#home-page").classList.add("hidden");
        document.querySelector("#work-page").classList.remove("hidden");
        document.querySelector("#work-page").classList.add("active");
    });

    document.querySelector(".btn-hover.color-2").addEventListener("click", function() {
        document.querySelector("#home-page").classList.add("hidden");
        document.querySelector("#tiktok-page").classList.remove("hidden");
        document.querySelector("#tiktok-page").classList.add("active");
    });

    document.querySelector(".btn-hover.color-3").addEventListener("click", function() {
        document.querySelector("#home-page").classList.add("hidden");
        document.querySelector("#contact-page").classList.remove("hidden");
        document.querySelector("#contact-page").classList.add("active");
    });

    document.querySelector("#home-button").addEventListener("click", function() {
        document.querySelector("#work-page").classList.add("hidden");
        document.querySelector("#tiktok-page").classList.add("hidden");
        document.querySelector("#contact-page").classList.add("hidden");
        document.querySelector("#home-page").classList.remove("hidden");
        document.querySelector("#home-page").classList.add("active");
    });
});
$(document).ready(function() {
    $('.btn-hover').click(function() {
        var targetId = $(this).text().toLowerCase() + '-page';
        $('.spa-page').removeClass('active').addClass('hidden');
        $('#' + targetId).removeClass('hidden').addClass('active');
    });

    $('#home-button').click(function() {
        $('.spa-page').removeClass('active').addClass('hidden');
        $('#home-page').removeClass('hidden').addClass('active');
    });
});
