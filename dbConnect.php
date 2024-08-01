<?php

function dbConnect()
{
    $servername = "sql209.byethost18.com";
    $username= "b18_34234501";
    $password = "matan2010";
    $dbname="b18_34234501_FindMatch";

    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);
    // Check connection
    if ($conn->connect_error) {
        die("connection failed: " .$conn->connect_error);
    }
    return $conn;
}
?>