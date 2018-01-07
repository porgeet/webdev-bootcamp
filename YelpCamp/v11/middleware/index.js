// all the middleware goes here
var middlewareObj	= {},
	Comment			= require("../models/comment.js"),
	Campground		= require("../models/campground.js");

// check campground opwnership
middlewareObj.checkCampgroundOwnership = function(req, res, next){
	if(req.isAuthenticated()){
		Campground.findById(req.params.id, function(err, foundCampground){
			if(err || !foundCampground){
				//!foundCampground is handling the scenario the found campground could return null. Null is falsy so 'not false' is true
				req.flash("error", "Campground not found");
				res.redirect("back");
			} else {
				// does user own the campground?
				// .equals() is a mongoose function
				if(foundCampground.author.id.equals(req.user._id)){
					next();
				} else {
					req.flash("error", "You don't have permission to do that");
					res.redirect("back");
				}
			}
		});
	} else {
		req.flash("error", "You need to be logged in to do that");
		res.redirect("back");
	}
}

// check comment opwnership
middlewareObj.checkCommentOwnership = function(req, res, next){
	if(req.isAuthenticated()){
		Comment.findById(req.params.comment_id, function(err, foundComment){
			if(err || !foundComment){
				req.flash("error", "Comment not found");
				res.redirect("back");
			} else {
				// does user own the comment?
				// .equals() is a mongoose function
				if(foundComment.author.id.equals(req.user._id)){
					//req.user is a passport created obj
					next();
				} else {
					req.flash("error", "You don't have permission to do that");
					res.redirect("back");
				}
			}
		});
	} else {
		req.flash("error", "You need to be logged in to do that");
		res.redirect("back");
	}
}

middlewareObj.isLoggedIn = function(req, res, next){
	if(req.isAuthenticated()){
		// isAuthenticated is a part of passport, just undocumented :P
		return next();
	}
	req.flash("error", "You need to be logged in to do that");
	res.redirect("/login");
}

module.exports = middlewareObj;