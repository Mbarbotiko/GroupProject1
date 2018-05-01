<<<<<<< HEAD
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
    
=======
$(document).ready(function () {

    // store Twitter oauth token
    var apiToken = 'AAAAAAAAAAAAAAAAAAAAAPQA5wAAAAAAKQjhIPtzVAcYycFqP5JLpj%2FydvU%3Ded6i6kHJDCSKjk26G38hqOz0NyaMFPIoy4KQcgVxIfJWuL8XCc';

    $("#submit").on("click", function (event) {
        event.preventDefault();
        var inputVal = $("#inlineFormInput").val().trim();
        // validation
        if (typeof (inputVal) == 'string') {
            displayContent(inputVal);
        }
    });

    $(".suggestedCity").on("click", function (event) {
        event.preventDefault();
        var inputVal = $(this).attr("id");
        // validation
        if (typeof (inputVal) == 'string') {
            displayContent(inputVal);
        }
    });

    function displayContent(city) {
        $("#flicker-body").empty();
        $("#twitter-body").empty();
        $("#sygic-body").empty();
        $("#weather-body").empty();

        // Twitter API
        var inputVal = city;
        var queryURL = "https://cors-anywhere.herokuapp.com/https://api.twitter.com/1.1/search/tweets.json?q="
            + inputVal + "&result_type=popular";

        $.ajax({
            url: queryURL,
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + apiToken
            }
        }).then(function (response) {
            var results = response.statuses;

            for (var i = 0; i < results.length; i++) {
                var screen_name = response.statuses[i].user.screen_name;
                var id_str = response.statuses[i].id_str;

                $.ajax({
                    method: 'GET',
                    url: 'https://cors-anywhere.herokuapp.com/https://publish.twitter.com/oembed?url=https://twitter.com/' + screen_name + '/status/' + id_str
                }).then(function (response) {
                    $('#twitter-body').append(response.html);
                    console.log(twttr);
                    twttr.widgets.load(document.getElementById('twitter-body'))
                })
            }
        });

        // Weather API
        var APIKey = "166a433c57516f51dfab1f7edaed8413";
        var weatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + inputVal + "&units=imperial&appid=" + APIKey;

        $.ajax({
            url: weatherURL,
            method: "GET"
        }).then(function (response) {
            $("#weather-body").append("<h1>Weather in " + response.name + "</h1> <br> Conditions: " + response.weather[0].main + "<br> Temperature (F): " + response.main.temp + "<br> Wind: " + response.wind.speed + "<br> Humidity: " + response.main.humidity);
        });

        // Flickr API
        var queryURL = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=c185f95eeeb54ebb5bebe6e4467cd40a&tags=' + inputVal + '&per_page=9&format=json&nojsoncallback=1';
        $.ajax({
            url: queryURL,
            method: 'GET'
        })

            .then(function (response) {
                console.log(response);
                //console.log(queryURL);

                var results = response.photos.photo;
                for (var i = 0; i < results.length; i++) {
                    var flickrImage = $('<img>').addClass("imgSpace");
                    flickrImage.attr({ 'src': `https://farm${response.photos.photo[i].farm}.staticflickr.com/${response.photos.photo[i].server}/${response.photos.photo[i].id}_${response.photos.photo[i].secret}.jpg` })

                    $('#flicker-body').append(flickrImage);

                    console.log(results);
                    console.log(flickrImage);

                $('#flicker-body').append(flickrImage);
            }

        });

        $('html,body').animate({
            scrollTop: $("#flicker-body").offset().top
        },
            'slow');

    }

});

>>>>>>> 7942937447c6d5ce8128b1b6dd56513f8a330533
