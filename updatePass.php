<?php
require_once 'dbConnect.php';
// Create connection
$conn = dbConnect();

$_email=$_POST['email'];
$_password=$_POST['password'];

$sql_updatePass= "UPDATE User SET Password = '$_password' WHERE User.Email = '$_email';";

$result = mysqli_query($conn, $sql_updatePass);

if($result)
{
    echo '<script>
        window.location.href = "Login.php?Message=successP";
        </script>';
    die();
}

$conn->close();
?>

