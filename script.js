document.getElementById("btnForRegex").addEventListener('click', () => {

    let namePattern = /^[A-Za-z]+$/;
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const name = document.getElementById("nameInput").value;
    const email = document.getElementById("emailInput").value;

    if (namePattern.test(name)) {
        document.getElementById("nameInput").style.borderColor = "green";
        document.getElementById("errorOutputName").innerHTML = '';
    } else {
        document.getElementById("nameInput").style.borderColor = "red";
        document.getElementById("errorOutputName").innerHTML = "Name invalid";
        document.getElementById("errorOutputName").style.color = "red";
        document.getElementById("success").innerHTML = ``;
    }
    if (emailPattern.test(email)) {
        document.getElementById("emailInput").style.borderColor = "green";
        document.getElementById("errorOutputEmail").innerHTML = '';
    } else {
        document.getElementById("emailInput").style.borderColor = "red";
        document.getElementById("errorOutputEmail").innerHTML = "Email invalid";
        document.getElementById("errorOutputEmail").style.color = "red";
        document.getElementById("success").innerHTML = ``;
    }

    if (namePattern.test(name) && emailPattern.test(email)) {
        document.getElementById("success").innerHTML = `Success`;
        document.getElementById("success").style.color = "green";
    }

});
