// Possible colors
var buttonColours = ["red", "blue", "green", "yellow"];

// Game sequence and user input
var gamePattern = [];
var userClickedPattern = [];

// Game state variables
var started = false;
var level = 0;

// Start game on first key press
$(document).keydown(function () {
  if (!started) {
    started = true;
    $("#level-title").text("Level " + level);
    nextSequence(); // Start the game
  }
});

// Handle user clicks on color buttons
$(".btn").click(function () {
  if (!started) return; // Don't respond if game hasn't started

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  // Check the user's answer after each click
  checkAnswer(userClickedPattern.length - 1);
});

// Function to generate the next color in sequence
function nextSequence() {
  userClickedPattern = []; // Clear previous user input

  level++;
  $("#level-title").text("Level " + level); // Update heading

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour); // Add to game sequence

  // Animate and play sound for new color
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

// Function to check the user's answer
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    // If user finished the whole sequence correctly
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000); // Move to next level after 1 sec
    }
  } else {
    // User clicked wrong button — game over
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    startOver(); // Reset everything
  }
}

// Sound playback function
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// Button animation function
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

// Reset game state after failure
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
