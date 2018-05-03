$(document).ready(function () {
    $('#California').hide();
    $('#Italy').hide();
    $('#Iceland').hide();
    $('#Mexico').hide();

    function startQuiz() {
        // When the button is clicked the quiz starts and the first question is shown. All other questions are hidden. Do one question at a time.  
        document.getElementById("intro").style.display = "none";
        //use block scope for everything inside curly crackets. acts like function.
        document.getElementById("question1").style.display = "block";
    }

    document.getElementById("beginquiz").addEventListener("click", startQuiz);
    //event listener for "start quiz" button
    var userAnswer = {
        //object store quiz answers. a value of 1 is given to each location when an answer associated with the location is clicked. 
        "California": { score: 0 },
        "Mexico": { score: 0 },
        "Italy": { score: 0 },
        "Iceland": { score: 0 }
    };

    var buttons = document.querySelectorAll(".button");
    // for the button elements

    for (var i = 0 ; i < buttons.length ; i++) {
        buttons[i].onclick = buttonClicked;
         //if a button is clicked the buttonClicked function is called
        }

    function buttonClicked(event) {
        //target event property returns the element that triggered the event (W3)
        //diaplys answers and results after.
        // button click to answer the questions

        var getValue = event.target;

        console.log(getValue);

        var selectedType = getValue.dataset.score;
        // Get the value score from user answer
        console.log(selectedType);
        userAnswer[selectedType].score++;	// add 1 to user score

        this.parentElement.style.display = "none";
        // .parentElement property -- for clicking on answer (element) to hide parent elements (everything else in the question) and chanegs to next question.
        // Hidequestions in the div
        var nextQuestion = this.parentElement.dataset.next;
        // shows next question in teh div when previous question is answered
        //associated with data-next html. this.parentElement uses Data attr gets the next question (parent). (W3)
        // getattribute instead?

        if (nextQuestion != results) {
            // Display the next question if the nextQuestion is not equal to "result". This lets the quiz keep going until the result ends the quiz.
            document.getElementById(nextQuestion).style.display = "block"}

            else if (nextQuestion == results) {
                // If the nextQuestion is equal to result, then show the result.

            document.getElementById(nextQuestion).style.display = "block"}
            //block allows combined statements. This allows questions and results to be displayed.

            document.getElementById("finalResulthere").innerHTML = "<h1>You should go to...</h1>";
                 // Post the final results to the appropriate result div. Shows user where they should go based on answers.

            if (document.getElementById("results").style.display == "block") {
            //these are the results for the quiz. associated with locationResulthere

                if (locationResult() == "California") {
                    $("#California").show();
                }
                if (locationResult() == "Mexico") {
                    $("#Mexico").show();

                }
                if (locationResult() == "Italy") {
                    $("#Italy").show();

                }
                if (locationResult() == "Iceland") {
                    $("#Iceland").show();
                }
            }
        }

    function locationResult() {
        // Get the values of the answers object

        var theLocation = Object.keys(userAnswer).reduce(function(a, b){ return userAnswer[a].score > userAnswer[b].score ? a : b });
        //search for how to score personality test, rather than a typical quiz. Need values to be associated with answers.
        //The reduce() method reduces the array to a single value and executes a provided function for each value of the array. the retuen value is stored in total or result (W3)
        //object.keys ...The keys() method returns an Array Iterator object with the keys of an array.(W3). a:b lets show the final result.
        //using the reduce method ..similiar to the bubble activity. using reduce and a>b sorts and gives value.
        //Returns accumlated result from the last call of the callback function (W3). Gets us the results with score value.
       //use return to stop the function and show the result
        //use values of the "score" to compare other scores. The location with the highest score will be the answer.
        return theLocation;
    }

});
