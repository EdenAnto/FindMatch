<?php
require_once 'dbConnect.php';
// Create connection
$conn = dbConnect();


// Retrieve the values sent from the AJAX request
$userEmail = $_POST['param1'];

    $sql_in= "SELECT COUNT(*) AS row_count ,(SELECT COUNT(*) AS row_count 
                FROM UserGames
                INNER JOIN Games ON UserGames.Game_ID = Games.ID
                where UserGames.User_Email = '$userEmail' and Games.Date< CURRENT_TIMESTAMP) as passedGames

                FROM UserGames
                INNER JOIN Games ON UserGames.Game_ID = Games.ID
                where UserGames.User_Email = '$userEmail';";

   $_result = mysqli_query($conn, $sql_in) or die("Bad query");


    $rows = array();
    while ($row = mysqli_fetch_assoc($_result)) {
        $rows[] = array(
        "count" => $row['row_count'],
        "passedGames" => $row['passedGames']
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
