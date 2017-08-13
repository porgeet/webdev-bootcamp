// explicitly written version
// function isEven(num){
// 	if (num % 2 === 0){
// 		return true
// 	}
// 	return false
// }

function isEven(num){
	return num % 2 === 0; // the result of this statment is either true or false
}

function factorialThis(num){
	var result = 1;
	for(i=2; i <= num; i++){
		result *= i;
	}
	console.log("test");
	return result;
}

function kebabToSnake(str){
	var fixed = str.replace(/-/g, "_");
	return fixed;
}