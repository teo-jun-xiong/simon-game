alert("How to play: Click the buttons following the same sequence it flashes in. If the red button flashes for level 0, and the blue button flashes for level 1, the red button and then the blue button has to be pressed to pass the level, and go onto the next one");


var hasStarted = false;
var level = 0;

var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];

// Starts the game when a button is pressed
$(document).keypress(function(event) {
    if (!hasStarted) {
        hasStarted = true;
        nextSequence();
    }
});

// Registers user button clicks as answers
$(".btn").click(function(event) {
    if (hasStarted) {
        var userChosenColor = event.target.id;
        userClickedPattern.push(userChosenColor);

        playSound(userChosenColor);
        animatePress(userChosenColor);

        if (gamePattern.length === userClickedPattern.length) {
            checkAnswer();
        }
    }
});

// Shows the next button
function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    playSound(randomChosenColor);
    animatePress(randomChosenColor);
}

function playSound(color) {
    var audio = new Audio("sounds/" + color + ".mp3");
    audio.play();
}

function animatePress(color) {
    $("#" + color).fadeIn(100).fadeOut(100).fadeIn(100);
    $("#" + color).addClass("pressed");
    setTimeout(function() {
        $("#" + color).removeClass("pressed");
    }, 100);
}

function levelUp() {
    $("h1").text("Level " + level++);
    console.log("success");
}

function checkAnswer() {
    // If answer is correct, then level up and show the next button
    if (JSON.stringify(gamePattern) === JSON.stringify(userClickedPattern)) {
        levelUp();
        userClickedPattern = [];
        setTimeout(nextSequence, 1000);
    } else {
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        restartGame();
        console.log("fail");
    }
}

function restartGame() {
    gamePattern = [];
    userClickedPattern = [];
    level = 0;
    hasStarted = false;
    $("h1").text("Game Over, Press Any Key to Restart");
}