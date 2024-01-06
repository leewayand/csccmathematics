
let $jQ = jQuery.noConflict();

	let theBeginButton, theNextButton, theSubmitButton, theTrueButton, theFalseButton;
	let theFeedbackBox, theQuestionArea, thePopDisplayBox, theSampleDisplayBox, theAnsBox;
	let theScoreBar, piecesURL = "../library/pieces/";

	let functionIndex = 99, numberOfFunctions = 3;
	let theGraph, theDomainLeft = -7, theDomainRight = 7, theCoefficients = [0,1,2,3,4,5,6,7,8,9], coefficientsSet = false;
	let board, vAxis, hAxis, leftSymbolBox, rightSymbolBox;
	let L1, L1p1, L1p2;
	let hAxisLabel = "x", vAxisLabel = "f(x)";
	let functionNames = ["A", "F", "B", "M", "f", "g", "h", "y", "x", "k", "T", "W", "w", "p", "P", "L", "K"];
	let variableNames = ["t", "n", "t", "Y", "d", "h", "T", "x", "t", "m", "A", "f", "p", "G", "x", "v", "H"];
	let currentFuncName = "f", currentVarName = "x", currentDValue = 0, currentRValue = 0;
	let leftIntNumber = 0, rightIntNumber = 0, leftOpen = true, rightOpen = true, leftSymbol = "(", rightSymbol = ")", symbolMode = true;
	let theInterval, theTestNumber;
	let pointErrorTolerance = 0.3;
	let winningScore = 10;
	
	

	let theCorrectColor, theWrongColor, theMiddleColor, theFeedbackColor, theAnswerColor, theIntColor;
	let theCorrectSound, theWrongSound, theCorrectAns = true;
	let checkmark_img = "marks_y.png", xmark_img = "marks_x.png", winner_img = "winner.png";
	let checkmark_url = piecesURL + checkmark_img, xmark_url = piecesURL + xmark_img, winner_url = piecesURL + winner_img;
	let winner_array = [piecesURL + "w.png", piecesURL + "i.png", piecesURL + "n.png", piecesURL + "n.png", piecesURL + "e.png", piecesURL + "r.png"];

	let currentAnswer = 0, playerScore = 0, theBodyColor = "#000088", theBarColor = "#d97e58", theScoreBoxColor = "#0000aa";

	let theSampleMean = 0;
	
	
	
	let subjectArray = ["GPA", "Miles Per Gallon (mpg)", "Height of Volleyball Players", "Height of Trees",
                               "Height of Roller Coasters", "Running Time", "Baking Time", "Speed (mph)", "Weight of Pigs",
                               "Weight of Cows", "Weight of Football Players", "Length of Hair", "Inseam of Pants",
                               "Weight of Recycling Bin", "Weight of Lawn Waste Bag", "Gallons of Water",
                               "Number of Carns in Recycling Bin", "Length of Car", "Width of Car", "Weight of Car", "Car Head Room",
                               "Car Leg Room", "Volume of Pool", "Gallons of Water per Shower", "Annual Shower",
                               "Price of Tickets","Number of Children"];

$jQ(function() {

	theNextButton = $jQ("#theResponseNext");
	//theTrueButton = $jQ("#theResponseTrue");
	//theFalseButton = $jQ("#theResponseFalse");
	theSubmitButton = $jQ("#theResponseSubmit");
	theAnsBox = $jQ("#theAnsBox"); 


	thePopDisplayBox = $jQ("#MDTPopData");
	theSampleDisplayBox = $jQ("#MDTSampleData");
	theFeedbackBox = $jQ("#theMiddleFeedback");
	theQuestionArea = $jQ("#theRightTop");

	theScoreBar = [$jQ("#theScoreTitleBox"), $jQ("#theScoreBox1"), $jQ("#theScoreBox2"), $jQ("#theScoreBox3"), $jQ("#theScoreBox4"), $jQ("#theScoreBox5"), $jQ("#theScoreBox6"), $jQ("#theScoreBox7"), $jQ("#theScoreBox8"), $jQ("#theScoreBox9"), $jQ("#theScoreBox10")];

	
	theCorrectColor = "#00dd00";
	theWrongColor = "#F7819F";
	theMiddleColor = "#ffffff";
	theFeedbackColor = "#dddddd";
	theCorrectSound = $jQ("#audioCorrect");
	theWrongSound = $jQ("#audioWrong");
	theAnswerColor = "#999999";
	theIntColor = "#aa4499";
	
	
	
	
	
	resetGame();
	
});




	//--------------[ resetGame Begin ] -----------------------------------------------
	//---------------------------------------------------------------------------------	
	function resetGame() {
		deactivateNextButton();
		deactivateSubmitButton();
		
		theFeedbackBox.off();
		
		
		for($i = 1; $i <= 10; $i++) {
			theScoreBar[$i].css({"background-color" : theScoreBoxColor});
			theScoreBar[$i].css({"background-image" : "url()"});
		}
		
		playerScore = 0;
		theFeedbackBox.css({"background-color" : theFeedbackColor});
		theFeedbackBox.html(" ");
		
		//-------Initialize ------------------------------------------
		nextQuestion();
		activateSubmitButton();
		theAnsBox.val("");
		

	}
	//---------------------------------------------------------------------------------		
	//--------------[ resetGame End ] -------------------------------------------------	








	//--------------[ winningGame Begin ] ---------------------------------------------
	//---------------------------------------------------------------------------------	
	function winningGame() {
		let i;
		
		deactivateNextButton();
	
		for(i = 0; i < 6; i++) {
			theScoreBar[10 - i].css({"background-image" : "url(" + winner_array[i] + ")"});	
		}
	
		theFeedbackBox.html("<span class='beginText'> P R E S S  T O  R E P L A Y</span>");
		theFeedbackBox.on("click", resetGame);
	}
	//---------------------------------------------------------------------------------	
	//--------------[ winningGame Begin ] ---------------------------------------------		
	
	
	
	function resetButtons() {

	}
	
	
	
	
	
	
	
	function activateNextButton() {
		theNextButton.css({"opacity" : "1"});
		theNextButton.on("click", nextButtonClicked); 
	}

	
	function deactivateNextButton() {
		theNextButton.css({"opacity" : "0"});
		theNextButton.off(); 	
	}
	


	
	function activateSubmitButton() {
		//theTrueButton.on("click", submitButtonClicked); 
		//theFalseButton.on("click", submitButtonClicked); 
		theSubmitButton.on("click", submitButtonClicked);
	}

	
	function deactivateSubmitButton() {
		//theTrueButton.off(); 
		//theFalseButton.off(); 
		theSubmitButton.off();
	}


	






	
	
	
	//--------------[ nextButtonClicked Begin ] ---------------------------------------
	//---------------------------------------------------------------------------------	
	function nextButtonClicked(event) {
		//console.log("inside nextButtonClicked");
		activateSubmitButton();
		deactivateNextButton();
		
		theCorrectSound.trigger("pause");
		theCorrectSound.prop("currentTime", 0);
		theWrongSound.trigger("pause");
		theWrongSound.prop("currentTime", 0);
		
		nextQuestion();	
		
		theFeedbackBox.css({"background-color" : theFeedbackColor});
		theFeedbackBox.html(" Get 10 in a row.");	
		
		theAnsBox.val("");
	}
	//---------------------------------------------------------------------------------	
	//--------------[ nextButtonClicked End ] -----------------------------------------	

	






	//--------------[ submitButtonClicked Begin ] -------------------------------------
	//---------------------------------------------------------------------------------
	function submitButtonClicked(event) {
		//console.log("inside submitButtonClicked");
		let playerMean = 0;

		deactivateSubmitButton()
		activateNextButton();
		
		//thisTarget = (event.currentTarget.id == "theTrue");
		playerMean = theAnsBox.val();
	
		
		if (Math.abs(playerMean - theSampleMean) <= 0.0005) {
			theCorrectSound.trigger("play");
			playerScore++;
			theCorrectAns = true;
			
			theFeedbackBox.css({"background-color" : theCorrectColor});
			theFeedbackBox.html("<p>" + playerMean + " is the sample mean to to the nearest thousandths place.</p>");
	
	
			if (playerScore == winningScore) { 
				updateScoreBoard(playerScore);
				winningGame();
		
			} else {
				updateScoreBoard(playerScore);
			}
			
			
		} else {
			theWrongSound.trigger("play");
			playerScore = 0;
			theCorrectAns = false;
			theFeedbackBox.css({"background-color" : theWrongColor});
			theFeedbackBox.html("<p>" + playerMean + " is not the sameple mean to to the nearest thousandths place.</p>");
			updateScoreBoard(playerScore);
		}
		
		
		

		
	}
	//---------------------------------------------------------------------------------	
	//--------------[ submitButtonClicked End ] ---------------------------------------
	
	


	
	




	//--------------[ nextQuestion Begin ] --------------------------------------------
	//---------------------------------------------------------------------------------	
	function nextQuestion() {
		//console.log("inside nextQuestion");




	let numberOfPop = Math.floor(numberBetween(30,50));
	let numberOfSample = Math.floor(numberBetween(7, 15));
	let Indicies = [...Array(numberOfPop).keys()];
	
	shuffle(Indicies);
	sampleIndicies = Indicies.slice(0, numberOfSample);
	

	
	
	let populationArray = [];
	let sampleArray = [];

	for(i = 0; i < numberOfPop; i++) {
		
		thisDataValue = Math.floor(numberBetween(3,90));
		populationArray.push(thisDataValue);
		
	}

	
	for(i = 0; i < numberOfSample; i++) {
		
		sampleArray.push(populationArray[sampleIndicies[i]]);
		
	}


	let popList = populationArray.join(", ");
	let sampleList = sampleArray.join(", ");

	theSampleMean = ss.mean(sampleArray);






	thePopDisplayBox.html(popList);
	theSampleDisplayBox.html(sampleList);


	theFeedbackBox.html(" Get 10 in a row correct.");


	}
	//--------------------------------------------------------------------------------
	//--------------[ nextQuestion End ] ---------------------------------------------
	
	
	
	
	
	
	
	
	
	
	
	
	
	//--------------[ updateScoreBoard Begin ] ----------------------------------------
	//---------------------------------------------------------------------------------	
	function updateScoreBoard(score) {
		
		
		if (score > 0) { 
			theScoreBar[score].css({"background-color" : theCorrectColor});
			theScoreBar[score].css({"background-image" : "url(" + checkmark_url + ")"});
		} else {
			for($i = 1; $i <= 10; $i++) {
				theScoreBar[$i].css({"background-color" : theScoreBoxColor});
				theScoreBar[$i].css({"background-image" : "url()"});
			}
			
		}
		
		
	}
	//---------------------------------------------------------------------------------	
	//--------------[ updateScoreBoard End ] ------------------------------------------		
		
	
	
	
	
	
	
	
	
	
	
	
	





	//--------------[ Utility Functions Begin ] ---------------------------------------
	//---------------------------------------------------------------------------------	
	
	function quickSign() {
		if (Math.random() < 0.5) { return 1;
		} else {return -1; }
	}
	
	
	function numberBetween(n,m) {
		let theNumber, leftNumber, rightNumber;
		
		leftNumber = Math.min(n,m);
		rightNumber = Math.max(n,m);
		theNumber = leftNumber + Math.random() * (rightNumber - leftNumber);
		if (theNumber == leftNumber) {
			theNumber = leftNumber + Math.random() * (rightNumber - leftNumber);
		}
		
		return theNumber;
	}
	
	
	function twoDigits(n) {
		return Math.round(n * 100) / 100;
	}
	
	
	function shuffle(array) {
		for (let i = array.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1)); 

		[array[i], array[j]] = [array[j], array[i]];
  }
}
	
	//---------------------------------------------------------------------------------	
	//--------------[ Utility Functions End ] -----------------------------------------
