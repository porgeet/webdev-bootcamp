var express = require("express"),
	app = express(),
	bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.get("/", function(req, res){
	res.render("landing");
});

var campGrounds = [
		{name: "Salmon Creek", image: "https://farm5.staticflickr.com/4042/4696710011_5cd8fe4927.jpg"},
		{name: "Doors Cove", image: "https://farm9.staticflickr.com/8422/7842069486_c61e4c6025.jpg"},
		{name: "Mountain Goat's Rest", image: "https://farm3.staticflickr.com/2315/3625837878_044be7aa1f.jpg"},
		{name: "Salmon Creek", image: "https://farm5.staticflickr.com/4042/4696710011_5cd8fe4927.jpg"},
		{name: "Doors Cove", image: "https://farm9.staticflickr.com/8422/7842069486_c61e4c6025.jpg"},
		{name: "Salmon Creek", image: "https://farm5.staticflickr.com/4042/4696710011_5cd8fe4927.jpg"},
		{name: "Doors Cove", image: "https://farm9.staticflickr.com/8422/7842069486_c61e4c6025.jpg"},
		{name: "Mountain Goat's Rest", image: "https://farm3.staticflickr.com/2315/3625837878_044be7aa1f.jpg"},
		{name: "Salmon Creek", image: "https://farm5.staticflickr.com/4042/4696710011_5cd8fe4927.jpg"},
		{name: "Doors Cove", image: "https://farm9.staticflickr.com/8422/7842069486_c61e4c6025.jpg"},
		{name: "Mountain Goat's Rest", image: "https://farm3.staticflickr.com/2315/3625837878_044be7aa1f.jpg"}
	]

app.get("/campgrounds", function(req, res){
	
	res.render("campgrounds", {campgrounds: campGrounds});
});

app.get("/campgrounds/new", function(req, res){
	res.render("new");
});

app.post("/campgrounds", function(req, res){
	// get data from form and add to campground array
	var name = req.body.name;
	var image = req.body.image;
	var newCampground = {
		name: name,
		image: image
	}
	campGrounds.push(newCampground)
	// redirect back to campgrounds page
	res.redirect("/campgrounds"); // by default redirects are GET requests, so it will be a different request than this POST
});

app.listen(3000, function(){
	console.log("YelpCamp Server Has Started");
});