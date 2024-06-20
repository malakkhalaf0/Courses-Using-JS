<?php
header('Content-Type: application/json');

// Receive JSON data from the POST request
$data = file_get_contents("php://input");

// Check if data is valid JSON
$jsonData = json_decode($data, true);

if ($jsonData === null) {
    // JSON data parsing failed
    echo json_encode(array('status' => 'error', 'message' => 'Invalid JSON data'));
    exit;
}

// Database connection parameters
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "course";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die(json_encode(array('status' => 'error', 'message' => 'Connection failed: ' . $conn->connect_error)));
}

// Prepare and bind SQL statement for deleting records
$stmt = $conn->prepare("DELETE FROM tbl WHERE cname = ?");
$stmt->bind_param("s", $cname);

// Process each course name from the JSON data
foreach ($jsonData as $courseName) {
    $cname = $courseName;

    // Execute the deletion query
    if ($stmt->execute()) {
        // Deletion successful
        echo json_encode(array('status' => 'success', 'message' => 'Record deleted successfully'));
    } else {
        // Deletion failed
        echo json_encode(array('status' => 'error', 'message' => 'Error deleting record: ' . $conn->error));
    }
}

// Close the prepared statement and database connection
$stmt->close();
$conn->close();
?>
