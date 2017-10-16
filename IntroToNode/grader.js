function average(arr){
	var total = arr.reduce(function(accumilator, currentValue){
		return accumilator + currentValue;
	});
	return Math.round(total/arr.length);
}

var scores = [90, 98, 89, 100, 100, 86, 94];
console.log(average(scores)); // should be 94
var scores2 = [40, 65, 77, 82, 80, 54, 73, 63, 95, 49];
console.log(average(scores2)); // should be 68