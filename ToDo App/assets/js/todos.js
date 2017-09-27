// Check off specific todos by clicking

$("li").click(function(){

	$(this).toggleClass("completed");
	
});

// click on X to delete todo

$("span").click(function(event){
	$(this).parent().fadeOut(500, function(){
		$(this).remove();
	});
	event.stopPropagation();
});


$("input[type='text']").keypress(function(e){
	if(e.which === 13){
		// get text from input
		var todoText =$(this).val();
		// creat new li and add to ul
		
	}
});