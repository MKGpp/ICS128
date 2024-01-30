
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
    document.getElementById("letterToFind").value = ""
}

document.getElementById("clear1").addEventListener("click", clearText1);
document.getElementById("clear2").addEventListener("click", clearText2);

/************************************/

document.getElementById("calculate").addEventListener("click", function() {
    let string = document.getElementById("field1").value;
    let char = document.getElementById("letterToFind").value;
    counter(string, char);
});