<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

include 'config.php';
$objDb = new config;
$conn = $objDb->connect();

$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {
    case "GET":

        $stmt = $conn->prepare("SELECT * FROM blogs");
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($result);
        break;
        case "POST":
        $user = json_decode(file_get_contents('php://input'));
        // Assuming you have some user validation here
        $sql = "SELECT * FROM users WHERE username = :username AND password = :password";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':username', $user->username);
        $stmt->bindParam(':password', $user->password);

        $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($result) {
            $token = bin2hex(random_bytes(16));
            $response = [
                'status' => 1,
                'message' => 'User exists.',
                'token' => $token,
                'user' => $result  // Including user data if necessary
            ];
        } else {
            $response = [
                'status' => 0,
                'message' => 'User not found.'
            ];
        }
        
        // Return a single JSON object
        echo json_encode($response);
        break;
}
?>
