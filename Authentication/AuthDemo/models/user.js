var passportLocalMongoose	= require("passport-local-mongoose"),
	mongoose 				= require("mongoose");

var UserSchema = new mongoose.Schema({
	username: String,
	password: String
});

UserSchema.plugin(passportLocalMongoose); // adds passport-local-mongoose methods to the UserSchema

module.exports = mongoose.model("User", UserSchema);