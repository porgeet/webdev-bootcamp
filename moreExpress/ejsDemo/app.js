var express	=	require("express"),
	app		=	express(); 

app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", function(req, res){
	res.render("home");
});

app.get("/fallinlovewith/:thing", function(req, res){
	var thing = req.params.thing;
	res.render("love", {thingVar: thing});
});

app.get("/posts", function(req, res){
	var posts = [
		{title:"Post 1", author: "Suzy"},
		{title:"I love JS", author: "Pete"},
		{title:"I have kids", author: "Aaron"}
	];
	res.render("posts", {posts: posts});
});

app.listen(3000, function (req, res) {
	console.log("Server is listening");
});