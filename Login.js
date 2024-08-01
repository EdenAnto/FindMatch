// JavaScript source code

function logIn() {
    if (1) //connection succes
        spinTheBall();

}

function showPassword(password) {
    password.setAttribute("type", "text");
}

function hidePassword(password) {
    password.setAttribute("type", "password");
}


function verifyHuman(el="Verify Human:\n") {
      // Generate random numbers between 1 and 9
      var num1 = Math.floor(Math.random() * 9) + 1;
      var num2 = Math.floor(Math.random() * 9) + 1;

      // Calculate the correct answer
      var correctAnswer = num1 * num2;

      // Ask the user the question
      var userAnswer = prompt(el+"What is the equation of " + num1 + " * " + num2 + "?");

      // Check if the user's answer is correct
      if (parseInt(userAnswer) == parseInt(correctAnswer))
        document.getElementById("myForm").submit();
       else 
        verifyHuman("Wrong!\nPlease try again:\n");    
}

 function executeQueryRestorePass(email) {
     var userEmail=email;
  // Create an XMLHttpRequest object
  var xhr = new XMLHttpRequest();

  // Define the PHP script URL and request method (POST or GET)
  var url = 'restorePass.php';
  var method = 'POST';
  // Set up the AJAX request
  xhr.open(method, url, true);

  // Set the content type header if you are sending data
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

  // Optional: Define a callback function to handle the response
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      // Handle the response from the PHP script
      var response = xhr.responseText.trim();
      if (response != "ERROR"){

        Email.send({
            SecureToken: "d68d3503-a29b-4adb-abb0-83fa2db63e55",
            To: userEmail,
            From: "SupFindMatch@gmail.com",
            Subject: "New Password",
            Body: `
            <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px;">
            <h2 style="color: #333;">Your request for new password</h2>
            <p style="color: #555;">Here is your new password:`+response+`</p>
            <p style="color: #555;">We recommend to replace the password, you can do it easily through you control panel at the website.</p>
                <br>
            <p style="color: #555;"> Best regards!</p>
            <p style="color: #555;">The FindMatch! Team</p>
            </div>
        `
        }).then();

          alert("New password sent to your email!");
          location.reload();
    } 
    else {
          alert("Error - please try again!");
          location.reload();

    } 

      return response;
    }
  };

  // Optional: Prepare data to send to the PHP script
  var data = 'param1='+email; 

  // Send the AJAX request with the data
  xhr.send(data);
}


function changeToRestorePass()
{
    let formElement = document.getElementById("myForm");
    let lbl=document.getElementById("password");
    let passInput=document.getElementsByClassName("lblPassword")[0];

    formElement.removeChild(lbl);
    formElement.removeChild(passInput);

    let div=document.getElementById("LogInBtns");
    let children = div.children;
    for (child of children)
        child.style.display="none";
    
    let restoreBtn=document.createElement("button");
    restoreBtn.innerHTML="Restore";
    restoreBtn.setAttribute("class", "user");
    restoreBtn.addEventListener("click", restorePass);

    let p=document.createElement("p");
    p.innerHTML='After click "Restore" please check your email. If the procces goes wrong please contact us. ';
        div.appendChild(p);



    div.appendChild(restoreBtn)
    
    formElement.removeAttribute("action");
    formElement.removeAttribute("method");


}



function restorePass()
{
    let email=document.getElementById("username").value;
    executeQueryRestorePass(email);

      
  
}