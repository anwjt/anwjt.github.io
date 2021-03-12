<?php
include "database.class.php";

//create object
$process = new Database();

if(isset($_POST['delete_user_id'])){
    $process ->delete_user($_POST['delete_user_id']);
}
?>