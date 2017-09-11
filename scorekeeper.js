// selecting elements
var p1 = document.getElementById("p1"),
	p1Score = 0,
	p1Display = document.getElementById("p1Display"),

	p2 = document.querySelector("#p2"),
	p2Score = 0,
	p2Display = document.getElementById("p2Display"),

	maxScoreDisplay = document.querySelector("p span"),
	numInput = document.querySelector("input"),
	gameOver = false,
	maxScore = 5,
	reset = document.getElementById("reset");

numInput.addEventListener("change", function(){
	maxScoreDisplay.textContent = numInput.value;
	maxScore = Number(this.value); // convert value from string to number so === comparisons below compare number to number
	resetScore();
})

p1.addEventListener("click", function(){
	if(!gameOver){
		p1Score++;
		console.log(p1Score, maxScore);
		if(p1Score === maxScore){
			gameOver = true;
			p1Display.classList.add("winner");
		}
		p1Display.textContent = p1Score;
		
	}
});

p2.addEventListener("click", function(){
	if(!gameOver){
		p2Score++;
		if(p2Score === maxScore){
			gameOver = true;
			p2Display.classList.add("winner");
		}
		p2Display.textContent = p2Score;
		
	}
});

reset.addEventListener("click", function(){
		resetScore();
});

function resetScore(){
	p1Score = 0;
	p2Score = 0;
	p1Display.textContent = p1Score;
	p2Display.textContent = p2Score;
	p1Display.classList.remove("winner");
	p2Display.classList.remove("winner");
	gameOver = false;
}