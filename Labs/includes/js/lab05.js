


const loginBtn = () => {
    const mainForm = document.getElementById("formDiv");
    mainForm.innerHTML = `
        <form class="w-50">
                <div class="">
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1"><img src="./includes/images/person-circle.svg" alt="person"></span>
                        <input type="text" class="form-control" placeholder="First Name" aria-label="firstName" aria-describedby="basic-addon1" id="firstName">
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon2"><img src="./includes/images/person-circle.svg" alt="person"></span>
                        <input type="text" class="form-control" placeholder="Last Name" aria-label="lastName" aria-describedby="basic-addon2" id="lastName">
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon3"><img src="./includes/images/envelope-at-fill.svg" alt="email"></span>
                        <input type="email" class="form-control" placeholder="Email Address" aria-label="email" aria-describedby="basic-addon3" id="emailAddy">
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon4"><img src="./includes/images/123.svg" alt="age"></span>
                        <input type="number" class="form-control" placeholder="Enter your Age" aria-label="age" aria-describedby="basic-addon4" id="ageInput">
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon5"><img src="./includes/images/mailbox2-flag.svg" alt="postal code"></span>
                        <input type="text" class="form-control" placeholder="Postal Code" aria-label="postalCode" aria-describedby="basic-addon5" id="psCode">
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon6"><img src="./includes/images/telephone-forward-fill.svg" alt="phone number"></span>
                        <input type="text" class="form-control" placeholder="Phone Number" aria-label="phoneNumber" aria-describedby="basic-addon6" id="phoneNum">
                    </div>
                    <div id="errorOutput" class="d-flex justify-content-center text-danger"></div>
                    <div class="d-flex justify-content-end gap-2">
                        <button type="submit" class="btn btn-outline-primary" id="formCancel" onclick="clearMain()">Cancel</button>
                        <button type="submit" class="btn btn-outline-success" id="formSubmit" onclick="formSubmit()">Sign up</button>
                    </div>
                </div>
        </form>
    `
}

/***
 * Function to submit the form information
 *****************************************/

const formSubmit = () => {

    try {
        let namePattern = /^[A-Za-z]+$/;
        let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let phonePattern = /^(\d{3}[-\s]?){2}\d{4}$/;
        let postalPattern = /^[a-zA-Z]\d[a-zA-Z]\d[a-zA-Z]\d$/;
        let postalSpacePattern = /^[a-zA-Z]\d[a-zA-Z] \d[a-zA-Z]\d$/


        const firstName = document.getElementById("firstName").value;
        const lastName = document.getElementById("lastName").value;
        const emailInput = document.getElementById("emailAddy").value;
        const phoneNumber = document.getElementById("phoneNum").value;
        const postalCode = document.getElementById("psCode").value;

        if (!namePattern.test(firstName)) {
            throw new Error("Name must be letters only! No spaces.");
        }
        if (!namePattern.test(lastName)) {
            throw new Error("Name must be letters only! No spaces.");
        }
        if (document.getElementById("ageInput").value < 0 || document.getElementById("ageInput").value > 120) {
            throw new Error("Age must be between 0-120 inclusive!");
        }
        if (!emailPattern.test(emailInput)) {
            throw new Error("Email Address Invalid! Format is \"sampleemail@email.com\"");
        }
        if (!phonePattern.test(phoneNumber)) {
            throw new Error("Phone Number Invalid! Must be 000-000-0000 or 000 000 0000 or 0000000000!");
        }
        if(!postalPattern.test(postalCode) || !postalSpacePattern.test(postalCode)) {
            throw new Error("Postal Code Invalid! Must be A1A 1A1 or A1A1A1!");
        }

    } catch (error) {
        document.getElementById("errorOutput").innerHTML = `Error: ${error}`;
    }

}

/*****************************************/

/***
 * Function to clear the form from the main page
 ***********************************************/

const clearMain = () => {
    const mainForm = document.getElementById("formDiv");
    mainForm.innerHTML = '';
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

/***********************************/
