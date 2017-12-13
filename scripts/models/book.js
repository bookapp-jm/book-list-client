'use strict';

let app = app || {};
let __API_URL__ = 'hptt://localhost:3000'; //can also make it the deployed version which would be heroku_

(function(module) {
  function errorCallback(err) {
    console.error(err);
    module.errorView.initErrorPage(err);
  }

  function Book(rawDataObj) {
    Object.keys(rawDataObj).forEach(key => this[key] = rawDataObj[key]);
  }

  Book.prototype.toHtml = function () {
    let template = Handlebars.compile($('#book-list-template').text());
    return template(this);
  };

  Book.all = [];

  Book.loadAll = rows => Book.all = rows.sort((a, b) => b.title - a.title).map(bookObject => new Book(bookObject));

  Book.fetchAll = callback => {
    $.get(`${__API_URL__}/api/v1/books`)
      .then(data => Book.loadAll(data))
      .then(callback)
      .catch(err => errorCallback(err));
  };
  module.Book = Book;
})(app);

