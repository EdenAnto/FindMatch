<?php
require_once 'dbConnect.php';
$conn = dbConnect();

// Retrieve the values sent from the AJAX request

    $sql_in= "SELECT
     (SELECT User_Email FROM UserGames GROUP BY User_Email ORDER BY COUNT(*) DESC LIMIT 1) AS email,
     (SELECT COUNT(*) FROM Games) AS total,
     (SELECT COUNT(*) FROM Games WHERE date < CURDATE()) AS passed";


   $_result = mysqli_query($conn, $sql_in) or die("Bad query");


    $rows = array();
    while ($row = mysqli_fetch_assoc($_result)) {
        $rows[] = array(
        "email" => $row['email'],
        "total" => $row['total'],
        "passed" => $row['passed'],
     );
}
// Convert the rows array to JSON
$jsonData = json_encode($rows);


$response= $jsonData;
//$response= "good";

// Send the response back to the JavaScript function
$conn->close();

echo $response;
?>
