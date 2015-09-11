// Imports
var got = require('got');

const OMDbBaseUrl = "http://www.omdbapi.com/?y=&plot=short&r=json&t=";

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
            callback(data);
        }
    });
}

// Semantic

$('.special.cards .image').dimmer({
    on: 'hover'
});

// Knockout

var SearchVM = function () {
    var self = this;
    self.showCard = ko.observable(false);

    self.movieInput = ko.observable();

    self.movieName = ko.observable();

    self.moviePoster = ko.observable();

    self.moviePlot = ko.observable();

    self.movieYear = ko.observable();

    self.movieRating = ko.observable();

    self.movieInput.subscribe(function (newValue) {
        // Simulating an AJAX call by firing a timeout.
        self.movieName('Fetching...');
        fetchData(self.movieInput(), callback);
        function callback (data) {
            self.movieName(data['Title']);
            self.moviePoster(data['Poster']);
            self.moviePlot(data['Plot']);
            self.movieYear(data['Year']);
            self.movieRating(data['imdbRating']);
            self.showCard(true);
            console.log(data);
        }
    });

    };

ko.applyBindings(new SearchVM());
