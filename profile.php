<?php
require_once 'dbConnect.php';
// Create connection
$conn = dbConnect();

$_email=$_POST['username'];
$_password=$_POST['password'];


$sql_verifyEmail = "SELECT * FROM User WHERE Email= '$_email' ";
$result = mysqli_query($conn, $sql_verifyEmail) or die("bad gateway");
if(mysqli_fetch_assoc($result) == null)
{
    echo '<script>
        window.location.href = "Login.php?Error=user";
    </script>';
    die();
}
else
{
    $sql_verifyPass = "SELECT CONCAT(`FirstName` , ' ',`LastName`) AS fullName,Admin FROM User WHERE Email= '$_email' AND Password= '$_password' ";
    $result2 = mysqli_query($conn, $sql_verifyPass) or die("bad gateway");
    $rowData = mysqli_fetch_assoc($result2);

    if ($rowData === null) {
    echo '<script>
        window.location.href = "Login.php?Error=password";
    </script>';
    die();
    }
    $sql_updateLastConnection= "UPDATE User 
                                SET LastConnect = CURDATE() 
                                WHERE Email = '$_email' ";
    $result3 = mysqli_query($conn, $sql_updateLastConnection) or die("bad gateway");
                            

    $fullName = json_encode($rowData['fullName']);
    $admin = json_encode($rowData['Admin']);


    //$sql_Games = "SELECT * FROM Games";
    $sql_Games = "SELECT * FROM Games WHERE ID NOT IN ( SELECT Game_ID FROM UserGames WHERE User_Email = '$_email' )";
    $games_result = mysqli_query($conn, $sql_Games) or die("Bad query");

    $rows = array();
    $cityNames =array();
    while ($row = mysqli_fetch_assoc($games_result)) {
        $rows[] = array(
        "id" => $row['ID'],
        "district" => $row['District'],
        "city" => $row['City'],
        "date" => $row['Date'],
        "location" => $row['Location'],
        "time" => substr($row['Time'], 0, 5),
        "maxPlayers" =>$row['maxPlayers'],
        "regPlayers" =>$row['registeredPlayers'],
        "fieldType" => $row['fieldType'],
        "url" => $row['URL']

     );
}

// Convert the rows array to JSON
$jsonData = json_encode($rows);
}

$conn->close();
?>

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Profile</title>
    <meta name="viewport" content="initial-scale=1,maximum-scale=1,user-scalable=no" />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.1/leaflet.js"></script>
    <script type="text/javascript" src="https://cdn.jsdelivr.net/jquery/latest/jquery.min.js"></script>
    <script type="text/javascript" src="https://cdn.jsdelivr.net/momentjs/latest/moment.min.js"></script>
    <script type="text/javascript" src="https://smtpjs.com/v3/smtp.js"></script>
    <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/daterangepicker/daterangepicker.min.js"></script>
    <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/daterangepicker/daterangepicker.css" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.1/leaflet.css" />




    <script src="addFooter.js"></script>
    <style>
  /* CSS styles for the floating bar */
  #floatBar {
    position: absolute;
    display: none;
    background-color: #333;
    color: white;
    top: 100%;
    right:0px;
    box-sizing: border-box;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);

  }

  #floatBar a {
    display: block;
    color: white;
    text-decoration: none;
    border:1px solid black;
  }


  
  .radio-container {
  display: inline-block;
}

.radio-container label, .radio-container input[type="radio"] {
  display: inline-block;
  vertical-align: middle;
}

#input
{
     padding-left: 10px;
    margin-right: 10px;
}

    table#tableNewMatch tr td {
    padding-right: 10px;
  }

.navAdminActive{
    background-color: #515A5A;
    border-bottom: 3px solid #ccc;
    border-left: 3px solid #ccc;
    
    color:white;

}
 .navAdmin {
            background-color: #ddd;
            border-bottom: 3px solid #ccc;
            border-left: 3px solid #ccc;
            color: black;
        }
        .adminTbody{
                        border-bottom: 3px solid #ccc;

        }


</style>

    <script>
        var jsonData = <?php echo $jsonData; ?>;
        console.log(jsonData);
        var fullName = <?php echo $fullName; ?>;
        var userEmail = <?php echo json_encode($_email); ?>;
        var isAdmin=<?php echo $admin?>;
        console.log(isAdmin);
        var citiesByDistrict = {};

        jsonData.forEach(function(item) {
        var district = item.district;
        var city = item.city;

        if (citiesByDistrict.hasOwnProperty(district)) {
            if (!citiesByDistrict[district].includes(city)) 
                citiesByDistrict[district].push(city);
        } else {
          citiesByDistrict[district] = [city];
        }
        });

        var startDate;
        var endDate;
        var dis;
        let mapsText = document.getElementsByClassName("imgText");
        let selectedDistrict=-1;
        function changeDistrict(disNum) {
            $("#tbody").empty();
            let td = $("<td></td>").attr("colspan",6);
            td.text("Select city and date");

            for (text of mapsText)
               text.style.color = "white";

            if (disNum == 1) {
                selectedDistrict = 1;
                dis = "North";
                mapsText[0].style.color = "brown";
            }
            if (disNum == 2)
            { 
                selectedDistrict = 2;
                dis = "Center";
                mapsText[1].style.color = "brown";

            }
            if (disNum == 3)
            { 
                selectedDistrict = 3;
                dis = "South";
                mapsText[2].style.color = "brown";

            }
            
            $("#tbody").append(td); 
            let lbl = document.getElementById("lblDistrict");
            lbl.innerHTML = "District " + dis + ":"

            let listbox = document.getElementById("listbox");
            // Clear the listbox to ensure it's empty before inserting the values
            listbox.innerHTML = "";
            citiesNames = citiesByDistrict[selectedDistrict];
            if(citiesNames==undefined)
            {
                td.text("There is no games in this district yet"); //// give message of empty district
                return;
            }
               
            for (city of citiesNames)
            {
                // Create an option element for each city name
                var option = document.createElement("option");
                option.text = city;

                 //Add the option to the listbox
                listbox.add(option);
            }
        
       

        }
    </script>

    <link href="https://fonts.googleapis.com/css?family=Chewy|Permanent+Marker|League+Spartan&amp;display=swap" rel="stylesheet">
    <link rel="stylesheet" href="generic_Web_Style.css">
    <script src="scriptProfile.js"></script>
    <style>

        body {
            background-image: url("img/bg-modified.jpg");
            background-size: cover;
            background-repeat: no-repeat;
            font-family: Gisha;
        }

        #LogInBtns {
            text-align: center;
        }

        #intro-holder {
            text-align: center;
            left: 15%;
            width: 70%;
            background-color: #313233;
            color: gold;
            padding: 10px 0;
            top: 30%;
            height: 30%;
            position: fixed;
            border-radius: 35px 90px;
            border: 3px solid black;
        }

        h1 {
            font-size: 80px;
            font-weight: bold;
            margin: 0px;
        }

        p {
            font-size: 25px;
        }

        form {
            position: relative;
            top: 120px;
            border: 1px solid #ccc;
            padding: 20px;
            border-radius: 5px;
            background-color: #f7f7f7;
            max-width: 500px;
            margin: 0 auto;
            text-align:center;
            overflow: auto; 
            max-height: 450px;
        }

        input[type="text"],
        input[type="password"],
        #location,
        .adminDate,
        #textArea,       
        #browser,
        #areaCode,
        input[type="tel"],
        input[type="number"],
        input[type="file"],
        input[type="url"] {
            width: 90%;
            padding: 10px;
            margin-bottom: 20px;
            border-radius: 5px;
            border: 1px solid black;
            height:15px;
        }

        #areaCode
        {
            width: 20%;
        }
        #tel
        {
        width: 58%;
        }

   
        #browser,location               
        {
         height:36px;
        }

        input[type="number"]
         {
        width: 10%;
        }
      

        label {
            display: block;
            margin-bottom: 10px;
            font-weight: bold;
        }

        button.user {
            background-color: #4CAF50;
            color: white;
            padding: 12px 20px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            position: center;
        }

            button.user:hover {
                background-color: #45a049;
            }


        .title {
            font-size: 3em;
            font-weight: bold;
            color: gold;
            text-align: center;
            margin-top: 5px;
            margin-bottom: 20px;
            display: inline;
        }

        #id {
            padding-bottom: 10px;
        }

        #tableContainer {
            margin: 0 auto;
            padding-top: 10%;
        }

        #mapContainer {
            position: absolute;
            top: 52%;
            left: 20%;
            transform: translate(-50%, -50%);
            height: 70%;
        }

          #mapHolder {
            position: absolute;
            top: 40%;
            right: 10%;
            height: 60%;
            border:5px solid black;
            z-index: 0;

            width: 400px; /* Adjust the width as desired */
            top: 150px;
            right: 0;
            bottom: 0;
        }

        #thirdChildForm {
            text-align: center;
        }

        #firstChildForm,
        #secondChildForm {
            display: inline-block;
            text-align: center;
        }

        #secondChildForm{
            margin-left: 15px;
        }

        .imgDiv {
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
        }

            .imgDiv:hover {
                transform: scale(1.7);
                transition: all 0.5s ease;
                z-index: 1;
            }

        .imgDiv {
            height: 33%;
        }

            .imgDiv img {
                height: 100%;
                width: 100%;
                object-fit: cover;
            }

        .imgText {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 24px;
            color: white;
            text-shadow: 1px 1px 2px black;
        }

        #imgTextN {
            left: 60%;
        }

        #imgTextS {
            top: 40%;
            left: 42%;
        }

        #child {
            position: relative;
            height: 100%;
            width: 50%;
        }

        #reportrange, #listbox {
            text-align: center;
            background: #fff;
            cursor: pointer;
            border: 1px solid #ccc;
        }
        #tableHeader{
            text-align:center;
        }

        .SameRow{
        display: inline-block;
        vertical-align: middle;
        }

       

       

    </style>
    <link rel="stylesheet" href="tableStyle.css">
</head>
<body>
<div id="pageContent">
    <div id="mapContainer">
        <div id="d1" class="imgDiv" onclick="changeDistrict(1)">
            <img src="img\IsraMapNorth.png"><div id="imgTextN" class="imgText">North</div>
        </div>
        <div id="d2" class="imgDiv" onclick="changeDistrict(2)">
            <img src="img\IsraMapCenter.png"><div id="imgTextC" class="imgText">Center</div>

        </div>
        <div id="d3" class="imgDiv" onclick="changeDistrict(3)">
            <img src="img\IsraMapSouth.png"><div id="imgTextS" class="imgText">South</div>
        </div>
    </div>

    <div id="tableContainer">
        <form id="form">
            <div id="thirdChildForm">
                <label id="lblDistrict">District _____:</label>
            </div>

            <div id="firstChildForm">
                <label for="listbox">Select city:</label>
                <select id="listbox" name="listbox">
                </select>
            </div>

            <div id="secondChildForm">
                <label for="listbox">Select dates:</label>
                <input type="date" id="start-date" required />
                <input type="date" id="end-date" />
            </div>

            <script>
            let today;
            function setDateConstraints(){
                today = new Date().toISOString().split('T')[0];
                let startDateAtt=document.getElementById("start-date");
                let endDateAtt=document.getElementById("end-date");
                startDateAtt.setAttribute("min", today);
                startDateAtt.value=today;
                endDateAtt.setAttribute("min", today);
                endDateAtt.value=today;

                startDateAtt.addEventListener("change", function() {
                    endDateAtt.setAttribute("min", startDateAtt.value);
                    if (endDateAtt.value<startDateAtt.value)
                        endDateAtt.value=startDateAtt.value;
                });

                endDateAtt.addEventListener("change", function() {
                    startDateAtt.setAttribute("max", endDateAtt.value);
                    if (startDateAtt.value>endDateAtt.value)
                        startDateAtt.value=endDate.value;
                });
            }
            setDateConstraints();

            </script>

            <div id="secondChildForm">
                <input type="button" value="Search" onclick="populateTable(jsonData)">
            </div>

            <div id="thirdChildForm">
                <br>
                <table id="myTable">
                    <thead>
                        <tr id="tableHeader">
                            <th >Tick</th>
                            <th id="thDate">Date</th>
                            <th >Location</th>
                            <th>Time</th>
                            <th>Max Players</th>
                            <th>Field Type</th>
                        </tr>
                    </thead>
                    <tbody id="tbody"></tbody>
                </table>
            </div>

            <div id="thirdChildForm">
            <br>
                <input type="button" value="Join The Games!" id="myButton" onclick="insertGames()">
            </div>
        </form>

    </div>
    </div>
    <div id="mapContainer2">

    </div>

</body>
</html>

