<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
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
"https://image.flaticon.com/icons/png/512/105/105010.png" 
        type = "image/x-icon"> 
</head>
<body>
<form action="saveinsert.php" method="post" enctype="multipart/form-data">
<div class ="container">
<div  id="add_user" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
		  <div class="modal-dialog" role="document">
			<div class="modal-content">
			  <div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				<h4 class="modal-title" id="myModalLabel">เพิ่มข้อมูล</h4>
			  </div>
			  <div class="modal-body">
			  <form action="saveinsert.php" method="post" enctype="multipart/form-data">
					<div class="form-group">
						<label >รหัสประจำตัว</label>
						<input type="text" class="form-control" name="id_student"  placeholder="ชื่อ">
					  </div>
					  <div class="form-group">
						<label >คำนำหน้า</label>
						<select name="prename" id="prename" class="form-control">
						<option selected>กรุณาเลือก</option>
						<option value="นาย">นาย</option>
						<option value="นาง">นาง</option>
						<option value="นางสาว">นางสาว</option>
						</select>
					  </div>
					  <div class="form-group">
						<label >ชื่อจริง</label>
						<input type="text" class="form-control" name="name"  placeholder="ชื่อจริง">
					  </div>
					  <div class="form-group">
						<label >นามสกุล</label>
						<input type="text" class="form-control" name="lastname"  placeholder="นามสกุล">
					  </div>
					  <div class="form-group">
						<label >อายุ</label>
						<input type="text" class="form-control" name="age"  placeholder="ที่อยู่">
					  </div>
					  <div class="form-group">
						<label >เพศ</label>
						<select name="gender" id="send_authors" class="form-control">
						<option selected>กรุณาเลือก</option>
						<option value="ชาย">ชาย</option>
						<option value="หญิง">หญิง</option>
						</select>
						<div class="form-group">
						<label >ที่อยู่</label>
						<input type="textfield" class="form-control" name="address"  placeholder="ที่อยู่">
					  </div>
					  <div class="form-group">
						<label >เบอร์โทร</label>
						<input type="text" class="form-control" name="tel"  placeholder="เบอร์โทร">
					  </div>
                      <div class="form-group">
						<label >อีเมลล์</label>
						<input type="email"  class="form-control" name="email"  placeholder="อีเมลล์">
					  </div>
					  <div class="form-group">
						<label >username</label>
						<input type="text" class="form-control" name="usernmae"  placeholder="ระบุชื่อusername">
					  </div>
					  <div class="form-group">
						<label >password</label>
						<input type="text" class="form-control" name="password"  placeholder="ระบุpassword">
					  </div>
					  <input type="file" name="images" id="images">
					
			  </div>
			  <div class="modal-footer">
				<button type="summit" name="save" id="save" value ="save" class="btn btn-primary " >Save changes</button>
				</form>
			  </div>
			</div>
		  </div>
		  </div>
	</div>
    </form>
</body>
</html>