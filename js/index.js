// Imports
var got = require('got');

const OMDbBaseUrl = "http://www.omdbapi.com/?s=";

$("#searchForm").submit(function () {
    // Do not want the page to reload on submit
    return false;
});

function fetchData (search, callback) {
    got(OMDbBaseUrl + search, {json: true}, function (err, data, res) {
        if (err) {
            alert('Your internet connection or the database seems to be down :(. Try again in a little while.')
        }
        else {
            console.log('calling callback');
            callback(data.Search);
        }
    });
}

// Knockout

var SearchVM = function () {
    var self = this;
    showCard = ko.observable(true);

    self.movieInput = ko.observable();

    self.movieName = ko.observable();

    self.movieInput.subscribe(function (newValue) {
        // Simulating an AJAX call by firing a timeout.
        self.movieName('Fetching...');
        fetchData(self.movieInput(), callback);
        function callback (data) {
            self.movieName(data[0]['Title']);
        }
    });

    };

ko.applyBindings(new SearchVM());
