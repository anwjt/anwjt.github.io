<?php
$host = 'sql112.alchosting.xyz';
$db = 'alcy_37592536_template';
$user = 'alcy_37592536';
$pass = '43367070b8c6eff';

$conn = new PDO("mysql:host=$host;dbname=$db", $user, $pass);

// Fetch templates from database
$sql = "SELECT template_name, template_file_path FROM template_vespa";
$stmt = $conn->prepare($sql);
$stmt->execute();
$templates = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Fetch notifications from database
$sqlNotifications = "SELECT notification_image_path FROM notifications"; // เปลี่ยน `notifications` เป็นชื่อของตารางที่คุณใช้
$stmtNotifications = $conn->prepare($sqlNotifications);
$stmtNotifications->execute();
$notifications = $stmtNotifications->fetchAll(PDO::FETCH_ASSOC);
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Template Management</title>
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
    <style>
        .delete-btn {
            background-color: #dc3545;
            color: white;
        }
    </style>
</head>

<body>
    <div class="container mt-5">
        <h1 class="text-center">จัดการเทมเพลต Vespa</h1>
        
        <!-- Manage Templates -->
        <h2>Manage Templates</h2>
        <table class="table">
            <thead>
                <tr>
                    <th>Template Name</th>
                    <th>Template File</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($templates as $template): ?>
                    <tr>
                        <td><?php echo htmlspecialchars($template['template_name']); ?></td>
                        <td><?php echo htmlspecialchars($template['template_file_path']); ?></td>
                        <td>
                            <button class="btn delete-btn" onclick="deleteTemplate('<?php echo htmlspecialchars($template['template_file_path']); ?>')">Delete</button>
                        </td>
                    </tr>
                <?php endforeach; ?>
            </tbody>
        </table>

        <!-- Manage Notifications -->
        <h2>Manage Notifications</h2>
        <table class="table">
            <thead>
                <tr>
                    <th>Notification Image</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($notifications as $notification): ?>
                    <tr>
                        <td><img src="<?php echo htmlspecialchars($notification['notification_image_path']); ?>" style="width: 100px;"></td>
                        <td>
                            <button class="btn delete-btn" onclick="deleteNotification('<?php echo htmlspecialchars($notification['notification_image_path']); ?>')">Delete</button>
                        </td>
                    </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    </div>

    <script>
        function deleteTemplate(templateFilePath) {
            if (confirm('Are you sure you want to delete this template?')) {
                window.location.href = 'delete_template.php?file=' + encodeURIComponent(templateFilePath);
            }
        }

        function deleteNotification(notificationImage) {
            if (confirm('Are you sure you want to delete this notification?')) {
                window.location.href = 'delete_notification.php?image=' + encodeURIComponent(notificationImage);
            }
        }
    </script>

    <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
</body>

</html>
