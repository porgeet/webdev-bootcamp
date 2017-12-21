var PassportLocalMongoose	= require("passport-local-mongoose"),
	LocalStrategy 			= require("passport-local"),
	bodyParser				= require("body-parser"),
	mongoose				= require("mongoose"),
	passport				= require("passport"),
	session					= require("express-session"),
	express					= require("express"),
	User					= require("./models/user"),
	app						= express();

mongoose.connect("mongodb://localhost", {useMongoClient: true});

app.set("view engine", "ejs");
app.use(passport.initialize());
app.use(passport.session());
app.use(session({
	secret: "Super poo poo pants up in here", // encryption key, should be stored in ENV var. NEVER pushed to repo
	resave: false,
	saveUninitialized: false
}));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/", function(req,res){
	res.render("home");
});

app.get("/secret", function(req, res){
	res.render("secret");
});

app.listen(3000, function(){
	console.log("Server started");
});