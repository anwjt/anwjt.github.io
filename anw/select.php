<?php session_start(); 
include('connect.php');

  $ID = $_SESSION['userid'];
  $username = $_SESSION['username'];
  $name = $_SESSION['name'];
 
 
?>
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

<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/v/dt/dt-1.10.23/datatables.min.css"/>
 
<script type="text/javascript" src="https://cdn.datatables.net/v/dt/dt-1.10.23/datatables.min.js"></script>
 <!-- add icon link -->
 <link rel = "icon" href =  
"https://image.flaticon.com/icons/png/512/128/128782.png" 
        type = "image/x-icon"> 
	<?php
include "database.class.php";
	
//new database
$db = new Database();
    
//call method getUser
$get_user = $db->get_all_user();
?>
</head>
<style>
body {
	background: linear-gradient(-45deg, #0E2346, #2C0E46, #530552, #0B5F63,#323E07);
	background-size: 400% 400%;
	animation: gradient 15s ease infinite;
}

@keyframes gradient {
	0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
}
</style>
<body >
<div class="container">

	<form action="insert.php">
	<button class="btn btn-info col-md-12" data-toggle="modal" data-target="#add_user">เพิ่มข้อมูล</button>
	</form>
	<form action="logout.php">
	<input type="submit" class="btn btn-danger col-md-12" value="ออกจากระบบ">
	</form>
<!-- Modal Add User -->
	
<table id="example" class="display table-dark" style="width:100%">
<thead>
<tr>
<td>#</td>
<td>𝙄𝘿</td>
<td>𝙋𝙍𝙀𝙉𝘼𝙈𝙀</td>
<td>𝙉𝘼𝙈𝙀</td>
<td>𝙇𝘼𝙎𝙏𝙉𝘼𝙈𝙀</td>
<td>𝘼𝙂𝙀</td>
<td>𝙂𝙀𝙉𝘿𝙀𝙍</td>
<td>𝘼𝘿𝘿𝙍𝙀𝙎𝙎</td>
<td>𝙋𝙃𝙊𝙉𝙀 𝙉𝙐𝙈𝘽𝙀𝙍</td>
<td>𝙀-𝙈𝘼𝙄𝙇</td>
<td></td>
<td></td>
<td></td>

</tr>
</thead >
<?php
$i =1;
if(!empty($get_user)){
    foreach($get_user as $user){
        ?>
		  <tbody class ="text-dark">
        <tr>
        <td><?php echo $i?> </td>
		<td> <?php echo $user['id_student']?> </td>
		<td> <?php echo $user['prename']?> </td>
		<td> <?php echo $user['firstname']?> </td>
		<td> <?php echo $user['lastname']?> </td>
		<td> <?php echo $user['age']?> </td>
		<td> <?php echo $user['gender']?> </td>
       <td> <?php echo $user['address']?> </td>
       <td>  <?php echo $user['mobile']?> </td>
	   <td> <?php echo $user['email']?> </td>
	   <td><img src="img/<?php echo $user["img"];?>" width="50px" height="50px"  ></td>
       <form action="" method="POST">
	  
       <td><button class="btn btn-danger btn-block" onclick="return delete_user(<?php echo $user['id_rec']?>);">ลบ</button></td>
	   <td><button class="btn btn-warning btn-block"><a href="update.php?id_rec=<?php echo $user['id_rec'];?>">Edit</button></a></td>
	 
</td>
        <?php
        $i++;
    }
}else {
    echo "ไม่พบข้อมูล";
}
?>
</tr>
</tbody>
</table>
</div>
</body>
<script>
//add new data
function add_user_form(){
	$.ajax({
		type:"POST",
		url:"process.php",
		data:$("#add_user_form").serialize(),
		success:function(data){
			
			//close modal
			$(".close").trigger("click");
			
			//show result
			alert(data);
			
			//reload page
			location.reload();
		}
	});
	return false;
}
//delete user
function delete_user(id){
	if(confirm("คุณต้องการลบข้อมูลหรือไม่")){
		$.ajax({
			type:"POST",
			url:"process.php",
			data:{delete_user_id:id},
			success:function(data){
				alert(data);
				location.reload();
			}
		});
	}
	return false;
}
//show data for edit
function show_edit_user(id){
	$.ajax({
		type:"POST",
		url:"process.php",
		data:{show_user_id:id},
		success:function(data){
			$("#edit_form").html(data);
		}
	});
	return false;
}

//edit data
function edit_user_form(){
	$.ajax({
		type:"POST",
		url:"process.php",
		data:$("#edit_user_form").serialize(),
		success:function(data){
			
			//close modal
			$(".close").trigger("click");
			
			//show result
			alert(data);
			
			//reload page
			location.reload();
		}
	});
	return false;
}
</script>

<script>$(document).ready(function() {
    $('#example').DataTable();
} );</script>
</html>