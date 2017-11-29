var mongoose = require("mongoose");

// USER - email, name
var userSchema = new mongoose.Schema({
	email: String,
	name: String,
	posts: [{
		type: mongoose.Schema.Types.ObjectId, // uses the objectid as a ref from Post model
		ref: "Post" // model used to populate data
	}] // array of posts following the postSchema
});

module.exports = mongoose.model("User", userSchema);