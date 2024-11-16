<?php
include 'config.php';

$conn = new PDO("mysql:host=$host;dbname=$db", $user, $pass);

if (isset($_GET['file'])) {
    $templateFilePath = $_GET['file'];

    // Prepare and execute deletion
    $sql = "DELETE FROM template_vespa WHERE template_file_path = ?";
    $stmt = $conn->prepare($sql);
    $stmt->execute([$templateFilePath]);

    // Optionally, remove the file from the server
    unlink($templateFilePath);

    // Redirect back to the admin template management page
    header("Location: admin_templates.php");
    exit;
}
?>
