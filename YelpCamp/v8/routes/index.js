var express		= require("express"),
	router		= express.Router(),
	passport	= require("passport"),
	User		= require("../models/user");

// Root Route
router.get("/", function(req, res){
	res.render("landing");
});


// show register form
router.get("/register", function(req, res){
	res.render("register");
})

// handle signup logic
router.post("/register", function(req,res){
	var newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, function(err, user){
		if(err){
			console.log(err);
			return res.render("register");
		}
		passport.authenticate("local")(req, res, function(){
			res.redirect("/campgrounds"); 
		}); // only login is reg is successful
	}); 
});

// show longin form
router.get("/login", function(req, res){
	res.render("login");
});

// handling login logic
router.post("/login", passport.authenticate("local", {
	successRedirect: "/campgrounds", 
	failureRedirect: "/login"}), function(req, res){

});

// logout route
router.get("/logout", function(req, res){
	req.logout();
	res.redirect("/campgrounds");
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