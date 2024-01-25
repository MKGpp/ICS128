alert("Hello, World!");
document.getElementById("hello").innerHTML = "Hello, Joe Nelson, How many Rooms do you want to book?!";

let userName = prompt("Enter your name: ", "name");
document.getElementById("name").innerHTML = `Hello, ${userName}. Nice to meet you again.`;

let amount = prompt("enter amount: ", "1");
let taxRate = prompt("enter tax rate: ", "12%");
let numRooms = prompt("# of rooms: ", "1");

let totalAmount = parseInt((amount * (1 + taxRate / 100)) * numRooms);

document.getElementById("amount").innerHTML = amount;
document.getElementById("taxRate").innerHTML = `${taxRate}%`;
document.getElementById("numRooms").innerHTML = numRooms;
document.getElementById("totalAmount").innerHTML = `$${totalAmount}`;
