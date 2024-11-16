<?php
include 'config.php';

$conn = new PDO("mysql:host=$host;dbname=$db", $user, $pass);

$sql = "SELECT template_name, template_file_path FROM template_vespa";
$stmt = $conn->prepare($sql);
$stmt->execute();

$templates = $stmt->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($templates);
?>
