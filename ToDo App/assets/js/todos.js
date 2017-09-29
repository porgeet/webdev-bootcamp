// Check off specific todos by clicking

$("body").on("click", "li", function(){

	$(this).toggleClass("completed");
	
});

// click on X to delete todo

$("ul").on("click", "span", function(event){
	$(this).parent().fadeOut(500, function(){
		$(this).remove();
	});
	event.stopPropagation();
});


$("input[type='text']").keypress(function(e){
	if(e.which === 13){
		// get text from input
		var todoText =$(this).val();
		$(this).val("");
		// creat new li and add to ul
		$("ul").append("<li><span>X </span>" + todoText + "</li>");
	}
});