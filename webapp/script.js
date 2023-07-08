// Get the post text input element and post details element
var postText = document.getElementById("post-text");
var postDetails = document.getElementById("post-details");

// Function to handle posting a message
function appendPost() {
  var message = postText.value;
  
  if (message.length > 100) {
    var truncatedMessage = message.substring(0, 100) + "...";
    message = truncatedMessage;
  }
  
  var currentTime = new Date().toLocaleString();
  var postHTML = '<div class="post-message"><p>' + message + '</p><p class="post-time">Posted on: ' + currentTime + '</p></div>';
  postDetails.insertAdjacentHTML('afterbegin', postHTML);
  
  postText.value = "";
}

// Add an event listener to the post button
var postButton = document.getElementById("post-button");
postButton.addEventListener("click", appendPost);

// Add an event listener to the enter key press
postText.addEventListener("keydown", function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    appendPost();
  }
});
