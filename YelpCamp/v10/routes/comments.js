var express		= require("express"),
	router 		= express.Router({mergeParams: true}),
	Campground	= require("../models/campground"),
	Comment		= require("../models/comment");

// Comments New
router.get("/new", isLoggedIn, function(req, res){
	// find campground by id

	console.log(req.params.id);
	Campground.findById(req.params.id, function(err, campground){
		if(err){
			console.log(err);
		} else {
			res.render("comments/new", {campground: campground});
		}
	});

});

// Comments Create
router.post("/", isLoggedIn, function(req,res){
	// lookup campground with id
	Campground.findById(req.params.id, function(err, campground){
		if(err){
			console.log(err);
			res.redirect("/campgrounds");
		} else {
			// create new comment
			Comment.create(req.body.comment, function(err, comment){
				if(err){
					console.log(err);
				} else {
					// add username and id to comment
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					// save comment
					comment.save();
					// connect new comment to campground
					campground.comments.push(comment);
					campground.save();
					console.log(comment);
					// redirect to campground show page
					res.redirect("/campgrounds/" + campground._id);
				}
			});
		}
	});
});

// login middleware
function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		// isAuthenticated is a part of passport, just undocumented :P
		return next();
	}
	res.redirect("/login");
}

module.exports = router;