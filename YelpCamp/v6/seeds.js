var Campground 	= require("./models/campground"),
	mongoose 	= require("mongoose"),
	Comment		= require("./models/comment");

var data = [
	{
		name: "Clouds Rest",
		image: "https://farm4.staticflickr.com/3832/9603531635_e348167e39.jpg",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus rhoncus eleifend leo. Donec a tristique elit, non laoreet dolor. Suspendisse gravida, mi ut fringilla fringilla, ipsum elit ultricies neque, luctus sodales lacus ligula eget arcu. Praesent gravida tempor leo, non sagittis tellus elementum in. Etiam eget dapibus lorem, quis pulvinar metus."
	},
	{
		name: "Desert Mesa",
		image: "https://farm9.staticflickr.com/8422/7842069486_c61e4c6025.jpg",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus rhoncus eleifend leo. Donec a tristique elit, non laoreet dolor. Suspendisse gravida, mi ut fringilla fringilla, ipsum elit ultricies neque, luctus sodales lacus ligula eget arcu. Praesent gravida tempor leo, non sagittis tellus elementum in. Etiam eget dapibus lorem, quis pulvinar metus."
	},
	{
		name: "Mojor's Point",
		image: "https://farm9.staticflickr.com/8041/7930201874_6c17ed670a.jpg",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus rhoncus eleifend leo. Donec a tristique elit, non laoreet dolor. Suspendisse gravida, mi ut fringilla fringilla, ipsum elit ultricies neque, luctus sodales lacus ligula eget arcu. Praesent gravida tempor leo, non sagittis tellus elementum in. Etiam eget dapibus lorem, quis pulvinar metus."
	}
]; //data the campgrounds Schema requires
	
function seedDB(){
	// remove all campgrounds
	Campground.remove({}, function(err){
		if(err){
			console.log(err);
		}
		console.log("Removed campgrounds");
		// add as few campgrounds
		data.forEach(function(seed){
			Campground.create(seed, function(err, campground){
				if(err){
					console.log(err);
				} else {
					console.log("added a campground");
					// create a comment
					Comment.create({
						text: "This place is great, but I wish there was internet!",
						author: "Bob the Brain"
					}, function(err, comment){
						if(err){
							console.log(err);
						} else {
							campground.comments.push(comment);
							campground.save();
							// campground is the current created campground, not the Campground model
							console.log("created new comment");
						}						
					});
				}
			});
		});
	});
}

module.exports = seedDB;