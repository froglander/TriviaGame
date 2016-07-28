var quizQuestions = {
	"question1" : {
		"question" : "What is a gelding?",
		 "answer1" : "A female horse",
		 "answer2" : "An intact male horse",
		 "answer3" : "A neutered male horse",
		 "answer4" : "A baby horse",
		 "correct" : "answer3",
		"included" : false
	},
	"question2" : {
		"question" : "What is a star?",
		 "answer1" : "A white mark on the horse's body",
		 "answer2" : "A white mark near the center of the horse's forehead",
		 "answer3" : "A white mark on the horse's nose",
		 "answer4" : "A white mark on the horse's leg",
		 "correct" : "answer2",
		"included" : false
	},
	"question3" : {
		"question" : "Describe a horse's vision",
		 "answer1" : "A horse can see all around themself",
		 "answer2" : "A horse has monocular vision on either side with a blind spot immediately in front and behind and a small area of binocular vision out in front",
		 "answer3" : "A horse can only see in front of themself",
		 "answer4" : "A horse has difficulty with depth perception",
		 "correct" : "answer2",
		"included" : false
	},
	"question4" : {
		"question" : "How many legs does a horse have",
		 "answer1" : "2",
		 "answer2" : "4",
		 "answer3" : "6",
		 "answer4" : "8",
		 "correct" : "answer2",
		"included" : false
	},
	"question5" : {
		"question" : "How many legs does a horse have",
		 "answer1" : "2",
		 "answer2" : "4",
		 "answer3" : "6",
		 "answer4" : "8",
		 "correct" : "answer2",
		"included" : false
	},
	displayQuestion : function(question) {
		var thisQuestion = "question" + question;
		console.log(thisQuestion);
		console.log(this);
		console.log(this[thisQuestion]);
		$('#displayQuestion').html(this[thisQuestion].question);
		$.each()
		$("#displayAnswers").append('<li><a href="/user/messages"><span class="tab">Message Center</span></a></li>');

	},
}

quizQuestions.displayQuestion(2);