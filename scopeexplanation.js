var parent = "Hi";

function child(){
	console.log(parent);
	parent = "Bye";
}
child();
console.log(parent);
