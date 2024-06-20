<?php
header('Content-Type: application/json');

$data = file_get_contents("php://input");
$ddd = json_decode($inputJSON, true);

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "course";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// $sql = "INSERT INTO tbl (cname, isConfirmed) VALUES (?, ?)";

// $stmt = $conn->prepare($sql);

// if (!$stmt) {
//     echo json_encode(array('status' => 'error', 'message' => 'Error: ' . $conn->error));
// } else {
//     $stmt->bind_param("si", $cname, $isConfirmed);

    // foreach ($ddd as $row) {
    //     $cname = $row['cname'];
    //     $isConfirmed = $row['isConfirmed'] ? 1 : 0;
    //     if (!$stmt->execute()) {
    //         echo json_encode(array('status' => 'error', 'message' => 'Error: ' . $stmt->error));
    //         break;
    //     }
    // }
    foreach ($data as $course) {
        $cname = $course['cname'];
        $isConfirmed = $course['isConfirmed'];
    
        // Use prepared statements to prevent SQL injection
        $stmt = $conn->prepare("INSERT INTO courses (cname, isConfirmed) VALUES (?, ?) ON DUPLICATE KEY UPDATE isConfirmed = ?");
        $stmt->bind_param("sii", $cname, $isConfirmed, $isConfirmed);
        $stmt->execute();
        $stmt->close();
    }

    $stmt->close();

    echo json_encode(array('status' => 'success', 'message' => 'Records saved successfully'));


$conn->close();
?>
