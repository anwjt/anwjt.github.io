<?php
$targetDir = "./uploads/";
$targetFile = $targetDir . basename($_FILES["templateFile"]["name"]);
$imageFileType = strtolower(pathinfo($targetFile, PATHINFO_EXTENSION));

// Check if file is a valid image
if (isset($_POST["submit"])) {
    $check = getimagesize($_FILES["templateFile"]["tmp_name"]);
    if ($check !== false && $imageFileType == 'png') {
        if (move_uploaded_file($_FILES["templateFile"]["tmp_name"], $targetFile)) {
            // Store template in the database
            $templateName = $_POST['templateName'];
            
            $conn = new PDO("mysql:host=sql112.alchosting.xyz;dbname=alcy_37592536_template", "alcy_37592536", "43367070b8c6eff");
            $sql = "INSERT INTO template_vespa (template_name, template_file_path) VALUES (?, ?)";
            $stmt = $conn->prepare($sql);
            $stmt->execute([$templateName, $targetFile]);

            echo "Template uploaded successfully.";
        } else {
            echo "There was an error uploading the file.";
        }
    } else {
        echo "File is not a valid PNG image.";
    }
}
?>
