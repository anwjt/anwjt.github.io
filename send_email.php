<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $recipient = $_POST['recipientEmail'];
    $subject = $_POST['subject'];
    $message = $_POST['message'];
    
    // You can use PHP's built-in mail() function to send email
    $headers = "From: your_email@example.com"; // Replace with a valid sender email
    $success = mail($recipient, $subject, $message, $headers);
    
    if ($success) {
        echo "Email sent successfully.";
    } else {
        echo "Failed to send email.";
    }
} else {
    echo "Invalid request.";
}
?>
