// Imports
var got = require('got');

const OMDbBaseUrl = "http://www.omdbapi.com/?s=";

$("#searchForm").submit(function () {
    // Do not want the page to reload on submit
    return false;
});

function fetchData (search) {
    got(OMDbBaseUrl + search, {json: true}, function (err, data, res) {
        if (err) {
            alert('Your internet connection or the database seems to be down :(. Try again in a little while.')
        }
        else {
            return data
        }
    });
}

// Knockout

var SearchVM = function (first) {
    this.movieInput = ko.observable(first);

    this.movieName = ko.pureComputed(function() {
        return this.movieInput();
    }, this);
};

ko.applyBindings(new SearchVM('2001: A Space Odyssey'));
