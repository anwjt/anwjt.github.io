<html>
<head>
<title>SAVE</title>
<meta charset="UTF-8">
</head>
<body>

<?php
include "connect.php";
if(isset($_POST['submit']))
{
(move_uploaded_file($_FILES["images"]["tmp_name"],"img/".$_FILES["images"]["name"]));
	$sql = "UPDATE `student` SET `id_student` = '".$_POST["txtid"]."',prename = '".$_POST["prename"]."' ,firstname = '".$_POST["txtname"]."' 
	,lastname = '".$_POST["txtlastname"]."',age = '".$_POST["age"]."',gender = '".$_POST["gender"]."',address = '".$_POST["txtadd"]."'
	,username = '".$_POST["txtuser"]."',password = '".$_POST["txtpassword"]."',img = '".$_FILES["images"]["name"]."'  WHERE `student`.`id_rec` = '".$_POST["txtuserid"]."'";
	
	$query = mysqli_query($conn,$sql);

	if($query) { ?>
	 <script>

     	window.location.replace("select.php");
     </script>
     <?php
	}else{
		print_r($_POST);
		print_r($_FILES);
		echo $sql;
	}

	mysqli_close($conn);
}
?>
</body>
</html>