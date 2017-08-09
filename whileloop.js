var counter		=	-10;

console.log("PRINT ALL NUMBERS BETWEEN -10 AND 19");

while ( counter <= 19 ){
	console.log(counter);
	counter++;
}

counter = 10;

console.log("PRINT ALL EVEN NUMBERS BETWEEN 10 AND 40");

// this solution is more efficient at this problem as the loop doesn't run for odd numbers
// but if the starting number itself wasn't even then it wouldn't solve the problem

// while ( counter <= 40 ){
// 	console.log(counter);	
// 	counter+=2;
// }

while ( counter <= 40 ){
	if ( counter % 2 === 0 ){
		console.log(counter);	
	}
	counter++;
}

counter = 300;

console.log("PRINT ALL ODD NUMBERS BETWEEN 300 AND 333");

while ( counter <= 333 ){
	if ( counter % 2 !== 0 ){
		console.log(counter);	
	}
	counter++;
}

counter = 5;

console.log("PRINT ALL NUMBERS DIVISABLE BY 5 AND 3 BETWEEN 5 AND 50");

while ( counter <= 50 ){
	if ( counter % 5 === 0 && counter % 3 === 0 ){
		console.log(counter);	
	}
	counter++;
}