function openEmailModal() {
    $('#emailModal').modal('show');
}

// Optional: To handle form submission and show confirmation
$('#messageForm').submit(function(e) {
    e.preventDefault();
    
    $.ajax({
        type: 'POST',
        url: 'send_email.php',
        data: $(this).serialize(),
        success: function(response) {
            $('#emailModal').modal('hide');
            $('#confirmationModal').modal('show');
            // Optional: You can display more details or handle further actions based on response
        },
        error: function() {
            alert('Failed to send email. Please try again later.');
        }
    });
});
