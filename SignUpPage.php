<?php
require_once 'dbConnect.php';
// Create connection
$conn = dbConnect();

$_email=$_POST['email'];
$_firstName=$_POST['firstName'];
$_lastName=$_POST['lastName'];
$_password=$_POST['password'];
$_userDate=$_POST['userDate'];
$_tel=$_POST['tel'];


$sql_checkMail= "SELECT * FROM User WHERE email= '$_email' ";

$content="This email:" . $_email . " is already registered";
        
        
$result = mysqli_query($conn, $sql_checkMail) or die("bad gateway");
    if(mysqli_fetch_array($result)){
        echo '<!DOCTYPE html>
        <html>
        <head>
            <script src="addFooter.js"></script>
            <link href="https://fonts.googleapis.com/css?family=Chewy|Permanent+Marker|League+Spartan&amp;display=swap" rel="stylesheet">
            <link rel="stylesheet" href="generic_Web_Style.css">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css">
        </head>
        <body>
        </body>
        </html>';


    // use JavaScript to perform the redirect after a delay
   echo '<script>
        document.addEventListener("DOMContentLoaded", function() {
            alert("' . htmlspecialchars($content, ENT_QUOTES) . '");
            window.location.href = "SignUpPage.html";
        });
    </script>';
    die();
    }



$sql_in= "INSERT INTO User (FirstName, LastName, Email, Password, BirthDate, TelNum, JoinDate, LastConnect) VALUES (  '$_firstName'  ,  '$_lastName'  ,  '$_email' ,  '$_password' ,  '$_userDate' ,  '$_tel'  , current_timestamp(), current_timestamp())";


if($conn ->query($sql_in) === TRUE)
{
    echo '<script>
        window.location.href = "Login.php?Message=success";
        </script>';
    die();
}
else {
	echo "Error: " .$sql_in ."<br>" . $conn->error;
}

$conn->close();
?>

