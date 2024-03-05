
const users = [
    {
        id: 42, userName: 'Joe_is_best', firstName: 'Joe', lastName: 'Nelson', email: 'NelsonJ@online.camosun.ca', isAdmin: true, avatar: 'includes/images/joe.png'
    },
    {
        id: 21, userName: 'MKG++', firstName: 'Matt', lastName: 'Golshani', email: 'Mattgolshani@gmail.com', isAdmin: true, avatar: 'includes/images/matt.jpg'
    },
    {
        id: 1, userName: 'Admin', firstName: 'Admin', lastName: 'Bossman', email: 'Imtheboss@bossman.com', isAdmin: true, avatar: 'includes/images/person-circle.svg'
    },
    {
        id: 2, userName: 'Unit_2', firstName: 'Grunt', lastName: '1', email: 'toupdate@gmail.com', isAdmin: false, avatar: 'includes/images/grunt.png'
    },
    {
        id: 3, userName: 'Unit_3', firstName: 'Peon', lastName: '1', email: 'toupdate@gmail.com', isAdmin: false, avatar: 'includes/images/peon.jpg'
    },
    {
        id: 4, userName: 'Unit_4', firstName: 'Zug', lastName: 'Zug', email: 'toupdate@gmail.com', isAdmin: false, avatar: 'includes/images/zugzug.jpg'
    },
    {
        id: 5, userName: 'Unit_5', firstName: 'Work', lastName: 'Work', email: 'toupdate@gmail.com', isAdmin: false, avatar: 'includes/images/work.jpg'
    },
    {
        id: 6, userName: 'Unit_6', firstName: 'Fire', lastName: 'Tomorrow', email: 'toupdate@gmail.com', isAdmin: false, avatar: 'includes/images/fire.jpg'
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
        id: 10, userName: 'Unit_10', firstName: 'place', lastName: 'holder', email: 'toupdate@gmail.com', isAdmin: false, avatar: 'includes/images/person-circle.svg'
    },
    {
        id: 11, userName: 'Unit_11', firstName: 'place', lastName: 'holder', email: 'toupdate@gmail.com', isAdmin: false, avatar: 'includes/images/person-circle.svg'
    },
    {
        id: 12, userName: 'Unit_12', firstName: 'place', lastName: 'holder', email: 'toupdate@gmail.com', isAdmin: false, avatar: 'includes/images/person-circle.svg'
    },
    {
        id: 13, userName: 'Unit_13', firstName: 'place', lastName: 'holder', email: 'toupdate@gmail.com', isAdmin: false, avatar: 'includes/images/person-circle.svg'
    },

];
const numberOfAdmins = 3;
document.addEventListener("DOMContentLoaded",  () =>
    {
        const myModal = new bootstrap.Modal(document.getElementById('myModal'));
        myModal.show();
    });

const validateInfo = () => {
    const userName = document.getElementById("userName").value;
    const idNumber = parseInt(document.getElementById("idNum").value, 10);
    const captchaChecked = document.getElementById("captchaCheckbox").checked;
    const user = confirmUser(userName, idNumber);

    document.getElementById('errorOutput').innerHTML = "";
    if (!captchaChecked) {
        throw new Error("Failure to prove you are human!")
    }
    if (user === null) {
        throw new Error("Error user or ID incorrect!")
    }

    user.isAdmin? loadAdmin() : loadUser(user);
    document.getElementById('formSubmit').setAttribute('data-bs-dismiss', 'modal');
    document.getElementById("formSubmit").click();
};
const confirmUser = (userName, id) => {
    for (const user of users) {
        if (userName === user.userName && id === user.id) {
            return user;
        }
    }
    return null;
};

const loadAdmin = () => {
    document.getElementById("adminCards").innerHTML = "";
    document.getElementById("userCards").innerHTML = "";
    document.getElementById("admin").innerHTML = `<h1 class="mt-4">Team Leaders</h1>`;
    document.getElementById("users").innerHTML = `<h2 class="mt-2">Work Force</h2>`;


    for (let i = 0; i < numberOfAdmins; i++) {
        const user = users[i];
        document.getElementById("adminCards").innerHTML += `
            <div class="card mb-3 bg-dark text-light gap-3">
                <div class="d-flex justify-content-center">
                    <img src="${user.avatar}" class="img-fluid rounded-start mt-2" style="width: 200px; height: 200px; object-fit: contain;" alt="avatar">
                </div>
                <div class="card-body">
                    <h5 class="card-title">${user.firstName} ${user.lastName}</h5>
                    <div class="w-100 bg-secondary mb-3" style="height: 1px;"></div>
                    <p class="card-text">Username: ${user.userName}</p>
                    <p class="card-text">ID #: ${user.id}</p>
                    <p class="card-text">Email: ${user.email}</p>
                </div>
            </div>
            `;
    }
    for (let i = numberOfAdmins; i < users.length; i++) {
        const user = users[i];
        document.getElementById("userCards").innerHTML += `
            <div class="card mb-3 bg-dark text-light gap-3 w-50">
                <div class="d-flex justify-content-center">
                    <img src="${user.avatar}" class="img-fluid rounded-start mt-2" style="width: 100px; height: 100px; object-fit: contain;" alt="avatar">
                </div>
                <div class="card-body">
                    <h5 class="card-title">${user.firstName} ${user.lastName}</h5>
                    <div class="w-100 bg-secondary mb-3" style="height: 1px;"></div>
                    <p class="card-text">Username: ${user.userName}</p>
                    <p class="card-text">ID #: ${user.id}</p>
                    <p class="card-text">Email: ${user.email}</p>
                </div>
            </div>
        `;
    }
};

const loadUser = (authUser) => {
    document.getElementById("adminCards").innerHTML = "";
    document.getElementById("userCards").innerHTML = "";
    document.getElementById("admin").innerHTML = `<h1 class="mt-4">Team Leaders</h1>`;
    document.getElementById("users").innerHTML = `<h2 class="mt-2">Work Force</h2>`;

    const user = authUser;

    for (let i = 0; i < numberOfAdmins; i++) {
        const user = users[i];
        document.getElementById("adminCards").innerHTML += `
            <div class="card mb-3 bg-dark text-light gap-3">
                <div class="d-flex justify-content-center">
                    <img src="${user.avatar}" class="img-fluid rounded-start mt-2" style="width: 200px; height: 200px; object-fit: contain;" alt="avatar">
                </div>
                <div class="card-body">
                    <h5 class="card-title">${user.firstName} ${user.lastName}</h5>
                    <div class="w-100 bg-secondary mb-3" style="height: 1px;"></div>
                    <p class="card-text">Username: ********</p>
                    <p class="card-text">ID #: **</p>
                    <p class="card-text">Email: ${user.email}</p>
                </div>
            </div>
            `;
    }
    document.getElementById("userCards").innerHTML += `
            <div class="card mb-3 bg-dark text-light gap-3">
                <div class="d-flex justify-content-center">
                    <img src="${user.avatar}" class="img-fluid rounded-start mt-2" style="width: 200px; height: 200px; object-fit: contain;" alt="avatar">
                </div>
                <div class="card-body">
                    <h5 class="card-title">${user.firstName} ${user.lastName}</h5>
                    <div class="w-100 bg-secondary mb-3" style="height: 1px;"></div>
                    <p class="card-text">Username: ${user.userName}</p>
                    <p class="card-text">ID #: ${user.id}</p>
                    <p class="card-text">Email: ${user.email}</p>
                </div>
            </div>
    `;
};
document.getElementById('formSubmit').addEventListener('click', () => {
    try {
        validateInfo();
    } catch (e) {
        document.getElementById("errorOutput").innerHTML = `${e}`;
    }
});
