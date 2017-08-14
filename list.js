var todos = [];

var input = prompt("What would you like to do?");

while(input !== "quit"){
	if(input === "list"){
		listTodos();
	} else if (input === "new"){
		addTodo();
	} else if (input === "delete"){
		deleteTodo();
	}
	// ask again for new input
	var input = prompt("What would you like to do?");
}

console.log("oh you quit the app");

function listTodos(){
	console.log("***********");
	todos.forEach(function(todo, index){
		console.log(index + ": " + todo);
	});
	console.log("***********");
}

function addTodo(){
	console.log("New todo added");
	// ask for new todo
	var newTodo = prompt("Enter new to do");
	// add to todos array
	todos.push(newTodo);
}

function deleteTodo(){
	// ask for index to be deleted
	var index = prompt("Enter the index of the todo to delete");
	// delete that todo
	todos.splice(index, 1);
	console.log("Deleted todo");
}