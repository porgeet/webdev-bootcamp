var express 	= require("express"),
	Campground	= require("../models/campground"),
	router		= express.Router(),
	middleware	= require("../middleware"); //if require only points to a directory, by default index.js will be required

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
router.get("/new", middleware.isLoggedIn, function(req, res){
	res.render("campgrounds/new");
});

// CREATE - add new campground to the db
router.post("/", middleware.isLoggedIn, function(req, res){
	// get data from form and build an object
	var name			= req.body.name,
		price			= req.body.price,
		image			= req.body.image,
		desc			= req.body.description,
		author			= {
			id: req.user._id,
			username: req.user.username
		},
		newCampground	= {
			name: name,
			price: price,
			image: image,
			description: desc,
			author: author
		};
	console.log(req.user);

	// create a new campground and save to the db
	Campground.create(newCampground, function(err, newlyCreated){
		if(err){
			console.log(err);
		} else {
			// redirect back to campgrounds page
			console.log(newlyCreated);
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
		if(err || !foundCampground){
			req.flash("error", "Campground not found");
			res.redirect("back");		
		} else {
			// render show template with that campground
			res.render("campgrounds/show", {campground: foundCampground});	
		}
	});
	
}); // remember campgrounds/:id has to be below /new because new would never be shown if /:id was first as /new would be considered an id as :id can be any string of characters including the word 'new'

// EDIT CAMPGROUND ROUTE
router.get("/:id/edit", middleware.checkCampgroundOwnership,  function(req, res){
	Campground.findById(req.params.id, function(err, foundCampground){
		if(err){
			req.flash("error", "Whoa! Campground not found");
		}
		res.render("campgrounds/edit", {campground: foundCampground});
	});
});

// UPDATE CAMPGROUND ROUTE
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
	// find and update the correct campground
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCAmpground){
		if(err){
			res.redirect("/campgrounds");
		} else {
			// redirect to the show page
			res.redirect("/campgrounds/" + req.params.id);
		}
	});

});

// DESTROY CAMPGROUND ROUTE
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
	Campground.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.redirect("/campgrounds");
		} else {
			res.redirect("/campgrounds");
		}
	})
});

module.exports = router;