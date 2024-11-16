<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin - Upload Template</title>
    <!-- Bootstrap CSS -->
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
    <style>
        body {
            font-family: 'Arial', sans-serif;
            background-color: #f8f9fa;
            padding: 20px;
        }
        .container {
            max-width: 600px;
            background: white;
            border-radius: 10px;
            padding: 20px;
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
        }
        h1 {
            font-size: 24px;
            font-weight: bold;
            text-align: center;
            margin-bottom: 20px;
        }
        label {
            font-weight: bold;
        }
        input[type="file"] {
            padding: 10px;
        }
        .btn {
            width: 100%;
            margin-top: 15px;
            padding: 15px;
            font-size: 16px;
        }
        @media (max-width: 600px) {
            h1 {
                font-size: 20px;
            }
            .btn {
                padding: 12px;
                font-size: 14px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Upload New Template</h1>
        <form action="upload_template.php" method="post" enctype="multipart/form-data">
            <div class="form-group">
                <label for="templateName">Template Name:</label>
                <input type="text" class="form-control" name="templateName" id="templateName" required placeholder="Enter template name">
            </div>
            <div class="form-group">
                <label for="templateFile">Select Template (PNG Only):</label>
                <input type="file" class="form-control-file" name="templateFile" id="templateFile" accept=".png" required>
            </div>
            <button type="submit" class="btn btn-primary" name="submit">Upload Template</button>
        </form>
    </div>

<!-- Existing code... -->
<br><br><br>
<h1 class="text-center">Upload Notification Image</h1>
<form action="upload_notification.php" method="post" enctype="multipart/form-data">
    <div class="form-group">
        <label for="notificationImage">Select Notification Image (PNG Only):</label>
        <input type="file" class="form-control-file" name="notificationImage" id="notificationImage" accept=".png" required>
    </div>
    <div class="form-group">
        <label for="notificationText">Notification Text:</label>
        <input type="text" class="form-control" name="notificationText" id="notificationText" required placeholder="Enter notification text">
    </div>
    <button type="submit" class="btn btn-success" name="submitNotification">Upload Notification</button>
</form>

<!-- Existing code... -->


    <!-- Bootstrap JS and dependencies -->
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
</body>
</html>
