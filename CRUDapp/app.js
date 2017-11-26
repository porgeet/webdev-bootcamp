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

// mongoose model
var newsSchema = new mongoose.Schema({
	title: String,
	image: String,
	body: String,
	published: {type: Date, default: Date.now}
}); // setup schema for data object

var News = mongoose.model("News", newsSchema); // setup object in collection w/ schema

// listen
app.listen(3000, function() {
	console.log("Server is running!");
});

// ROUTE SETUP

// LANDING PAGE
app.get("/", function(req, res){
	res.render("index");
});

// INDEX ROUTE
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
app.get("/news/new", function(req, res){
	res.render("new");
});

// CREATE ROUTE
app.post("/news", function(req, res){
	req.body.news.body = req.sanitize(req.body.news.body);
	News.create(req.body.news, function(err, foundNews){
		if(err){
			res.render("new");
		} else {
			res.redirect("/news");
		}
	});
});

// SHOW ROUTE
app.get("/news/:id", function(req, res) {
	News.findById(req.params.id, function(err, foundNews){
		if(err){
			res.redirect("/news");
		} else {
			res.render("show", {news: foundNews});			
		}
	});
});

// EDIT ROUTE
app.get("/news/:id/edit", function(req, res){
	News.findById(req.params.id, function(err, foundNews){
		if(err){
			res.redirect("news");
		} else {
			res.render("edit", {news: foundNews});
		}
	});
});

// UPDATE ROUTE
app.put("/news/:id", function(req, res){
	News.findByIdAndUpdate(req.params.id, req.body.news, function(err, updatedNews){
		if(err){
			res.redirect("/news");
		} else {
			res.redirect("/news/" + req.params.id);
		}
	});
});

// DESTROY ROUTE
app.delete("/news/:id", function(req, res){
	News.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.redirect("/news");
		} else {
			res.redirect("/news");
		}
	});
});