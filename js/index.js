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

var SearchVM = function (first) {
    var self = this;
    showCard = ko.observable(true);

    self.movieInput = ko.observable(first);

    self.movieName = ko.computed({
        read: function () {
            fetchData(self.movieInput(), callback);
            function callback (data) {
                console.log(data);
                console.log('callback done');
                return self.movieName(data[0].Title);
            }
        },
        write: function (value) {
            fetchData(value, callback);
            function callback (data) {
                self.movieName(data[0].Title);
            }
        },
        owner: this
    });
};

ko.applyBindings(new SearchVM('2001: A Space Odyssey'));
