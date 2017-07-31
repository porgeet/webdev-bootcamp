// create secretNumber
var secretNumber = 39;

// ask user for guess
var guess = Number(prompt("Guess a number"));

//  check guess

if ( guess === secretNumber ) {
	alert("You got it right!");
}

//  otherwise check if higher

else if ( guess > secretNumber ){
	alert("Too high, guess again!");
}

//  otherwise check if lower

else {
	alert("Too low! Guess again");
}