// Global variable for trivia question display timer
var triviaQuestionInterval;

// JSON object to store quiz questions, answers and methods
var quizQuestions = {
	questionCount : 5,
	questionsUsed : 0,
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
	displayQuestion : function(question) {				
		// Variable to hold the current question
		var currentQuestion = this["question" + question];
		// Check if this question has already been included, if so, return		
		//if (currentQuestion.included) return;

		// Variable to hold jquery DOM element so we only query for it once
		var $displayAnswers = $('#displayAnswers');

		// Set currentQuestion.included to true so the question won't be repeated
		currentQuestion.included = true;

		quizQuestions.questionsUsed++;


		if (quizQuestions.questionsUsed == quizQuestions.questionCount) {
			console.log("clear interval");
			clearInterval(triviaQuestionInterval);
		}

		// Display question
		$('#displayQuestion').html(currentQuestion.question);

		$displayAnswers.empty();
		// Display answers
		$.each(currentQuestion.answers, function( key, value) {			 
		 	console.log(currentQuestion.answers[key]);
		 	$displayAnswers.append($('<li/>').html(currentQuestion.answers[key]));
		 });

	},
	startQuiz : function() {
		console.log("start quiz game");

		
		triviaQuestionInterval = setInterval(
									function() { 
										var randQuestion = Math.floor(Math.random() * quizQuestions.questionCount) + 1;
										if (quizQuestions["question" + randQuestion].included) return;
										quizQuestions.displayQuestion(randQuestion);
										
									}
									, 1000);
		console.log(triviaQuestionInterval);

		

	},
}

$('#startQuiz').on('click', function() { 
	$('#startQuiz').hide();
	$('.showQuiz').show();

	quizQuestions.startQuiz();
	//quizQuestions.displayQuestion(Math.floor(Math.random() * quizQuestions.questionCount) + 1);
});

