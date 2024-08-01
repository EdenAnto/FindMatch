<?php
require_once 'dbConnect.php';
// Create connection
$conn = dbConnect();

$_email=$_POST['username'];

    $sql_Games = "SELECT *
					FROM Games
					WHERE CONCAT(`Date`, ' ', `Time`) >= NOW()
					ORDER BY ABS(TIMESTAMPDIFF(SECOND, CONCAT(`Date`, ' ', `Time`), NOW()))
					LIMIT 4";
					
    $games_result = mysqli_query($conn, $sql_Games) or die("Bad query");



    $rows = array();
    $cityNames =array();
    while ($row = mysqli_fetch_assoc($games_result)) {
        $rows[] = array(
        "city" => $row['City'],
        "date" => $row['Date'],
        "location" => $row['Location'],
        "time" => substr($row['Time'], 0, 5)
     );
}

// Convert the rows array to JSON
$jsonData = json_encode($rows);
echo $jsonData;

$conn->close();
?>