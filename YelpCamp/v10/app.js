var express 		= require("express"),
	app 			= express(),
	bodyParser 		= require("body-parser"),
	mongoose 		= require("mongoose"),
	campground		= require("./models/campground"),
	Comment			= require("./models/comment"),
	User			= require("./models/user"),
	passport		= require("passport"),
	LocalStrategy	= require("passport-local"),
	session			= require("express-session"),
	methodOverride	= require("method-override"),
	seedDB			= require("./seeds");

var commentRoutes			= require("./routes/comments"),
	campgroundRoutes		= require ("./routes/campgrounds"),
	indexRoutes				= require("./routes/index");

mongoose.connect("mongodb://localhost/yelp_camp_v6", {useMongoClient: true});
mongoose.Promise = global.Promise;
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");

// seedDB(); // seed the database

// express session
app.use(session({
	secret: "Authentication is awesome", // encryption key
	resave: false,
	saveUninitialized: false
}));


app.use(methodOverride("_method"));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res ,next){
	res.locals.currentUser = req.user;
	next();
}) // passes the user object to all templates including partials

// Requiring Routes
app.use("/", indexRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundRoutes);

app.listen(3000, function(){
	console.log("YelpCamp Server Has Started");
});