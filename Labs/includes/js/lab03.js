/***
 * Function to count letters and whitespaces in a given input.
 *************************************************************/

function counter(string, char) {
    let charInput = document.getElementById("field2").value;
    let count = 0;
    let counter = 0;

    for (let i = 0; i < string.length; ++i) {
        if (string.charAt(i) === " ") {
            count++;
        }
    }
    for (let i = 0; i < charInput.length; ++i) {
        if (charInput.charAt(i).toUpperCase() === char.toUpperCase()) {
            counter++;
        }
    }
    const ifPlural = counter === 1 ? '' : '\'s';

    document.getElementById("spaceCount").innerHTML = count;
    document.getElementById("letterCount").innerHTML = `${counter} ${char}${ifPlural}`;


}
/**************************************************************/

/***
 * Buttons to clear the form fields.
 ***********************************/

function clearText1() {
    document.getElementById("field1").value = "";
}

function clearText2() {
    document.getElementById("field2").value = "";
    document.getElementById("letterToFind").value = "";
}

document.getElementById("clear1").addEventListener("click", clearText1);
document.getElementById("clear2").addEventListener("click", clearText2);

/************************************/

/***
 * Button Click Event Handler
 *****************************/

document.getElementById("calculate").addEventListener("click", function() {
    let string = document.getElementById("field1").value;
    let char = document.getElementById("letterToFind").value;
    counter(string, char);
});
/*****************************/


/***
 * Playing around with date functions in javascript
 **************************************************/

// var labDay = new Date(2022, 2, 1);
// var now = Date.now();
// console.log("labDay is " + labDay);
// console.log(labDay.toDateString());
// console.log(labDay.toTimeString());
// console.log("labDay is " + labDay.getTime());
// console.log(labDay.getDate() + " / " + labDay.getMonth() + " / " + labDay.getFullYear());
// console.log(labDay.getHours() + " : " + labDay.getMinutes());
// console.log(now);
// var errorDate = new Date(2016, 33, 1);
// console.log(errorDate);
// var invalidDate = new Date("Funuary 3, 2018");
// console.log(invalidDate);
// var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
// console.log(labDay.toLocaleString('de-DE', options));
// var msDay = 24 * 60 * 60 * 1000;
// var msLabDay = now;
// labDay = new Date(msDay + msLabDay);
// console.log(labDay);

/***************************************************/

/***
 * Function to calculate the days in the month
 **********************************************/

function daysInMonth(year, month) {
    return new Date(year, month, 0).getDate();
}
/**********************************************/

/***
 * Function to calculate if days are weekdays
 *************************************************/

function isWeekDay(year, month, day) {
    let dayOfWeek = new Date(year, month, day).getDay();
    return dayOfWeek >= 1 && dayOfWeek <= 5;
}
/*************************************************/

/***
 * Function to get the weekdays in the current month
 ***************************************************/

function getWeekdaysCurrentMonth(year, month) {
    let dayInMonth = daysInMonth(year, month);
    let weekdays = 0;

    for (let i = 0; i < dayInMonth; i++) {
        if (isWeekDay(year, month - 1, i+1)) {
            weekdays++;
        }
    }
    return weekdays;
}

/***************************************************/

/***
 * Function to add functionality to the calculate wages section of the webpage.
 ******************************************************************************/

function calculateWages() {

    const inputDate = document.getElementById('dateInput').value;
    const [year, month] = inputDate.split('-');
    const numDaysInMonth = daysInMonth(year, month);
    const weekdays = getWeekdaysCurrentMonth(year, month);
    const minimumWage = 16.75;
    const hoursPerDay = 8;
    const salary = (weekdays * hoursPerDay) * minimumWage;

    let displayWages = document.getElementById('displayWages');
    displayWages.innerHTML = `<div class="d-flex justify-content-center mb-2">Your chosen date:&nbsp;<span style="color: red;">${inputDate}</span></div>`;
    displayWages.innerHTML += `<div class="d-flex justify-content-center mb-2">How many days in the month:&nbsp;<span style="color:blue;">${numDaysInMonth}</span></div>`;
    displayWages.innerHTML += `<div class="d-flex justify-content-center mb-2">How many work days:&nbsp;<span style="color:yellow;">${weekdays}</span></div>`;
    displayWages.innerHTML += `<div class="d-flex justify-content-center mb-2">BC minimum wage:&nbsp;<span style="color:green;">${minimumWage}</span></div>`;
    displayWages.innerHTML += `<div class="d-flex justify-content-center">Salary for the month (8 hours):&nbsp;<span style="color:orange;">${salary}</span></div>`;
}
/******************************************************************************/

/***
 * FUNction to add my birthday to the calendar field
 ***************************************************/

function addBirthday() {
    var myBDay = "1992-11-04";
    document.getElementById(`dateInput`).value = myBDay;
}
/***************************************************/

/***
 * Error handling function for number inputs
 *******************************************/

function isItInRange() {
    try {
        let numToCheck = document.getElementById("errorInput").value;
        let errorInput = document.getElementById("errorReport1");
        let errorInput2 = document.getElementById("errorReport2");

        document.getElementById("errorReport2").style.color = "red";
        errorInput.innerHTML = `your number value: ${numToCheck}<br>`;
        errorInput2.innerHTML = '';
        
        if (numToCheck <= 0) {
            errorInput.innerHTML += `Your number is less than or equal to 2: ${numToCheck}<br>`;
            throw new Error(`Your number ${numToCheck} must be greater than zero`);
        }
        if (numToCheck <= 2) {
            errorInput.innerHTML += `Your number is less than or equal to 2: ${numToCheck}<br>`;
            throw new Error(`The value is less than or equal to 2: ${numToCheck}<br>`);
        }
        if (numToCheck > 2) {
            errorInput.innerHTML += `The value is over 2<br>`;
        }
        if (numToCheck == 3) {
            errorThreeNotAllowed();
            errorInput.innerHTML = ``;
            throw new Error(`3 not allowed!`);
        }
        if (numToCheck >= 4) {
            errorInput2.innerHTML += `The value is in the correct range`;
        }  
    } catch (e) {
        console.error(e.message);
        document.getElementById('errorReport2').innerHTML = `Error: ${e.message}`;
    }
}
/*******************************************/

/***
 * Entered 3 Error handling function
 ***********************************/

function errorThreeNotAllowed() {
    let countdown = document.getElementById("errorCountdown");
    document.body.style.backgroundImage = `url(./includes/images/error.jfif)`;
    let count = 5;

    function countdownReload() {
        countdown.innerHTML = `Program Terminating in: ${count}`;
        count--;

        if (count < 0) {
            location.reload();
        } else {
            setTimeout(countdownReload, 1000);
        }
    }

    countdownReload();
}
/***********************************/

document.getElementById('datebtn').addEventListener('click', calculateWages);
document.getElementById('birthDay').addEventListener('click', addBirthday);
document.getElementById('errorbtn').addEventListener('click', isItInRange);