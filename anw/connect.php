<?php
	$serverName = "localhost";
	$userName = "root";
	$userPassword = "";
	$dbName = "lpc";

	$conn = mysqli_connect($serverName,$userName,$userPassword,$dbName);
    $conn -> set_charset("utf8");
 ?>