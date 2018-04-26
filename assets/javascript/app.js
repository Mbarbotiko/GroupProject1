$(document).ready(function () {

    var apiToken = 'AAAAAAAAAAAAAAAAAAAAAPQA5wAAAAAAKQjhIPtzVAcYycFqP5JLpj%2FydvU%3Ded6i6kHJDCSKjk26G38hqOz0NyaMFPIoy4KQcgVxIfJWuL8XCc';

    $("#submit").on("click", function (event) {
        event.preventDefault();
        var inputVal = $("#inlineFormInput").val().trim();
        var queryURL = "https://cors-anywhere.herokuapp.com/https://api.twitter.com/1.1/search/tweets.json?q="
            + inputVal + "&result_type=popular";

        $.ajax({
            url: queryURL,
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + apiToken
            }
        }).then(function (response) {

            console.log(response);
            //https://twitter.com/realDonaldTrump/status/989225812166696960
            console.log(response.statuses[0]);

            var results = response.statuses;
            for (var i = 0; i < results.length; i++) {
                var screen_name = response.statuses[i].user.screen_name;
                console.log(screen_name);
                var id_str = response.statuses[i].id_str;
                $.ajax({
                    method: 'GET',
                    url: 'https://cors-anywhere.herokuapp.com/https://publish.twitter.com/oembed?url=https://twitter.com/' + screen_name + '/status/' + id_str
                }).then(function (response) {
                    $('#twitter-body').append(response.html);
                    console.log(twttr);
                    twttr.widgets.load(document.getElementById('twitter-body'))
                    console.log('response: ', response);

                })
            }
        });

    });

})