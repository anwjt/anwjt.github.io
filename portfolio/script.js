document.addEventListener("DOMContentLoaded", function() {
    var navLinks = document.querySelectorAll("nav a");
  
    for (var i = 0; i < navLinks.length; i++) {
      navLinks[i].addEventListener("click", smoothScroll);
    }
  
    function smoothScroll(event) {
      event.preventDefault();
      var targetId = this.getAttribute("href");
      var targetPosition = document.querySelector(targetId).offsetTop;
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth"
      });
    }
  });
  document.addEventListener("DOMContentLoaded", function() {
    // Function to check if an element is in the viewport
    function isElementInViewport(element) {
      var rect = element.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
    }
  
    // Function to handle the scroll event
    function handleScroll() {
      var fadeElements = document.querySelectorAll('.fade-in');
    
      for (var i = 0; i < fadeElements.length; i++) {
        if (isElementInViewport(fadeElements[i])) {
          fadeElements[i].classList.add('show');
        }
      }
    }
  
    // Initial check on page load
    handleScroll();
  
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
  });
  