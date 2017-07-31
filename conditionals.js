var age = Number(prompt("What is your age?"));

// If age is negative
if ( age < 0 ) {
	console.log("Error!");
// If age is exactly 21
} else if ( age === 21 ) {
	console.log("Happy 21st birthday!");
// If age is odd
//(not evenly divisible by two)
} else if ( age % 2 !==0 ) {
	console.log("Your age is odd");
// If age is a perfect square
} else if ( age % Math.sqrt(age) === 0 ) {
	console.log("OMG perfect square!");
}