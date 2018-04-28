$(document).ready(function () {



    $("#search").on("click", function (event) {
        event.preventDefault();
        var userInput = $('#inlineFormInput').val().trim();
        var queryURL = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=c185f95eeeb54ebb5bebe6e4467cd40a&tags=' + userInput + '&per_page=3&format=json&nojsoncallback=1';
        $.ajax({
            url: queryURL,
            method: 'GET'
        })

            .then(function (response) {
                console.log(response);
                //console.log(queryURL);

                var results = response.photos.photo;
                for (var i = 0; i < results.length; i++) {
                    var flickrImage = $('<img>');
                    flickrImage.attr({ 'src':`https://farm${response.photos.photo[i].farm}.staticflickr.com/${response.photos.photo[i].server}/${response.photos.photo[i].id}_${response.photos.photo[i].secret}.jpg`})

                    $('#flicker-body').append(flickrImage);

                    console.log(results);
                    console.log(flickrImage);

                }


            });

    });

});