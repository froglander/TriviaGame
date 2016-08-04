// Global variable for trivia question display timer
var triviaQuestionInterval;

// JSON object to store quiz questions, answers and methods
var triviaQuestions = {
	numQuestions : 5,
	questionCounter : 1,
	countdownTime : 10,
	numCorrect : 0,
	numIncorrect : 0,
	numUnanswered : 0,
	"questionSet" : {
			"question1" : {
				"question" : "What is a gelding?",
				"answers"  :
					{
						"answer1" : "A female horse",
						"answer2" : "An intact male horse",
						"answer3" : "A neutered male horse",
						"answer4" : "A baby horse"
					},
				 "correct" : "answer3"
			},
			"question2" : {
				"question" : "What South American animal is the smallest member of the camel family?",
				"answers"  :
					{
						 "answer1" : "Guanaco",
						 "answer2" : "Llama",
						 "answer3" : "Vicuna",
						 "answer4" : "Alpaca"
					},
				 "correct" : "answer3"
			},
			"question3" : {
				"question" : "What mammal is also referred to as a sea cow?",
				 "answers" : 
				 	{
				 		"answer1" : "Dolphin",
						"answer2" : "Bovine",
						"answer3" : "Shark",
						"answer4" : "Manatee"
					},
				 "correct" : "answer4"
			},
			"question4" : {
				"question" : "What is the world's tallest animal?",
				"answers"  :
					{
						"answer1" : "Giraffe",
						"answer2" : "Mouse",
						"answer3" : "Elephant",
						"answer4" : "Dog"
					},
				 "correct" : "answer1"
			},
			"question5" : {
				"question" : "What is the largest flightless bird of Australia?",
				 "answers" : 
				 	{   
				 		"answer1" : "Ostrich",
				 		"answer2" : "Emu",
						"answer3" : "Chicken",
						"answer4" : "King Penguin"
					},
				 "correct" : "answer2"
			},
	},
	/* ************************************************************	*/
	/* Method : displayQuestion										*/
	/* Parameters : currentQuestion									*/	
	/* Description : This function displays the current question	*/
	/*				 and answers and calls setInterval to start the */
	/*				 count down timer 								*/
	/* ************************************************************	*/
	displayQuestion : function(currentQuestion) {
		// Variable self to refer to the object inside button click function
		var self = this;

		// Display the initial value of the countdown timer
		$('#countdownTimer').html(this.countdownTime);

		// Hide correct answer if it is displayed
		$('#displayCorrect').hide();
		
		// Variable to refer to the current question
		var thisQuestion = triviaQuestions.questionSet[currentQuestion];
		
		// Variable to hold jquery DOM element so we only query for it once
		var $displayAnswers = $('#displayAnswers');
		
		// Display question
		$('#displayQuestion').html(thisQuestion.question);
		
		// Empty answer list
		$displayAnswers.empty();
		$displayAnswers.show();
		
		// Display answers
		$.each(thisQuestion.answers, function( key, value) {			
			// Create jquery object		
		 	var $answer = ($('<button/>')
			 		.attr("type", "button")
			 		.html(value)
			 		.addClass("list-group-item")
			 		.attr("data-name", key)
			 		// On click function for the button
			 		.on('click', function() {			 			
			 				self.displayCorrectAnswer(currentQuestion, $(this).data('name'));
			 			})
		 			);
		 	// Append it to the element
		 	$displayAnswers.append($answer);
		});
		// Set interval for question timer countdown
		triviaQuestionInterval = setInterval( triviaQuestions.questionTimer, 1000 );
	},
	/* ************************************************************	*/
	/* Method : displayCorrectAnswer								*/
	/* Parameters : currentAnswer									*/	
	/* Description : This function checks if the current answer 	*/
	/*				 is correct and either displays congrats or 	*/
	/*				 the correct answer before moving to next		*/
	/*				 question 										*/
	/* ************************************************************	*/
	displayCorrectAnswer : function(currentQuestion, currentAnswer) {
		// console.log("displayCorrectAnswer currentQuestion:", currentQuestion);
		// console.log("displayCorrectAnswer currentAnswer:", currentAnswer);

		var self = triviaQuestions;
		
		/* ************************************************************** */
		/* This stuff happens whether you got the question right or wrong */
		/* ************************************************************** */
		// Hide the answers and display correct
		$('#displayAnswers').hide();
		// Clear the question timer
		clearInterval(triviaQuestionInterval);
		// Declare variable to store correctAnswer
		var correctAnswer = self.questionSet[currentQuestion].answers[self.questionSet[currentQuestion].correct];
		// Set display text if right or wrong
		
		console.log("Current Answer:", currentAnswer);

		if (currentAnswer == self.questionSet[currentQuestion].correct) {
			self.numCorrect++;
			$('#displayCorrect').html("Good job! <br />" + correctAnswer + " was correct.").show();			
		} else {
			$('#displayCorrect ').html("Too bad <br /> The correct answer was " + correctAnswer).show();
			if (currentAnswer == "unanswered" ) self.numUnanswered++;
			else self.numIncorrect++;
			//$('#displayCorrect ').html("Too bad <br /> The correct answer was " + correctAnswer).show();
			
		}

		// console.log("currentQuestion:", currentQuestion);
		// console.log("questionCounter:", this.questionCounter);
		// console.log("numQuestions:", this.numQuestions);

		// Check if there are more questions and set a timeout which
		// then calls the displayQuestion function with the next question
		if (this.questionCounter < this.numQuestions){			
			// Reset coutndownTime
			this.countdownTime = 10;
			// Increment questionCounter to display the next question
			this.questionCounter++;
			
			var nextQuestion = setTimeout(function() { 
											self.displayQuestion("question" + self.questionCounter);
										}, 3000);			
		} else {
			var gameResult = setTimeout(function() { 
											self.endGame();
										}, 3000);	
			//self.endGame();
		}
	},
	/* ************************************************************	*/
	/* Method : questionTimer										*/
	/* Parameters : none											*/	
	/* Description : This function displays the countdown timer,	*/
	/*				 decrements the countdownTime variable, checks  */
	/*				 if the countdown has reached 0 and if so calls */
	/*				 displayQuestion with the next question 		*/
	/* ************************************************************	*/
	questionTimer : function() {
		// Create a variable 'self' to refer to the object
		var self = triviaQuestions;
		
		console.log("questionTimer");
		// Decrement the countdownTime counter
		self.countdownTime--;
		// Update the countdown timer display
		$('#countdownTimer').html(self.countdownTime);		
				
		// Check if the time has reached 0 if so, display correct answer
		if (self.countdownTime == 0) {
			//clearInterval(triviaQuestionInterval);
			var currentQuestion = "question" + self.questionCounter;			
			//var correctAnswer = self.questionSet[currentQuestion].answers[self.questionSet[currentQuestion].correct];
			var currentAnswer = "unanswered";

			// console.log("questionTimer currentQuestion:", currentQuestion);
			// console.log("questionTimer correctAnswer:", correctAnswer);
			
			self.displayCorrectAnswer(currentQuestion, currentAnswer);
		}
	},	
	/* ************************************************************	*/
	/* Method : endGame												*/
	/* Parameters : none											*/	
	/* Description : This function displays the number of right, 	*/
	/*				 wrong, and unanswered questions 		 		*/
	/* ************************************************************	*/
	endGame : function() {
		// Hide the answers and display correct
		$('#displayAnswers').hide();
		$('#displayCorrect').hide();

		$('#displayQuestion').html("<h1>Trivia Game Results</h1>");				
		$('#endGameResults').html("Number correct: " + this.numCorrect)
							.append("<br/> Number incorrect: " + this.numIncorrect)
							.append("<br/> Number unanswered: " + this.numUnanswered)
							.show();

	},
	/* ************************************************************	*/
	/* Method : startQuiz											*/
	/* Parameters : none											*/	
	/* Description : This function sets up the first question 		*/
	/*				 to pass to displayQuestion as a parameter 		*/
	/* ************************************************************	*/
	startQuiz : function() {		
		// Set up a variable to pass as a parameter to refer to the first question
		this.currentQuestion = "question" + this.questionCounter;

		// Call function to display question, passing parameter for first quesiton
		this.displayQuestion(this.currentQuestion);
	},
} /* end triviaQuestions object */

$('#startQuiz').on('click', function() { 
	// When you click the 'Start Quiz' button, it is hidden and the quiz quesitons div is displayed
	$('#startQuiz').hide();

	$('.showCorrectAnswer').hide();
	$('.showQuiz').show();

	// Call the startQuiz function 
	triviaQuestions.startQuiz();
});