let users = {
    first: "Matt",
    last: "G",
    age: 31
}
let moreUsers = {
    first: "John",
    last: "S",
    age: 73
}
let anotherUser = {
    first: "Frank",
    last: "C",
    age: 64
}
let objectArray = [users, moreUsers, anotherUser];

function buttonGreeting() {
    let greeting = document.getElementById("lecture");
    greeting.innerHTML = `Hello ${users.first} ${users.last}.`;
}

function tableOfUsers() {
    let table = document.getElementById("table");

    table.innerHTML = `
    <style>
        table, th, td {
        border: 1px solid black;
        }
    </style>
    <table>
        <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Age</th>
        </tr>
        <tr>
            <td>${users.first}</td>
            <td>${users.last}</td>
            <td>${users.age}</td>
        </tr>
        <tr>
            <td>${moreUsers.first}</td>
            <td>${moreUsers.last}</td>
            <td>${moreUsers.age}</td>
        </tr>
        <tr>
            <td>${anotherUser.first}</td>
            <td>${anotherUser.last}</td>
            <td>${anotherUser.age}</td>
        </tr>
    </table>`;
}

function displayArray() {

    let array = document.getElementById("array");
    array.innerHTML = "";
    for (let i = 0; i < objectArray.length; i++) {
        array.innerHTML += objectArray[i].first + ` `;
        array.innerHTML += objectArray[i].last + ` `;
        array.innerHTML += objectArray[i].age + `<br>`;
    }

}

document.getElementById("btn").addEventListener("click", buttonGreeting);
document.getElementById("btn2").addEventListener("click", tableOfUsers);
document.getElementById("btn3").addEventListener("click", displayArray);