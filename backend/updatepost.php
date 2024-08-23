<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT");
header("Access-Control-Allow-Headers: Content-Type");

// Include database configuration
include 'config.php';
$objDb = new config;
$conn = $objDb->connect();

// Get data from PUT request
$data = json_decode(file_get_contents('php://input'), true);
$postId = $data['id'];
$title = $data['title'];
$description = $data['description'];

if ($postId && $title && $description) {
    $sql = "UPDATE posts SET title = :title, description = :description WHERE id = :id";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':title', $title);
    $stmt->bindParam(':description', $description);
    $stmt->bindParam(':id', $postId);

    if ($stmt->execute()) {
        echo json_encode(['status' => 1, 'message' => 'Post updated successfully.']);
    } else {
        echo json_encode(['status' => 0, 'message' => 'Failed to update post.']);
    }
} else {
    echo json_encode(['status' => 0, 'message' => 'Invalid request.']);
}
?>
