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
	res.send("MEOW!");
});
//  Tell Express to listen for requests (start server)
app.listen(3000, function(){
	console.log("Example app listening on port 3000!");
});