var express 	= require("express"),
	Campground	= require("../models/campground"),
	router		= express.Router();


// INDEX - display a list of all campgrounds
router.get("/", function(req, res){
	// get all campgrounds from db
	Campground.find({}, function(err, allCampgrounds){
		if(err){
			console.log(err);
		} else {
			res.render("campgrounds/index", {campgrounds: allCampgrounds});
		}
	});
});

// NEW - display form to make new campground
router.get("/new", function(req, res){
	res.render("campgrounds/new");
});

// CREATE - add new campground to the db
router.post("/", function(req, res){
	// get data from form and build an object
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;
	var newCampground = {
		name: name,
		image: image,
		description: desc
	};
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
router.get("/:id", function(req, res){
	// find the campground with provided id
	Campground.findById(req.params.id)
	.populate("comments") // for each foundCampground fill the "comments" with the info from the ObjectId from the Comment model
	.exec(function(err, foundCampground){
		if(err){
			console.log(err);		
		} else {
			// render show template with that campground
			res.render("campgrounds/show", {campground: foundCampground});	
		}
	});
	
}); // remember campgrounds/:id has to be below /new because new would never be shown if /:id was first as /new would be considered an id as :id can be any string of characters including the word 'new'

module.exports = router;