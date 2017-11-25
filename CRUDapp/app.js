// REQUIRE PACKAGES
var expressSanitizer	= require("express-sanitizer"),
	methodOverride		= require("method-override"),
	bodyParser			= require("body-parser"),
	mongoose			= require("mongoose"),
	express				= require("express"),
	app					= express();

// APP CONFIG
mongoose.connect("mongodb://localhost/crudapp", {useMongoClient: true}); // setup db
mongoose.Promise = global.Promise; // replace mongoose promise
app.set("view engine", "ejs"); // set templating engine
app.use(express.static("public")); // set static file directory
app.use(bodyParser.urlencoded({extended: true})); // parsing body
app.use(expressSanitizer()); // sanitize user input
app.use(methodOverride("_method")); // allow other methods on HTML forms

// MONGOOSE MODEL CONFIG
var newsSchema = new mongoose.Schema({
	title: String,
	image: String,
	body: String,
	published: {type: Date, default: Date.now}
}); // setup schema for data object

var News = mongoose.model("News", newsSchema); // setup object in collection w/ schema

// LISTEN
app.listen(3000, function() {
	console.log("Server is running!");
});

// ROUTE SETUP

// INDEX ROUTE
app.get("/", function(req, res){
	res.render("index");
});

// NEWS ROUTE
app.get("/news", function(req, res){
	News.find({}, function(err, foundNews){
		if(err){
			console.log(err);
		} else {
			res.render("news", {news: foundNews});
		}
	});
});

// NEW ROUTE
app.get("/news/new", function(req,res){
	res.render("new");
});