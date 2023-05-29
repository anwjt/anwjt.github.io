document.addEventListener('DOMContentLoaded', function() {
  // Typed.js initialization
  var typed = new Typed('#header', {
    strings: ['Hi', 'Hello World', 'Welcome'],
    typeSpeed: 50, // Typing speed in milliseconds
    backSpeed: 30, // Backspacing speed in milliseconds
    loop: true, // Enable looping
    loopCount: Infinity, // Number of loops (use Infinity for infinite loop)
  });
});
