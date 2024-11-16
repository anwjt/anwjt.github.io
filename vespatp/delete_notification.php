<?php
include 'config.php';

$conn = new PDO("mysql:host=$host;dbname=$db", $user, $pass);

if (isset($_GET['image'])) {
    $notificationImage = $_GET['image'];

    // Prepare and execute deletion
    $sql = "DELETE FROM notifications WHERE notification_image_path = ?";
    $stmt = $conn->prepare($sql);
    $stmt->execute([$notificationImage]);

    // Optionally, remove the file from the server
    unlink($notificationImage);

    // Redirect back to the admin template management page
    header("Location: admin_templates.php");
    exit;
}
?>
