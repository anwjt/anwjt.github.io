
<?php
include "connect.php";
if(isset($_POST['save']))
{
    $id_student = $_POST['id_student'];
    $prename = $_POST['prename'];
    $name = $_POST['name'];
    $lastname = $_POST['lastname'];
    $age = $_POST['age'];
    $gender = $_POST['gender'];
    $address = $_POST['address'];
    $tel = $_POST['tel'];
    $email = $_POST['email'];
    $username = $_POST['usernmae'];
    $password = $_POST['password'];
    (move_uploaded_file($_FILES["images"]["tmp_name"],"img/".$_FILES["images"]["name"]));

    $sql = " INSERT INTO `student`( `id_student`, `prename`, `firstname`, `lastname`, `age`, `gender`, `address`, `mobile`, `email`, `img`, `username`, `password`)  VALUES  ( '$id_student', '$prename', '$name', '$lastname', '$age', '$gender', '$address', '$tel', '$email' ,'".$_FILES["images"]["name"]."' , '$username', '$password')";
    if (mysqli_query($conn, $sql)) {
        ?>
        <script>
        window.location.replace("select.php");
        </script>
        <?php
        } else {
            echo "ไม่สามารถบันทึกข้อมูลได้";
            echo $error."$sql";
    
    }
    mysqli_close($conn);
}
?>
