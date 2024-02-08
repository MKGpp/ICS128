


const loginBtn = () => {
    const signupForm = document.getElementById("formLogin");
    signupForm.style.display = "block";
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

    } catch (error) {
        document.getElementById("errorOutput").innerHTML = `${error}`;

    }

}

/*****************************************/

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

}

/**********************************************/

/***
 * Event listeners for button clicks
 ***********************************/

document.getElementById("logonBtn").addEventListener('click', loginBtn);
document.getElementById("formSubmit").addEventListener('click', formSubmit);


/***********************************/
