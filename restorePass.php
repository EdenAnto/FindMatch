<?php
require_once 'dbConnect.php';
// Create connection
$conn = dbConnect();

$_email=$_POST['param1'];

function generateRandomString($length = 8) {
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $randomString = '';

    $maxIndex = strlen($characters) - 1;
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[rand(0, $maxIndex)];
    }

    return $randomString;
}

$sql_checkMail= "SELECT * FROM User WHERE email= '$_email' ";

$result = mysqli_query($conn, $sql_checkMail) or die("bad gateway");
    if(mysqli_fetch_array($result))
{ // user exist

$_randomPass = generateRandomString();

$sql_restorePass= "UPDATE User SET Password = '$_randomPass' WHERE User.Email = '$_email';";

$result = mysqli_query($conn, $sql_restorePass);

if($result)
    $response=$_randomPass;
else
    $response="ERROR";

}

else 
    $response="ERROR";

$conn->close();

echo $response;
?>

