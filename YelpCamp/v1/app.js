var express = require("express"),
	app = express();

app.set("view engine", "ejs");

app.get("/", function(req, res){
	res.render("landing");
});

app.get("/campgrounds", function(req, res){
	var campGrounds = [
		{name: "Salmon Creek", image: "https://farm5.staticflickr.com/4042/4696710011_5cd8fe4927.jpg"},
		{name: "Doors Cove", image: "https://farm9.staticflickr.com/8422/7842069486_c61e4c6025.jpg"},
		{name: "Mountain Goat's Rest", image: "https://farm3.staticflickr.com/2315/3625837878_044be7aa1f.jpg"}
	]
	res.render("campgrounds", {campgrounds: campGrounds});
});

app.listen(3000, function(){
	console.log("YelpCamp Server Has Started");
});