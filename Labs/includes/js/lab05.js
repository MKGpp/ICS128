


const loginBtn = () => {
    const signupForm = document.getElementById("formLogin");
    signupForm.style.display = "block";
}

const loginFormHide = () => {
    const signupForm = document.getElementById("formLogin");
    signupForm.style.display = "none";
}

/***
 * Function to submit the form information
 *****************************************/

const formSubmit = () => {

    try {
        let namePattern = /^[A-Za-z]+$/;
        let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let phonePattern = /^(\d{3}[-\s]?){2}\d{4}$/;
        let postalPattern = /^[a-zA-Z]\d[a-zA-Z]\d[a-zA-Z]\d$|^[a-zA-Z]\d[a-zA-Z] \d[a-zA-Z]\d$/;

        document.getElementById("firstName").classList.remove('is-invalid');
        document.getElementById("lastName").classList.remove('is-invalid');
        document.getElementById("emailAddy").classList.remove('is-invalid');
        document.getElementById("phoneNum").classList.remove('is-invalid');
        document.getElementById("psCode").classList.remove('is-invalid');
        document.getElementById("ageInput").classList.remove('is-invalid');
        document.getElementById("errorOutput").innerHTML = '';

        const firstName = document.getElementById("firstName").value;
        const lastName = document.getElementById("lastName").value;
        const emailInput = document.getElementById("emailAddy").value;
        const phoneNumber = document.getElementById("phoneNum").value;
        const postalCode = document.getElementById("psCode").value;
        const ageInput = document.getElementById("ageInput").value;

        if (!namePattern.test(firstName)) {
            document.getElementById("firstName").classList.add('is-invalid');
            throw new Error("Name must be letters only! No spaces.");
        }
        if (!namePattern.test(lastName)) {
            document.getElementById("lastName").classList.add('is-invalid');
            throw new Error("Name must be letters only! No spaces.");
        }
        if (document.getElementById("ageInput").value < 0 || document.getElementById("ageInput").value > 120) {
            document.getElementById("ageInput").classList.add('is-invalid');
            throw new Error("Age must be between 0-120 inclusive!");
        }
        if (!emailPattern.test(emailInput)) {
            document.getElementById("emailAddy").classList.add('is-invalid');
            throw new Error("Email Address Invalid! Format is \"sampleemail@email.com\"");
        }
        if (!phonePattern.test(phoneNumber)) {
            document.getElementById("phoneNum").classList.add('is-invalid');
            throw new Error("Phone Number Invalid! Must be 000-000-0000 or 000 000 0000 or 0000000000!");
        }
        if(!postalPattern.test(postalCode)) {
            document.getElementById("psCode").classList.add('is-invalid');
            throw new Error("Postal Code Invalid! Must be A1A 1A1 or A1A1A1!");
        }
        loginFormHide();
        formToCard(firstName, lastName, ageInput, emailInput, phoneNumber, postalCode);
        loginLogout();

    } catch (error) {
        document.getElementById("errorOutput").innerHTML = `${error}`;

    }

}

/*****************************************/

/***
 * Function to save user information in a card and display
 *********************************************************/

const formToCard = (first, last, age, email, phone, postal) => {
    const userCard = document.getElementById("userCard");

    userCard.innerHTML = `
        <h1 class="text-light">${first}'s Profile</h1>
        <div class="card" style="width: 18rem;">
            <img src="./includes/images/person-square.svg" class="card-img-top" alt="user picture">
            <div class="d-flex justify-content-center"><div style="height: 1px; width: 80%;" class="bg-secondary mt-3"></div></div>
            <div class="card-body">
                <h5 class="card-title">${first} ${last}</h5>
                <p class="card-text">${email}</p>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">Age: ${age}</li>
                <li class="list-group-item">Postal Code: ${postal}</li>
                <li class="list-group-item">Phone: ${phone}</li>
            </ul>
        </div>
    `
}

/*********************************************************/

/***
 * Function to clear the form from the main page
 ***********************************************/

const clearMain = () => {
    const signupForm = document.getElementById("formLogin");
    signupForm.style.display = "none";
}

/***********************************************/

/***
 * Function to swap the sign in and out buttons
 **********************************************/

const loginLogout = () => {
    document.getElementById("logonBtn").style.display = "none";
    document.getElementById("logoutBtn").style.display = "block";
}

/**********************************************/

/***
 * Event listeners for button clicks
 ***********************************/

document.getElementById("logonBtn").addEventListener('click', loginBtn);
document.getElementById("formSubmit").addEventListener('click', formSubmit);


/***********************************/
