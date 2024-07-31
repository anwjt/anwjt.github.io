document.addEventListener("DOMContentLoaded", function() {
    // Initialize Typed.js
    var options = {
        strings: ["a Web Developer", "a Graphic Designer", "a Content Creator"],
        typeSpeed: 50,
        backSpeed: 25,
        backDelay: 1000,
        startDelay: 500,
        loop: true
    };
    
    var typed = new Typed("#typed-text", options);

    // AJAX loading for pages
    function loadPage(url, target) {
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(html => {
                document.querySelector(target).innerHTML = html;
            })
            .catch(err => console.warn('Error loading page:', err));
    }

    // Button click events for SPA navigation
    document.querySelectorAll(".btn-hover").forEach(button => {
        button.addEventListener("click", function() {
            const targetPage = document.querySelector(this.getAttribute("data-target"));

            // Hide all pages and show the target page
            document.querySelector("#home-page").classList.add("hidden");
            document.querySelector("#profile-page").classList.add("hidden");
            document.querySelector("#work-page").classList.add("hidden");
            document.querySelector("#tiktok-page").classList.add("hidden");

            targetPage.classList.remove("hidden");
            targetPage.classList.add("active");

            // Load page content via AJAX if not already loaded
            if (!targetPage.querySelector(".content").innerHTML.trim()) {
                const pageUrl = `spa${targetPage.id.split('-')[0]}.html`;
                loadPage(pageUrl, `#${targetPage.id} .content`);
            }
        });
    });

    // Home button click events for returning to home page
    document.querySelectorAll(".home-button").forEach(button => {
        button.addEventListener("click", function() {
            document.querySelector("#home-page").classList.remove("hidden");
            document.querySelector("#home-page").classList.add("active");

            document.querySelector("#profile-page").classList.add("hidden");
            document.querySelector("#work-page").classList.add("hidden");
            document.querySelector("#tiktok-page").classList.add("hidden");
        });
    });
});