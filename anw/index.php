<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <!-- Latest compiled and minified CSS -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">

<!-- jQuery library -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

<!-- Popper JS -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>

<!-- Latest compiled JavaScript -->
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    <title>𝙇𝙤𝙜𝙞𝙣 𝙥𝙖𝙜𝙚</title>
    <!-- add icon link -->
    <link rel = "icon" href =  
"https://image.flaticon.com/icons/png/512/128/128775.png" 
        type = "image/x-icon"> 
</head>
<div class="login">
<body>
<link rel="stylesheet" href="login.css">

      <form  name="formlogin" action="check_login.php" method="POST" id="login" class="form-horizontal">
       <div>
            <input type="text"  name="username" class="form-control" required placeholder="Username" />
          </div>
        <div>
            <input type="password" name="password" class="form-control" required placeholder="Password" />
          </div>
        
        <div class="form-group"></div>
          <div class="col-sm-12"></div>
          <button type="submit" class="btn btn-primary btn-block btn-large" id="btn">Login</button>
            
</body>
</div>
</html>