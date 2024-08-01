
let userSelectedGames=new Array();
let content=document.getElementById("pageContent");
let changePassEnableFlag=false;

let showNav=false;


function nextBtnFunc()
{
  currentPage++;
  showPage(currentPage);
}

function prevBtnFunc()
{
  currentPage--;
  showPage(currentPage);
}

function updatePaginationButtons() {
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  // Enable/disable Previous button
  if (currentPage === 1) {
    prevBtn.disabled = true;
  } else {
    prevBtn.disabled = false;
  }

  // Enable/disable Next button
  myTable = document.getElementById('myGamesTable');
  const totalRows = myTable.children.length;
  const totalPages = Math.ceil(totalRows / rowsPerPage);
  if (currentPage === totalPages) {
    nextBtn.disabled = true;
  } else {
    nextBtn.disabled = false;
  }
}
rowsPerPage=4;
currentPage=1;
function showPage(page) {
  const start = (page - 1) * rowsPerPage;
  const end = start + rowsPerPage;

  myTable = document.getElementById('myGamesTable');

  for (let i = 0; i < myTable.children.length; i++) {
    const row = myTable.children[i];
    row.style.display = (i >= start && i < end) ? 'table-row' : 'none';
  }

  // Update current page number
  const currentPageSpan = document.getElementById('currentPage');
  currentPageSpan.textContent = page;

  updatePaginationButtons();
}


function createGame(){
    let objectGame={};

    var selectedValue = document.getElementById("browser").value;

    switch (selectedValue) {
    case "North":
        objectGame.districtValue=1;
        break;
    case "Center":
        objectGame.districtValue=2;
        break;
    case "South":
        objectGame.districtValue=3
        break;
    }
    objectGame.dateValue=document.getElementsByClassName("adminDate")[0].value;
    objectGame.timeValue=document.getElementsByClassName("adminDate")[1].value;
    objectGame.cityValue=document.getElementById("City").value;
    objectGame.locationValue=document.getElementById("location").value;
    let googleLink = document.getElementById("urlInput").value;
    objectGame.urlValue=googleLink;
    objectGame.ColorAValue=document.getElementById("colorA").value;
    objectGame.ColorBValue=document.getElementById("colorB").value;
    objectGame.MaxPlayersValue=document.getElementById("demo").innerHTML;

    const radioButtons = document.getElementsByName("field");

    for (let i = 0; i < radioButtons.length; i++) {
        if (radioButtons[i].checked) {
        objectGame.fieldType = radioButtons[i].value;
        break;
        }
    }
    
    sendEmail();
   executeQueryCreateGame(objectGame);
         
   

}







function sendEmail()
{

    let name = fullName;
    let email = $("#email").val();

Email.send({
    SecureToken: "d68d3503-a29b-4adb-abb0-83fa2db63e55",
    To: email,
    From: "SupFindMatch@gmail.com",
    Subject: "New Game Added",
    Body: `
    <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px;">
      <h2 style="color: #333;">Game confirmation</h2>
      <p style="color: #555;">Dear `+name+`,</p>
      <p style="color: #555;">New game added on the site. Now the other users can join the game and invite friends.</p>
      <p style="color: #555;">Be aware that you are the person in charge of this game!</p>
      <p style="color: #555;">Best regards,</p>
      <p style="color: #555;">The FindMatch! Team</p>
    </div>
  `
  
});
}



function insertGames(){
    let message=executeQueryInsertOrLeaveUserGames(userEmail,userSelectedGames,'insert');
    if (message == "GOOD"){
          window.alert("Insert Secsuss")
          location.reload();
    } 
    else if (message == "MaxPlayerError"){
          alert("Game is full!")
          location.reload();
    } 
}

function leaveGames(){
      if (executeQueryInsertOrLeaveUserGames(userEmail,userSelectedGames,'delete') == "GOOD"){
          alert("Delete Secsuss")
          location.reload();
    }
}

function getUserActivity(){
    executeQueryGetUserActivity(userEmail);
}
function executeQueryCreateGame(gameData) {
  // Create an XMLHttpRequest object
  var xhr = new XMLHttpRequest();

  // Define the PHP script URL and request method (POST or GET)
  var url = 'addGame.php';
  var method = 'POST';

  // Set up the AJAX request
  xhr.open(method, url, true);

  // Set the content type header to indicate JSON data
  xhr.setRequestHeader('Content-Type', 'application/json');

  // Optional: Define a callback function to handle the response
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      // Handle the response from the PHP script
      var response = xhr.responseText.trim();
      //console.log(response);
      if(response=="Add")
      {
        alert("Game added successfully");
        location.reload();

      }
      
    
    } 
      return response;

    
  };

  // Optional: Prepare data to send to the PHP script as JSON
  var data = JSON.stringify(gameData);

  // Send the AJAX request with the data
  xhr.send(data);
}


 function executeQueryInsertOrLeaveUserGames(id,arr,php) {
  // Create an XMLHttpRequest object
  var xhr = new XMLHttpRequest();

  // Define the PHP script URL and request method (POST or GET)
  var url = 'InsertOrLeaveUserGames.php';
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
      console.log(response);
      if (response == "GOOD"){
          alert("Insert Secsuss");
          location.reload();
    } 
    else if (response == "MaxPlayerError"){
          alert("Game is full!");
          location.reload();
    } 

    else if (response == "Delete"){
          alert("Game has been deleted!!");
          location.reload();
    } 
      return response;
    }
  };

  // Optional: Prepare data to send to the PHP script
  var data = 'param1='+id+'&param2='+arr+'&param3='+php; 

  // Send the AJAX request with the data
  xhr.send(data);
}

function executeQueryGetUserActivity(id) {
  // Create an XMLHttpRequest object
  var xhr = new XMLHttpRequest();

  // Define the PHP script URL and request method (POST or GET)
  var url = 'getUserActivity.php';
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
      document.getElementById("gamesPassed").innerHTML=response[0]["passedGames"];
      document.getElementById("registedGames").innerHTML=response[0]["count"];

    }
  };

  // Optional: Prepare data to send to the PHP script
  var data = 'param1='+id; 

  // Send the AJAX request with the data
  xhr.send(data);
}

function executeQueryGetUserGames(id) {
  // Create an XMLHttpRequest object
  var xhr = new XMLHttpRequest();

  // Define the PHP script URL and request method (POST or GET)
  var url = 'getUserGames.php';
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
      //console.log(response);
     const tbody = document.getElementsByTagName('tbody')[0];
        let today= new Date();
        response.forEach(item => {
                let row = document.createElement('tr');

                // Checkbox column
                let checkboxCell = document.createElement('td');
                let checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.id=item.id;
                checkbox.addEventListener('change', function () {
                    if (checkbox.checked) {
                        row.classList.add('selected-row');
                        if(!userSelectedGames.includes(this.id));
                            userSelectedGames.push(this.id);
                    } else {
                        row.classList.remove('selected-row');
                          const index = userSelectedGames.indexOf(this.id);
                          userSelectedGames.splice(index,1);
                    }
                });
                checkboxCell.appendChild(checkbox);
                row.appendChild(checkboxCell);

                // Date column
                let dateCell = document.createElement('td');
                let date=new Date(item.date);
                dateCell.textContent = date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
                row.appendChild(dateCell);

                // City column
                let cityCell = document.createElement('td');
                cityCell.textContent = item.city;
                row.appendChild(cityCell);
                let locationCell = document.createElement('td');
                locationCell.style.color="blue";
                locationCell.style.textDecoration="underline";
                locationCell.innerHTML=item.location;

                locationCell.onclick = function() {
                showMap(item.url);
                };              
                  locationCell.appendChild(link);
                row.appendChild(locationCell);

                // Time column
                let timeCell = document.createElement('td');
                timeCell.textContent = item.time;
                row.appendChild(timeCell);

                // MaxPlayers column
                let maxCell = document.createElement('td');
                maxCell.textContent = item.regPlayers+'/'+ item.maxPlayers;
                row.appendChild(maxCell);

                // fieldType column
                let fieldTypeCell = document.createElement('td');
                fieldTypeCell.textContent = item.fieldType;
                row.appendChild(fieldTypeCell);

                let timeParts = item.time.split(":");
                let hours = parseInt(timeParts[0], 10);
                let minutes = parseInt(timeParts[1], 10)

                date.setHours(hours);
                date.setMinutes(minutes);
                 
                if(date  < today)
                {
                checkbox.disabled="true";
                row.style.backgroundColor="gray";
                }

                tbody.appendChild(row);
                showPage(1);
        });

    }
  };

  // Optional: Prepare data to send to the PHP script
  var data = 'param1='+id; 

  // Send the AJAX request with the data
  xhr.send(data);
}
let tblContainer;
var map;
var marker=null;

function showMap(url){
    clearMap();
    var mapHolder = $('<div>').attr('id', 'mapHolder');
    $('#mapContainer2').append(mapHolder);


    const link = url;

      // Extract the query string from the Google Maps link
      const queryString = link.split('/@')[1];

      const endIndex = queryString.indexOf('z');
      let cutString;
      if (endIndex !== -1)
        cutString = queryString.substring(0, endIndex);
      else 
        return;
      

      // Extract the latitude, longitude, and zoom values from the cutString
      const [xString, yString, zString] = cutString.split(',');

      // Parse the latitude, longitude, and zoom level to numbers
      const x = parseFloat(xString.trim());
      const y = parseFloat(yString.trim());
      const z = parseInt(zString);
      let arrayParams=[];
      arrayParams.push(x);
      arrayParams.push(y);
      // Create the map
   
      map = L.map('mapHolder');
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: `<a href="${link}" target="_blank">open google map</a>`
      }).addTo(map);
      map.setView(arrayParams, 15);
    if (marker) {
        marker.remove();
        marker = null;
    }
    marker = L.marker(arrayParams).addTo(map);
    console.log(map);
}

document.addEventListener("DOMContentLoaded", function () {
    tblContainer=document.getElementById("tableContainer");
    populateTable(jsonData);
    let adminTab= (isAdmin==1)? `<a onclick="onClickAdminPanel()" >Admin Panel</a>` : "";
    tbl.innerHTML = `
            <tr>
                <td class="topnavTd" onclick="onClickExplore()"><a id="Explore Games" >Explore Games</a></td>
                <td class="topnavTd" onclick="onClickMyGames()"><a id="My Games" >My Games</a></td>
                <td class="active" onmouseout="outNav()" onmouseover="overNav()" onclick="ShowHideNav()" style"justify-content:space-between"><a        id="logIn">
                 <img id="userIcon" src="img/userIco.png"/>Hello! `+ fullName+ `
                </a>
                <div id="floatBar">`+ adminTab +
                    `<a onclick="onClickProfile()" >Profile</a>
                    <a href="Home.html">Log Out</a>
                </div>               
                </td>      
                
            </tr>

             <tr>
                <td class="tdColor" style="background: rgb(221, 221, 221);"></td>
                <td class="tdColor"></td>
                <td class="tdColor"></td>

             </tr>
            `;
        adminTblContent=[null,null,null];
        adminNav=[null,null,null];
        pageTagsContent=[pageContent.innerHTML+`<div id="mapContainer2"><div>`,null,null,null];
        console.log(pageTagsContent[0]);
        form=document.getElementById("form");
            /////////////////////////////////////////////////////////////
    let playerPic=`
        <div id="mapContainer">
            <img src="img/player.png" style="width: 300px; margin-top: 70px;">    
        </div>
        `

           let locationMapDiv=`
      <div id="mapContainer2">
    </div>
        `
            pageTagsContent[3]=`
            <form id="form" action="" method="post" >

<table id="tableNewMatch">
<style>
.navAdmin{
    width:50%;
}
</style>
  <tr id="tbl" style="height:50px;">
    	<td id="newMatchTab" onclick="generateAddMatchForm()" >Add New Match</td>
    	<td id=ManageUsersTab onclick="generateManageUsersForm()">Manage Users</td>
        <td id="StatisticsTab" onclick="generateStatisticssForm()">Statistics</td>
  </tr>
<tbody id="adminTbody"> 
</tbody>

</table>
            `;

            /////////////////////////////////////////////////////////////
            pageTagsContent[2]=playerPic+`
    <div id="tableContainer">
        <form id="formProfile" action="updatePass.php" method="post">
            <div id="thirdChildForm">
                <label>Profile:</label>
            </div>

            <div id="firstChildForm">
                <label>Full name:</label>
                <label>Games Participated:</label>
                <label>Total Registered Games:</label>

            </div>

            <div id="secondChildForm">
                <label id="lblFullName">`+fullName+`</label>
                <label id="gamesPassed"></label>
                <label id="registedGames"></label>
            </div>

            

            <div id="thirdChildForm">
            <br>
                <input type="button" value="Change Password" onclick="changePassEnable()">
            </div>

        </form>
    `
    ;

     /////////////////////////////////////////////////////////////
            pageTagsContent[1]=playerPic+
            `
    <div id="tableContainer">
        <form id="form" style="height: 500px; width: 1200px;">
            <div id="thirdChildForm">
                <label >Registered Games:</label>
            </div>

            <div id="thirdChildForm" >
                <br>
                <table id="myTable">
                    <thead>
                        <tr id="tableHeader">
                            <th >Mark</th>
                            <th style="width:250px;">Date</th>
                            <th >City</th>
                            <th >Location</th>
                            <th>Time</th>
                            <th>Max Players</th>
                            <th>Field Type</th>
                        </tr>
                    </thead>
                    <tbody id ="myGamesTable" >
                        
                    </tbody >
                        <input id="prevBtn"type="button" onclick="prevBtnFunc()" value="Previus" disabled>
                        <span id="currentPage">1</span>
                        <input id="nextBtn"type="button" onclick="nextBtnFunc()" value="Next">
                    
                </table>
            </div>

            <div id="thirdChildForm">
            <br>
                <input type="button" value="Leave Games!" id="myButton" onclick="leaveGames()">
                
            </div>
        </form>

    </div>
    `+
   locationMapDiv
       ;

adminTblContent[0]=`
<tr>
            <td>    <label for="browseDistrict">District:</label>
                    <select id="browser">
                    <option value="North" selected>North</option>
                    <option value="Center">Center</option>
                    <option value="South">South</option>
                    </select>
            </td>
    <td>
    		<label for="city">City:</label>
            <input type="text" id="City" name="city" pattern="[a-zA-Z-]+" required>
    </td>
    <td>
    		<label for="Person">Person In Charge:</label>
            <input type="text" id="Person" name="Person" pattern="[a-zA-Z-]+" required>
    </td>
  </tr>
  
  <tr>
    <td>
          <label for="userDate">Date:</label>
                <input type="date" name="userDate" class="adminDate" required>
    </td>
    <td>
    <label for="time">Time:</label>
                <input type="time" id="time" name="time" class="adminDate">
    </td>

                 <td>
                     <label for="areaCode">Mobile:</label>
                    <input list="browsers" name="areaCode" id="areaCode">

                        <datalist id="browsers">
                        <option value="050">
                        <option value="052">
                        <option value="053">
                        <option value="054">
                        <option value="055">
                        <option value="058">
                        </datalist>
                     <input type="tel" id="tel" name="tel" required>
                 </td>
  </tr>
  <tr>
    <td><label for="location">Location:</label>
        <textarea id="location" name="location" required></textarea>
    <td>
            <label for="urlInput">Enter a URL: <a href="img/Guide.mp4" target="_blank">Guide</a></label>
            <input type="url" id="urlInput" name="url"></td>

             <td>
    		<label for="email">Email:</label>
            <input type="text" id="email" name="email" required>
    </td>
  </tr>
  <tr>
   <td colspan="2"><div class="radio-container thirdChildForm">
            <label>Field Type: &nbsp&nbsp&nbsp</label>
            <label for="Grass">Grass</label>
            <input type="radio" id="Grass" name="field" value="Grass">
            <label for="Asphalt">Asphalt</label>
            <input type="radio" id="Asphalt" name="field" value="Asphalt">
            <label for="Parquet">Parquet</label>
            <input type="radio" id="Parquet" name="field" value="Parquet">
        </div></td>
        
             <td >
                <label for="rangeInput">Max In Team | Max Players: <span id="demo">6</span></label>
                <input type="number" min="2" max="3" value="2" id="inputNum"/>
                <input type="range" min="6" max="30" value="6" class="slider" id="myRange" name="myRange" oninput="sliderOnInput(this)"/>
            </td>
  </tr>
  <tr>
   <td>
            <label for="colorA" >Color Team A:</label> 
             <input type="color"  id="colorA" name="colorA" value="#ffff00">
    </td>
    <td> 
            <label for="colorB" >Color Team B:</label>
            <input type="color"id="colorB" name="colorB" >
    </td>
    
        <td><br>
                <label for="file">Field Photo:</label>
                <input type="file" name="file"/>

        </td>
   

  </tr>
  
  
   <tr>
    <td colspan="3">
        <input type="button" value="Create Game!" onclick="createGame()"/>
    </td>
  </tr>
`;

adminTblContent[1]=`
<tr>
    <td>     
           <label>Tick:</label>
    </td>
    <td>     
           <label>Email:</label>
    </td>
    <td>
    		<label>Full Name:</label>
    </td>
    <td>
    		<label>Last Active:</label>
    </td>

</tr>
`;

adminTblContent[2]=`
<tr>
    <td>
    The most active user:
    </td>
    <td colspan="2" id="tdMostActive"></td>
</tr>

<tr>
    <td>
    Total games created:
    </td>
    <td colspan="2" id="tdTotalGames"></td>
</tr>

<tr>
    <td>
    Total games played:
    </td>
    <td colspan="2" id="tdPassedGames"></td>
</tr>

`;

});
let navTd = document.getElementsByClassName("tdColor");

function setAdminNav(){
    for (tab of adminNav)
    tab.className="navAdmin";
}

function generateAddMatchForm()
{
    setAdminNav();
    adminNav[0].className="navAdminActive";
    adminNav[2].colSpan=1;
    document.getElementById("adminTbody").innerHTML=adminTblContent[0];
  let today = new Date().toISOString().split('T')[0];
     myDateInput=document.getElementsByClassName("adminDate")[0];
    myDateInput.setAttribute("min", today);
    myDateInput.setAttribute("value", today);
}

function generateManageUsersForm()
{
    setAdminNav();
    adminNav[1].className="navAdminActive";
    adminNav[2].colSpan=2;
    document.getElementById("adminTbody").innerHTML=adminTblContent[1];
    // Create an XMLHttpRequest object
  var xhr = new XMLHttpRequest();

  // Define the PHP script URL and request method (POST or GET)
  var url = 'getUsers.php';
  var method = 'GET';
  // Set up the AJAX request
  xhr.open(method, url, true);

  // Set the content type header if you are sending data
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

  // Optional: Define a callback function to handle the response
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      // Handle the response from the PHP script
      var response = JSON.parse(xhr.responseText);
      let tbody=document.getElementById("adminTbody");
       
      let tr,tdEmail,tdFullName,tdLastConnect,checkBox;
      for (row of response){
            tr=document.createElement("tr");
            tdCheckBox=document.createElement("td");
            checkBox = document.createElement('input');
            checkBox.type = 'checkbox';
            tdEmail=document.createElement("td");
            tdEmail.innerHTML=row["email"];
            tdFullName=document.createElement("td");
            tdFullName.innerHTML=row["fullName"];
            tdLastConnect=document.createElement("td");
            tdLastConnect.innerHTML=row["lastConnect"];
            checkBox.id="cbox_"+row["email"];
            checkBox.classList.add('adminCbox');
            tdCheckBox.appendChild(checkBox);
            tr.appendChild(tdCheckBox);
            tr.appendChild(tdEmail);
            tr.appendChild(tdFullName);
            tr.appendChild(tdLastConnect);
            if (row["admin"]==1)
            checkBox.disabled ="true";
            tbody.appendChild(tr);    
      }
      tbody.innerHTML+=
      `
         <tr>
            <td colspan="4">
                <input type="button" value="Grant Permissions !" onclick="GrantAdminPermissions()"/>
            </td>
        </tr>
      `
    }
  };

  // Optional: Prepare data to send to the PHP script
  var data = "";

  // Send the AJAX request with the data
  xhr.send(data);

}

function GrantAdminPermissions(){
    let checkBoxes = document.getElementsByClassName("adminCbox");
    let checkboxData = [];

    for (cbox of checkBoxes) {
    if (cbox.checked) {
        checkboxData.push(cbox.id.substring(5, cbox.id.length));
    }
    }
    if (checkboxData.length==0)
    {
        alert("Please Choose Users")
        return;
    }

    let jsonData = JSON.stringify(checkboxData);

    $.ajax({
        url: 'grantAdminPermissions.php',
        type: 'POST',
        data: { jsonData: jsonData },
        success: function(response) {
            alert("Permission granted!")
            window.location.reload();
        },
        error: function(xhr, status, error) {
            //console.error(error); // Display any errors that occurred during the AJAX request
            alert("Error!")
            window.location.reload();
        }
    });
        
}

function generateStatisticssForm()
{
    setAdminNav();
    adminNav[2].className="navAdminActive";
    adminNav[2].colSpan=1;
    document.getElementById("adminTbody").innerHTML=adminTblContent[2];  
    // Create an XMLHttpRequest object
  var xhr = new XMLHttpRequest();

  // Define the PHP script URL and request method (POST or GET)
  var url = 'getStatistics.php';
  var method = 'GET';
  // Set up the AJAX request
  xhr.open(method, url, true);

  // Set the content type header if you are sending data
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

  // Optional: Define a callback function to handle the response
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      // Handle the response from the PHP script
      var response = JSON.parse(xhr.responseText);
        for (row of response){
            document.getElementById("tdMostActive").innerHTML=row["email"];
            document.getElementById("tdTotalGames").innerHTML=row["total"];
            document.getElementById("tdPassedGames").innerHTML=row["passed"];
        }
    }
  };

  // Optional: Prepare data to send to the PHP script
  var data = "";

  // Send the AJAX request with the data
  xhr.send(data);
    

}


function changePassEnable()
{
    if (!changePassEnableFlag){
    document.getElementById("formProfile").innerHTML +=`
                <br>

    <div id="firstChildForm">
                <label>New Password:</label>

            </div>
            <div id="secondChildForm">
                <input type="password" id="password" name="password"
                   pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" 
                   title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" 
                   onmouseover="showPassword(this)" onmouseout="hidePassword(this)" required>     
                <input type="email" id="email" name="email" value=`+ userEmail +` style="display:none;" required >
      
            </div>

            <div id="thirdChildForm">
                <input type="submit" value="Submit" >
            </div>
    `
         changePassEnableFlag=true;
    }
}




function changePass()
{
document.getElementById("formProfile").submit();
}

    function setTdButtomColor(index) {
  for (let i = 0; i < navTd.length; i++) {
    navTd[i].style.background = "#333";
  }
  navTd[index].style.background = "rgb(221, 221, 221)";
}

function onClickExplore() {
    clearMap();
    form.style.maxWidth="500px";
    selectedDistrict=-1;
    setTdButtomColor(0);
    pageContent.innerHTML=pageTagsContent[0];
    setDateConstraints();
    userSelectedGames=[];
}




function onClickMyGames() {
    clearMap();
    form.style.maxWidth="500px";
    setTdButtomColor(1);
    pageContent.innerHTML=pageTagsContent[1];
    executeQueryGetUserGames(userEmail);
    userSelectedGames=[];
}

function onClickProfile() {
  setTdButtomColor(2);
  pageContent.innerHTML=pageTagsContent[2];
  getUserActivity();
  console.log(tblContainer);
  userSelectedGames=[];
}

function onClickAdminPanel() {
 
  setTdButtomColor(2);
  pageContent.innerHTML=pageTagsContent[3];
  adminNav[0]=document.getElementById("newMatchTab");
  adminNav[1]=document.getElementById("ManageUsersTab");
  adminNav[2]=document.getElementById("StatisticsTab");
  document.getElementById("form").style.maxWidth="650px";
  ///show all users;
  userSelectedGames=[];
  adminNav[0].click();
}

    // Function to populate the table with data
    function populateTable(data) {
        const table = document.getElementById('myTable');
        const tbody = table.getElementsByTagName('tbody')[0];
        let listBox = document.getElementById("listbox");
        var selectedIndex = listBox.selectedIndex;
        let selectedCity;
        if (listBox.options[selectedIndex] != undefined)
            selectedCity=listBox.options[selectedIndex].text;
        tbody.innerHTML = "";
        if(selectedDistrict==-1)
        {
            let row = document.createElement('tr');
            let cell = document.createElement('td');
            cell.innerHTML="Select District Trough Map!"
            cell.setAttribute("colspan", "6");
            row.appendChild(cell);
            tbody.appendChild(row);
            return;
        }
        startDate=document.getElementById("start-date").value;
        endDate=document.getElementById("end-date").value;

        if(startDate==undefined || endDate==undefined){
            tbody.innerHTML = "";
            let row = document.createElement('tr');
            let cell = document.createElement('td');
            cell.innerHTML="Please Choose Valid Dates!"
            cell.setAttribute("colspan", "4");
            row.appendChild(cell);
            tbody.appendChild(row);
            return;
        }
        


        data.forEach(item => {
            if(filterRow(item,selectedCity)){
                let row = document.createElement('tr');

                // Checkbox column
                let checkboxCell = document.createElement('td');
                let checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.id=item.id;
                checkbox.addEventListener('change', function () {
                    if (checkbox.checked) {
                        row.classList.add('selected-row');
                        if(!userSelectedGames.includes(this.id));
                            userSelectedGames.push(this.id);
                    } else {
                        row.classList.remove('selected-row');
                          const index = userSelectedGames.indexOf(this.id);
                          userSelectedGames.splice(index,1);
                    }
                });
                checkboxCell.appendChild(checkbox);
                row.appendChild(checkboxCell);

                // Date column
                let dateCell = document.createElement('td');
                let date=new Date(item.date);
                dateCell.textContent = date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
                row.appendChild(dateCell);

                // Location column
                
                let locationCell = document.createElement('td');
                locationCell.innerHTML = item.location;
                locationCell.style.color="blue";
                locationCell.style.textDecoration="underline";
                locationCell.onclick = function() {
                showMap(item.url);
                };
                row.appendChild(locationCell);

                // Time column
                let timeCell = document.createElement('td');
                timeCell.textContent = item.time;
                row.appendChild(timeCell);

                // MaxPlayers column
                let maxCell = document.createElement('td');
                maxCell.textContent = item.regPlayers+'/'+ item.maxPlayers;
                row.appendChild(maxCell);

                // fieldType column
                let fieldTypeCell = document.createElement('td');
                fieldTypeCell.textContent = item.fieldType;
                row.appendChild(fieldTypeCell);



                tbody.appendChild(row);
           
            }
        });
        if(tbody.innerHTML==""){
            let row = document.createElement('tr');
            let cell = document.createElement('td');
            cell.innerHTML="No Matches Found!"
            cell.setAttribute("colspan", "8");
            row.appendChild(cell);
            tbody.appendChild(row);

        }
    }



 $(function() {
        $('#start-date').on('change', function () {
            var selectedStartDate = new Date($(this).val());
            var selectedEndDate = new Date($('#end-date').val());

            if (selectedEndDate < selectedStartDate) {
                $('#end-date').val('');
            }
             startDate = selectedStartDate;
             endDate = selectedEndDate;
        });

    $('#end-date').on('change', function() {
        var selectedEndDate = new Date($(this).val());
    var selectedStartDate = new Date($('#start-date').val());

    if (selectedEndDate < selectedStartDate) {
        $(this).val('');
        }

     startDate = selectedStartDate;
     endDate = selectedEndDate;
      });

    });

    function filterRow(item,selectedCity){
        if(selectedDistrict == item.district && selectedCity == item.city){
            let matchDate = new Date(item.date);
            let sDate=new Date(document.getElementById("start-date").value);
            let eDate=new Date(document.getElementById("end-date").value);
            if(matchDate>=sDate && matchDate <= eDate)
            return true;
        }
        return false;
    }

            

            function sliderOnInput(el) {
            document.getElementById("inputNum").setAttribute("max",el.value/2);
            var output = document.getElementById("demo");
            output.innerHTML = el.value;
            }

            function ShowHideNav()
            {
                let barEl = document.getElementById("floatBar");
                 console.log("out"+barEl);

                showNav = !showNav;
                console.log(showNav);
                if (showNav == true)
                    barEl.style.display= "block";
                    else
                    {
                        barEl.style.display = "none";
                        console.log("in"+barEl);
                        //barEl.addEventListener('mouseover',function(){barEl.style.display="block";})
                        //barEl.addEventListener('mouseout',function(){barEl.style.display="none";})
                    }


            }
            function overNav()
            {
                 let barEl = document.getElementById("floatBar");
                 if (showNav == false)
                    barEl.style.display= "block";
            }
            function outNav()
            {
                let barEl = document.getElementById("floatBar");
                 if (showNav == false)
                    barEl.style.display= "none";
            }

function clearMap() {
  let mapContainer = document.getElementById('mapHolder');
  // Check if the map container exists before attempting to remove it
  if (mapContainer) {
    // Remove the map container and all associated Leaflet objects
    mapContainer.remove();
  }
}


          
