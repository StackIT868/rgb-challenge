/*keep track of mode / number of squares*/
var numSquares = 6;
/*colours*/
var colors = [];

/*select the winning colour*/
var pickedColor;



/*SELECTORS*/

//select each square
var squares = document.querySelectorAll(".square");

/*display the winning colour*/
var colorDisplay = document.getElementById("colorDisplay");

/*display message correct / try again*/
var messageDisplay = document.getElementById("message");

/*change h1 color when correct color is chosen*/
var h1 = document.querySelector("h1");

/*reset button declaration original*/
var resetButton = document.querySelector("#reset");

/*modeButtons = easy and hard buttons declared*/
var modeButtons = document.querySelectorAll(".mode");



/*initialize everything on page load*/
init();


/*reset button refactored*/
resetButton.addEventListener("click", function(){
    reset();
});


/*FUNCTIONS*/

function init(){
    /*MODE BUTTON LISTENERS*/
    setupModeButtons();

    /*SQUARE FUNCTIONALITY*/
    setupSquares();

    /*RESET THE SCREEN*/
    reset();
}


function setupModeButtons(){
    for(var i=0; i<modeButtons.length; i++){
        modeButtons[i].addEventListener("click", function(){
            //remove selected class from both buttons
            modeButtons[0].classList.remove("selected");
            modeButtons[1].classList.remove("selected");
            //add selected class to the clicked button
            this.classList.add("selected");
            //figure out how many squares to show
            /* this.textContent ==="Easy" ? numSquares = 3: numSquares = 6;*/
            if(this.textContent === "Easy"){
                numSquares = 3;
            }else{
                numSquares = 6;
            }
            reset();
        });
    }
}



function setupSquares(){
    //loop through the squares
    for(var i=0; i<squares.length; i++){
        //assign initial color to squares
        /*squares[i].style.background = colors[i];*/

        //add click listeners to squares
        squares[i].addEventListener("click", function(){
            //grab color of clicked square
            var clickedColor = (this.style.background);
            //compare color to pickedColor
            if(clickedColor === pickedColor){  //user wins
                //display message
                messageDisplay.textContent = "Correct";
                //change new colours button to play again button (text)
                resetButton.textContent = "Play Again?";
                //change all colours to winning color
                changeColors(clickedColor);
                //change h1 background to winning color
                h1.style.background = clickedColor;
                //change message colour if correct / wrong
                messageDisplay.classList.add("correct");
                messageDisplay.classList.remove("wrong");
            }else{
                //change to background color
                this.style.background = "#232323";
                //display message
                messageDisplay.textContent = "Try Again";
                //change message colour if correct / wrong
                messageDisplay.classList.add("wrong");
                messageDisplay.classList.remove("correct");
            }
        });
    }
}



function reset(){
    //generate all new colours
    colors = generateRandomColors(numSquares);
    //pick a new random color from array
    pickedColor = pickColor();
    //change colorDisplay to match pickedColor
    colorDisplay.textContent = pickedColor;
    //only shows "play again" if user wins otherwise show "new colours"
    resetButton.textContent = "New Colours";
    //clear display message
    messageDisplay.textContent = "";
    //change colours of squares
    for(var i=0; i<squares.length; i++){
        //if there is a color
        if(colors[i]){
            //show all squares
            squares[i].style.display = "block";
            //change colors
            squares[i].style.background = colors[i];
        }else{
            //if in easy mode, hide bottom 3 squares
            squares[i].style.display = "none";
        }

    }
    //change background color to original state
    h1.style.background = "#4682B4";
}



/*if correct answer, change all squares to winning colour*/
function  changeColors(color){
    //loop through all squares
    for(var i=0; i<squares.length; i++){
        //change each color to match winning color
        squares[i].style.background = color;
    }
}


/*random color picker*/
function pickColor(){
    //pick a random number 0 - 6
    var random = Math.floor(Math.random() * colors.length);
    return colors[random];
}

/*random color array generator*/
function generateRandomColors(num){
    //make array
    var arr = [];
    //repeat num times
    for(var i=0; i<num; i++){
        //get random color and push into array
        arr.push(randomColor());
    }
    //return that array
    return arr;
}


/*generate random color*/
function randomColor(){
    //pick a red from 0 - 255
    var r =Math.floor(Math.random() * 256);
    //pick a green from 0 - 255
    var g = Math.floor(Math.random() * 256);
    //pick a blue from 0 - 255
    var b = Math.floor(Math.random() * 256);
    //constructing the color string
    return "rgb("+r+", "+g+", "+b+")";
}

