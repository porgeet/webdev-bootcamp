var movies = [
	{
		title: "Jason Bourne",
		rating: 3.7,
		hasWatched: true
	},
	{
		title: "The Accountant",
		rating: 3.9,
		hasWatched: true
	},
	{
		title: "Generation Iron 2",
		rating: 3.8,
		hasWatched: false
	},
];

for(i=0; i < movies.length; i++){
	if(movies[i].hasWatched){ 
		console.log("I have watched " + "\"" + movies[i].title + "\"" + " - " + movies[i].rating);
	} else {
		console.log("I have not watched " + "\"" + movies[i].title + "\"" + " - " + movies[i].rating);	
	}
}