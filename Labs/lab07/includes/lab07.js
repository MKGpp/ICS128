const submitName = () => {
    const name = document.getElementById('validateName').value;

    if (name === '') {
        throw new Error('Name cannot be blank!')
    }
    document.getElementById('Welcome').innerHTML = `<h1>Welcome, ${name} Good Luck!</h1>`;
    document.getElementById('quizLogin').style.display = 'none';
    document.getElementById('theQuiz').style.display = 'block';
}

// $(document).ready(function() { ******************DONT LOOK AT THIS FUNCTION ITS A WIP *************
//     $('#startQuiz').click(function() {
//         let seconds = 0;
//         let timerInterval = setInterval(function() {
//             seconds++;
//             $('#timer').text(seconds);
//         }, 1000);
//
//     });
// });

document.getElementById('startQuiz').addEventListener('click', () => {
    try{
        submitName();
        startTimer();
    } catch (e) {
        document.getElementById('errorOutput').innerHTML = e;
        document.getElementById('errorOutput').style.color = 'red';
        document.getElementById('validateName').style.borderColor = 'red';
    }
});
