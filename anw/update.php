
<html>
<head>
<title>Update</title>
<meta charset="UTF-8">
    <!-- Latest compiled and minified CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">

<!-- jQuery library -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

<!-- Popper JS -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>

<!-- Latest compiled JavaScript -->
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
<!-- add icon link -->
<link rel = "icon" href =  
"https://image.flaticon.com/icons/png/512/113/113978.png" 
        type = "image/x-icon"> 
</head>
<body>
<?php

   $userid = null;

   if(isset($_GET["id_rec"]))
   {
	   $userid = $_GET["id_rec"];
   }
   include('connect.php');
   $sql = "SELECT * FROM student WHERE id_rec = '".$userid."' ";

   $query = mysqli_query($conn,$sql);

   $result=mysqli_fetch_array($query);
   
?>
<div class="container">
<form action="saveupdate.php" name="frmAdd" method="post" enctype="multipart/form-data">
<table  class ="table table-info">
  <tr>
    <th >CustomerID</th>
    <td><input type="hidden" name="txtuserid" value="<?php echo $result["id_rec"];?>"><?php echo $result["id_rec"];?></td>
    </tr>
    <tr>
    <th >รหัสประจำตัว</th>
    <td><input type="text" name="txtid" size="20" value="<?php echo $result["id_student"];?>"></td>
    </tr>
    <tr>
    <th >คำนำหน้า</th>
    <td>
						<select name="prename" id="prename" class="form-control">
						<option selected>กรุณาเลือก</option>
						<option value="นาย">นาย</option>
						<option value="นาง">นาง</option>
						<option value="นางสาว">นางสาว</option>
						</select>
					  </div></td>
    </tr>
    <tr>
    <th >ชื่อจริง</th>
    <td><input type="text" name="txtname" size="20" value="<?php echo $result["firstname"];?>"></td>
    </tr>

    <tr>
    <th >นามสกุล</th>
    <td><input type="text" name="txtlastname" size="20" value="<?php echo $result["lastname"];?>"></td>
    </tr>
    <tr>
    <th >อายุ</th>
    <td><input type="text" name="age" size="20" value="<?php echo $result["age"];?>"></td>
    </tr>
    <tr>
    <th >เพศ</th>
    <td><select name="gender" id="gender" class="form-control">
						<option selected>กรุณาเลือก</option>
						<option value="ชาย">ชาย</option>
						<option value="หญิง">หญิง</option>
						</select></td>
    </tr>
    <tr>
    <th >ที่อยู่</th>
    <td><input type="text" name="txtadd" size="20" value="<?php echo $result["address"];?>"></td>
    </tr>
    <tr>
    <th >เบอร์โทร</th>
    <td><input type="text" name="txttel" size="20" value="<?php echo $result["mobile"];?>"></td>
    </tr>
    <tr>
    <th >อีเมลล์</th>
    <td><input type="text" name="txtmail" size="20" value="<?php echo $result["email"];?>"></td>
    </tr>
  <tr>
    <th >username</th>
    <td><input type="text" name="txtuser" size="20" value="<?php echo $result["username"];?>"></td>
    </tr>
  <tr>
    <th >passwod</th>
    <td><input type="password" name="txtpassword" size="20" value="<?php echo $result["password"];?>"></td>
    </tr>
    
  </table>
  <input type="file" name="images" id="images">
  <input type="submit" name="submit" value="submit" class="btn btn-primary">
</form>
</div>
</body>
</html>