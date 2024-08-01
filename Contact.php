<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Contact</title>
    <script src="addFooter.js"></script>
    <link href="https://fonts.googleapis.com/css?family=Chewy|Permanent+Marker|League+Spartan&amp;display=swap" rel="stylesheet">
    <script type="text/javascript" src="https://smtpjs.com/v3/smtp.js"></script>
      <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <link rel="stylesheet" href="generic_Web_Style.css">


    <style>
        body {
            background-image: url("img/bg-modified.jpg");
            background-size: cover;
            background-repeat: no-repeat;
            font-family: Gisha;
        }

        form {
            position: relative;
            border: 1px solid rgb(204, 204, 204);
            padding: 20px;
            border-radius: 5px;
            background-color: rgb(247, 247, 247);
            max-width: 450px;
            margin: auto;
            top: 200px;
            height: 220px;
        }


        textarea {
            width: 80%;
            height: 145px;
        }

        label {
            display: block;
            margin-bottom: 10px;
            font-weight: bold;
        }

        .user {
            background-color: darkolivegreen;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            position: relative;
            font-size: 24px;
            top: -14px;
        }

            .user:hover {
                background-color: darkgreen;
            }


        .loader {
        border: 16px solid #f3f3f3;
        border-radius: 50%;
        border-top: 16px solid #3498db;
        width: 120px;
        height: 120px;
        -webkit-animation: spin 2s linear infinite; /* Safari */
        animation: spin 2s linear infinite;
        position: fixed;
            top: 30%;
            left: 45%;
        }

        /* Safari */
        @-webkit-keyframes spin {
        0% { -webkit-transform: rotate(0deg); }
        100% { -webkit-transform: rotate(360deg); }
        }

        @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
        }
    </style>


<script>
document.addEventListener("DOMContentLoaded", function() {
        let name = $("#name").val();
        let email = $("#email").val();

      document.getElementsByClassName("loader")[0].style.display="block";
           setTimeout(function() {
           document.getElementsByClassName("loader")[0].style.display="none";
           document.getElementsByClassName("thankYouForm")[0].style.display="block";
            }, 1200);

});
</script>



</head>
<body>

    <div class="loader" style="display:none;"></div>

    <form class="thankYouForm" style="display:none; text-align: center;">
    <?php
$name = $_POST['name'];
//$name = $_POST['email'];

function printGreeting($name) {
    $englishPattern = '/^[a-zA-Z\s]+$/';
    $hebrewPattern = '/^[א-ת\s]+$/u';

    if (preg_match($englishPattern, $name)) {
        // English text
        echo "<h1>Thank You, $name!</h1>";
    } elseif (preg_match($hebrewPattern, $name)) {
        // Hebrew text
        echo "<h1>!$name תודה רבה</h1>";
    } else {
        // Invalid characters or mixed text
        echo "<h1>Invalid name format</h1>";
    }
}

printGreeting($name);

$messages = [
    "Your request will be forwarded to the responsible team and will be answered as soon as possible.<br>",
    "Please check your email inbox for further communication.<br>",
    "Be aware that our reply may end up in your spam folder.<br>",
    "<br><br>"
];

// Loop through the array and echo each message
foreach ($messages as $message) {
    echo $message;
}
?>



<input type="button" class="user" value="Got It!" onclick="reloadPage()" >
          
    </form>

</body>
</html>
