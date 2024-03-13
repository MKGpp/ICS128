const users = [
    {
        id: 42, userName: 'Joe_is_best', firstName: 'Joe', lastName: 'Nelson', email: 'ICS128@online.camosun.ca', isAdmin: true, avatar: 'includes/images/joe.png'
    },
    {
        id: 21, userName: 'MKG++', firstName: 'Matt', lastName: 'Golshani', email: 'Mattgolshani@gmail.com', isAdmin: true, avatar: 'includes/images/matt.jpg'
    },
    {
        id: 1, userName: 'Admin', firstName: 'Admin', lastName: 'Bossman', email: 'Imtheboss@bossman.com', isAdmin: true, avatar: 'includes/images/boss.png'
    },
    {
        id: 2, userName: 'Unit_2', firstName: 'Grunt', lastName: '1', email: 'fakeone@gmail.com', isAdmin: false, avatar: 'includes/images/grunt.png'
    },
    {
        id: 3, userName: 'Unit_3', firstName: 'Peon', lastName: '1', email: 'faketwo@gmail.com', isAdmin: false, avatar: 'includes/images/peon.jpg'
    },
    {
        id: 4, userName: 'Unit_4', firstName: 'Zug', lastName: 'Zug', email: 'fakethree@gmail.com', isAdmin: false, avatar: 'includes/images/zugzug.jpg'
    },
    {
        id: 5, userName: 'Unit_5', firstName: 'Work', lastName: 'Work', email: 'fakefour@gmail.com', isAdmin: false, avatar: 'includes/images/work.jpg'
    },
    {
        id: 6, userName: 'Unit_6', firstName: 'Fire', lastName: 'Tomorrow', email: 'fakefive@gmail.com', isAdmin: false, avatar: 'includes/images/fire.jpg'
    },
    {
        id: 7, userName: 'Unit_7', firstName: 'Arthas', lastName: 'Menethil', email: 'OopsStrathholme@burntit.com', isAdmin: false, avatar: 'includes/images/arthas.jpg'
    },
    {
        id: 8, userName: 'Unit_8', firstName: 'Muradin', lastName: 'BronzeBeard', email: 'sacrificedFor@reasons.com', isAdmin: false, avatar: 'includes/images/muradin.jpg'
    },
    {
        id: 9, userName: 'Unit_9', firstName: 'Dias', lastName: 'Flac', email: 'genericguy@sword.com', isAdmin: false, avatar: 'includes/images/dias.png'
    },
    {
        id: 10, userName: 'Unit_10', firstName: 'Alexa', lastName: 'holder', email: 'fakesix@gmail.com', isAdmin: false, avatar: 'includes/images/holder.jpeg'
    },
    {
        id: 11, userName: 'Unit_11', firstName: 'Alex', lastName: 'Dropper', email: 'fakeseven@gmail.com', isAdmin: false, avatar: 'includes/images/drop.jpg'
    },
    {
        id: 12, userName: 'Unit_12', firstName: 'Siri', lastName: 'ous', email: 'seriousstuff@gmail.com', isAdmin: false, avatar: 'includes/images/siri.jpeg'
    },
    {
        id: 13, userName: 'Unit_13', firstName: 'Faker', lastName: 'Mid', email: 'fakemid@gmail.com', isAdmin: false, avatar: 'includes/images/faker.jpg'
    },

];
const numberOfAdmins = 3;

/***
 * Display the modal on page load/reload
 */
document.addEventListener("DOMContentLoaded",  () =>
    {
        const myModal = new bootstrap.Modal(document.getElementById('myModal'));
        myModal.show();
    });

/***
 * Function and Event listener for the readme page to display instructions for access
 */
const joeCard = () => {
    document.getElementById('readmeDiv').innerHTML = `
        <div class=" mb-3  d-flex justify-content-center text-dark mt-5 px-5" style="background-color: #82acc0;">
            <div class="mt-3">
                <h5 class="">Hello, ${users[0].firstName} ${users[0].lastName}</h5>
                <div class="bg-secondary mb-3" style="height: 1px;"></div>
                <p class="mt-2">
                    To access employee list you will need the following<br>
                    <br>
                    Username: ${users[0].userName}<br>
                    <br>
                    ID #: ${users[0].id}<br>
                    <p>So long and thanks for all the fish!</p>
                    <a class="btn btn-outline-danger" type="button" href="index.html">Go Home</a>
                </p>
            </div>
        </div>`
};
document.addEventListener('DOMContentLoaded', function () {
    const unlockJoeButton = document.getElementById('unlockJoe');

    if (unlockJoeButton) {
        unlockJoeButton.addEventListener('click', () => {
            const answer = parseInt(document.getElementById('answerJoe').value, 10);
            if (answer === 42) {
                joeCard();
            } else {
                document.getElementById("readmeDiv").innerHTML = "INCORRECT ANSWER!";
                document.getElementById("readmeDiv").style.color = "red";
            }
        });
    }
});

/***
 * Function validateInfo() validates user input from the modal's form against the array of objects
 * and calls the appropriate function to display users
 */

const validateInfo = () => {

    //Get inputs from the modal form to authenticate user
    const userName = document.getElementById("userName").value;
    const idNumber = parseInt(document.getElementById("idNum").value, 10);
    const captchaChecked = document.getElementById("captchaCheckbox").checked;

    //Calls function to check the user exists in the array based on inputs
    const user = confirmUser(userName, idNumber);

    //Throw errors if user does not match or if captcha is not checked
    document.getElementById('errorOutput').innerHTML = "";
    if (user === null) {
        throw new Error("Error user or ID incorrect!")
    }
    if (!captchaChecked) {
        throw new Error("Failure to prove you are human!")
    }

    //Ternary operator to check if the user is an admin and load cards based on privileges
    user.isAdmin? loadAdmin() : loadUser(user);

    //Sets up the login state of the page on successful validation
    document.getElementById('formSubmit').setAttribute('data-bs-dismiss', 'modal');
    document.getElementById("formSubmit").click();
    document.getElementById("admin").innerHTML = `<h1 class="mt-4">Team Leaders</h1>`;
    document.getElementById("users").innerHTML = `<h2 class="mt-2">Work Force</h2>`;
    document.getElementById('logout').style.display = 'inline-block';
};

/***
 * Function confirmUser() checks that the user exists in the array of objects and returns
 * the users information that matches the input
 * @param userName
 * @param id
 * @returns the user object from the array
 */

const confirmUser = (userName, id) => {
    for (const user of users) {
        if (userName === user.userName && id === user.id) {
            return user;
        }
    }
    return null;
};

/***
 * Function loadAdmin() populates the page with the cards of all users in the array
 */

const loadAdmin = () => {
    //Ensures the divs are empty before populating cards
    document.getElementById("adminCards").innerHTML = "";
    document.getElementById("userCards").innerHTML = "";

    //gets the first 3 users and displays them as Admins
    for (let i = 0; i < numberOfAdmins; i++) {
        const user = users[i];
        document.getElementById("adminCards").innerHTML += `
            <div class="card mb-3 text-light" style="background-color: #2b576b;">
                <div class="h-50 d-flex justify-content-center">               
                    <img src="${user.avatar}" class="h-100" style="width: 50%;" alt="avatar">
                </div>
                <div class="card-body">
                    <h5 class="card-title">${user.firstName} ${user.lastName}</h5>
                    <div class="w-100 bg-secondary mb-3" style="height: 1px;"></div>
                    <p class="card-text mt-2">
                        Username: ${user.userName}<br>
                        <br>
                        ID #: ${user.id}<br>
                        <br>
                        Email: ${user.email}<br>
                    </p>
                </div>
            </div>
        `;
    }
    //gets the rest of the users in the array and displays as non-Admin users
    for (let i = numberOfAdmins; i < users.length; i++) {
        const user = users[i];
        document.getElementById("userCards").innerHTML += `
            <div class="card mb-3 text-light" style="background-color: #2b576b;">
                <div class="h-50 d-flex justify-content-center">               
                    <img src="${user.avatar}" class="h-50" style="width: 50%;" alt="avatar">
                </div>
                <div class="card-body">
                    <h5 class="card-title">${user.firstName} ${user.lastName}</h5>
                    <div class="w-100 bg-secondary mb-3" style="height: 1px;"></div>
                    <p class="card-text mt-2">
                        Username: ${user.userName}<br>
                        <br>
                        ID #: ${user.id}<br>
                        <br>
                        Email: ${user.email}<br>
                    </p>
                    <button type="button" class="btn btn-outline-danger" onclick="removeUser(${user.id})" id="removeUser">Fire ${user.firstName}</button>
                </div>
            </div>          
        `;
    }
};

/***
 * Function loadUser() populates the page with the Admin users cards and the card of the user logging in
 * @param authUser the user that is logging in
 */

const loadUser = (authUser) => {
    //Ensures the divs are empty before populating cards
    document.getElementById("adminCards").innerHTML = "";
    document.getElementById("userCards").innerHTML = "";

    const user = authUser;

    //gets the first 3 users and displays them as Admins
    for (let i = 0; i < numberOfAdmins; i++) {
        const user = users[i];
        document.getElementById("adminCards").innerHTML += `
            <div class="card mb-3 text-light" style="background-color: #2b576b;">
                <div class="h-50 d-flex justify-content-center">               
                    <img src="${user.avatar}" class="h-100" style="width: 50%;" alt="avatar">
                </div>
                <div class="card-body">
                    <h5 class="card-title">${user.firstName} ${user.lastName}</h5>
                    <div class="w-100 bg-secondary mb-3" style="height: 1px;"></div>
                    <p class="card-text mt-2">
                        Username: **********<br>
                        <br>
                        ID #: **<br>
                        <br>
                        Email: ${user.email}<br>
                    </p>
                </div>
            </div>
        `;
    }
    //Displays the card of the validated user
    document.getElementById("userCards").innerHTML += `
            <div class="card mb-3 text-light" style="background-color: #2b576b;">
                <div class="h-50 d-flex justify-content-center">               
                    <img src="${user.avatar}" class="h-50" style="width: 50%;" alt="avatar">
                </div>
                <div class="card-body">
                    <h5 class="card-title">${user.firstName} ${user.lastName}</h5>
                    <div class="w-100 bg-secondary mb-3" style="height: 1px;"></div>
                    <p class="card-text mt-2">
                        Username: ${user.userName}<br>
                        <br>
                        ID #: ${user.id}<br>
                        <br>
                        Email: ${user.email}<br>
                    </p>
                </div>
            </div>
    `;
};

/***
 * Function that removes one user from the page on button click from Admin user
 */

const removeUser = (id) => {
    //Find the index of the user to be removed
    const toRemove = users.findIndex(user => user.id === id);
    //Remove the user from the array
    users.splice(toRemove,1);
    //Reload the array contents
    loadAdmin();
};

/***
 * on button click try to validate the user and if there is an error catch and handle it
 */

document.getElementById('formSubmit').addEventListener('click', () => {
    try {
        validateInfo();
    } catch (e) {
        document.getElementById("errorOutput").innerHTML = `${e}`;
    }
});
document.getElementById('readme').addEventListener('click', () => {
   window.location.href = 'readme.html';
});
document.getElementById('readme1').addEventListener('click', () => {
    window.location.href = 'readme.html';
});
