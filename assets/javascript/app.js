// Global variable for trivia question display timer
var triviaQuestionInterval;

// JSON object to store quiz questions, answers and methods
var triviaQuestions = {
	numQuestions : 5,
	questionCounter : 1,
	countdownTime : 10,
	currentQuestion : "",
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
		
		// Variable to refer to the current question
		var thisQuestion = triviaQuestions.questionSet[currentQuestion];
		
		// Variable to hold jquery DOM element so we only query for it once
		var $displayAnswers = $('#displayAnswers');
		
		// Display question
		$('#displayQuestion').html(thisQuestion.question);
		
		// Empty answer list
		$displayAnswers.empty();
		
		// Display answers
		$.each(thisQuestion.answers, function( key, value) {			
			// Create jquery object		
		 	var $answer = ($('<button/>')
			 		.attr("type", "button")
			 		.html(value)
			 		.addClass("list-group-item answer")
			 		.attr("data-name", key)
			 		// On click function for the button
			 		.on('click', function() {			 			
			 				self.displayAnswer(currentQuestion, $(this).data('name'));
			 			})
		 			);
		 	// Append it to the element
		 	$displayAnswers.append($answer);
		});
		// Set interval for question timer countdown
		triviaQuestionInterval = setInterval( triviaQuestions.questionTimer, 1000 );
	},
	/* ************************************************************	*/
	/* Method : displayAnswer										*/
	/* Parameters : currentAnswer									*/	
	/* Description : This function checks if the current answer 	*/
	/*				 is correct and either displays congrats or 	*/
	/*				 the correct answer before moving to next		*/
	/*				 question 										*/
	/* ************************************************************	*/
	displayAnswer : function(currentQuestion, currentAnswer) {

		console.log("question: " , currentQuestion);
		console.log("answer: ", currentAnswer);		
		console.log("correct: " , this.questionSet[currentQuestion].correct);

		if (currentAnswer == this.questionSet[currentQuestion].correct) {
			console.log("Good job");
			$('#displayAnswers').hide();
			$('.showCorrectAnswer').show();
			$('#displayCorrect').html("Good job");
		}
		else {
			console.log("Too bad");
			$('.showQuiz').hide();
			$('.showCorrectAnswer').show();
			$('#displayCorrect ').html("The correct answer was " + this.questionSet[currentQuestion].answers[this.questionSet[currentQuestion].correct]);
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
		
		// Decrement the countdownTime counter
		self.countdownTime--;
		// Update the countdown timer display
		$('#countdownTimer').html(self.countdownTime);		
				
		// Check if the time has reached 0 and there are more questions to ask
		// if so, clear the interval, reset countdownTime and display next question
		// If there are no more questions to ask, go to end game display				
		if (self.countdownTime == 0) {
			clearInterval(triviaQuestionInterval);
			// Check if there are questions left			
			if (self.questionCounter < self.numQuestions) {
				// Increment the object's questionCounter variable to be used for displaying the next question
				self.questionCounter++;					
				self.countdownTime = 10;			
				self.displayQuestion("question" + self.questionCounter);
			} else {
				console.log("Game over");
			}
		}
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