var maxTest = [1,40,3,28];

function printReverse(arr){
	for(i = arr.length-1; i >=0; i--){
		console.log(arr[i]);
	}
}

function isUniform(arr){
	var prevItem = arr[0];
	for (i=1; i<arr.length; i++) {
		// check if all items are equal
		if(prevItem !== arr[i]){
			return false;
		}
	}
	return true;
}

function sumArray(arr){
	var sum = 0;
	arr.forEach(function(element){
		sum += element;
	});
	return sum;
}

function max(arr){
	var max = arr[0];
	for (i=1; i<arr.length; i++) {
		if(arr[i] > max){
			max = arr[i];
		}
	}
	return max;
}
