var triviaQuestions = [{
    question: "What is the largest country located entirely in Europe?",
    answerList: ["Ukraine", "Georgia", "Yugoslavia", "Russia"],
    answer: 0
}, {
    question: "What inland U.S. state has the longest shoreline?",
    answerList: ["California", "Michigan", "Florida", "Wisconsin"],
    answer: 1
}, {
    question: "Wrangell-St. Elias, the largest national park in the U.S., is located in which state?",
    answerList: ["Alaska", "Montana", "Wyoming", "Oregon"],
    answer: 0
}, {
    question: "Papua New Guinea is bordered by which country to the west?",
    answerList: ["Philippines", "Nepal", "Indonesia", "Cambodia"],
    answer: 2
}, {
    question: "In which Asian country is the city of Chiang Mai located?",
    answerList: ["Laos", "Malaysia", "Vietnam", "Thailand"],
    answer: 3
}, {
    question: "What city is most commonly referred to as “The City of Light”?",
    answerList: ["Paris", "New York", "Beijing", "Tokyo"],
    answer: 0
}, {
    question: "Olympia is the capital city of which U.S. state?",
    answerList: ["Washington, D.C.", "Washington", "Vermont", "Connecticut"],
    answer: 1
}, {
    question: "Which two South American countries do not touch the sea?",
    answerList: ["Guyana and Ecuador", "Venezuela and Columbia ", "Paraguay and Bolivia", "Argentina and Peru"],
    answer: 2
}, {
    question: "Which U.S. state has the motto 'Live Free or Die' on their license plate?",
    answerList: ["Virginia", "New Hampshire", "Delaware", "New Jersey"],
    answer: 1
}, {
    question: "In which national park would you find the geyser known as “Old Faithful”?",
    answerList: ["Theodore Roosevelt National Park", "Rocky Mountain National Park", "Yosemite National Park", "Yellowstone National Park"],
    answer: 3
}, {
    question: "What group of lakes located in upstate New York are named after a part of the human anatomy?",
    answerList: ["The finger lakes", "The leg lakes", "Arm lakes", "Belly lakes"],
    answer: 0

}];

var gifList = ['question1', 'question2', 'question3', 'question4', 'question5', 'question6', 'question7', 'question8', 'question9', 'question10', 'question11'];
var currentQuestion;
var correctAnswer;
var incorrectAnswer;
var unanswered;
var seconds;
var time;
var answered;
var userSelect;
var messages = {
    correct: "Yep, that's right!",
    incorrect: "No, that's not correct.",
    endTime: "You're out of time!",
    finished: "Alright! Let's see how well you did."
};

$('#startBtn').on('click', function () {
    $(this).hide();
    newGame();
});

$('#startOverBtn').on('click', function () {
    $(this).hide();
    newGame();
});

function newGame() {
    $('#finalMessage').empty();
    $('#correctAnswers').empty();
    $('#incorrectAnswers').empty();
    $('#unanswered').empty();
    currentQuestion = 0;
    correctAnswer = 0;
    incorrectAnswer = 0;
    unanswered = 0;
    newQuestion();
}

function newQuestion() {
    $('#message').empty();
    $('#correctedAnswer').empty();
    $('#gif').empty();
    answered = true;

    //sets up new questions & answerList
    $('#currentQuestion').html('Question #' + (currentQuestion + 1) + '/' + triviaQuestions.length);
    $('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
    for (var i = 0; i < 4; i++) {
        var choices = $('<div>');
        choices.text(triviaQuestions[currentQuestion].answerList[i]);
        choices.attr({
            'data-index': i
        });
        choices.addClass('thisChoice');
        $('.answerList').append(choices);
    }
    countdown();
    //clicking an answer will pause the time and setup answerPage
    $('.thisChoice').on('click', function () {
        userSelect = $(this).data('index');
        clearInterval(time);
        answerPage();
    });
}

function countdown() {
    seconds = 20;
    $('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
    answered = true;
    //sets timer to go down
    time = setInterval(showCountdown, 1000);
}

function showCountdown() {
    seconds--;
    $('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
    if (seconds < 1) {
        clearInterval(time);
        answered = false;
        answerPage();
    }
}

function answerPage() {
    $('#currentQuestion').empty();
    $('.thisChoice').empty(); //Clears question page
    $('.question').empty();

    var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
    var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
    
    //checks to see correct, incorrect, or unanswered
    if ((userSelect == rightAnswerIndex) && (answered == true)) {
        correctAnswer++;
        $('#message').html(messages.correct);
        $('#gif').html('<img src = "assets/images/' + gifList[currentQuestion] + '.gif" width = "400px">');
    } else if ((userSelect != rightAnswerIndex) && (answered == true)) {
        incorrectAnswer++;
        $('#message').html(messages.incorrect);
        $('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
    } else {
        unanswered++;
        $('#message').html(messages.endTime);
        $('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
        answered = true;
    }

    if (currentQuestion == (triviaQuestions.length - 1)) {
        setTimeout(scoreboard, 2000);
    } else {
        currentQuestion++;
        setTimeout(newQuestion, 2000);
    }
}

function scoreboard() {
    $('#timeLeft').empty();
    $('#message').empty();
    $('#correctedAnswer').empty();
    $('#gif').empty();

    $('#finalMessage').html(messages.finished);
    $('#correctAnswers').html("Correct Answers: " + correctAnswer);
    $('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
    $('#unanswered').html("Unanswered: " + unanswered);
    $('#startOverBtn').addClass('reset');
    $('#startOverBtn').show();
    $('#startOverBtn').html('Try Again?');
}