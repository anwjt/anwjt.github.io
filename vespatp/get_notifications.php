<?php
include 'config.php';


$conn = new PDO("mysql:host=$host;dbname=$db", $user, $pass);

$sql = "SELECT notification_text, notification_image_path FROM notifications";
$stmt = $conn->prepare($sql);
$stmt->execute();

$notifications = $stmt->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($notifications);
?>
