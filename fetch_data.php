<?php
header('Content-Type: application/json');

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "course";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT cname, isConfirmed FROM tbl"; // Adjust the query based on your table structure

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $data = array();
    while ($row = $result->fetch_assoc()) {
        $data[] = array(
            'cname' => $row['cname'],
            'isConfirmed' => (bool) $row['isConfirmed']
        );
    }
    echo json_encode($data);
} else {
    echo json_encode(array());
}

$conn->close();
?>
