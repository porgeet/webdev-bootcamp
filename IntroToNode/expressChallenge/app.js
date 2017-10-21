var express	= require("express"),
	app		= express();

app.get("/", function(req, res){
	res.send("Hi there, welcome to my assignment!");
});

app.get("/", function(req, res){
	res.send("Hi there, welcome to my assignment!");
});

app.get("/speak/:animal", function(req, res){
	var animalName = req.params.animal;
	if(animalName === "pig"){
		res.send("The " + animalName + " says 'Oink'");
	} else if(animalName === "cow"){
		res.send("The " + animalName + " says 'Moo'");
	} else if(animalName === "dog"){
		res.send("The " + animalName + " says 'Woof Woof!'");
	} else {
		res.send("What?");
	}
});

app.get("/repeat/:word/:num", function(req, res){
	var num = parseInt(req.params.num);
	var word = req.params.word;
	var phrase = "";
	for(i=0; i<num; i++){
		phrase += word + " ";
	}
	res.send(phrase);
});
app.get("*", function(req, res){
	res.send("Sorry, page not found... What are you doing with you life?");
});

app.listen(3000, function(){
	console.log("app started");
});