<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: DELETE");
header("Access-Control-Allow-Headers: Content-Type");

// Include database configuration
include 'config.php';
$objDb = new config;
$conn = $objDb->connect();

// Get data from DELETE request
$data = json_decode(file_get_contents('php://input'), true);
$postId = $data['id'];

if ($postId) {
    $sql = "DELETE FROM blogs WHERE id = :id";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':id', $postId);

    if ($stmt->execute()) {
        echo json_encode(['status' => 1, 'message' => 'Post deleted successfully.']);
    } else {
        echo json_encode(['status' => 0, 'message' => 'Failed to delete post.']);
    }
} else {
    echo json_encode(['status' => 0, 'message' => 'Invalid request.']);
}
?>
