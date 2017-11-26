var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blog_demo", {useMongoClient: true});
mongoose.Promise = global.Promise;

// POST - title, content
var postSchema = new mongoose.Schema({
	title: String,
	content: String
});

var Post = mongoose.model("Post", postSchema);

// USER - email, name
var userSchema = new mongoose.Schema({
	email: String,
	name: String,
	posts: [postSchema] // array of posts following the postSchema
});

var User = mongoose.model("User", userSchema);



// var newUser = new User({
// 	email: "hermionie@brown.edu",
// 	name: "Hermionie Granger"
// });

// newUser.posts.push({
// 	title: "How to brew polyjuice potion",
// 	content: "Just kidding. Go to potions class to learn it!"
// });

// newUser.save(function(err, user){
// 	if(err){
// 		console.log(err);
// 	} else {
// 		console.log(user);
// 	}
// });

// var newPost = new Post({
// 	title: "Reflection on apples",
// 	content: "They are delicious"
// });
// newPost.save(function(err, post){
// 	if(err){
// 		console.log(err);
// 	} else {
// 		console.log(post);
// 	}
// })

User.findOne({name: "Hermionie Granger"}, function(err, user){
	if(err){
		console.log(err);
	} else {
		user.posts.push({
			title: "Three things I really hate",
			content: "Voldemort, Voldemort, Voldemort"
		});
		user.save(function(err, user){
			if(err){
				console.log(err);
			} else {
				console.log(user);
			}
		});
	}
});