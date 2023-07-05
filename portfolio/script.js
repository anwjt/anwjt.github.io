document.addEventListener("DOMContentLoaded", function() {
    // Function to handle the scroll event
    function handleScroll(event) {
      var sections = document.querySelectorAll('section');
      var currentScrollPos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
  
      for (var i = 0; i < sections.length; i++) {
        var section = sections[i];
        var sectionHeight = section.offsetHeight;
        var sectionTop = section.offsetTop;
  
        if (currentScrollPos >= sectionTop && currentScrollPos < sectionTop + sectionHeight) {
          window.removeEventListener('scroll', handleScroll); // Disable scroll event temporarily
  
          // Scroll to the next section with smooth behavior
          var nextSectionIndex = (i + 1 < sections.length) ? i + 1 : sections.length - 1;
          sections[nextSectionIndex].scrollIntoView({ behavior: 'smooth' });
  
          // Re-enable scroll event after a short delay
          setTimeout(function() {
            window.addEventListener('scroll', handleScroll);
          }, 1000); // Adjust the delay duration as needed
        }
      }
    }
  
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
  });
  