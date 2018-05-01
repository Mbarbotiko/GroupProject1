function startQuiz() {	
    // When the button is clicked the quiz starts and the first question is shown. All other questions are hidden. Do one question at a time.  
    document.getElementById("intro").style.display = "none";
        document.getElementById("question1").style.display = "block";
    }
    
    document.getElementById("beginquiz").addEventListener("click", startQuiz);
    //event listener for "start quiz" button
    var answerData = {		
        //object stores quiz answers. a value of 1 is given to each location when an answer associated with the location is clicked. 
        "California": { score: 0 },
        "Bahamas": { score: 0 },
        "Italy": { score: 0 },
        "Iceland": { score: 0 }
    };
    
    var buttons = document.querySelectorAll(".button");	
    // for the button elements
        
    for (var i = 0 ; i < buttons.length ; i++) {	
        buttons[i].onclick = buttonClicked;	
         //if a button is clicked the buttonClicked function is called
        }
    
    function buttonClicked(e) {	
        // button click to answer the questions
    
        var target = e.target; 	
        
        console.log(target); 
    
        var selectedType = target.dataset.score;
        // Get the value score from user answer	
        console.log(selectedType);	
        answerData[selectedType].score++;	// add 1 to user score
        
        this.parentElement.style.display = "none";		
        // Hides questions in the div
        var nextQuestion = this.parentElement.dataset.next;		
        // shows next question in teh div when previous question is answered
        
        if (nextQuestion != results) { 
            // Display the next question if the nextQuestion is not equal to "result". This lets the quiz keep going until the result ends the quiz. 
            document.getElementById(nextQuestion).style.display = "block"}
            
            else if (nextQuestion == results) {	
                // If the nextQuestion is equal to result, then show the result. 
    
            document.getElementById(nextQuestion).style.display = "block"}	
            //block allows combined statements. This allows questions and results to be displayed. 
            
            document.getElementById("finalResulthere").innerHTML = "<p>You should go to " + finalResults() +"!</p>";	
                 // Post the final results to the appropriate result div. Shows user where they should go based on answers.
            
            if (document.getElementById("results").style.display == "block") { 
            //these are the results for the quiz.
                
                 if (finalResults == "California") {
                             
                 }
                 else if (finalResults == "Bahamas") {
                     
                 }
                 else if (finalResults == "Italy") {
            
                 }
                 else if (finalResults == "Iceland") {
                 
                 }
              }
            }
    
    function finalResults() {	
        // Get the values of the answers object 
    
        var theAnswer = Object.keys(answerData).reduce(function(a, b){ return answerData[a].score > answerData[b].score ? a : b });	
        //search for how to score personality test, rather than a typical quiz. 
        return theAnswer;
    }
    