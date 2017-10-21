var express = require ("express");
var app = express();

//  "/" => "Hi there!"
app.get("/", function(req, res){
	res.send("Hi there!");
});
//  "/bye" => "Bye!"
app.get("/bye", function(req, res){
	res.send("Bye!");
});
//  "/dog" => "MEOW!"
app.get("/dog", function(req, res){
	console.log("Someone made a request to /dog");
	res.send("MEOW!");
});
//  "*" (any route not explicitly defined) => "You're a star"
app.get("*", function(req, res){
	res.send("You are a star");
});
//  Tell Express to listen for requests (start server)
app.listen(3000, function(){
	console.log("Example app listening on port 3000!");
});