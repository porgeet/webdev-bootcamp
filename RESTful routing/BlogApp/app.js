var bodyParser		= require("body-parser"),
expressSanitizer	= require("express-sanitizer"),
methodOverride		= require("method-override"),
mongoose			= require("mongoose")
express				= require("express"),
app					= express();

// APP CONFIG
mongoose.connect("mongodb://localhost/restful_blog_app", {useMongoClient: true});
mongoose.Promise = global.Promise;
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));

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
	Blog.find({}, function(err, foundBlogs){
		if(err){
			console.log(err);
		} else {
			res.render("index", {blogs: foundBlogs});
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
	console.log(req.body.blog.body);
	req.body.blog.body = req.sanitize(req.body.blog.body);
	console.log("================");
	console.log(req.body.blog.body);
	Blog.create(req.body.blog, function(err, newBlog){
		if(err){
			res.render("new");
		} else {
			// then, redirect to index
			res.redirect("/blogs");
		}
	});
	
});

// SHOW ROUTE
app.get("/blogs/:id", function(req, res){
	Blog.findById(req.params.id, function(err, foundBlog){
		if(err){
			res.redirect("/blogs");
		} else {
			res.render("show", {blog: foundBlog});
		}
	});
});

// EDIT ROUTE
app.get("/blogs/:id/edit", function(req, res){
	Blog.findById(req.params.id, function(err, foundBlog){
		if(err){
			res.redirect("/blogs");
		} else {
			res.render("edit", {blog: foundBlog});
		}
	});
	
});

// UPDATE ROUTE
app.put("/blogs/:id", function(req, res){
	req.body.blog.body = req.sanitize(req.body.blog.body);
	Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
		if(err){
			res.redirect("/blogs");
		} else {
			res.redirect("/blogs/" + req.params.id);
		}
	});
});

// DELETE ROUTE
app.delete("/blogs/:id", function(req,res){
	// destroy blog
	Blog.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.redirect("/blogs");
		} else {
			res.redirect("/blogs");
		}
	});
	// redirect somewhere
});

app.listen(3000, function(){
	console.log("Server is running");
});
