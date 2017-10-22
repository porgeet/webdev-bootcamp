var express	= require("express"),
	app		= express();

app.get("/", function(req, res){
	res.send("Hi there, welcome to my assignment!");
});

app.get("/", function(req, res){
	res.send("Hi there, welcome to my assignment!");
});

app.get("/speak/:animal", function(req, res){
	var animal = req.params.animal.toLowerCase();
	var sounds = {
		pig: "Oink",
		cow: "Moo",
		dog: "Woof Woof!",
		cat: "I hate you human",
		goldfish: "..."
	}
	var sound = sounds[animal];
	res.send("The " + animal + " says " + sound);
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