var passportLocalMongoose	= require("passport-local-mongoose"),
	LocalStrategy			= require("passport-local"),
	bodyParser				= require("body-parser"),
	mongoose				= require("mongoose"),
	passport				= require("passport")
	express 				= require("express"),
	User					= require("./models/user"),
	app						= express();
	
mongoose.connect("mongodb://localhost/auth_demo", {useMongoClient: true});

app.use(require("express-session")({
	secret: "Purple cats are not a common occurrence",
	resave :false,
	saveUninitialized: false
}));

app.set("view engine", "ejs");
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({extended: true}));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser);

// =============
// ROUTES
// =============

app.get("/", function(req, res){
	res.render("home");
});

app.get("/secret", function(req, res){
	res.render("secret");
});

// Auth Routes

// show sign up form
app.get("/register", function(req, res){
	res.render("register");
});

// handle user sign up
app.post("/register", function(req, res){
	req.body.username
	req.body.password
	User.register(new User({username: req.body.username}), req.body.password, function(err, user){
		if(err){
			console.log(err);
			return res.render("register");
		}
		passport.authenticate("local")(req, res, function(){
			res.redirect("/secret");
		});
	});
});


app.listen(3000, function() {
	console.log("Server started");
});
