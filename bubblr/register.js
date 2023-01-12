// Register function
function register() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
  
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(function(user) {
        // Send verification email
        user.sendEmailVerification();
        // Show success message
        alert("Successfully registered! Please verify your email.");
      })
      .catch(function(error) {
        // Handle errors here
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage);
      });
  }
// Add event listener to register button
var registerForm = document.getElementById("register-form");
registerForm.addEventListener("submit", function(event) {
  event.preventDefault();
  register();
});
  