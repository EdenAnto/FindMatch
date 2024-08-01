// JavaScript source code

// Create a link element
var link = document.createElement('link');

// Set the required attributes
link.rel = 'icon';
link.type = 'image/png';
link.href = 'img/football.png';

// Append the link element to the document's head section
document.head.appendChild(link);


let navNames = ["Home","About", "Contact", "Log In"];


document.addEventListener("DOMContentLoaded", function () {
    let logo = document.createElement("table");
    logo.setAttribute("class", "logo");
    logo.innerHTML = `
            <tr>
            <td id="tdBall"      rowspan='2';><img class="ball" src="img/football.png"></td>
            <td><div class="logoH logoContainer">Find Match!</div>
            <div class="logoS logoContainer">NEIGHBORS, RIVALS, TEAMMATES</td>
            </tr>
            `;

    document.body.appendChild(logo);



    let toolbarNav = document.createElement("footer");

    toolbarNav.innerHTML = `
    <div class="topnav">
        <table id="tbl" style = "border:1px solid black" >
	<tr>
    	<td class="topnavTd"><a id="Home" href="Home.html">Home</a></td>
    	<td class="topnavTd"><a id="About"  href="About.html">About</a></td>
        <td class="topnavTd"><a id="contact us"  href="Contact.html">Contact us</a></td>
    	<td class="active"><a id="logIn" href="Login.php">
            <img id="userIcon" src="img/userIco.png"/> Log In </a>
        </td>

    </tr>
    
   	<tr>
    <td></td>
    <td></td>
    <td></td>
    <td></td>

    </tr>

</table >
       </div>`;

    document.body.appendChild(toolbarNav);


    let rows = document.getElementById("tbl").rows;
    let tmp,firstWord,tmpString;
    for (let i = 0; i < navNames.length; i++) {
        tmp = rows[1].cells[i];
        if (document.title.includes(" "))
            firstWord = document.title.split(" ")[0];
        else 
            firstWord = document.title;
        if (rows[0].cells[i].innerHTML.includes(firstWord))
           tmp.style.background = "#ddd";
        else
           tmp.style.background = "#333";
       }



    let footer = document.createElement("footer");
    footer.setAttribute("class","bottomFooter");

    let rightsP = document.createElement("p");
    rightsP.innerHTML = `&copy; 2023 FindMatch LTD. All rights reserved.`;
    footer.setAttribute("class","rights")



    //var gameslbl = document.createElement("p");
    //gameslbl.innerHTML="Closest Games:";


    // Create the main wrapper div
    var vwrapDiv = document.createElement("div");
    vwrapDiv.className = "vwrap";

    // Create the moving div
    var vmoveDiv = document.createElement("div");
    vmoveDiv.className = "vmove";

    executeQueryGetClosestGames(vmoveDiv);

    

    // Append the moving div to the wrapper div
    vwrapDiv.appendChild(vmoveDiv);

    // Append the wrapper div to the document body or any other desired element
    footer.appendChild(rightsP);
    //footer.appendChild(gameslbl);
    footer.appendChild(vwrapDiv);


    document.body.appendChild(footer);
 
});


function goToSignUp() {
    window.location.href = "SignUpPage.html";
}
function changeBg() {

    for (var i = 50; i < 98; i += 3) {
        var bgUrl = "url('C:\Users\Hp\source\repos\Nadav_FullStack\img\bg.jpg')";
        setTimeout(function () {
            document.body.style.backgroundImage = bgUrl;
        }, 10);
    }
}

function slideImage(ball) {
    var currentLeft = parseInt(ball.style.left) || 0;
    var newLeft = currentLeft + 100;
    if (newLeft > 0) {
        newLeft = -400;
    }
    ball.style.left = newLeft + "px";
}
function spinTheBall() {
    const ball = document.getElementsByClassName("ball")[0];
    let angle = 10;
    const rotationInterval = setInterval(() => {
        angle += 5;
        ball.style.transform = `rotate(${angle}deg)`;
     
    }, 50);

    setTimeout(function () {
        // Your code to execute after a 2-second delay
    const horizontalInterval = setInterval(() => {
        console.log(ball);
        let currentLeft = parseInt(ball.style.left) || 0;
        let newLeft = currentLeft - 100;
        if (newLeft > 0) {
            newLeft = -400;
        }
        ball.style.left = newLeft + "px";
    }, 50);

    }, 2000);


}

function showPassword(password) {
    password.setAttribute("type", "text");
}

function hidePassword(password) {
    password.setAttribute("type", "password");
}




function executeQueryGetClosestGames(element) {
  // Create an XMLHttpRequest object
  var xhr = new XMLHttpRequest();

  // Define the PHP script URL and request method (POST or GET)
  var url = 'getClosestGames.php';
  var method = 'POST';
  // Set up the AJAX request
  xhr.open(method, url, true);

  // Set the content type header if you are sending data
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

  // Optional: Define a callback function to handle the response
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      // Handle the response from the PHP script
      var response = JSON.parse(xhr.responseText);
      for(game of response)
      {
      let vitemDiv = document.createElement("div");
        vitemDiv.className = "vitem";
        vitemDiv.textContent = `${game.city} - ${game.date} - ${game.time} - ${game.location}` ;
        element.appendChild(vitemDiv);
        }
    }
  };

  // Optional: Prepare data to send to the PHP script
  var data = 'param1='; 

  // Send the AJAX request with the data
  xhr.send(data);
}
