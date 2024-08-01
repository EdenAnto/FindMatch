<?php
require_once 'dbConnect.php';
// Create connection
$conn = dbConnect();


// Retrieve the values sent from the AJAX request
$userEmail = $_POST['param1'];
$param2 = $_POST['param2'];
$queryType = $_POST['param3'];

$param2 = explode(',', $param2);
$response = ""; // Initialize the response variable

if ($queryType == 'insert') {
    foreach ($param2 as $gameId) {

        /////// check registred players
        $sql_in_registered = "SELECT `registeredPlayers` FROM `Games` WHERE `ID`='$gameId';";
        $resultRegistered = $conn->query($sql_in_registered);
        if ($resultRegistered) {
            $row = $resultRegistered->fetch_assoc();
            $registeredPlayers = $row['registeredPlayers'];
        }
        else{
            echo "Error";
                die();
                $conn->close();

        }
        ////////

        /////// check maxPlayers
        $sql_in_Max = "SELECT `maxPlayers` FROM `Games` WHERE `ID`='$gameId';";
        $resultMax = $conn->query($sql_in_Max);
        
        if ($resultMax) {
            $row = $resultMax->fetch_assoc();
            $maxPlayers = $row['maxPlayers'];
        }
        else
        {
            echo "Error";
                die();
                $conn->close();

        }
        ////////
        if ($maxPlayers >= ($registeredPlayers+1))
        {
            $response= "GOOD";
                ///////// insert game
            $sql_in= "INSERT INTO UserGames (User_Email, Game_ID) VALUES ('$userEmail','$gameId');";
            if($conn ->query($sql_in) === TRUE)
            {
                 /////// Increase registeredPlayers by one
                $sql_update = "UPDATE `Games` SET `registeredPlayers` = `registeredPlayers` + 1 WHERE `ID` = $gameId";

                if ($conn->query($sql_update) === TRUE) {
                    // Update successful
                    //echo "Registered players incremented by one.";
                } else {
                    echo "Error";
                        die();
                        $conn->close();
                }

                //echo "work";
            }
            else {
                echo "Error";
                    die();
                    $conn->close();

        }

        }
        else 
        {
            //not good
            $response= "MaxPlayerError";
           
        }



    }
} else if ($queryType == 'delete') {
    foreach ($param2 as $gameId) {
        $sql_in = "DELETE FROM `UserGames` WHERE `User_Email` = '$userEmail' and `Game_ID`='$gameId';";
        if ($conn->query($sql_in) === TRUE) {
            //echo "work";
                    /////// Decrease registeredPlayers by one
                $sql_update = "UPDATE `Games` SET `registeredPlayers` = `registeredPlayers` - 1 WHERE `ID` = $gameId";

                if ($conn->query($sql_update) === TRUE) {
                    // Update successful
                    $response= "Delete";
                    //echo "Registered players discrment by one.";
                } else {
                    echo "Error";
                        die();
                        $conn->close();
                }

        } else {
            echo "Error";
                die();
                $conn->close();

        }
    }
}

// Send the response back to the JavaScript function
$conn->close();
echo $response;
?>
