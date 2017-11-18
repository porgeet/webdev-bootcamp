var bodyParser	= require("body-parser"),
mongoose		= require("mongoose")
express			= require("express"),
app				= express();

// APP CONFIG
mongoose.connect("mongodb://localhost/restful_blog_app", {useMongoClient: true});
mongoose.Promise = global.Promise;
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

// MONGOOSE MODEL CONFIG
var blogSchema = new mongoose.Schema({
	title: String,
	image: String,
	body: String,
	created: {type: Date, default: Date.now}
});
var Blog = mongoose.model("Blog", blogSchema);

// Blog.create({
// 	title: "Awesome Post",
// 	image: "https://yt3.ggpht.com/-Y-j6XeBB2nE/AAAAAAAAAAI/AAAAAAAAAAA/5Ls6UKoxbT4/s900-c-k-no-mo-rj-c0xffffff/photo.jpg",
// 	body: "This is the most awesome post ever, because ^^. Yeah!",
// }, function(err, post){
// 	if(err){
// 		console.log(err);
// 	} else {
// 		console.log("worked");
// 		console.log(post);
// 	}
// });

// RESTFUL ROUTES

app.get("/", function(req, res){
	res.render("index");
});

// INDEX ROUTE
app.get("/blogs", function(req, res){
	Blog.find({}, function(err, blogs){
		if(err){
			console.log(err);
		} else {
			res.render("index", {blogs: blogs});
			console.log(blogs);
		}
	});
});

// NEW ROUTE
app.get("/blogs/new", function(req, res){
	res.render("new");
});

// CREATE ROUTE
app.post("/blogs", function(req, res){
	// create blog
	Blog.create(req.body.blog, function(err, newBlog){
		if(err){
			res.render("new");
		} else {
			res.redirect("/blogs");
		}
	});
	// then, redirect to index
});

app.listen(3000, function(){
	console.log("Server is running");
});
