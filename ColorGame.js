var maxSquares = 9;
var numSquares = 9;
var iniColors = [];
var pickedColor;
var hintOrder = [];
var square = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var message = document.getElementById("message");
var h1 = document.querySelector("h1");
var resetButton = document.getElementById("reset");
var mode = document.querySelectorAll(".mode");
var hint = document.getElementById("hint");

colorDisplay.textContent = pickedColor;

initial();
// initial condition
function initial(){
	setbtnControl();	
	setIniSquares();
	reset();
}
// add event to Btn
function setbtnControl(){
	// select the mode (Easy/Medium/Hard)
	for(var i = 0; i < mode.length; i++){
		mode[i].addEventListener("click", function(){
			if(this.textContent === "Easy")
				numSquares = 3;
			else if(this.textContent === "Medium")
				numSquares = 6;
			else
				numSquares = 9;
			mode[0].classList.remove("selected");
			mode[1].classList.remove("selected");
			mode[2].classList.remove("selected");
			this.classList.add("selected");
			reset();
		})
	}
	resetButton.addEventListener("click",reset);
	hint.addEventListener("click",getHint);	
}

// Give hint: remove one error square until two left
function getHint(){
	if(hintOrder.length > 1){
		square[hintOrder[0]].style.backgroundColor = "#232323";
		square[hintOrder[0]].style.display = "inline-block";
		hintOrder.splice(0,1);
	}
}

// randomly order error squares
function orderHint(){
	var errSquare = [];
	var temp = [];
	for(var i = 0; i < numSquares; i++){
		temp[i] = false;
	}
	while(errSquare.length != numSquares-1){
		var randHintNum = Math.floor(Math.random() * numSquares);
		if(temp[randHintNum] == false && square[randHintNum].style.backgroundColor != pickedColor){
			errSquare.push(randHintNum);
			temp[randHintNum] = true;
		}
	}
	return errSquare;
}

// initial color of squares
function setIniSquares(){
	for(var block = 0; block < numSquares; block++){
		// add initial colors to squares
		square[block].style.backgroundColor = iniColors[block];
		// add click listeners to squares
		square[block].addEventListener("click", judgeColor);
	}
}
// Judge if the picked Color is correct 
function judgeColor(){
	var clickedColor = this.style.backgroundColor;
	if(clickedColor === pickedColor){
		message.textContent = "Correct!!!";
		resetButton.textContent = "Play Again";
		// change all squares to correct color
		changeColors(clickedColor);
		// initial the hint
		hintOrder = [];
	}
	else{
		// remove the hint of error square from hintOrder when it is clicked
		for(var i = 0; i < hintOrder.length; i++){
			if(clickedColor == square[hintOrder[i]].style.backgroundColor)
				hintOrder.splice(i,1);
		}
		this.style.backgroundColor = "#232323";
		message.textContent = "Try Again!!!";
	}
}
//random pick color from the square to be the target
function pickColor() {
	var random = Math.floor(Math.random() * iniColors.length);
	return iniColors[random];
}
// Change all squares to correct color
function changeColors(color){
	for(var i = 0; i < numSquares; i++){
		square[i].style.backgroundColor = color;
		h1.style.backgroundColor = color;
	}
}
//generate num randomcolors
function randomColors(num){
	var ranColor = [];
	for(var i = 0; i < num ; i++){
		ranColor[i] = generateRandomColors();
	}
	return ranColor;
}
// randomly choose the RGB color
function generateRandomColors(){
	var  r = Math.floor(Math.random()*256);
	var  g = Math.floor(Math.random()*256);
	var  b = Math.floor(Math.random()*256);
	return "rgb(" + r + ", " + g + ", " +   b + ")";
}
// reset the game
function reset(){
	iniColors = randomColors(numSquares);
	pickedColor = pickColor();
	colorDisplay.textContent = pickedColor;
	for(var block = 0; block < maxSquares; block++){
		if(block < numSquares){
			square[block].style.backgroundColor = iniColors[block];
			square[block].style.display = "block";
		}
		else
			square[block].style.display = "none";
	}	
	h1.style.backgroundColor = "steelblue";
	resetButton.textContent = "New Colors";
	message.textContent = "";
	hintOrder = orderHint();
}
	