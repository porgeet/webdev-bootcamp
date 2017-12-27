var PassportLocalMongoose	= require("passport-local-mongoose"),
	LocalStrategy 			= require("passport-local"),
	bodyParser				= require("body-parser"),
	mongoose				= require("mongoose"),
	passport				= require("passport"),
	session					= require("express-session"),
	express					= require("express"),
	User					= require("./models/user"),
	app						= express();

mongoose.connect("mongodb://localhost/auth_demo", {useMongoClient: true});
mongoose.Promise = global.Promise;
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true})); // extended uses qs library which parses the url and returns a JSON object, hence ability to use req.body.whatever
app.use(session({
    secret: "Rusty is the best and cutest dog in the world", // used to encode and decode sessions, store in ENV variable, don't make public in a repo
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize()); // start passport
app.use(passport.session()); // run passport.session

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser()); // encoding session data
passport.deserializeUser(User.deserializeUser()); // reading encoded session data

// ====================================
// ROUTES
// ====================================

app.get("/", function(req,res){
	res.render("home");
});

app.get("/secret", isLoggedIn, function(req, res){
	res.render("secret");
});

// Auth Routes
// ====================================

// show sign up form
app.get("/register", function(req,res){
	res.render("register");
});

// handle user signup
app.post("/register", function(req,res){
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

// Login Routes
// ====================================

// login form
app.get("/login", function(req, res){
	res.render("login");
});

// login logic
// passport.authenticate is middleware
app.post("/login", passport.authenticate("local", {
	successRedirect: "/secret",
	failureRedirect: "/login"
}),	function(req, res){
});

// logout
app.get("/logout", function(req, res){
	req.logout(); // passport destroys all user data in the session
	res.redirect("/");
});

// check if a user is logged in
function isLoggedIn(req, res, next) {
	(req.isAuthenticated()) ? next() : res.redirect("/login");
}

app.listen(3000, function(){
	console.log("Server started");
});

