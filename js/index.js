// Imports
var got = require('got');

const OMDbBaseUrl = "http://www.omdbapi.com/?s=";

$("#searchForm").submit(function () {
    search = $('input[name=movie-name]').val();
    got(OMDbBaseUrl + search, {json: true}, function (err, data, res) {
        if (err) {
            alert('Your internet connection or the database seems to be down :(. Try again in a little while.')
        }
        else {
            // There must be a better way to do this
            console.log(data);
            updateCard(data);
        }
    });
    // Do not want the page to reload on submit
    return false;
});

function updateCard(data) {
    $('#movieCard').css('display', 'flex').find('.header').text(data.Search[0].Title);
}
