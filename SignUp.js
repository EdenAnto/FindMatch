// JavaScript source code

function updatePass2Pattern() {
    let pass1 = document.getElementById("password");
    let pass2 = document.getElementById("RePassword");
    pass2.pattern = pass1.value;
}


function init() {
    let form = document.getElementById('form');
    let pass1 = document.getElementById("password");
    let pass2 = document.getElementById("RePassword");
    let submitBtn = document.getElementsByClassName("user")[0];

    submitBtn.addEventListener('click', (event) => {
        pass2.pattern = pass1.value;
    });
}

  