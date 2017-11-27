var express 	= require("express"),
	app 		= express(),
	bodyParser 	= require("body-parser"),
	mongoose 	= require("mongoose"),
	Campground	= require("./models/campground");


mongoose.connect("mongodb://localhost/yelp_camp", {useMongoClient: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// Campground.create({
// 	name: "Bear Pass", 
// 	image: "https://cdn.pixabay.com/photo/2015/07/10/17/24/night-839807_960_720.jpg",
// 	description: "Bears live here, so be bloody careful ffs!"
// }, function(err, campground){
// 	if(err){
// 		console.log(err);
// 	} else {
// 		console.log("newly created campground:");
// 		console.log(campground);
// 	}
// });

app.get("/", function(req, res){
	res.render("landing");
});

// INDEX - display a list of all campgrounds
app.get("/campgrounds", function(req, res){
	// get all campgrounds from db
	Campground.find({}, function(err, allCampgrounds){
		if(err){
			console.log(err);
		} else {
			res.render("index", {campgrounds: allCampgrounds});
		}
	});
	// res.render("campgrounds", {campgrounds: campGrounds});
});

// NEW - display form to make new campground
app.get("/campgrounds/new", function(req, res){
	res.render("new");
});

// CREATE - add new campground to the db
app.post("/campgrounds", function(req, res){
	// get data from form and build an object
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;
	var newCampground = {
		name: name,
		image: image,
		description: desc
	}
	// create a new campground and save to the db
	Campground.create(newCampground, function(err, newlyCreated){
		if(err){
			console.log(err);
		} else {
			// redirect back to campgrounds page
			res.redirect("/campgrounds");
		}
	});
	
	// res.redirect("/campgrounds"); // by default redirects are GET requests, so it will be a different request than this POST
});

// SHOW - shows more info about one campground
app.get("/campgrounds/:id", function(req, res){
	// find the campground with provided id
	Campground.findById(req.params.id, function(err, foundCampground){
		if(err){
			console.log(err);		
		} else {
			// render show template with that campground
			res.render("show", {campground: foundCampground});	
		}
	});
	
}); // remember campgrounds/:id has to be below /new because new would never be shown if /:id was first as /new would be considered an id

app.listen(3000, function(){
	console.log("YelpCamp Server Has Started");
});