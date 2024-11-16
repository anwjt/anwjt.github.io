<?php
$targetDir = "uploads/";
$targetFile = $targetDir . basename($_FILES["notificationImage"]["name"]);
$imageFileType = strtolower(pathinfo($targetFile, PATHINFO_EXTENSION));

// Define allowed image file types
$allowedTypes = ['png', 'jpg', 'jpeg', 'gif'];

// Check if file is a valid image
if (isset($_POST["submitNotification"])) {
    $check = getimagesize($_FILES["notificationImage"]["tmp_name"]);
    if ($check !== false && in_array($imageFileType, $allowedTypes)) {
        if (move_uploaded_file($_FILES["notificationImage"]["tmp_name"], $targetFile)) {
            // Store notification in the database
            $notificationText = $_POST['notificationText'];

            $conn = new PDO("mysql:host=sql112.alchosting.xyz;dbname=alcy_37592536_template", "alcy_37592536", "43367070b8c6eff");
            $sql = "INSERT INTO notifications (notification_text, notification_image_path) VALUES (?, ?)";
            $stmt = $conn->prepare($sql);
            $stmt->execute([$notificationText, $targetFile]);

            echo "Notification uploaded successfully.";
        } else {
            echo "There was an error uploading the file.";
        }
    } else {
        echo "File is not a valid image type. Only PNG, JPG, JPEG, and GIF are allowed.";
    }
}
?>
