const textElement = document.getElementById('typed-text');
const texts = ['CameraMan', 'GraphicDesign', 'VideoEditor'];
let index = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
  const currentText = texts[index];
  if (isDeleting) {
    textElement.textContent = currentText.substring(0, charIndex - 1);
    charIndex--;
  } else {
    textElement.textContent = currentText.substring(0, charIndex + 1);
    charIndex++;
  }

  if (!isDeleting && charIndex === currentText.length) {
    isDeleting = true;
    setTimeout(type, 1500);
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    index++;
    if (index === texts.length) {
      index = 0;
    }
    setTimeout(type, 500);
  } else {
    setTimeout(type, 100);
  }
}

type();

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    const targetId = link.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);
    targetSection.scrollIntoView({ behavior: 'smooth' });
  });
});
window.addEventListener('scroll', function() {
  var navbar = document.querySelector('.navbar');
  navbar.classList.toggle('scrolled', window.scrollY > 0);
});
