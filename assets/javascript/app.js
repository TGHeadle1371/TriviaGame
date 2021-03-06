$(document).ready(function () { //On document ready


    // Trivia Questions, answer array list, and value #

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
    // Audio file variable and attribute
    var audio1 = document.createElement('audio');
    audio1.setAttribute('src', './assets/audio/true.mp3');

    // Picture gif List correct and incorrect
    var gifList = ['question1', 'question2', 'question3', 'question4', 'question5', 'question6', 'question7', 'question8', 'question9', 'question10', 'question11'];
    var wrongGif = ['wrong1'];
    // Question to be answered
    var currentQuestion;
    // Answer to question
    var correctAnswer;
    // All incorrect answers
    var incorrectAnswer;
    // If you didn't answer
    var unanswered;
    // Seconds left
    var seconds;
    // Time
    var time;
    // If answered
    var answered;
    // Users choice
    var userSelect;
    // Messages to display
    var messages = {
        correct: "Yep, that's right!",
        incorrect: "No, that's incorrect.",
        timesUp: "You're out of time!",
        finished: "Lets check how well you did."
    };
    // On click start button of game, hide button start newGame()
    $('#startBtn').on('click', function () {
        $(this).hide();
        newGame();

    });
    // start over btn on click hide the btn and start newGame()
    $('#startOverBtn').on('click', function () {
        $(this).hide();
        newGame();
    });
    // newGame function
    function newGame() {
        // empty display divs
        $('#finalMessage').empty();
        $('#correctAnswers').empty();
        $('#incorrectAnswers').empty();
        $('#unanswered').empty();
        // Set variables to 0, run newquestion(), and play audio files
        currentQuestion = 0;
        correctAnswer = 0;
        incorrectAnswer = 0;
        unanswered = 0;
        newQuestion();
        audio1.pause();
        audio1.play();
    }

    // new Question function, empty div displays, set answered to true
    function newQuestion() {
        $('#message').empty();
        $('#correctedAnswer').empty();
        $('#gif').empty();
        $('#wrongGif').empty();
        answered = true;

        //sets up new questions & answerList
        $('#currentQuestion').html('Question #' + (currentQuestion + 1) + '/' + triviaQuestions.length);
        // question class html - create h2 with trivia question current question 
        $('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
        // Iterate through questions 
        for (var i = 0; i < 4; i++) {
            var choices = $('<div>'); //Create div variable
            choices.text(triviaQuestions[currentQuestion].answerList[i]); // Assign the div variable text to answer list
            choices.attr({ //Assign the attribute data-index to the iteration
                'data-index': i
            });
            choices.addClass('thisChoice'); // Add the class thisChoice to choices
            $('.answerList').append(choices); //Append choices to .answerlist class
        }
        countdown(); //Run countdown
        //clicking an answer will pause the time and setup answerPage
        $('.thisChoice').on('click', function () {
            userSelect = $(this).data('index');
            clearInterval(time);
            answerPage();
        });
    }
    // Countdown function
    function countdown() {
        // Give 20 seconds
        seconds = 20;
        // display time remaining
        $('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
        answered = true;
        //sets timer to go down by 1 second interval
        time = setInterval(showCountdown, 1000);
    }

    // Change display of time, display answered page if answered is false
    function showCountdown() {
        // Decrement seconds
        seconds--;
        // Add time remaining html with seconds
        $('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
        if (seconds < 1) {
            // When the seconds are less than 1, clear the time, answered is false, run answerpage function
            clearInterval(time);
            answered = false;
            answerPage();
        }
    }
    // Answer page, empty divs, display right answer and gif image
    function answerPage() {
        // Clear divs
        $('#currentQuestion').empty();
        $('.thisChoice').empty(); //Clears question page
        $('.question').empty();
        // Set variables of answer text and index
        var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
        var rightAnswerIndex = triviaQuestions[currentQuestion].answer;

        //check to see correct, incorrect, or unanswered, displays gif
        if ((userSelect == rightAnswerIndex) && (answered == true)) {
            // Increment correct answer
            correctAnswer++;
            // Change message
            $('#message').html(messages.correct);
            // Add gif
            $('#gif').html('<img src = "assets/images/' + gifList[currentQuestion] + '.gif" width = "200px">');
        } else if ((userSelect != rightAnswerIndex) && (answered == true)) {
            // Increment incorrect answers
            incorrectAnswer++;
            // Change incorrect message
            $('#message').html(messages.incorrect);
            // Insert gif
            $('#wrongGif').html('<img src = "assets/images/' + wrongGif + '.gif" width = "200px">');
            $('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);

        } else {
            // If nothing, increment unanswered, display message
            unanswered++;
            $('#message').html(messages.timesUp);
            $('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
            answered = true;
        }
        // If there is no question, set timeout to 3 seconds or add question set timeout 3 seconds.
        if (currentQuestion == (triviaQuestions.length - 1)) {
            setTimeout(scoreboard, 3000);
        } else {
            currentQuestion++;
            setTimeout(newQuestion, 3000);
        }
    }
    // Empty scoreboard divs, display scoreboard div values
    function scoreboard() {
        $('#timeLeft').empty();
        $('#message').empty();
        $('#correctedAnswer').empty();
        $('#gif').empty();
        $('#wrongGif').empty();

        // Change div display html
        $('#finalMessage').html(messages.finished);
        $('#correctAnswers').html("Correct Answers: " + correctAnswer);
        $('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
        $('#unanswered').html("Unanswered: " + unanswered);
        $('#startOverBtn').addClass('reset');
        $('#startOverBtn').show();
        $('#startOverBtn').html('Try Again?');
    }
});