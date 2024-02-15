
/***
 * Function to validate form inputs
 **********************************/

document.getElementById("formSubmit").addEventListener('click',() => {
    try {
        //regex patterns for validating user information
        let namePattern = /^[A-Za-z]+$/;
        let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let phonePattern = /^(\d{3}[-\s]?){2}\d{4}$/;
        let postalPattern = /^[a-zA-Z]\d[a-zA-Z]\d[a-zA-Z]\d$|^[a-zA-Z]\d[a-zA-Z] \d[a-zA-Z]\d$/;

        //get the input values and store in constants
        const firstName = document.getElementById("firstName").value;
        const lastName = document.getElementById("lastName").value;
        const emailInput = document.getElementById("emailAddy").value;
        const phoneNumber = document.getElementById("phoneNum").value;
        const postalCode = document.getElementById("psCode").value;
        const ageInput = document.getElementById("ageInput").value;

        //Reset the invalid errors so only current error is shown
        document.getElementById("firstName").classList.remove('is-invalid');
        document.getElementById("lastName").classList.remove('is-invalid');
        document.getElementById("emailAddy").classList.remove('is-invalid');
        document.getElementById("phoneNum").classList.remove('is-invalid');
        document.getElementById("psCode").classList.remove('is-invalid');
        document.getElementById("ageInput").classList.remove('is-invalid');
        document.getElementById("errorOutput").innerHTML = '';

        //test inputs against regex patterns
        if (!namePattern.test(firstName)) {
            document.getElementById("firstName").classList.add('is-invalid');
            throw new Error("Name must be letters only! No spaces.");
        } else {
            document.getElementById("firstName").style.borderColor = "green";
            document.getElementById("firstName").style.borderWidth = '3px';
        }
        if (!namePattern.test(lastName)) {
            document.getElementById("lastName").classList.add('is-invalid');
            throw new Error("Name must be letters only! No spaces.");
        } else {
            document.getElementById("lastName").style.borderColor = "green";
            document.getElementById("lastName").style.borderWidth = '3px';
        }
        if (!emailPattern.test(emailInput)) {
            document.getElementById("emailAddy").classList.add('is-invalid');
            throw new Error("Email Address Invalid! Format is \"sampleemail@email.com\"");
        } else {
            document.getElementById("emailAddy").style.borderColor = "green";
            document.getElementById("emailAddy").style.borderWidth = '3px';
        }
        if (document.getElementById("ageInput").value === "" || document.getElementById("ageInput").value < 0 || document.getElementById("ageInput").value > 120) {
            document.getElementById("ageInput").classList.add('is-invalid');
            throw new Error("Age must be between 0-120 inclusive!");
        } else {
            document.getElementById("ageInput").style.borderColor = "green";
            document.getElementById("ageInput").style.borderWidth = '3px';
        }
        if (!postalPattern.test(postalCode)) {
            document.getElementById("psCode").classList.add('is-invalid');
            throw new Error("Postal Code Invalid! Must be A1A 1A1 or A1A1A1!");
        } else {
            document.getElementById("psCode").style.borderColor = "green";
            document.getElementById("psCode").style.borderWidth = '3px';
        }
        if (!phonePattern.test(phoneNumber)) {
            document.getElementById("phoneNum").classList.add('is-invalid');
            throw new Error("Phone Number Invalid! Must be 000-000-0000 or 000 000 0000 or 0000000000!");
        } else {
            document.getElementById("phoneNum").style.borderColor = "green";
            document.getElementById("phoneNum").style.borderWidth = '3px';
        }

        //if all validated close the modal and populate/display user info card
        if (namePattern.test(firstName) && namePattern.test(lastName) && (ageInput >= 0 || ageInput <= 120 || ageInput !== "") && emailPattern.test(emailInput) && phonePattern.test(phoneNumber) && postalPattern.test(postalCode)) {
            document.getElementById('formSubmit').setAttribute('data-bs-dismiss', 'modal');
            document.getElementById("formSubmit").click();
            document.getElementById("greeting").innerHTML = `Hello ${firstName} ${lastName}`;
            formToCard(firstName, lastName, ageInput, emailInput, phoneNumber, postalCode);
            
            //swap login logout buttons
            login();
        }

    } catch (e) {
        document.getElementById("errorOutput").innerHTML = `${e}`;
    }
});

/**********************************/

/***
 * Function to save user information in a card and display
 *********************************************************/

const formToCard = (first, last, age, email, phone, postal) => {
    const userCard = document.getElementById("userCard");

    //populate the card with users information and display it
    userCard.innerHTML = `
        <div class="card" style="width: 18rem;">
            <h1 class="d-flex justify-content-center">${first}'s Profile</h1>
            <img src="./includes/images/person.svg" class="card-img-top" alt="user picture">
            <div class="d-flex justify-content-center"><div style="height: 1px; width: 80%;" class="bg-secondary mt-3"></div></div>
            <div class="card-body">
                <h5 class="card-title">${first} ${last}</h5>
                <p class="card-text">${email}</p>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">Age: <span style="color:red;">${age}</span></li>
                <li class="list-group-item">Postal Code: <span style="color:blue;">${postal}</span></li>
                <li class="list-group-item">Phone: <span style="color:darkorange;">${phone}</span></li>
            </ul>
        </div>
    `
}

/*********************************************************/


/***
 * Function to swap the sign in and out buttons
 **********************************************/

const login = () => {
    document.getElementById("logonBtn").style.display = "none";
    document.getElementById("logoutBtn").style.display = "block";
}
const logout = () => {
    document.getElementById("logonBtn").style.display = "block";
    document.getElementById("logoutBtn").style.display = "none";

    //Clear the form inputs when logout is pressed
    let formClear = document.getElementById("formLogin").querySelectorAll('input');
    formClear.forEach(function(input){
       input.value = "";
    });
}

/**********************************************/

/***
 * Event listeners for button clicks
 ***********************************/

document.getElementById("logoutBtn").addEventListener('click', () => {

    //Clear information fields and reset validated input color
    document.getElementById("userCard").innerHTML = "";
    document.getElementById("greeting").innerHTML = "";
    document.getElementById("formSubmit").removeAttribute('data-bs-dismiss');
    document.getElementById("firstName").style.borderColor = null;
    document.getElementById("lastName").style.borderColor = null;
    document.getElementById("emailAddy").style.borderColor = null;
    document.getElementById("ageInput").style.borderColor = null;
    document.getElementById("psCode").style.borderColor = null;
    document.getElementById("phoneNum").style.borderColor = null;

    //swap the login and logout buttons
    logout();
});
document.getElementById("formCancel").addEventListener('click',() => {

    //Clear the form inputs when cancel is pressed
    let formClear = document.getElementById("formLogin").querySelectorAll('input');
    formClear.forEach(function(input){
        input.value = "";
    });
});

/***********************************/
