var counter		=	-10;

console.log("PRINT ALL NUMBERS BETWEEN -10 AND 19");

while ( counter <= 19 ){
	console.log(counter);
	counter++
}

counter = 10;

console.log("PRINT ALL EVEN NUMBERS BETWEEN 10 AND 40");

while ( counter >= 10 && counter <= 40 ){
	if ( counter % 2 === 0 ){
		console.log(counter);	
	}
	counter++
}

counter = 300;

console.log("PRINT ALL ODD NUMBERS BETWEEN 300 AND 333");

while ( counter >= 300 && counter <= 333 ){
	if ( counter % 2 !== 0 ){
		console.log(counter);	
	}
	counter++
}

counter = 5;

console.log("PRINT ALL NUMBERS DIVISABLE BY 5 AND 3 BETWEEN 5 AND 50");

while ( counter >= 5 && counter <= 50 ){
	if ( counter % 5 === 0 && counter % 3 === 0 ){
		console.log(counter);	
	}
	counter++
}