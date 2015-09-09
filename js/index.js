var OMDbBaseUrl = "http://www.omdbapi.com/?";


$("#searchForm").submit(function () {
    search = $('input[name=movie-name]').val();
    // Do not want the page to reload on submit
    return false;
});
