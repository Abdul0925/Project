<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

include 'config.php';
$objDb = new config;
$conn = $objDb->connect();
var_dump($conn); 

$user = (file_get_contents('php://input'));
$method = $_SERVER['REQUEST_METHOD'];
switch($method){
    case "POST":
        $user = json_decode(file_get_contents('php://input'));
        $sql = "INSERT INTO users(id, username, email, password) VALUES(null, :username, :email, :password)";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':username', $user->username);
        $stmt->bindParam(':email', $user->email);
        $stmt->bindParam(':password', $user->password);
        if($stmt->execute()){
            $response = ['status' => 1,'message' => 'user created successfully.'];
        }
        else{
            $response = ['status' => 0,'message' => 'Failed to create user.'];
        }
        echo json_encode($response);
    break;

}

?>
