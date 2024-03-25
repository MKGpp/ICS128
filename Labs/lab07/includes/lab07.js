const submitName = () => {
    const name = document.getElementById('validateName').value;

    if (name === '') {
        throw new Error('Name cannot be blank!')
    }
    document.getElementById('Welcome').innerHTML = `<h1>Welcome, ${name} Good Luck!</h1>`;
    document.getElementById('quizLogin').style.display = 'none';
    document.getElementById('theQuiz').style.display = 'block';
}

$(document).ready(function() {
    ('#startQuiz').click(function() {
        let seconds = 0;
        let timerInterval = setInterval(function() {
            seconds++;
            $('#timer').text(seconds);
        }, 1000);

    });
});

const getHint = (hintNum) => {
    if (hintNum === 1) {
        document.getElementById('hintOne').style.display = 'inline-block';
    }
    if (hintNum === 2) {
        document.getElementById('hintTwo').style.display = 'inline-block';
    }
    if (hintNum === 3) {
        document.getElementById('hintThree').style.display = 'inline-block';
    }
    if (hintNum === 4) {
        document.getElementById('hintFour').style.display = 'inline-block';
    }
    if (hintNum === 5) {
        document.getElementById('hintFive').style.display = 'inline-block';
    }

}

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
