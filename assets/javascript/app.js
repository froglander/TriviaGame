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
				 "correct" : "answer3",
				"included" : false
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
				 "correct" : "answer3",
				"included" : false
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
				 "correct" : "answer4",
				"included" : false
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
				 "correct" : "answer1",
				"included" : false
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
				 "correct" : "answer2",
				"included" : false
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
		var self = this;
		console.log("currentQuestion", currentQuestion);
		
		// Check if we have gone through all of the questions
		if (this.questionCounter > this.numQuestions) {
			// Done with questions, need to call round finished function
			clearInterval(triviaQuestionInterval);
			console.log("out of questions");
			//return;
		}
		// Increment the object's questionCounter variable to be used for displaying the next question
		this.questionCounter++;
		

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
			 		.html(thisQuestion.answers[key])
			 		.addClass("list-group-item answer")
			 		.attr("data-name", key)
			 		.on('click', function() {
			 				console.log('on click');
			 				clearInterval(triviaQuestionInterval);
			 				self.countdownTime = 10;			
							self.displayQuestion("question" + self.questionCounter); 

			 			})
		 			);
		 	// Append it to the element
		 	$displayAnswers.append($answer);
		});

		// Set interval for question timer countdown
		triviaQuestionInterval = setInterval( triviaQuestions.questionTimer, 1000 );



		
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
		// Update the countdown timer display
		self.countdownTime--;
		$('#countdownTimer').html(self.countdownTime);
		// Decrement the countdownTime counter
		
		// Check if the time has reached 0, if so, clear the interval, 
		// reset countdownTime and display next question
		if (self.countdownTime < 0) {
			clearInterval(triviaQuestionInterval);
			self.countdownTime = 10;			
			self.displayQuestion("question" + self.questionCounter);
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
	$('.showQuiz').show();

	// Call the startQuiz function 
	triviaQuestions.startQuiz();
});
// $('.answer').on('click', function() {
// 	// When you click an answer button, capture the value
// 	console.log('on click');
// });

