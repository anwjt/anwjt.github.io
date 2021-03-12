<?php
class Database {

       private $host = 'localhost'; //ชื่อ Host
	   private $user = 'root'; //ชื่อผู้ใช้งาน ฐานข้อมูล
	   private $password = ''; // password สำหรับเข้าจัดการฐานข้อมูล
	   private $database = 'lpc'; //ชื่อ ฐานข้อมูล

	//function เชื่อมต่อฐานข้อมูล
	protected function connect(){

		$mysqli = new mysqli($this->host,$this->user,$this->password,$this->database);

			$mysqli->set_charset("utf8");

			if ($mysqli->connect_error) {

			    die('Connect Error: ' . $mysqli->connect_error);
			}

		return $mysqli;
	}
	//function เรื่ยกดูข้อมูล all user
	public function get_all_user(){

		$db = $this->connect();
		$get_user = $db->query("SELECT * FROM student");

		while($user = $get_user->fetch_assoc()){
			$result[] = $user;
		}

		if(!empty($result)){

			return $result;
		}
	}
	//function delete user
	public function delete_user($id){

		$db = $this->connect();

		$del_user = $db->prepare("DELETE FROM student WHERE id_rec = ?");

		$del_user->bind_param("i",$id);

		if(!$del_user->execute()){

			echo $db->error;

		}else{

			echo "ลบข้อมูลเรียบร้อย";
		}
	}
	//function เพื่ม user
	
	public function get_user($user_id){

		$db = $this->connect();
		$get_user = $db->prepare("SELECT userid,username,password  FROM member WHERE userid = ?");
		$get_user->bind_param('i',$user_id);
		$get_user->execute();
		$get_user->bind_result($id,$name,$password);
		$get_user->fetch();
	
		$result = array(
			'userid'=>$id,
			'username'=>$name,
			'password'=>$password
		);
	
		return $result;
	}
	//function edit user
public function edit_user($data){

	$db = $this->connect();
	

	$add_user = $db->prepare("UPDATE student SET username=?,password=? WHERE userid= ?");

	$add_user->bind_param("ssi",$data['username'],$data['password'],$data['edit_user_id']);

	if(!$add_user->execute()){

		echo $db->error;

	}else{

		echo "บันทึกข้อมูลเรียบร้อย";
	}
}

}
?> 