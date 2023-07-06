// Function to load the content of a page
function loadPage(page) {
  const contentDiv = document.getElementById("content");
  
  if (page === 'home') {
    fetch(page + 'page.html')
      .then(response => response.text())
      .then(data => {
        contentDiv.innerHTML = data;
        initializeTypedEffect();
      });
  } else {
    fetch(page + '.html')
      .then(response => response.text())
      .then(data => {
        contentDiv.innerHTML = data;
      });
  }
}

// Function to initialize the typed effect
function initializeTypedEffect() {
  var typed = new Typed('#typed', {
    strings: ['Photographer', 'Video Editor', 'Cameraman',],
    typeSpeed: 120,
    backSpeed:100,
    loop: true
  });
}
