/* LIST OF VARIABLES */	
	
	var questionState = 0;	//Keeps track of users place in quiz
	var quizActive = true;	//True until last question is answered
		
	var userStats =	[
						0,	//sci-fi
						0, 	//comedy
						0, 	//action
						0, 	//horror
					];
	
	var tempStats = userStats; //Holds stat increases relating to user selection
	
	/* QUIZ BUILDING VARIABLES */
	
	//The following array contains all question text elements
	
	var questionText =	[															
							"What do you most pay attention to while watching a movie?", 	//q1
							"Which of these titles piques your interest?", 					//q2
							"Out of these choices, which actor do you like the most?", 	//q3
							"What is your favorite movie franchise?", 				//q4
							"Which movie character would you most like to get lunch with", 			//q5
						];
	
	//The following array contains all answer text elements for each question
	
	var answerText =	[		//question 1 answers													
							[	"Performances", 				
								"Action", 
								"Set Design",
								"Jokes",
                            ],							
								
								//question 2 answers
							[	"Pretty Woman", 							
								"Ex Machina",
								"The Wailing",
								"Guns Akimbo",
                            ],
								
								//question 3 answers
							[	"Sigourney Weaver", 
								"Jim Carrey",
								"Arnold Schwarzenegger",
								"Harrison Ford",
                            ],
								
								//question 4 answers
							[	"Star Wars", 
								"Saw",
								"Rambo",
								"American Pie",],
								
								//question 5 answers
							[	"Hannibal Lector",
							 	"The Terminator", 
								"Clark Griswold",
								"Agent Smith",
                            ]
						]
	
	//The following array contains all personality stat increments for each answer of every question
	
	var answerValues =	[		//question 1 answer values
							[	[0,0,0,0], 		
								[0,0,2,0],		
								[3,0,0,0],
								[0,1,0,0]
							],	
						
								//question 2 answer values
							[	[0,1,0,0], 
								[3,0,0,0],
								[0,0,0,0],
							 	[0,0,2,0] 
							],

								//question 3 answer values
							[	[0,0,0,0], 
								[0,1,0,0],
								[0,0,2,0],
							 	[3,0,0,0] 
							],
								
								//question 4 answer values
							[	[3,0,0,0], 
								[0,0,0,0],
								[0,0,2,0],
							 	[0,1,0,0] 
							],
								
								//question 5 answer values
							[	[0,0,0,0], 
								[0,0,2,0],
								[0,1,0,0],
							 	[3,0,0,0] 
							]
                        ]

                        var results = document.getElementById("results");
                        var quiz = document.getElementById("quiz");
                        var body = document.body.style;
                        var printResult = document.getElementById("topScore");
                        var buttonElement = document.getElementById("button");

                        buttonElement.addEventListener("click", changeState);	//Add click event listener to main button
	
	/* This function progresses the user through the quiz */
	
	function changeState() {								
		
		updatePersonality(); 	//Adds the values of the tempStats to the userStats										
		
		if (quizActive) {	
			
			/*True while the user has not reached the end of the quiz */
			
			initText(questionState);	//sets up next question based on user's progress through quiz
			questionState++;			//advances progress through quiz
			
			buttonElement.disabled = true; //disables button until user chooses next answer
			buttonElement.innerHTML = "Please select an answer";			
			buttonElement.style.opacity = 0.7;
			
		} else {
			
			/*All questions answered*/
			
			setCustomPage(); //runs set up for result page
		}
	}
	
	/* This function determines the question and answer content based on user progress through the quiz */

	function initText(question) {							
		
		var answerSelection = ""; 
		
		for (i = 0; i < answerText[question].length; i++) {		
			
			answerSelection += "<li><input type='radio' name='question" +
			(question+1) + "' onClick='setAnswer("+i+")' id='" + answerText[question][i] + "'><label for='" + answerText[question][i] + "'>" + answerText[question][i] + "</label></li>";
		}
		
		document.getElementById("questions").innerHTML = questionText[question];	//set question text
		document.getElementById("answers").innerHTML = answerSelection;				//set answer text
	}

    function setAnswer(input) {
				
		clearTempStats();									//clear tempStats in case user reselects their answer
		
		tempStats = answerValues[questionState-1][input];	//selects personality values based on user selection 
				
		if (questionState < questionText.length) {
			
			/*True while the user has not reached the end of the quiz */
			
			buttonElement.innerHTML = "Continue";
			buttonElement.disabled = false;
			buttonElement.style.opacity = 1;
					
		} else {
			
			/*All questions answered*/
			
			quizActive = false;
			buttonElement.innerHTML = "Get Your Results!"
			buttonElement.disabled = false;
			buttonElement.style.opacity = 1;
		}
	}
	
	/* This function sets tempStats to 0 */
	
	function clearTempStats() {
		
		tempStats = [0,0,0,0];	
	}
	
	/*This function adds the values of the tempStats to the userStats based on user selection */
	
	function updatePersonality() {
		
		for (i = 0; i < userStats.length ; i++) {
			userStats[i] += tempStats[i];
		}
	}
	
	/* This function determines the highest personality value */
	
	function setCustomPage() {
		
		var highestStatPosition = 3;	//highest stat defaults as 'horror'
		
		/* This statement loops through all personality stats and updates highestStatPosition based on a highest stat */
		
		for (i = 1 ; i < userStats.length; i++) {
			
			if (userStats[i] > userStats[highestStatPosition]) {
				highestStatPosition = i;
			}
		}
		
		displayCustomPage(highestStatPosition); //passes the index value of the highest stat discovered
		
		/* Hides the quiz content, shows results content */
		quiz.style.display = "none";		
	}
	
	/* BUILDS WEB PAGE AS PER RESULTS OF THE QUIZ */
	
	/* The following code manipulates the CSS based on the personality results */
			
	function displayCustomPage(personality) {
		switch (personality) {
			
			case 0:	//horror code
				results.style.display = "inline-block";
				results.classList.add("horror");
                body.background= "none";
                body.backgroundColor = "#008080"
                printResult.innerText = "horror";
				break;
				
			case 1:		//comedy
				results.style.display = "inline-block";
				results.classList.add("comedy");
				body.background = "none";
                body.backgroundColor = "#008080";
                printResult.innerText = "comedy";
				break;
				
			case 2:		//action
				results.style.display = "inline-block";
				results.classList.add("action");
				body.background = "none";
                body.backgroundColor ="#008080";
				printResult.innerText = "action";
				break;
				
			case 3:		//sci-fi
				results.style.display = "inline-block";
				results.classList.add("sci-fi");
				body.background = "none";
                body.backgroundColor = "#008080";
              printResult.innerText = "sci-fi";
				break;
				
			default: 
				document.getElementById("error").style.display = "inline-block";

		}
	}
    
                         
                        