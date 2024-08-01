<?php
require_once 'dbConnect.php';

error_reporting(E_ALL);
ini_set('display_errors', 1);

$conn = dbConnect();

// Retrieve the JSON data from the request body
$jsonData = file_get_contents('php://input');


// Decode the JSON data into a PHP associative array
$data = json_decode($jsonData, true);

$_district=$data['districtValue'];
$_city=$data['cityValue'];
$_date=$data['dateValue'];
$_time=$data['timeValue'];
$_location=$data['locationValue'];
$_url=$data['urlValue'];
$_colorA=$data['ColorAValue'];
$_colorB=$data['ColorBValue'];
$_fieldType=$data['fieldType'];
$_maxPlayers=$data['MaxPlayersValue'];
$_registeredPlayers=0;


$sql_in= "INSERT INTO Games (District, City, Date, Location, Time, URL, colorA, colorB, fieldType, maxPlayers, registeredPlayers)
VALUES
('$_district', '$_city', '$_date', '$_location', '$_time', '$_url', '$_colorA', '$_colorB', '$_fieldType', '$_maxPlayers', '$_registeredPlayers')";

$response="";

if($conn ->query($sql_in) === TRUE)
{
   $response="Add";
}
else {
	$response= "Error";
}


echo $response;
$conn->close();
?>

