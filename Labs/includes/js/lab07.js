
let timerId; //global timer declaration to use in multiple places

const modal = new bootstrap.Modal(document.getElementById('modal')); //modal for results

/**
 * submitName checks that input is not blank then
 * fades in the quiz using jquery and hides the validation page
 */

const submitName = () => {
    const name = $('#validateName').val();

    if (name === '') {
        throw new Error('Name cannot be blank!')
    }
    $('#quizLogin').hide();
    $('#welcome').html(`<h1>Welcome, ${name} Good Luck!</h1>`);
    $('#theQuiz').fadeIn(1000, () => {
        $('theQuiz').show();
    });
}

/**
 * timerForQuiz starts a jquery timer counting seconds and
 * minutes once the name validation succeeds and the quiz has started
 */

const timerForQuiz = () => {
    let minutes = 0;
    let seconds = 0;

    $('#timer').text('0:00');
    timerId = setInterval(function() {
        seconds++;
        if (seconds === 60) {
            minutes++;
            seconds = 0;
        }
        const formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        $('#timer').text(formattedTime);
    }, 1000);
}

/**
 * displays the hints on button click for each question
 * @param hintNum 1 through 5 for each question
 */
const getHint = (hintNum) => {
    $(`#hint${hintNum}`).fadeIn('1000').css('display', 'inline-block');
}

/**
 * checkScore validates each question to check the correct checkbox(s) are/is checked
 * and displays the score result as well as a modal showing your score and time
 * completed in. This function looks a bit jank...but it works :-)
 * maybe I could have made it cleaner and less redundant?
 */

const checkScore = () => {
    let score = 0;

    if ($('#answerOneA').is(':checked')) {
        score++;
        $('#checkOne').css('display', 'inline-block');
        $('input[name="questionOne"]:not(:checked)').siblings('label').css('text-decoration', 'none');
    } else {
        $('input[name="questionOne"]:checked').siblings('label').css('text-decoration', 'underline red');
        $('input[name="questionOne"]:not(:checked)').siblings('label').css('text-decoration', 'none');
    }
    if ($('#answerTwoB').is(':checked')) {
        score++;
        $('#checkTwo').css('display', 'inline-block');
        $('input[name="questionTwo"]:not(:checked)').siblings('label').css('text-decoration', 'none');
    } else {
        $('input[name="questionTwo"]:checked').siblings('label').css('text-decoration', 'underline red');
        $('input[name="questionTwo"]:not(:checked)').siblings('label').css('text-decoration', 'none');
    }
    if ($('#answerThreeC').is(':checked')) {
        score++;
        $('#checkThree').css('display', 'inline-block');
        $('input[name="questionThree"]:not(:checked)').siblings('label').css('text-decoration', 'none');
    } else {
        $('input[name="questionThree"]:checked').siblings('label').css('text-decoration', 'underline red');
        $('input[name="questionThree"]:not(:checked)').siblings('label').css('text-decoration', 'none');
    }
    if ($('#answerFourA').is(':checked')) {
        score++;
        $('#checkFour').css('display', 'inline-block');
        $('input[name="questionFour"]:not(:checked)').siblings('label').css('text-decoration', 'none');
    } else {
        $('input[name="questionFour"]:checked').siblings('label').css('text-decoration', 'underline red');
        $('input[name="questionFour"]:not(:checked)').siblings('label').css('text-decoration', 'none');
    }
    if ($('#answerFiveA').is(':checked') && $('#answerFiveD').is(':checked') && $('input[name="questionFive"]:checked').length === 2) {
        score++;
        $('#checkFiveA').css('display', 'inline-block');
        $('#checkFiveB').css('display', 'inline-block');
        $('input[name="questionFive"]:checked').siblings('label').css('text-decoration', 'none');
        $('input[name="questionFive"]:not(:checked)').siblings('label').css('text-decoration', 'none');
    } else {
        $('input[name="questionFive"]:checked').siblings('label').css('text-decoration', 'underline red');
        $('input[name="questionFive"]:not(:checked)').siblings('label').css('text-decoration', 'none');
    }

    clearInterval(timerId); //stop the timer
    $('#score').fadeIn(3000).html(`You Scored ${score} out of 5!`).css('color', 'lightgreen');

    if (score < 5) {
        $('#result').html(`
            <h2>RESULTS for ${$('#validateName').val()}: Scored ${score} out of 5!</h2>
        `).fadeIn(3000).css('color', 'red').css('background-color', 'yellow');
        $('#time').html(`
            <h2>You finished in ${$('#timer').text()}</h2>
        `).css('color', 'white').css('background-color', 'black');
    } else {
        flash();
    }
    modal.show();
}

/**
 * flash is a special function for when score is 5/5 to add
 * some fun animation to the modal's display because
 * you're a winner baby!
 */

const flash = () => {
    const flashScore = $('#result');
    const flashTimer = $('#time');

    for (let i = 0; i < 10; i++) {
        flashScore.html(`
            <h2>${$('#validateName').val()}</h2>
            <h2>PERFECT! You Scored 5/5!!</h2>
        `).fadeIn(200).fadeOut(200).css('color', 'red').css('background-color', 'yellow');
        flashTimer.html(`
            <h2>You finished in ${$('#timer').text()}</h2>
        `).fadeIn(200).fadeOut(200).css('color', 'white').css('background-color', 'black');
    }
    flashScore.fadeIn();
    flashTimer.fadeIn();

}

/**
 * on click checks for buttons to handle the pages functionality
 */

$('#startQuiz').on('click', () => {
    try{
        submitName();
        timerForQuiz();
    } catch (e) {
        $('#errorOutput').html(e).css('color', 'red');
        $('#validateName').css('border-color','red');
    }
});
$('#submit').on('click', () => {
    checkScore();
});