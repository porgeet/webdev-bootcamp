var mongoose = require("mongoose");
mongoose.Promise = global.Promise;

mongoose.connect("mongodb://localhost/cat_app", {useMongoClient:true}); // creates a db called cat_app, and uses it if exists 

var catSchema = new mongoose.Schema({
	name: String,
	age: Number,
	temperament: String
}); // define how a cat object will look

var Cat = mongoose.model("Cat", catSchema); // create Cat model

// adding a new cat to the db

// var george = new Cat({
// 	name: "Mrs Norris",
// 	age: 7,
// 	temperament: "Evil"
// });

// george.save(function(err, cat){
// 	if(err){
// 		console.log("Something went wrong");
// 	} else {
// 		console.log("We just saved a cat to the db:");
// 		console.log(cat);
// 	}
// });

Cat.create({
	name: "Snow White",
	age: 15,
	temperament: "Bland"
}, function(err, cat){
	if(err){
		console.log(err);
	} else {
		console.log(cat);
	}
}); // create() one of multiple methods on the cat model

// retrieve all cats from the db and console.log each one

Cat.find({}, function(err, cats){
	if(err){
		console.log("oh no error:");
		console.log(err);
	} else {
		console.log("all the cats!");
		console.log(cats);
	}
}); // find() another method on the Cat model
