//Firebase here
// Initialize Firebase
var config = {
    apiKey: "AIzaSyBQB6gGX9XbIKXspeGRtn1nseutybu-TKc",
    authDomain: "groupprojectsearch.firebaseapp.com",
    databaseURL: "https://groupprojectsearch.firebaseio.com",
    projectId: "groupprojectsearch",
    storageBucket: "groupprojectsearch.appspot.com",
    messagingSenderId: "143073438718"
};
firebase.initializeApp(config);


$(document).ready(function () {
    $('#whatever').hide();
    $('#thumbsup').show();
    $('#donna').hide();

    // store Twitter oauth token
    var apiToken = 'AAAAAAAAAAAAAAAAAAAAAPQA5wAAAAAAKQjhIPtzVAcYycFqP5JLpj%2FydvU%3Ded6i6kHJDCSKjk26G38hqOz0NyaMFPIoy4KQcgVxIfJWuL8XCc';
    //variable to reference the database
    var database = firebase.database();
    //Initial Value
    var submit = "";


    $("#submit").on("click", function (event) {
        event.preventDefault();
        $('html,body').animate({
            scrollTop: setInterval(8000),
            scrollTop: $("#flicker-body").offset().top
        },
            'slow');
        submit = $("#autocomplete").val().trim();
        database.ref().push({
            submit: submit
        });
        var inputVal = $("#autocomplete").val().trim();
        // validation
        if (typeof (inputVal) == 'string') {
            displayContent(inputVal);
            displaySygic(inputVal);
        }
    });

    $(".suggestedCity").on("click", function (event) {
        event.preventDefault();
        
        var inputVal = $(this).attr("id");
        // validation
        if (typeof (inputVal) == 'string') {
            displayContent(inputVal);
            displaySygic(inputVal);
        }

        
    });

    database.ref().on("value", function (snapshot) {
        console.log(snapshot.val());
        console.log(snapshot.val().submit);
    })

 


    $("#quiz").on("click", function (event) {
        event.preventDefault();
        window.open("quiz.html");
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
            console.log(response)

            for (var i = 0; i < results.length; i++) {
                var screen_name = response.statuses[i].user.screen_name;
                var id_str = response.statuses[i].id_str;

                $.ajax({
                    method: 'GET',
                    url: 'https://cors-anywhere.herokuapp.com/https://publish.twitter.com/oembed?url=https://twitter.com/' + screen_name + '/status/' + id_str
                }).then(function (response) {
                    $('#twitter-body').append(response.html);
                    console.log(response.html);
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

    }

    function displaySygic(city) {
        var sygicFrame = $("<iframe>").attr({
            "src": "https://guides.travel.sygic.com/production/en/" + city + "/",
            "width": "65%",
            "height": "1500",
            "frameborder": "0"
        });

        $("#sygic-body").append(sygicFrame);
    }

    var countriesArray = $.map(countries, function (value, key) { return { value: value, data: key }; });

    $('#autocomplete').autocomplete({
        // serviceUrl: '/autosuggest/service/url',
        lookup: countriesArray,
        lookupFilter: function (suggestion, originalQuery, queryLowerCase) {
            var re = new RegExp('\\b' + $.Autocomplete.utils.escapeRegExChars(queryLowerCase), 'gi');
            return re.test(suggestion.value);
        },
        onSelect: function (suggestion) {
            $('#selction-ajax').html('You selected: ' + suggestion.value + ', ' + suggestion.data);
        }
    });

});
