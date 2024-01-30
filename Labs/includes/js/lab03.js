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
    const ifPlural = counter === 1 ? '' : 's';

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
/****************************/


/***
 * Playing around with date functions in javascript
 **************************************************/

var labDay = new Date(2022, 2, 1);
var now = Date.now();
console.log("labDay is " + labDay);
console.log(labDay.toDateString());
console.log(labDay.toTimeString());
console.log("labDay is " + labDay.getTime());
console.log(labDay.getDate() + " / " + labDay.getMonth() + " / " + labDay.getFullYear());
console.log(labDay.getHours() + " : " + labDay.getMinutes());
console.log(now);
var errorDate = new Date(2016, 33, 1);
console.log(errorDate);
var invalidDate = new Date("Funuary 3, 2018");
console.log(invalidDate);
var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
console.log(labDay.toLocaleString('de-DE', options));
var msDay = 24 * 60 * 60 * 1000;
var msLabDay = now;
labDay = new Date(msDay + msLabDay);
console.log(labDay);

/***************************************************/

/***
 * Function to calculate the days in the month
 **********************************************/

function daysInMonth(year, month) { // Use 1 for Jan, 2 for Feb, etc.
    return new Date(year, month, 0).getDate();
}

/**********************************************/