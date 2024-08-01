<?php
require_once 'dbConnect.php';
// Create connection
$conn = dbConnect();

// Retrieve the JSON data from the AJAX request
$jsonData = $_POST['jsonData'];

// Convert the JSON data to a PHP array
$emailData = json_decode($jsonData, true);

// Construct the SQL query
$query = "UPDATE User SET Admin = 1 WHERE Email = ?";

// Prepare the statement
$stmt = $conn->prepare($query);

// Iterate over the email data
foreach ($emailData as $email) {
  // Bind the email value to the prepared statement
  $stmt->bind_param("s", $email);

  // Execute the statement
  $stmt->execute();
}

// Check if any rows were affected
if ($stmt->affected_rows > 0) {
  $response = "Emails updated successfully.";
} else {
  $response = "No rows were updated.";
}

// Close the statement
$stmt->close();

// Close the database connection
$conn->close();

// Return the response
echo $response;
?>

