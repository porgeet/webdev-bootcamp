var numSquares = 6
	colors = generateRandomColors(numSquares),
	squares = document.querySelectorAll(".square"),
	pickedColor = pickColor(),
	colorDisplay = document.getElementById("color-display"),
	h1 = document.querySelector("h1"),
	messageDisplay = document.querySelector("#message"),
	resetButton = document.querySelector("#reset"),
	easyButton = document.querySelector("#easy-btn"),
	hardButton = document.querySelector("#hard-btn");

easyButton.addEventListener("click", function(){
	numSquares = 3;
	hardButton.classList.remove("selected");
	easyButton.classList.add("selected");
	colors = generateRandomColors(numSquares);
	pickedColor = pickColor();
	colorDisplay.textContent = pickedColor;
	for(i=0; i<squares.length; i++){
		if(colors[i]){
			squares[i].style.backgroundColor = colors[i];
		} else {
			squares[i].style.display = "none";
		}
	}
});

hardButton.addEventListener("click", function(){
	numSquares = 6;
	easyButton.classList.remove("selected");
	hardButton.classList.add("selected");
	colors = generateRandomColors(numSquares);
	pickedColor = pickColor();
	colorDisplay.textContent = pickedColor;
	for(i=0; i<squares.length; i++){
		squares[i].style.backgroundColor = colors[i];
		squares[i].style.display = "block";
	}
});

colorDisplay.textContent = pickedColor;

resetButton.addEventListener("click", function(){
	// generate all new colors
	colors = generateRandomColors(numSquares);
	// pick new random color from array
	pickedColor = pickColor();
	// change colorDisplay to match picked color
	colorDisplay.textContent = pickedColor;
	// change colors of squares
	for(i=0; i<squares.length; i++){
		squares[i].style.backgroundColor = colors[i];
	}
	h1.style.backgroundColor = "steelBlue";
});

for(i=0; i<squares.length; i++){
	// add initial colors to squares
	squares[i].style.backgroundColor = colors[i];
	// add click listener to squares
	squares[i].addEventListener("click", function(){
		// grap color of clicked square
		var clickedColor = this.style.backgroundColor;
		// compare clicked color to pickedColor
		if(clickedColor === pickedColor){
			messageDisplay.textContent = "Correct!";
			resetButton.textContent = "Play again?";
			changeColors(clickedColor);
			h1.style.backgroundColor = clickedColor;
		} else {
			this.style.backgroundColor = "#232323";
			messageDisplay.textContent = "Try again";
		}
	});
}

function changeColors(color){
	// loop through all squares
	for(i=0; i<colors.length; i++){
		// change color to match given color
		squares[i].style.backgroundColor = color;
	}
}

function pickColor(){
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

function generateRandomColors(num){
	// make and array
	var arr = [];
	// repeat num times
	for(i=0; i<num; i++){
		// get random color and puss into arr
		arr.push(randomColor());
	}
	// return arr
	return arr;
}

function randomColor(){
	// pick red from 0 to 255
	var r = Math.floor(Math.random() * 256),
	// pick green from 0 to 255
		g = Math.floor(Math.random() * 256),
	// pick blue from 0 to 255
		b = Math.floor(Math.random() * 256);
	// concatinate rgb(x, x, x) string
	return "rgb(" + r + ", " + g + ", " + b +")"
}