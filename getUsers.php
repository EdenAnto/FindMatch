<?php
require_once 'dbConnect.php';
// Create connection
$conn = dbConnect();

// Retrieve the values sent from the AJAX request

    $sql_in= "SELECT  email, CONCAT(firstName, ' ', lastName) AS fullName,lastConnect, admin
              FROM User
              order by fullName;";

   $_result = mysqli_query($conn, $sql_in) or die("Bad query");


    $rows = array();
    while ($row = mysqli_fetch_assoc($_result)) {
        $rows[] = array(
        "email" => $row['email'],
        "fullName" => $row['fullName'],
        "lastConnect" => $row['lastConnect'],
        "admin" => $row['admin']
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
