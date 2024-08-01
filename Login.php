<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>

    <meta charset="utf-8" />
    <!--<meta name="viewport" content="height=device-height,initial-scale=1.0"/>-->
    <script type="text/javascript" src="https://smtpjs.com/v3/smtp.js"></script>
    <script src="addFooter.js"></script>
    <script src="Login.js"></script>
    <link href="https://fonts.googleapis.com/css?family=Chewy|Permanent+Marker|League+Spartan&amp;display=swap" rel="stylesheet">
    <link rel="stylesheet" href="generic_Web_Style.css">
    <title>Log In</title>

    <style>
        body {
            background-image: url("img/bg-modified.jpg");
        }

        #LogInBtns {
            text-align: center;
        }

        form {
            position: relative;
            top: 200px;
            border: 1px solid #ccc;
            padding: 20px;
            border-radius: 5px;
            background-color: #f7f7f7;
            max-width: 400px;
            margin: 0 auto;
        }

        input[type="email"],
        input[type="text"],
        input[type="password"] {
            width: 90%;
            padding: 10px;
            margin-bottom: 20px;
            border-radius: 5px;
            border: none;
        }

        label {
            display: block;
            margin-bottom: 10px;
            font-weight: bold;
        }

        button.user , input.user {
            background-color: #4CAF50;
            color: white;
            padding: 12px 20px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            position: center;
        }

        button.user:hover,input.user:hover {
                background-color: #45a049;
        }

        #forgot{
            color: darkblue;
            text-decoration: underline;
            cursor: pointer;  
        }
    </style>
    <script>
    
        function goToSignUp() {
            window.location.href = "SignUpPage.html";
        }
        
        <?php
            $action = $_GET['Error'];
            $success_message = $_GET['Message'];

            $message =-1;
            if ($action==="user")
                $message = "User name not Exist!";
            else if ($action==="password")
                $message = "Wrong password!";    
            else if($success_message==="success")
                $message = "User Created Successfully!"; 
            else if($success_message==="successP")
                $message = "Password Changed Successfully!"; 
            echo "let message= '$message'" ;
   
             echo '
        function init() {
            if (message !=-1)
                alert(message);   
        }';            
            ?>



</script>
        
</head>

<body onLoad="init()">
  
    <form id="myForm" action="profile.php" method="post">
        <label for="username">Email:</label>
        <input type="email" id="username" name="username" required>
        <label for="password" class="lblPassword">Password:  (<span id="forgot" onclick="changeToRestorePass()">Forgot?</span>)</label>
        <input type="password" id="password" name="password" 
            onmouseover="showPassword(this)" onmouseout="hidePassword(this)" required>
        <div id="LogInBtns">
            <button class="user" value="Log in" onclick="verifyHuman()">Log in</button>
            <button class="user" type="button" onclick="goToSignUp()">Sign up</button>

        </div>

    </form>


</body>  

</html>

