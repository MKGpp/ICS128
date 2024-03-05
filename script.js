

// class Hero {
//
//     constructor(name, level) {
//         this._name = name;
//         this._level = level;
//     }
//
//     greeting() {
//         console.log(`${this._name} says hello. Level: ${(this._level)}`);
//     }
//
//     get level() {
//         return this._level;
//     }
//
//     set level(newLevel) {
//         this._level = newLevel;
//     }
// }
//
// class Wizard extends Hero {
//
//     constructor(name, level, spell) {
//         super(name, level);
//         this._spell = spell;
//     }
//     greeting() {
//         console.log(`${this._name} says hello. Level: ${(this._level)}. Spell: ${this._spell}`);
//     }
// }
// let wizard1 = new Wizard("Rahl", 99, "remake reality");
// const ironman = new Hero(`Ironman`, 5);
// const superman = new Hero(`Superman`, 4);
//
// ironman.greeting();
// superman.greeting();
// wizard1.greeting();


/*Exercise 1*/
// let nameArr = ["Annie", "Bob", "Charlie", "Danielle", "Fiona", "George", "Henry", "Isabelle", "Janice", "Kyle", "Lucas"];
// let newNameArr = [];
//
// nameArr.forEach((element,index) => {
//     if (index % 2 === 0) {
//         newNameArr.unshift(element);
//     }
// });
//
// let newNameArrDisplay = document.getElementById("exercise_1");
// newNameArrDisplay.style.border = '1px solid lightblue';
// newNameArrDisplay.style.borderRadius = '5px';
// newNameArrDisplay.style.width = `25%`;
//
// newNameArrDisplay.innerHTML= newNameArr.join(' / ');
//
// /* TROUBLESHOOT THE CODE BELOW SO THAT IT RENDERS THE CORRECT OUTPUT IN THE PAGE */
// /* there are 8 errors in this code -- use browser developer console to debug */
// let words = [{ word: "Do", question: true, answer: false },
//     { word: "you", question: true, answer: true },
//     { word: "know", question: true, answer: false },
//     { word: "who", question: true, answer: false },
//     { word: "is", question: true, answer: true },
//     { word: "a", question: true, answer: true },
//     { word: "clever", question: true, answer: true },
//     { word: "JavaScript", question: true, answer: true },
//     { word: "developer", question: true, answer: true }];
//
// document.querySelector("#exercise_2_question").innerHTML += `${words.map( (element) => { return element.question ? element.word : ""}).join(" ") }`;
// document.querySelector("#exercise_2_answer").innerHTML += `${words.filter( (element) => { return element.answer === true}).map( element => element.word === "is" ? "are" : element.word === "you" ? element.word.toUpperCase() : element.word).join(" ")}`;
// document.querySelector("#exercise_2 > div.toast").className += "show";
//
// let first_name = prompt("Enter first name:");
// let last_name = prompt("Enter last name:");
// const error = document.getElementById("exercise_3");
//
// const greetings = [
//     `It's nice to meet you ${first_name} ${last_name}!`,
//     `Welcome to my page ${first_name} ${last_name}`,
//     `Another greeting for you ${first_name} ${last_name}`,
//     `Not a greeting goodbye ${first_name} ${last_name}`
// ];
//
// function getRandGreeting () {
//     const rand = Math.floor(Math.random() * greetings.length);
//     return greetings[rand];
// }
// const getGreeting = (first_name, last_name) => {
//     const greeting = getRandGreeting();
//     if (first_name.length < 3 || first_name.includes(" ")) {
//         error.classList.add("bg-danger");
//         throw new Error("First name must not have spaces and be greater than 3 letters")
//     } else if (last_name.length < 3 || last_name.includes(" ")) {
//         error.classList.add("bg-danger");
//         throw new Error("Last name must not have spaces and be greater than 3 letters")
//     } else {
//         return greeting;
//     }
// };
//
// try{
//    const greeting = getGreeting(first_name, last_name);
//    const alertDiv = document.createElement('div');
//    alertDiv.className = 'alert alert-success w-25';
//    alertDiv.textContent = greeting;
//    document.body.appendChild(alertDiv);
// } catch (e) {
//     error.innerHTML += `${e}`;
// }

// let myURLExample = 'https://reqres.in/api/users?page=2';
//
// let loadDoc = () => {
//     let xhttp = new XMLHttpRequest();
//     xhttp.onreadystatechange = function () {
//         if (this.readyState === 4 && this.status === 200) {
//             console.log(this.responseText);
//         }
//     };
//     xhttp.open('GET', myURLExample, true);
//     xhttp.send();
// };
// loadDoc();

