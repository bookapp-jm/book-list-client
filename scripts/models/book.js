'use strict';

function Book(rawDataObj) {
    Object.keys(rawDataObj).forEach(key => {
        this[key] = rawDataObj[key];
    }, this);
}

Book.prototype.toHtml = function () {
    var template = Handlebars.compile($('#book-list-template').text());
    return template(this);
};

Book.all = [];

Book.loadAll = rows => {
    rows.sort((a, b) => b.title - a.title);
    Book.all = rows.map(bookObject => new Book(bookObject));

};

Book.fetchAll = callback => {
    $.get('/api/v1/books')
        .then(results => {
            Book.loadAll(results);
        })
        .catch(err => {
            console.error(err);
            errorCallback();
        });
};

Define a static method on Book called loadAll which takes rows as an argument, and sorts rows by title, maps over rows to create an array of Book instances, and then assigns the new array of Books to Book.all.

Define a static method on Book called fetchAll which takes callback as an argument, and makes a request to the API at GET: /api/v1 / books.
On success, pass the results to Book.loadAll, and then invoke the callback.
On failure, invoke the errorCallback.

