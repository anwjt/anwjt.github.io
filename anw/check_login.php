<?php 
session_start();
        if(isset($_POST['username'])){
                  include("connect.php");
                  $username = $_POST['username'];
                  $password = $_POST['password'];

                  $sql="SELECT * FROM student 
                  WHERE  username='".$username."' 
                  AND  password='".$password."' ";
                  $result = mysqli_query($conn,$sql);
				
                  if(mysqli_num_rows($result)==1){
                      $row = mysqli_fetch_array($result);
                      $_SESSION["idrec"] = $row["id_rec"];
                      $_SESSION["userid"] = $row["id_student"];
                      $_SESSION["username"] = $row["username"];
                      $_SESSION["name"] = $row["firstname"];

             

                        Header("Location: select.php");
                      
              
                  }else{
                    echo "<script>";
                        echo "alert(\" user หรือ  password ไม่ถูกต้อง\");"; 
                        echo "window.history.back()";
                    echo "</script>";
 
                  }
        }else{

             Header("Location: index.php"); //user & password incorrect back to login again
 
        }
?>