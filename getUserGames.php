<?php

// Create connection
require_once 'dbConnect.php';
$conn = dbConnect();

$_email = $_POST['param1'];

            $sql_Games = "SELECT * FROM Games 
              WHERE ID IN (SELECT Game_ID FROM UserGames WHERE User_Email = '$_email') 
              ORDER BY Date";
    $games_result = mysqli_query($conn, $sql_Games) or die("Bad query");

    $rows = array();
    $cityNames =array();
    while ($row = mysqli_fetch_assoc($games_result)) {
        $rows[] = array(
        "id" => $row['ID'],
        "district" => $row['District'],
        "city" => $row['City'],
        "date" => $row['Date'],
        "location" => $row['Location'],
        "time" => substr($row['Time'], 0, 5),
        "maxPlayers" =>$row['maxPlayers'],
        "regPlayers" =>$row['registeredPlayers'],
        "fieldType" => $row['fieldType'],
        "url" => $row['URL']

     );
}

// Convert the rows array to JSON
$jsonData = json_encode($rows);
echo $jsonData;

$conn->close();
?>